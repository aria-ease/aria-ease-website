# GitHub Actions Workflows for Accessibility

This folder contains automated CI/CD workflows that run aria-ease accessibility checks.

## What You Get

### 1. `accessibility-checks.yml` (Full Check)

**Runs on:** Every push to `main` or `isaac` branches, and all PRs to `main`

**What it does:**

1. Builds your site
2. Starts dev server
3. Runs `npm run audit` - full accessibility audit of all configured URLs
4. Runs `npm run test` - contract tests for aria-ease components
5. Uploads the HTML audit report (downloadable from Actions tab)
6. Comments on PRs if checks fail

**Time:** ~3-5 minutes

### 2. `quick-check.yml` (Fast Check)

**Runs on:** PRs when you change source code

**What it does:**

- Only runs `npm run test` (skips full audit)
- Gives you fast feedback

**Time:** ~1-2 minutes

## How to Use

### First Time Setup

1. **Install wait-on package** (needed to wait for dev server):

   ```bash
   cd docs
   npm install --save-dev wait-on
   ```

2. **Push to GitHub**:

   ```bash
   git add .github/
   git commit -m "Add accessibility CI/CD workflows"
   git push
   ```

3. **Watch it run**:
   - Go to your repo on GitHub
   - Click "Actions" tab
   - See your workflows running!

### Daily Usage

**Nothing!** That's the beauty. Just push code and GitHub will:

- ✅ Run accessibility checks automatically
- 📊 Show results in the PR
- 🚫 Block merging if tests fail (optional - can configure)
- 📥 Let you download audit reports

### Viewing Results

**In the PR:**

- Green checkmark = all accessibility checks passed
- Red X = something failed (click "Details" to see what)

**Downloading Reports:**

1. Go to Actions tab
2. Click on a workflow run
3. Scroll to bottom → "Artifacts"
4. Download `accessibility-audit-report`
5. Open the HTML file in your browser

### Making PRs Require Passing Checks

1. Go to repo Settings → Branches
2. Add branch protection rule for `main`
3. Check "Require status checks to pass before merging"
4. Select "accessibility-audit" and "quick-test"

Now PRs can't be merged until accessibility checks pass!

## Customizing

### Change when workflows run

Edit the `on:` section in each workflow file.

### Add Slack/Discord notifications

Add a notification step after the test steps.

### Run on different branches

Update the `branches:` list.

### Skip certain paths

Add `paths-ignore:` to exclude files like docs, README, etc.

## Troubleshooting

**"wait-on: command not found"**

- Run `npm install --save-dev wait-on` in the docs folder

**"Port 5173 already in use"**

- Workflows run in fresh environments, this shouldn't happen
- Check if you're hardcoding ports somewhere

**"Playwright browser not found"**

- The workflow installs chromium - if it fails, check the logs
- May need to update Playwright version

**Tests pass locally but fail in CI**

- Different screen sizes? CI uses 1280x720 by default
- Timing issues? Add more wait time in your config
- Missing environment variables? Add them in repo Settings → Secrets

## Cost

**FREE!** 🎉

- GitHub Actions gives you 2,000 minutes/month free for public repos
- Unlimited for public OSS repos
- Each run takes ~3-5 minutes

## Example Workflow Run

```
✓ Checkout code
✓ Setup Node.js
✓ Install dependencies
✓ Install Playwright
✓ Build site
✓ Start dev server
✓ Run accessibility audit (found 0 issues)
✓ Run accessibility tests (15 tests passed)
✓ Upload audit report
```

Result: PR gets a green checkmark, you're confident nothing broke!
