# Quick GitHub Setup - Copy & Paste Commands

## Step 1: Create the GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `rlp-3.0-constituent` (or choose your own name)
3. Keep it **Public** (required for free GitHub Pages)
4. Don't add README, .gitignore, or license (we already have them)
5. Click **Create repository**

## Step 2: Push Your Code

Copy your GitHub username and repo name from the page, then run these commands:

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/rlp-3.0-constituent.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation bar)
3. Click **Pages** (left sidebar, under "Code and automation")
4. Under **"Build and deployment"**:
   - Source: Select **"GitHub Actions"** from the dropdown
5. That's it! No save button needed.

## Step 4: Wait for Deployment

1. Click the **Actions** tab at the top of your repo
2. You'll see a workflow running (yellow dot = in progress)
3. Wait ~2-3 minutes for it to finish (green checkmark = deployed!)
4. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/rlp-3.0-constituent/
   ```

## Important: If You Used a Different Repo Name

If you named your repo something other than `rlp-3.0-constituent`, you need to update one file:

**Edit `vite.config.ts` line 5:**
```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Then commit and push:
```bash
git add vite.config.ts
git commit -m "Update base path for GitHub Pages"
git push
```

## That's It!

From now on, any time you push to GitHub, your site will automatically rebuild and redeploy.

## Making Changes Later

```bash
# Edit your files, then:
git add .
git commit -m "Describe your changes"
git push
```

Wait 2-3 minutes and your changes will be live!

---

## Need Help?

### Can't push to GitHub?
You might need to authenticate. GitHub now requires either:
- Personal Access Token (recommended)
- SSH key

Follow: https://docs.github.com/en/authentication

### Site shows 404?
- Check that GitHub Pages is enabled (Settings → Pages)
- Check that the workflow completed successfully (Actions tab)
- Verify the base path in vite.config.ts matches your repo name

### Build failed?
- Check the Actions tab for error messages
- Make sure `npm run build` works locally
