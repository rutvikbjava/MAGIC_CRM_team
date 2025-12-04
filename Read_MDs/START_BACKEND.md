# 🚀 Start Here - MAGIC Backend

## ⚡ Quick Start (Choose One)

### Option 1: Automated Setup (Easiest) ⭐

**Windows:**
```bash
cd backend
setup.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

This will:
- ✅ Install all dependencies
- ✅ Create .env file
- ✅ Generate secure JWT secret
- ✅ Create necessary directories
- ✅ Seed database with sample data
- ✅ Show you next steps

---

### Option 2: Manual Setup (5 Minutes)

```bash
# 1. Go to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env (set your MongoDB URI)
# Windows: notepad .env
# Mac/Linux: nano .env

# 5. Seed database
npm run seed

# 6. Start server
npm run dev
```

---

### Option 3: Docker (For Production)

```bash
cd backend

# Create .env
cp .env.example .env

# Start everything
docker-compose up -d

# Seed database
docker-compose exec backend npm run seed
```

---

## ✅ Verify Installation

### 1. Check Health
Open browser: http://localhost:5000/health

Should see:
```json
{
  "status": "OK",
  "timestamp": "2024-12-02T10:00:00.000Z",
  "uptime": 123
}
```

### 2. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"magic2024\"}"
```

Should get a token back!

---

## 🎯 What You Have Now

### Backend API
- ✅ Running on http://localhost:5000
- ✅ 30+ API endpoints ready
- ✅ MongoDB database connected
- ✅ Sample data loaded
- ✅ Admin user created (admin/magic2024)

### Documentation
- 📄 `backend/README.md` - Backend guide
- 📄 `backend/API_REFERENCE.md` - All endpoints
- 📄 `BACKEND_INTEGRATION_GUIDE.md` - Connect frontend
- 📄 `DEPLOYMENT_GUIDE.md` - Deploy to production
- 📄 `BACKEND_COMPLETE.md` - Feature summary

---

## 🔑 Login Credentials

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | admin    | magic2024  |
| Guest | guest    | guest123   |

---

## 📱 Next Steps

### Step 1: Test the API ✅

Use Postman, curl, or browser to test endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"magic2024"}'

# Get startups (use token from login)
curl http://localhost:5000/api/startups \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Step 2: Connect Frontend 🔌

1. Create `.env` in project root:
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

2. Update your components to use the API client:
```javascript
import { api } from './utils/api';

// Login
const { token, user } = await api.login('admin', 'magic2024');

// Get startups
const startups = await api.getStartups();
```

3. See `BACKEND_INTEGRATION_GUIDE.md` for detailed instructions

### Step 3: Deploy 🚀

When ready for production:

1. Choose a platform (Heroku, Railway, DigitalOcean, AWS)
2. Follow `DEPLOYMENT_GUIDE.md`
3. Update frontend .env with production API URL
4. Deploy!

---

## 📚 Learn More

### Essential Reading

1. **Start Here** ← You are here!
2. `BACKEND_README.md` - Complete backend guide
3. `backend/API_REFERENCE.md` - API documentation
4. `BACKEND_INTEGRATION_GUIDE.md` - Connect to frontend

### When You Need It

- `DEPLOYMENT_GUIDE.md` - Deploy to production
- `BACKEND_COMPLETE.md` - All features explained
- `backend/README.md` - Backend-specific docs

---

## 🆘 Common Issues

### "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not installed, use MongoDB Atlas (free):
# 1. Go to mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Get connection string
# 4. Update MONGODB_URI in .env
```

### "Port 5000 already in use"

**Solution:**
```bash
# Change port in backend/.env
PORT=5001

# Restart server
npm run dev
```

### "CORS error in frontend"

**Solution:**
```bash
# Update backend/.env
CORS_ORIGIN=http://localhost:5173

# Restart backend
cd backend
npm run dev
```

---

## 💡 Pro Tips

### Development
- Use `npm run dev` for auto-reload
- Check logs in `backend/logs/`
- Use MongoDB Compass for database GUI
- Use Postman for API testing

### Production
- Use MongoDB Atlas (free tier available)
- Set strong JWT_SECRET
- Enable HTTPS
- Use PM2 for process management
- Set up monitoring

---

## 🎯 Quick Commands Reference

```bash
# Backend
cd backend
npm run dev          # Start development server
npm start            # Start production server
npm run seed         # Seed database

# Docker
docker-compose up -d      # Start services
docker-compose down       # Stop services
docker-compose logs -f    # View logs

# Frontend
npm run dev          # Start frontend
npm run build        # Build for production
```

---

## 📊 Project Structure

```
magic-system/
├── backend/                    # Backend API
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── middleware/            # Auth, validation
│   ├── utils/                 # Helpers
│   ├── server.js              # Main app
│   └── package.json
│
├── src/                       # Frontend
│   ├── components/            # React components
│   ├── utils/
│   │   ├── api.js            # API client ⭐
│   │   └── storage.js        # localStorage (legacy)
│   └── App.jsx
│
├── docs/                      # Documentation
│   ├── BACKEND_README.md
│   ├── API_REFERENCE.md
│   ├── BACKEND_INTEGRATION_GUIDE.md
│   └── DEPLOYMENT_GUIDE.md
│
└── START_BACKEND.md          # This file
```

---

## ✨ What's Included

### Backend Features
- ✅ REST API with 30+ endpoints
- ✅ JWT authentication
- ✅ Role-based access (admin/guest)
- ✅ File uploads
- ✅ Email notifications (optional)
- ✅ Rate limiting
- ✅ Input validation
- ✅ Security headers
- ✅ Error handling
- ✅ Logging

### Database Models
- ✅ Users (admin/guest)
- ✅ Startups (with history)
- ✅ SMC Schedules
- ✅ One-on-One Sessions
- ✅ Settings
- ✅ Landing Page

### Documentation
- ✅ API reference
- ✅ Integration guide
- ✅ Deployment guide
- ✅ Setup scripts
- ✅ Docker config

---

## 🎉 You're All Set!

Your backend is ready to power the MAGIC Incubation Management System.

### Current Status:
- ✅ Backend API running
- ✅ Database connected
- ✅ Sample data loaded
- ✅ Documentation ready

### Next Actions:
1. Test the API endpoints
2. Connect your frontend
3. Start building features
4. Deploy when ready

---

## 🚀 Let's Go!

**Start backend:**
```bash
cd backend
npm run dev
```

**Start frontend:**
```bash
npm run dev
```

**Visit:**
- Backend: http://localhost:5000/health
- Frontend: http://localhost:5173

---

## 📞 Need Help?

1. Check `BACKEND_README.md` for detailed guide
2. See `API_REFERENCE.md` for endpoint docs
3. Review `BACKEND_INTEGRATION_GUIDE.md` for frontend integration
4. Read `DEPLOYMENT_GUIDE.md` for deployment help

---

**Happy coding! 🎯**

The MAGIC backend is ready to transform your incubation management system!
