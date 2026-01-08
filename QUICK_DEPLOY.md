# 🚀 Quick Deployment Guide - Get Your Hosting Links

Follow these steps to deploy and get your hosting links.

## ⚡ Fast Track (15 minutes)

### Step 1: Set Up MongoDB Atlas (3 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub (fastest)
3. Create FREE cluster:
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select region closest to you
   - Click "Create"
4. Create Database User:
   - Username: `tasktracker` (or any)
   - Password: Generate secure password (SAVE IT!)
   - Click "Create User"
5. Network Access:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. Get Connection String:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://tasktracker:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

**✅ Save this connection string - you'll need it!**

---

### Step 2: Deploy Backend to Render (5 minutes)

1. Go to: https://render.com
2. Sign up with GitHub (use same account as your repo)
3. Click "New +" → "Web Service"
4. Connect Repository:
   - Search: `Task_tracker`
   - Select: `anupk5743/Task_tracker`
   - Click "Connect"
5. Configure Service:
   ```
   Name: task-tracker-backend
   Region: (choose closest to you)
   Branch: main
   Root Directory: Backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```
6. Click "Advanced" → Add Environment Variables:
   ```
   MONGODB_URI = (paste your MongoDB connection string)
   JWT_SECRET = (generate random string - use: https://randomkeygen.com/)
   JWT_EXPIRE = 30d
   NODE_ENV = production
   PORT = 10000
   FRONTEND_URL = (leave empty for now, add after frontend deploys)
   ```
7. Click "Create Web Service"
8. Wait 3-5 minutes for deployment
9. **✅ Copy your Backend URL** (e.g., `https://task-tracker-backend.onrender.com`)
   - It appears at the top of the service page
   - Status should show "Live"

**🔗 Your Backend Link: `https://your-service-name.onrender.com`**

---

### Step 3: Deploy Frontend to Vercel (5 minutes)

1. Go to: https://vercel.com
2. Sign up with GitHub (use same account)
3. Click "Add New Project"
4. Import Repository:
   - Search: `Task_tracker`
   - Select: `anupk5743/Task_tracker`
   - Click "Import"
5. Configure Project:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
6. Environment Variables:
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com/api
     ```
     (Replace with your actual Render backend URL from Step 2)
7. Click "Deploy"
8. Wait 2-3 minutes
9. **✅ Copy your Frontend URL** (e.g., `https://task-tracker.vercel.app`)
   - It appears after deployment completes
   - Click on the deployment to see the URL

**🔗 Your Frontend Link: `https://your-project-name.vercel.app`**

---

### Step 4: Update Backend CORS (2 minutes)

1. Go back to Render Dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Add/Update:
   ```
   FRONTEND_URL = https://your-frontend-url.vercel.app
   ```
   (Use your actual Vercel frontend URL)
5. Click "Save Changes"
6. Service will auto-redeploy (wait 2-3 minutes)

---

## ✅ You're Done!

### Your Hosting Links:

**Backend API:** `https://your-backend.onrender.com`  
**Frontend App:** `https://your-frontend.vercel.app`

### Test Your Deployment:

1. Visit your frontend URL
2. Try registering a new user
3. Create a task
4. Everything should work! 🎉

---

## 🆘 Troubleshooting

### Backend Issues:
- **Not deploying?** Check Render logs (Dashboard → Your Service → Logs)
- **MongoDB error?** Check connection string has correct password
- **CORS error?** Make sure FRONTEND_URL is set correctly

### Frontend Issues:
- **API not working?** Check VITE_API_URL has correct backend URL
- **404 errors?** Vercel should handle this automatically with vercel.json

### Need Help?
- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/docs
- Check deployment logs in both dashboards

---

## 📝 Quick Reference

**Backend Environment Variables (Render):**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/...
JWT_SECRET=your-random-secret-key
JWT_EXPIRE=30d
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend Environment Variables (Vercel):**
```
VITE_API_URL=https://your-backend.onrender.com/api
```
