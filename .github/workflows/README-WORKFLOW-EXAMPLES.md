# Example GitHub Actions Workflows for Aria-Ease CI/CD

This folder contains example workflows demonstrating different approaches to implementing accessibility as a deployment gatekeeper.

## Quick Start

Choose one of these approaches based on your needs:

### Option 0: Branch Protection Rules (✅ RECOMMENDED - Production Use)

**Files:** `accessibility-checks.yml` + `deploy.yml` + GitHub branch protection  
Checks run on feature branches and PRs. Branch protection blocks merging if checks fail. Deploy runs only on main after checks have passed.

**This is what aria-ease docs uses in production!**

### Option 1: Explicit Dependency with `needs:` (Good for Demos/Teaching)

**Files:** `accessibility-checks.yml` + `deploy-gated.yml`  
Deploy job explicitly depends on accessibility-checks job using `needs:`. More visually obvious but re-runs checks.

### Option 2: Combined Workflow (Simple Projects)

**File:** `combined-accessibility-deploy.yml`  
Everything in one workflow - accessibility checks run before deploy step.

### Option 3: Matrix Strategy (Multi-Page Applications)

**File:** `matrix-accessibility-deploy.yml`  
Test multiple pages/routes in parallel.

---

## Option 0: Branch Protection Rules (✅ RECOMMENDED)

**Use when:** You want the most efficient setup for production use.

**This is the aria-ease docs production setup!**

### How It Works:

```
Developer Workflow:
1. Push to feature branch → accessibility-checks.yml runs
2. Create PR to main → accessibility-checks.yml runs again
3. Checks fail ❌ → GitHub blocks PR merge (via branch protection)
4. Checks pass ✅ → PR can be merged
5. Code reaches main → deploy.yml runs automatically
6. Inaccessible code NEVER reaches main, therefore NEVER deploys
```

### File 1: `accessibility-checks.yml`

```yaml
name: Accessibility Checks

on:
  push:
    branches: [main, develop, isaac-v6.x.x] # Run on feature branches
  pull_request:
    branches: [main] # Run on PRs to main

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm install
      - run: npx playwright install --with-deps chromium
      - run: npm run build

      - name: Start dev server
        run: |
          npm run dev &
          npx wait-on http://localhost:5173 -t 30000

      # 🚨 GATE #1: Static Audit
      - name: Run accessibility audit
        run: npm run audit

      # 🚨 GATE #2: Component Contract Tests
      - name: Run component contract tests
        run: npm run test

      - name: Upload reports
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-reports
          path: accessibility-reports/
          retention-days: 30

      # Notify on PR if failed
      - name: Comment on PR
        if: github.event_name == 'pull_request' && failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ **Accessibility checks failed!** This PR cannot be merged until violations are fixed.\n\nDownload the [accessibility reports](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}) for details.'
            })
```

### File 2: `deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main] # Only runs when code reaches main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

### File 3: GitHub Branch Protection Rules

**Settings → Branches → Branch protection rules → Add rule for `main`:**

- ✅ **Require a pull request before merging**
- ✅ **Require status checks to pass before merging**
  - Select: `accessibility-audit` (the job name from accessibility-checks.yml)
- ✅ **Require branches to be up to date before merging**
- ✅ **Do not allow bypassing the above settings** (optional but recommended)

### Why This Is Best:

✅ **No redundant checks** - Checks run on feature branch/PR, not again on main  
✅ **Early feedback** - Developers know immediately if their changes break accessibility  
✅ **Efficient** - Saves CI minutes by not re-running checks  
✅ **Standard practice** - This is how most teams use GitHub Actions  
✅ **Secure** - Enforced by GitHub's branch protection (not just workflow logic)

### How It Blocks Deployment:

