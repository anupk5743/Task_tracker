# ✅ Deployment Checklist

Use this checklist to ensure everything is deployed correctly.

## Pre-Deployment

- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created (FREE tier)
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] MongoDB connection string copied
- [ ] JWT secret key generated

## Backend Deployment (Render)

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created
- [ ] Root directory set to `Backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] JWT_EXPIRE = 30d
  - [ ] NODE_ENV = production
  - [ ] PORT = 10000
- [ ] Service deployed successfully
- [ ] Backend URL copied: `https://________________.onrender.com`
- [ ] Backend health check works (visit URL, should see API message)

## Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project created
- [ ] Root directory set to `frontend`
- [ ] Framework preset: Vite
- [ ] Environment variable added:
  - [ ] VITE_API_URL = `https://your-backend.onrender.com/api`
- [ ] Project deployed successfully
- [ ] Frontend URL copied: `https://________________.vercel.app`

## Post-Deployment

- [ ] FRONTEND_URL added to backend environment variables
- [ ] Backend redeployed with new FRONTEND_URL
- [ ] Frontend tested:
  - [ ] Can register new user
  - [ ] Can login
  - [ ] Can create task
  - [ ] Can update task
  - [ ] Can delete task
  - [ ] Can filter tasks
- [ ] Both URLs saved/bookmarked

## Your Hosting Links

**Backend:** _________________________________  
**Frontend:** _________________________________

---

## 🎯 Quick Links

- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
