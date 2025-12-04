# Complete Deployment Guide

This guide covers deploying both frontend and backend of the MAGIC Incubation System.

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB 6+ installed (or MongoDB Atlas account)
- Git installed
- Domain name (optional, for production)

---

## 🚀 Local Development Setup

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/magic-incubation
# JWT_SECRET=your-secret-key-here

# Seed database
npm run seed

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
# In project root
npm install

# Create .env file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
cd backend

# Create .env file with production values
cat > .env << EOF
JWT_SECRET=$(openssl rand -base64 32)
CORS_ORIGIN=https://your-domain.com
EOF

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f

# Seed database
docker-compose exec backend npm run seed

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build backend image
cd backend
docker build -t magic-backend .

# Run MongoDB
docker run -d --name magic-mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:6

# Run backend
docker run -d --name magic-backend \
  -p 5000:5000 \
  --link magic-mongodb:mongodb \
  -e MONGODB_URI=mongodb://mongodb:27017/magic-incubation \
  -e JWT_SECRET=your-secret-key \
  magic-backend
```

---

## ☁️ Cloud Deployment Options

### Option 1: Heroku

#### Backend Deployment

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create magic-backend

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Seed database
heroku run npm run seed

# View logs
heroku logs --tail
```

#### Frontend Deployment

```bash
# Build frontend
npm run build

# Deploy to Heroku (with static buildpack)
heroku create magic-frontend
heroku buildpacks:set heroku/nodejs
heroku config:set VITE_API_URL=https://magic-backend.herokuapp.com/api
git push heroku main
```

---

### Option 2: Railway

#### Backend

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add MongoDB service: "New" → "Database" → "MongoDB"
5. Set environment variables:
   ```
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   MONGODB_URI=${{MongoDB.MONGO_URL}}
   ```
6. Deploy automatically on push

#### Frontend

1. Create new project on Railway
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set start command: `npm run preview`
5. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

---

### Option 3: DigitalOcean App Platform

#### Backend

1. Create new app on DigitalOcean
2. Connect GitHub repository
3. Select backend directory
4. Add MongoDB database
5. Configure environment variables
6. Deploy

#### Frontend

1. Create new static site
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variables

---

### Option 4: AWS (EC2 + MongoDB Atlas)

#### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get connection string

#### EC2 Setup

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/your-repo/magic-system.git
cd magic-system/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add your MongoDB Atlas connection string and other variables

# Seed database
npm run seed

# Start with PM2
pm2 start server.js --name magic-backend
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/magic

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/magic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 5: Vercel (Frontend) + Railway (Backend)

#### Backend on Railway
Follow Railway instructions above

#### Frontend on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend.railway.app/api

# Deploy to production
vercel --prod
```

---

## 🔒 Production Security Checklist

### Backend

- [ ] Set strong JWT_SECRET (use `openssl rand -base64 32`)
- [ ] Use production MongoDB (MongoDB Atlas recommended)
- [ ] Set NODE_ENV=production
- [ ] Configure CORS with specific origin
- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting (already configured)
- [ ] Configure file upload limits
- [ ] Set up logging and monitoring
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement API versioning
- [ ] Set up error tracking (Sentry, etc.)

### Frontend

- [ ] Update API URL to production backend
- [ ] Enable production build optimizations
- [ ] Configure CDN for static assets
- [ ] Set up analytics (optional)
- [ ] Enable HTTPS
- [ ] Configure caching headers
- [ ] Minify and compress assets
- [ ] Set up error boundary

---

## 📊 Monitoring & Maintenance

### Backend Monitoring

```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs magic-backend

# Restart application
pm2 restart magic-backend

# Check status
pm2 status
```

### Database Backup

```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/magic-incubation" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/magic-incubation" /backup/20241202
```

### Log Rotation

```bash
# Install logrotate
sudo apt-get install logrotate

# Create config
sudo nano /etc/logrotate.d/magic

# Add:
/path/to/backend/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
}
```

---

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🧪 Testing Deployment

### Backend Health Check

```bash
curl https://your-backend-url/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-12-02T10:00:00.000Z",
  "uptime": 12345
}
```

### API Test

```bash
# Login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"magic2024"}'

# Get startups (with token)
curl https://your-backend-url/api/startups \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Frontend Test

1. Open browser to your frontend URL
2. Test login functionality
3. Verify data loads from backend
4. Test CRUD operations
5. Check console for errors

---

## 🆘 Troubleshooting

### Backend won't start

```bash
# Check logs
pm2 logs magic-backend

# Common issues:
# - MongoDB connection failed: Check MONGODB_URI
# - Port already in use: Change PORT in .env
# - Missing dependencies: Run npm install
```

### CORS errors

```bash
# Update backend .env
CORS_ORIGIN=https://your-frontend-url.com

# Restart backend
pm2 restart magic-backend
```

### Database connection issues

```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/magic-incubation"

# For MongoDB Atlas, check:
# - IP whitelist
# - Database user credentials
# - Connection string format
```

### Frontend can't connect to backend

1. Check VITE_API_URL in frontend .env
2. Verify backend is running
3. Check CORS configuration
4. Test API endpoint directly with curl

---

## 📱 Mobile/PWA Deployment (Optional)

### Convert to PWA

1. Add manifest.json
2. Add service worker
3. Configure caching strategy
4. Test with Lighthouse

### Deploy as Mobile App

Use Capacitor or React Native Web to convert to native apps.

---

## 📈 Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx, AWS ALB)
- Deploy multiple backend instances
- Use Redis for session management
- Implement database replication

### Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Implement caching (Redis)
- Optimize database queries
- Use connection pooling

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with initial data
- [ ] Admin login working
- [ ] All API endpoints tested
- [ ] HTTPS enabled
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Documentation updated
- [ ] Team trained on system

---

## 🎉 Success!

Your MAGIC Incubation System is now deployed and ready to use!

**Default Login:**
- Username: `admin`
- Password: `magic2024`

**Remember to change the default password immediately!**
