# 🔍 How to Find Your Actual Hosting URLs

The URLs `https://your-service-name.onrender.com` and `https://your-project-name.vercel.app` are just **examples**. You need to find YOUR actual URLs!

---

## 📍 Find Your Backend URL (Render)

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click on your service** (the one you created for the backend)
3. **Look at the top of the page** - you'll see:
   ```
   https://your-actual-service-name.onrender.com
   ```
4. **Copy this URL** - this is your real backend URL!

**If you don't see a service:**
- You haven't deployed yet
- Go to: https://render.com → Sign up → Create Web Service
- Follow the deployment steps

---

## 📍 Find Your Frontend URL (Vercel)

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click on your project** (the one you created for the frontend)
3. **Look at the top** - you'll see:
   ```
   https://your-actual-project-name.vercel.app
   ```
4. **Or click on the latest deployment** - the URL is shown there
5. **Copy this URL** - this is your real frontend URL!

**If you don't see a project:**
- You haven't deployed yet
- Go to: https://vercel.com → Sign up → Add New Project
- Follow the deployment steps

---

## ✅ Test Your URLs

### Test Backend:
1. Open your backend URL in browser (e.g., `https://task-tracker-backend-xxxx.onrender.com`)
2. You should see: `{"message":"Task Tracker API is running"}`
3. If you see this, backend is working! ✅

### Test Frontend:
1. Open your frontend URL in browser (e.g., `https://task-tracker-xxxx.vercel.app`)
2. You should see the Task Tracker login page
3. If you see this, frontend is working! ✅

---

## 🚨 Common Issues

### "Nothing shows up" or "404 Error"

**Backend Issues:**
- Service might not be deployed yet
- Check Render logs: Dashboard → Your Service → Logs
- Make sure environment variables are set correctly
- Service might be sleeping (free tier spins down after inactivity)

**Frontend Issues:**
- Project might not be deployed yet
- Check Vercel logs: Dashboard → Your Project → Deployments → View Logs
- Make sure `VITE_API_URL` environment variable is set
- Check browser console for errors (F12)

### "Service Unavailable" or "503 Error"

**Render (Backend):**
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier
- Consider upgrading for always-on service

### "CORS Error"

- Make sure `FRONTEND_URL` is set in backend environment variables
- Make sure it matches your actual Vercel frontend URL exactly
- Redeploy backend after adding `FRONTEND_URL`

---

## 📝 Quick Checklist

- [ ] I've logged into Render dashboard
- [ ] I can see my backend service
- [ ] I've copied my actual backend URL
- [ ] Backend URL shows API message when I visit it
- [ ] I've logged into Vercel dashboard
- [ ] I can see my frontend project
- [ ] I've copied my actual frontend URL
- [ ] Frontend URL shows the app when I visit it
- [ ] I've set `VITE_API_URL` in Vercel to my backend URL + `/api`
- [ ] I've set `FRONTEND_URL` in Render to my frontend URL

---

## 🆘 Still Can't Find Your URLs?

**If you haven't deployed yet:**
1. Follow the steps in `START_HERE.md`
2. Or see `QUICK_DEPLOY.md` for detailed instructions

**If you have deployed but can't find URLs:**
1. Check your email - both Render and Vercel send deployment notifications with URLs
2. Check your browser history - you might have visited the URLs before
3. Check GitHub - some deployment services add URLs to repository descriptions

---

## 💡 Pro Tip

**Save your URLs somewhere safe:**
- Backend: `https://________________.onrender.com`
- Frontend: `https://________________.vercel.app`

You'll need these URLs to configure environment variables!
