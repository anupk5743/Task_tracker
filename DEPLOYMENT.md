# Deployment Guide

This guide will help you deploy both the backend and frontend of the Task Tracker application.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier available) or local MongoDB
- Render account (for backend) - https://render.com
- Vercel account (for frontend) - https://vercel.com (or Netlify)

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
6. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`)

## Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `anupk5743/Task_tracker`
4. Configure the service:
   - **Name**: `task-tracker-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secret string (e.g., generate with `openssl rand -base64 32`)
   - `JWT_EXPIRE`: `30d`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: (We'll add this after deploying frontend)
   - `PORT`: `10000` (Render uses this port)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://task-tracker-backend.onrender.com`)

### Option B: Using Render.yaml (Recommended)

1. The `render.yaml` file is already configured
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect and use `render.yaml`
5. Add the same environment variables as above

## Step 3: Deploy Frontend to Vercel

### Using Vercel Dashboard

1. Go to https://vercel.com and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository: `anupk5743/Task_tracker`
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL + `/api` (e.g., `https://task-tracker-backend.onrender.com/api`)
6. Click "Deploy"
7. Wait for deployment to complete
8. Copy your frontend URL (e.g., `https://task-tracker.vercel.app`)

### Alternative: Deploy to Netlify

1. Go to https://netlify.com and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL + `/api`
6. Click "Deploy site"

## Step 4: Update Backend CORS

After deploying the frontend, update the backend environment variable:

1. Go to Render Dashboard → Your Backend Service → Environment
2. Add/Update: `FRONTEND_URL`: Your frontend URL (e.g., `https://task-tracker.vercel.app`)
3. Redeploy the backend service

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Try registering a new user
3. Create a task
4. Verify everything works

## Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=10000
```

### Frontend (Vercel/Netlify)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Troubleshooting

### Backend Issues

- **MongoDB Connection Error**: Check your MongoDB Atlas IP whitelist and connection string
- **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in backend environment variables
- **Port Issues**: Render uses port 10000, make sure your code uses `process.env.PORT`

### Frontend Issues

- **API Not Found**: Check that `VITE_API_URL` is set correctly
- **Build Errors**: Make sure all dependencies are in `package.json`
- **404 on Refresh**: This is handled by the `vercel.json` or `netlify.toml` redirects

## Quick Deploy Commands (Alternative)

### Using Render CLI
```bash
npm install -g render-cli
render login
render deploy
```

### Using Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel
```

## Support

If you encounter any issues, check:
- Render logs: Dashboard → Your Service → Logs
- Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
- Browser console for frontend errors
- Network tab for API errors