```
┌─────────────────────────────────────────────┐
│ Developer pushes to feature branch          │
│ ↓                                           │
│ accessibility-checks runs                   │
│ ↓                                           │
│ PASS ✅ → Can create PR                    │
│ FAIL ❌ → Fix required before PR           │
├─────────────────────────────────────────────┤
│ Developer creates PR to main                │
│ ↓                                           │
│ accessibility-checks runs again             │
│ ↓                                           │
│ PASS ✅ → Merge button enabled             │
│ FAIL ❌ → Merge button DISABLED (GitHub)   │
├─────────────────────────────────────────────┤
│ PR merged to main                           │
│ ↓                                           │
│ deploy.yml runs                             │
│ ↓                                           │
│ 🚀 Code deployed to production             │
└─────────────────────────────────────────────┘
```

**The gatekeeper:** GitHub's branch protection prevents inaccessible code from reaching `main`, therefore it can never trigger deployment.

---

## Option 1: Explicit Dependency with `needs:` (Good for Demos)

**Use when:** You want explicit workflow dependency or need extra protection against direct pushes to main.

**Good for:** Video demonstrations where you want to visually show deploy being blocked.

### File: `deploy-gated.yml`

```yaml
name: Accessibility Gate + Deploy

on:
  push:
    branches: [main]

jobs:
  # Job 1: Run checks
  accessibility-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run dev &
      - run: npx wait-on http://localhost:5173 -t 30000
      - run: npm run audit
      - run: npm run test

  # Job 2: Deploy (ONLY runs if checks pass)
  deploy:
    needs: accessibility-checks # 🚨 THE EXPLICIT GATEKEEPER
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

### Why Use This:

✅ **Visual clarity** - Two jobs in GitHub Actions UI shows dependency clearly  
✅ **Explicit blocking** - Deploy job shows "Skipped" if checks fail  
✅ **Extra safety** - Works even if someone pushes directly to main (bypassing branch protection)  
✅ **Good for teaching** - Makes the gatekeeper concept very obvious

❌ **Re-runs checks** - Runs accessibility checks again even if they passed on PR  
❌ **Wastes CI minutes** - Less efficient than branch protection approach  
❌ **Slower** - Deploy waits for checks to complete

### When It's Blocked:

```
GitHub Actions UI:

✅ accessibility-checks (completed - failed)
   └─ Run audit: ❌ Failed

⊘ deploy (skipped)
   └─ Needs: accessibility-checks (failed)
```

---

## Option 2: Combined Workflow (Simplest)

**Use when:** You want everything in one file and have a simple deployment process.

```yaml
name: Accessibility Checks + Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  accessibility-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Setup
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Build application
        run: npm run build

      # Start dev server for testing
      - name: Start dev server
        run: |
          npm run dev &
          npx wait-on http://localhost:5173 -t 30000

      # 🚨 ACCESSIBILITY GATE #1: Static Audit
      - name: Run accessibility audit
        run: npm run audit

      # 🚨 ACCESSIBILITY GATE #2: Component Contract Tests
      - name: Run component contract tests
        run: npm run test

      # Upload reports
      - name: Upload audit reports
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-reports
          path: accessibility-reports/
          retention-days: 30

      # 🚀 DEPLOY: Only runs if all previous steps passed
      - name: Deploy to Firebase
        if: github.ref == 'refs/heads/main' && success()
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

**Key Points:**

- ✅ Single workflow = easier to manage
- ✅ `if: success()` on deploy ensures it only runs if accessibility checks passed
- ✅ `if: failure()` on reports ensures they're uploaded on failure
- ✅ Deploy step only runs on `main` branch pushes

---

## Option 2: Separate Workflows with Dependency (Most Robust)

**Use when:** You want clear separation of concerns and reusable workflows.

### File 1: `accessibility-checks.yml`

```yaml
name: Accessibility Checks

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Build site
        run: npm run build

      - name: Start dev server
        run: |
          npm run dev &
          npx wait-on http://localhost:5173 -t 30000

      # 🚨 GATE #1: Static Audit
      - name: Run accessibility audit
        run: npm run audit
        id: audit

      # 🚨 GATE #2: Component Contract Tests
      - name: Run component contract tests
        run: npm run test
        id: test

      # Upload reports
      - name: Upload audit report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-audit-report
          path: accessibility-reports/
          retention-days: 30

      # Comment on PR if failed
      - name: Comment on PR with results
        if: github.event_name == 'pull_request' && failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ **Accessibility checks failed!** Your deployment has been blocked.\\n\\nCheck the [workflow run](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}) for details and download the accessibility reports.'
            })

      # Post success status
      - name: Post success status
        if: success()
        run: echo "✅ All accessibility checks passed! Ready to deploy."
```

