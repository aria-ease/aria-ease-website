# Quick Start Checklist - Get CI/CD Running in 5 Minutes

## ✅ What You Need
- [ ] GitHub repository (you have this)
- [ ] Push access to the repo
- [ ] 5 minutes

## 🚀 Setup Steps

### Step 1: Install Dependencies
```bash
cd /Users/macx/aria-ease/docs
npm install
```

This installs `wait-on` which the workflows need.

---

### Step 2: Commit and Push the Workflows
```bash
git add .github/ package.json
git commit -m "Add automated accessibility CI/CD checks"
git push
```

---

### Step 3: Watch It Run
1. Go to your GitHub repo
2. Click the **Actions** tab
3. You should see a workflow running!

---

### Step 4 (Optional): Test with a PR
```bash
# Make a small change
git checkout -b test-ci-cd
echo "Testing CI/CD" >> README.md
git add README.md
git commit -m "Test CI/CD workflow"
git push -u origin test-ci-cd
```

Then:
1. Go to GitHub → Pull Requests → New Pull Request
2. Watch the checks run automatically
3. See the green checkmarks appear

---

### Step 5 (Optional): Enable Branch Protection
1. Go to repo Settings
2. Click "Branches" (left sidebar)
3. Click "Add branch protection rule"
4. Branch name: `main`
5. Check: ✅ "Require status checks to pass before merging"
6. Search for and select:
   - `accessibility-audit`
   - `quick-test`
7. Click "Create"

Now PRs can't be merged if accessibility checks fail!

---

## 🎉 You're Done!

From now on, every time you:
- Push code
- Open a PR
- Update a PR

GitHub automatically runs your aria-ease accessibility checks.

## 📊 Viewing Results

### In the PR
Look for the status checks section - you'll see:
- ✅ Green checkmarks = passed
- ❌ Red X = failed (click "Details" to see why)

### In the Actions Tab
- See all workflow runs
- Download audit reports
- View detailed logs

### Downloading Audit Reports
1. Actions tab → Click a workflow run
2. Scroll to bottom → "Artifacts"
3. Download `accessibility-audit-report`
4. Unzip and open the HTML file

---

## 🎯 What Happens Now

### Every Push to Main or Isaac Branch
- Full accessibility audit runs
- All aria-ease tests run
- Report generated and uploaded

### Every Pull Request
- Quick check runs (fast feedback)
- Full audit runs (thorough check)
- Results show in the PR
- Auto-comment if checks fail

### If Something Fails
- PR shows which check failed
- Click "Details" to see the error
- Fix the issue
- Push again → checks re-run automatically

---

## 🆘 Troubleshooting

**"wait-on command not found"**
- Run: `cd docs && npm install`

**"No workflow runs showing up"**
- Wait a minute, sometimes takes time
- Check you pushed the `.github/workflows/` folder
- Check Actions tab isn't disabled (Settings → Actions)

**"Workflow failed on first run"**
- Click the failed run to see why
- Common issues:
  - Dev server didn't start (check ports)
  - Dependencies failed to install (check package.json)
  - Playwright browser install failed (rare)

**"Tests pass locally but fail in CI"**
- Different screen sizes
- Timing issues (add delays)
- Missing environment variables

---

## 📈 Next Level Moves

Once this is working:

1. **Add status badges to README**:
   ```markdown
   ![Accessibility Checks](https://github.com/aria-ease/aria-ease-website/workflows/Accessibility%20Checks/badge.svg)
   ```

2. **Add Slack/Discord notifications**

3. **Schedule nightly full audits**

4. **Add performance checks**

5. **Integrate with Lighthouse CI**

---

## 💪 Now You Can Legitimately Say:

✅ "We run automated accessibility checks in our CI/CD pipeline"  
✅ "Every PR is automatically tested for accessibility"  
✅ "We enforce WCAG compliance with automated testing"  
✅ "Our deployment pipeline includes accessibility gates"  

**And it's actually true!** 🎉
