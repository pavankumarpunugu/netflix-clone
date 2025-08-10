# Render Deployment Guide for Netflix Clone

## Prerequisites
1. GitHub account
2. Render account (render.com)
3. Your Netflix clone code pushed to GitHub repository

## Step-by-Step Deployment Process

### 1. Prepare Your Repository
First, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Netflix clone"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/netflix-clone.git
git push -u origin main
```

### 2. Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `netflix-clone-db`
   - **Database**: `netflix_clone`
   - **User**: `netflix_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free (for development)
4. Click "Create Database"
5. **Save the connection details** - you'll need them later

### 3. Deploy Web Service

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

   **Basic Settings:**
   - **Name**: `netflix-clone`
   - **Environment**: `Node`
   - **Region**: Same as your database
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   
   **Build & Deploy:**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

   **Environment Variables:**
   Click "Advanced" and add:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Copy from your PostgreSQL database (External Database URL)

4. Click "Create Web Service"

### 4. Database Setup

After deployment, run database migrations:

1. Go to your web service in Render
2. Open the "Shell" tab
3. Run: `npm run db:push`

### 5. Verify Deployment

Your app will be available at: `https://netflix-clone-XXXX.onrender.com`

## Environment Variables Needed

Make sure these are set in your Render web service:

```
NODE_ENV=production
DATABASE_URL=postgresql://netflix_user:password@host:port/netflix_clone
PORT=10000
```

## Troubleshooting

**Build Fails:**
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility

**Database Connection Issues:**
- Ensure DATABASE_URL is correctly formatted
- Check that the database is running
- Verify network connectivity between services

**App Not Loading:**
- Check build logs for errors
- Ensure start command is correct: `npm start`
- Verify PORT environment variable

## Production Optimizations

1. **Database Connection Pooling**: Already configured with Neon serverless
2. **Static File Serving**: Handled by Express in production mode  
3. **Error Handling**: Comprehensive error handling implemented
4. **Build Optimization**: Vite build process optimizes assets

## Free Tier Limitations

**Render Free Tier:**
- Services sleep after 15 minutes of inactivity
- 750 hours/month usage limit
- Slower cold starts

**PostgreSQL Free Tier:**
- 1GB storage
- Expires after 90 days
- Limited connections

## Scaling Considerations

For production use, consider upgrading to paid plans for:
- Always-on services (no sleeping)
- More database storage and connections
- Better performance and reliability
- Custom domains with SSL

Your Netflix clone is now deployed and accessible worldwide! 🎉