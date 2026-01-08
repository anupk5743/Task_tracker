# 🔧 Troubleshooting Deployment Issues

## Problem: "Nothing shows up" or blank page

### Backend (Render)

**Check 1: Is the service deployed?**
- Go to Render Dashboard
- Check if service status is "Live" (green)
- If "Sleeping" or "Building", wait for it to finish

**Check 2: Test the backend URL directly**
- Visit: `https://your-backend-url.onrender.com`
- Should see: `{"message":"Task Tracker API is running"}`
- If you see this, backend is working!

**Check 3: Check deployment logs**
- Render Dashboard → Your Service → Logs
- Look for errors (red text)
- Common errors:
  - MongoDB connection failed → Check `MONGODB_URI`
  - Port error → Make sure `PORT=10000`
  - Build failed → Check if all dependencies are in `package.json`

**Check 4: Environment Variables**
Make sure these are set in Render:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel)

**Check 1: Is the project deployed?**
- Go to Vercel Dashboard
- Check if latest deployment shows "Ready" (green checkmark)
- If "Building" or "Error", check the logs

**Check 2: Check deployment logs**
- Vercel Dashboard → Your Project → Deployments
- Click on latest deployment → View Function Logs
- Look for build errors

**Check 3: Environment Variables**
Make sure this is set in Vercel:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```
(Replace with your actual Render backend URL)

**Check 4: Check browser console**
- Open your frontend URL
- Press F12 → Console tab
- Look for errors (red text)
- Common errors:
  - `Failed to fetch` → Backend URL might be wrong
  - `CORS error` → Backend CORS not configured
  - `404` → API endpoint not found

---

## Problem: "CORS Error" in browser console

**Solution:**
1. Go to Render Dashboard → Your Backend Service
2. Go to Environment tab
3. Add/Update: `FRONTEND_URL` = your actual Vercel frontend URL
4. Save and wait for redeploy (2-3 minutes)

**Example:**
```
FRONTEND_URL=https://task-tracker-abc123.vercel.app
```

---

## Problem: "MongoDB connection failed"

**Check 1: Connection String**
- Make sure `MONGODB_URI` in Render has correct password
- Format: `mongodb+srv://username:password@cluster.mongodb.net/...`
- Replace `<password>` with actual password

**Check 2: MongoDB Atlas Network Access**
- Go to MongoDB Atlas Dashboard
- Network Access → Make sure `0.0.0.0/0` is whitelisted
- Or add Render's IP addresses

**Check 3: Database User**
- Make sure database user exists in MongoDB Atlas
- Username and password must match connection string

---

## Problem: "Service is sleeping" (Render free tier)

**This is normal!** Free tier services sleep after 15 minutes of inactivity.

**Solutions:**
1. **Wait 30-60 seconds** - First request wakes up the service
2. **Upgrade to paid plan** - Services stay awake 24/7
3. **Use a ping service** - Keeps service awake (e.g., UptimeRobot)

---

## Problem: Frontend shows "Failed to load tasks"

**Check 1: Backend URL in Frontend**
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Make sure `VITE_API_URL` is: `https://your-backend.onrender.com/api`
- Note: Include `/api` at the end!

**Check 2: Backend is running**
- Visit backend URL directly
- Should see API message
- If sleeping, wait 30-60 seconds

**Check 3: CORS configuration**
- Make sure `FRONTEND_URL` is set in backend
- Redeploy backend after adding it

---

## Problem: "Build failed" errors

### Backend Build Failed (Render)

**Common causes:**
- Missing dependencies in `package.json`
- Wrong build command
- Node version mismatch

**Solution:**
1. Check Render logs for specific error
2. Make sure `package.json` has all dependencies
3. Build command should be: `npm install`
4. Start command should be: `npm start`

### Frontend Build Failed (Vercel)

**Common causes:**
- Missing environment variables
- Build errors in code
- Wrong framework preset

**Solution:**
1. Check Vercel build logs
2. Make sure Framework Preset is: `Vite`
3. Root Directory: `frontend`
4. Build Command: `npm run build`
5. Output Directory: `dist`

---

## Problem: "404 Not Found" on refresh (Frontend)

**This should be fixed automatically** by `vercel.json` configuration.

**If still happening:**
1. Check `frontend/vercel.json` exists
2. Make sure it has the rewrite rules
3. Redeploy frontend

---

## Quick Diagnostic Commands

### Test Backend API:
```bash
curl https://your-backend-url.onrender.com
```
Should return: `{"message":"Task Tracker API is running"}`

### Test Backend Health:
```bash
curl https://your-backend-url.onrender.com/api/auth/register
```
Should return an error (but not 404) - means API is working

### Check Frontend Build:
- Visit: `https://your-frontend-url.vercel.app`
- Open browser console (F12)
- Check for errors

---

## Still Having Issues?

1. **Check all logs** in both Render and Vercel dashboards
2. **Verify environment variables** are set correctly
3. **Make sure MongoDB Atlas** is accessible
4. **Test backend URL directly** in browser
5. **Check browser console** for frontend errors

**Common fixes:**
- Redeploy both services
- Double-check all environment variables
- Verify MongoDB connection string
- Clear browser cache and try again