### File 2: `deploy-gated.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  # First, re-run accessibility checks (or reference the other workflow)
  accessibility-gate:
    uses: ./.github/workflows/accessibility-checks.yml

  # Deploy only runs if accessibility-gate passes
  deploy:
    needs: accessibility-gate # 🚨 THIS IS THE KEY!
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Build for production
        run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

      - name: Post deployment notification
        if: success()
        run: |
          echo "🚀 Successfully deployed to production!"
          echo "Site URL: https://your-site.web.app"
```

**Key Points:**

- ✅ `needs: accessibility-gate` blocks deploy if accessibility checks fail
- ✅ Clear separation: one workflow tests, one deploys
- ✅ Reusable accessibility-checks workflow
- ✅ PR comments notify when accessibility fails
- ❌ Runs checks twice (on push and before deploy) - slight overhead

---

## Option 2b: Separate Workflows (Inline Jobs)

**Alternative** if you don't want to use reusable workflows:

### File: `deploy-gated-inline.yml`

```yaml
name: Accessibility Gate + Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Job 1: Accessibility Checks
  accessibility-checks:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm install
      - run: npx playwright install --with-deps chromium
      - run: npm run build

      - name: Start dev server
        run: |
          npm run dev &
          npx wait-on http://localhost:5173 -t 30000

      - name: Run accessibility audit
        run: npm run audit

      - name: Run component tests
        run: npm run test

      - name: Upload reports
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-reports
          path: accessibility-reports/

  # Job 2: Deploy (only runs if accessibility-checks passes)
  deploy:
    needs: accessibility-checks # 🚨 GATEKEEPER!
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

**This is the CLEANEST approach for the video demo!**

- ✅ Single file, two jobs
- ✅ Clear `needs:` dependency shows gatekeeper pattern
- ✅ Deploy job won't even START if accessibility-checks fails
- ✅ Easy to demonstrate in GitHub Actions UI

---

## Option 3: Matrix Strategy (Advanced)

**Use when:** You have multiple pages/routes to test or want parallel testing.

