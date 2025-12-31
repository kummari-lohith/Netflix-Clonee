# 🚀 Netflix Clone - Deployment Guide

Complete guide to deploy your Netflix clone to production.

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ **TMDB API Key** - Get it from [TMDB](https://www.themoviedb.org/settings/api)
2. ✅ **Git Repository** - Code pushed to GitHub/GitLab
3. ✅ **Account** on deployment platform (Vercel/Netlify)

---

## 🎯 Recommended Platform: Vercel

**Why Vercel?**
- ✅ Best for Vite/React apps
- ✅ Automatic deployments from Git
- ✅ Free tier with generous limits
- ✅ Easy environment variable setup
- ✅ Built-in SSL certificates

---

## 🚀 Option 1: Deploy to Vercel (Recommended)

### Method A: Using Vercel Website

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your repository**
5. **Configure project:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Add Environment Variable:**
   - Name: `VITE_TMDB_API_KEY`
   - Value: Your TMDB API key
7. **Click "Deploy"**
8. **Done!** Your app will be live in ~2 minutes

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: netflix-clone
# - Directory: ./
# - Override settings? No

# Add environment variable
vercel env add VITE_TMDB_API_KEY

# Deploy to production
vercel --prod
```

---

## 🌐 Option 2: Deploy to Netlify

### Method A: Using Netlify Website

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login**
3. **Click "Add new site" → "Import an existing project"**
4. **Connect to Git provider** (GitHub)
5. **Select your repository**
6. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
7. **Add Environment Variable:**
   - Go to Site settings → Environment variables
   - Add: `VITE_TMDB_API_KEY` = Your API key
8. **Click "Deploy site"**
9. **Done!** Site will be live in ~2 minutes

### Method B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod

# Add environment variable via Netlify dashboard
```

### Method C: Drag and Drop

```bash
# Build locally
npm run build

# Go to netlify.com
# Drag the 'dist' folder to deploy

# Note: You'll need to add env variables in dashboard
```

---

## 📦 Option 3: Deploy to GitHub Pages

### Setup

1. **Install gh-pages package:**
```bash
npm install --save-dev gh-pages
```

2. **Update `package.json`:**
```json
{
  "homepage": "https://yourusername.github.io/netflix-clone",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update `vite.config.js`:**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/netflix-clone/', // Your repo name
})
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Save

**⚠️ Note:** GitHub Pages doesn't support environment variables. You'll need to hardcode the API key (not recommended for production).

---

## 🔧 Build and Test Locally

Before deploying, test the production build:

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
```

**Test checklist:**
- ✅ Login/Signup works
- ✅ Movies load (TMDB API works)
- ✅ My List functionality works
- ✅ All routes work (/browse, /my-list)
- ✅ Responsive design works
- ✅ No console errors

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `VITE_TMDB_API_KEY` | TMDB API Key | [TMDB Settings](https://www.themoviedb.org/settings/api) |

### How to Add in Each Platform

**Vercel:**
- Dashboard → Project → Settings → Environment Variables
- Or use: `vercel env add VITE_TMDB_API_KEY`

**Netlify:**
- Dashboard → Site settings → Environment variables
- Add variable: `VITE_TMDB_API_KEY`

**Local Development:**
- Copy `.env.example` to `.env`
- Add your API key
- Never commit `.env` to Git

---

## 🎨 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate auto-configured

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records
4. SSL certificate auto-configured

---

## 🐛 Troubleshooting

### Build Fails

**Problem:** Build fails with errors

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building locally
npm run build
```

### Routes Don't Work (404 on refresh)

**Problem:** Refreshing `/browse` or `/my-list` shows 404

**Solution:** 
- **Vercel:** `vercel.json` already configured ✅
- **Netlify:** `netlify.toml` already configured ✅
- **GitHub Pages:** Use HashRouter instead of BrowserRouter

### Movies Don't Load

**Problem:** Movies don't appear, API errors in console

**Solutions:**
1. Check environment variable is set correctly
2. Variable name must be exactly: `VITE_TMDB_API_KEY`
3. Redeploy after adding environment variable
4. Check TMDB API key is valid

### Authentication Not Working

**Problem:** Login/signup doesn't persist

**Solution:**
- This is expected - using localStorage (client-side only)
- For production, implement backend authentication
- Current implementation is for demo purposes

---

## 📊 Deployment Checklist

Before going live:

- [ ] Test production build locally (`npm run build && npm run preview`)
- [ ] Add TMDB API key to deployment platform
- [ ] Verify all routes work
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Test login/signup flow
- [ ] Test My List functionality
- [ ] Verify movies load correctly
- [ ] Check responsive design
- [ ] Test on different browsers

---

## 🎉 Post-Deployment

After successful deployment:

1. **Share your link!** 🎬
2. **Monitor performance** in platform dashboard
3. **Check analytics** (if enabled)
4. **Update README** with live link
5. **Consider adding:**
   - Backend API for real authentication
   - Database for user data
   - Payment integration
   - Video streaming

---

## 📝 Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### GitHub Pages
```bash
npm run deploy
```

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

---

## 💡 Tips

1. **Use Vercel** for easiest deployment
2. **Always test locally** before deploying
3. **Keep API keys secret** - never commit to Git
4. **Enable HTTPS** (automatic on Vercel/Netlify)
5. **Monitor usage** to stay within free tier limits

---

## 🚀 You're Ready to Deploy!

Choose your platform and follow the steps above. Your Netflix clone will be live in minutes!

**Recommended:** Start with Vercel for the smoothest experience.

Good luck! 🎬✨
