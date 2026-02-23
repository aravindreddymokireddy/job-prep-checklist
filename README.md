# 🚀 Job Prep Checklist

An interactive MAANG interview preparation tracker with two checklists:
- ⚡ **MAANG Interview Prep** — DSA, Java/Spring Boot, Behavioral, Process
- 🏗️ **System Design** — 8 pillars, 59 topics with pro tips

**Live site:** https://aravindreddymokireddy.github.io/job-prep-checklist/

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```

---

## 🚢 Deploy to GitHub Pages (One-time Setup)

### Step 1 — Create the GitHub repo
Go to https://github.com/new and create a repo named **`job-prep-checklist`**  
⚠️ Keep it **public** (GitHub Pages is free for public repos)

### Step 2 — Push this code
```bash
cd job-prep-checklist
git init
git add .
git commit -m "Initial commit: MAANG + System Design checklist"
git branch -M main
git remote add origin https://github.com/aravindreddymokireddy/job-prep-checklist.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### Step 4 — Done! 🎉
GitHub Actions will automatically build and deploy.  
Your site will be live at:  
👉 **https://aravindreddymokireddy.github.io/job-prep-checklist/**

---

## ✅ After That
Every time you push to `main`, GitHub Actions auto-deploys the updated site.  
No manual steps needed ever again!