```yaml
name: Matrix Accessibility Testing + Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Test multiple pages in parallel
  accessibility-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        page:
          - { name: "Homepage", url: "http://localhost:5173" }
          - { name: "Docs", url: "http://localhost:5173/docs" }
          - {
              name: "Utilities",
              url: "http://localhost:5173/utilities/accordion",
            }
          - { name: "API", url: "http://localhost:5173/api-reference" }
      fail-fast: true # Stop all tests if one fails

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm install
      - run: npx playwright install --with-deps chromium
      - run: npm run build

      - name: Start dev server
        run: |
          npm run dev &
          npx wait-on http://localhost:5173 -t 30000

      - name: Audit ${{ matrix.page.name }}
        run: npx aria-ease audit --url ${{ matrix.page.url }}

      - name: Upload ${{ matrix.page.name }} report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-report-${{ matrix.page.name }}
          path: accessibility-reports/

  # Component contract tests (separate from page audits)
  component-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm install
      - run: npx playwright install --with-deps chromium
      - run: npm run build

      - name: Start dev server
        run: |
          npm run dev &
          npx wait-on http://localhost:5173 -t 30000

      - name: Run component contract tests
        run: npm run test

  # Deploy only if ALL tests pass
  deploy:
    needs: [accessibility-tests, component-tests] # 🚨 BOTH must pass!
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

**Key Points:**

- ✅ Tests multiple pages in parallel (faster!)
- ✅ `fail-fast: true` stops all tests if one fails (saves CI minutes)
- ✅ Separate component tests from page audits
- ✅ Deploy requires ALL jobs to pass

---

## Which Approach Should You Use?

### For Production: Use Option 0 (Branch Protection) ✅

**Why:**

- Most efficient (no redundant check runs)
- Standard GitHub workflow pattern
- Early feedback on feature branches
- Enforced by GitHub platform (not just workflow logic)
- This is what aria-ease docs uses in production

**When it blocks deployment:**

- Developer pushes to feature branch → checks run
- Developer creates PR → checks run again
- If checks fail → PR cannot be merged (GitHub blocks it)
- If PR can't merge → code can't reach main
- If code can't reach main → deploy workflow never triggers
- **Result: Inaccessible code never reaches production**

### For Teaching/Demos: Use Option 1 (Explicit Dependency)

**Why:**

- Visually obvious in GitHub Actions UI (two jobs shown)
- Deploy job clearly shows "Skipped" status when blocked
- Makes the gatekeeper concept explicit for learners
- Extra safety layer (works even if branch protection bypassed)

**Trade-offs:**

- Re-runs checks on main (wastes CI minutes)
- Slower deployment (waits for checks to complete)
- Not necessary if branch protection is configured

### For Simple Projects: Use Option 2 (Combined)

**Why:**

- Single file easier to manage
- All logic in one place
- Good for solo developers or small teams

### For Complex Apps: Use Option 3 (Matrix)

**Why:**

- Test multiple pages in parallel
- Faster overall (parallel execution)
- Better for large applications with many routes

---

## Recommended Setup for Video Demo

**Best approach:** Show **both** Option 0 and Option 1 to teach viewers:

1. **First (5 min):** Show your actual production setup (Option 0)
   - Demonstrate PR being blocked by branch protection
   - Explain: "This is what I use in production"
2. **Then (2 min):** Show the explicit dependency (Option 1)
   - Demonstrate deploy job being skipped
   - Explain: "This adds extra protection and makes it more obvious"

This way viewers learn:

- ✅ The recommended production approach
- ✅ An alternative that's more explicit
- ✅ They can choose based on their needs

---

## Testing Your Workflow Before Recording

1. **Test the pass scenario:**

   ```bash
   git checkout main
   git push origin main
   # Verify: accessibility-checks passes, deploy runs
   ```

2. **Test the fail scenario:**

   ```bash
   git checkout -b test-failure
   # Break accessibility (remove aria-label)
   git commit -m "test: break accessibility"
   git push origin test-failure
   # Verify: accessibility-checks fails, deploy BLOCKED
   ```

3. **Test the fix scenario:**
   ```bash
   # Fix accessibility
   git commit -m "fix: restore accessibility"
   git push origin test-failure
   # Verify: accessibility-checks passes, deploy runs
   ```

---

## Alternative Deployment Platforms

### Vercel:

```yaml
- name: Deploy to Vercel
  if: github.ref == 'refs/heads/main'
  run: |
    npm install -g vercel
    vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Netlify:

```yaml
- name: Deploy to Netlify
  if: github.ref == 'refs/heads/main'
  uses: nwtgck/actions-netlify@v2
  with:
    publish-dir: "./dist"
    production-deploy: true
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitHub Pages:

```yaml
- name: Deploy to GitHub Pages
  if: github.ref == 'refs/heads/main'
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

---

## Common Issues & Solutions

### Issue: Workflow runs on PR but not on push

**Solution:** Check the `on:` trigger includes both `push` and `pull_request`

### Issue: Deploy runs even when tests fail

**Solution:** Add `needs: accessibility-checks` to deploy job

### Issue: Tests pass locally but fail in CI

**Solution:**

- Check Node version matches
- Ensure `wait-on` timeout is long enough
- Verify URLs in config match dev server

### Issue: Artifacts not showing up

**Solution:**

- Check `path:` points to correct directory
- Use `if: failure()` to upload on failure

---

## Success Metrics to Track

After implementing:

- ❌ Red badges on commits with accessibility failures
- ✅ Green badges on commits with passing accessibility
- 🚫 Deploy workflow never runs when accessibility fails
- 📊 Download audit reports to verify violations caught

**The goal:** Make it IMPOSSIBLE to ship inaccessible code to production.
