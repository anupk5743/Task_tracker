# 🚀 START HERE - Deploy Your Project in 15 Minutes

## I cannot directly access your hosting accounts, but I've prepared everything for you!

**Your project is 100% ready to deploy.** Just follow these simple steps:

---

## 📋 Step-by-Step Deployment

### ⏱️ Total Time: ~15 minutes

### 1️⃣ MongoDB Setup (3 min)
👉 **Go to:** https://www.mongodb.com/cloud/atlas/register
- Sign up (free)
- Create FREE cluster
- Create database user
- Allow all IPs (0.0.0.0/0)
- **Copy connection string** (you'll need this!)

### 2️⃣ Deploy Backend (5 min)
👉 **Go to:** https://render.com
- Sign up with GitHub
- New → Web Service
- Connect repo: `anupk5743/Task_tracker`
- **Settings:**
  - Root Directory: `Backend`
  - Build: `npm install`
  - Start: `npm start`
- **Environment Variables:**
  ```
  MONGODB_URI = (your MongoDB connection string)
  JWT_SECRET = (use: https://randomkeygen.com/)
  JWT_EXPIRE = 30d
  NODE_ENV = production
  PORT = 10000
  ```
- Deploy → **Copy your backend URL** ✅

### 3️⃣ Deploy Frontend (5 min)
👉 **Go to:** https://vercel.com
- Sign up with GitHub
- Add New Project
- Import: `anupk5743/Task_tracker`
- **Settings:**
  - Root Directory: `frontend`
  - Framework: Vite
- **Environment Variable:**
  ```
  VITE_API_URL = https://your-backend-url.onrender.com/api
  ```
- Deploy → **Copy your frontend URL** ✅

### 4️⃣ Update Backend CORS (2 min)
👉 **Back to Render:**
- Add environment variable:
  ```
  FRONTEND_URL = https://your-frontend-url.vercel.app
  ```
- Save → Auto-redeploys

---

## 🎯 Your Hosting Links Will Be:

**Backend:** `https://your-service-name.onrender.com`  
**Frontend:** `https://your-project-name.vercel.app`

---

## 📚 Detailed Guides

- **Quick Guide:** See `QUICK_DEPLOY.md` for detailed steps
- **Checklist:** Use `DEPLOY_CHECKLIST.md` to track progress
- **Full Guide:** See `DEPLOYMENT.md` for comprehensive instructions

---

## ⚡ Need Help?

Everything is configured and ready. Just follow the steps above and you'll have your hosting links in 15 minutes!

**All configuration files are already in your repository and ready to use!** 🎉
