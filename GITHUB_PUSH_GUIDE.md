# 🚀 Push Your Netflix Clone to GitHub

Complete step-by-step guide to push your code to GitHub.

---

## ✅ Step 1: Install Git (If Not Already Installed)

Git has been installed via winget. **Restart VS Code** to use Git commands.

If Git installation failed, download manually:
- Go to [git-scm.com/download/win](https://git-scm.com/download/win)
- Download and run the installer
- Use default settings
- Restart VS Code

---

## 📝 Step 2: Create a GitHub Repository

1. **Go to [github.com](https://github.com)**
2. **Sign in** (or create an account if you don't have one)
3. **Click the "+" icon** in the top right → "New repository"
4. **Fill in details:**
   - Repository name: `netflix-clone` (or your preferred name)
   - Description: "Netflix clone with React, Vite, TMDB API"
   - Visibility: **Public** (or Private if you prefer)
   - **DO NOT** check "Initialize with README" (we already have code)
5. **Click "Create repository"**
6. **Copy the repository URL** (e.g., `https://github.com/yourusername/netflix-clone.git`)

---

## 💻 Step 3: Initialize Git and Push Code

**After restarting VS Code**, run these commands in the terminal:

### 3.1 Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3.2 Initialize Git Repository
```bash
# Navigate to your project (if not already there)
cd c:\Users\klohi\.vscode\workspace\Netlifx_Clone

# Initialize Git
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: Netflix clone with auth and My List"
```

### 3.3 Connect to GitHub
```bash
# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Example:
# git remote add origin https://github.com/johndoe/netflix-clone.git
```

### 3.4 Push to GitHub
```bash
# Push your code to GitHub
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)

---

## 🔑 Step 4: Create GitHub Personal Access Token (If Needed)

If Git asks for a password:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Netflix Clone Deployment"
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## 🎯 Quick Commands Summary

```bash
# After restarting VS Code:

# 1. Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 2. Initialize and commit
git init
git add .
git commit -m "Initial commit: Netflix clone"

# 3. Connect to GitHub (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/netflix-clone.git

# 4. Push to GitHub
git branch -M main
git push -u origin main
```

---

## ✅ Verify Your Code is on GitHub

1. Go to your GitHub repository URL
2. You should see all your files
3. Click on files to verify they uploaded correctly

---

## 🚀 Next: Deploy to Vercel

Once your code is on GitHub:

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your `netflix-clone` repository
5. Add environment variable: `VITE_TMDB_API_KEY`
6. Click "Deploy"
7. Your app will be live in ~2 minutes! 🎉

---

## 🐛 Troubleshooting

### "git: command not found"
- **Solution:** Restart VS Code after installing Git
- Or close and reopen your terminal

### "Permission denied"
- **Solution:** Use a Personal Access Token instead of password
- Follow Step 4 above

### "Repository not found"
- **Solution:** Check your repository URL is correct
- Make sure repository exists on GitHub

### Files not showing on GitHub
- **Solution:** Make sure you ran `git add .` before committing
- Check `.gitignore` isn't excluding important files

---

## 📁 What Gets Pushed

These files will be pushed to GitHub:
- ✅ All source code (`src/`)
- ✅ Configuration files (`package.json`, `vite.config.js`, etc.)
- ✅ Deployment configs (`vercel.json`, `netlify.toml`)
- ✅ Documentation (`README.md`, `DEPLOYMENT.md`)

These files will NOT be pushed (in `.gitignore`):
- ❌ `node_modules/` (dependencies)
- ❌ `dist/` (build output)
- ❌ `.env` (your API keys - keep secret!)

---

## 🎉 You're Done!

After pushing to GitHub, your code is:
- ✅ Backed up safely
- ✅ Ready to deploy to Vercel/Netlify
- ✅ Shareable with others
- ✅ Version controlled

**Next step:** Deploy to Vercel following the instructions in `DEPLOYMENT.md`

Good luck! 🚀
