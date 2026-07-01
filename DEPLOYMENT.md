# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages.

## First Time Setup (Do Once)

### 1. Create GitHub Repository

Go to [github.com/new](https://github.com/new) and create a new repository named `rlp-3.0-constituent` (or any name you prefer).

**Important:** If you use a different repo name, update line 5 in `vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

### 2. Push Your Code to GitHub

```bash
git add .
git commit -m "Initial commit - RLP 3.0 Constituent"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rlp-3.0-constituent.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. Save (if there's a save button)

### 4. Wait for Deployment

- Go to the **Actions** tab in your repo
- You should see a workflow running
- Once it completes (green checkmark), your site is live!

## Your Live URL

After deployment completes, your app will be available at:

```
https://YOUR-USERNAME.github.io/rlp-3.0-constituent/
```

## Making Updates

Every time you push to the `main` branch, GitHub will automatically:
1. Build your app
2. Deploy the new version
3. Update your live site (takes ~2-3 minutes)

```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
```

## Local Development

```bash
# Install dependencies (first time only)
npm install

# Run dev server
npm run dev

# Build for production (test before deploying)
npm run build

# Preview production build locally
npm run build && npx vite preview
```

## Troubleshooting

### Blank page after deployment?
- Check that the `base` path in `vite.config.ts` matches your repo name
- Make sure GitHub Pages is enabled in repo settings
- Check the Actions tab for build errors

### 404 on page refresh?
This is normal for GitHub Pages with React Router. Users should navigate using the app's internal links. If this is a problem, consider:
- Using hash-based routing instead
- Or deploying to Vercel/Netlify (which handle this automatically)

### Build fails in GitHub Actions?
- Check the Actions tab for error messages
- Make sure your code builds locally with `npm run build`
- Ensure all dependencies are in package.json (not just devDependencies)

## Alternative: Manual Deployment

If you don't want automatic deployment, you can deploy manually:

```bash
npm run build
# Then upload the 'dist' folder contents manually to GitHub Pages
```

## Need Help?

- GitHub Pages Docs: https://docs.github.com/en/pages
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html
