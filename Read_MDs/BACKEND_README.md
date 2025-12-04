# 🎯 MAGIC Backend - Complete Guide

## 📖 Overview

This is the complete backend implementation for the MAGIC Startup Incubation Management System. It provides a robust REST API built with Node.js, Express, and MongoDB.

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)

### Automated Setup (Recommended)

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

### Manual Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/magic-incubation

# 5. Seed database
npm run seed

# 6. Start server
npm run dev
```

Server runs on: **http://localhost:5000**

---

## 📁 What's Included

```
backend/
├── 📂 models/              # Database models (6 models)
├── 📂 routes/              # API routes (8 route files)
├── 📂 middleware/          # Custom middleware (3 files)
├── 📂 utils/               # Utilities (validators, email, logger)
├── 📂 scripts/             # Database seeding
├── 📄 server.js            # Main application
├── 📄 package.json         # Dependencies
├── 📄 .env.example         # Environment template
├── 📄 Dockerfile           # Docker configuration
├── 📄 docker-compose.yml   # Docker Compose
├── 📄 README.md            # This file
└── 📄 API_REFERENCE.md     # Complete API docs

frontend/
├── 📂 src/utils/
│   └── 📄 api.js           # API client
├── 📄 .env.example         # Frontend env template
└── 📄 BACKEND_INTEGRATION_GUIDE.md

docs/
├── 📄 BACKEND_COMPLETE.md  # Feature summary
└── 📄 DEPLOYMENT_GUIDE.md  # Deployment instructions
```

---

## 🔑 Default Credentials

After running `npm run seed`:

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | admin    | magic2024  |
| Guest | guest    | guest123   |

**⚠️ Change these in production!**

---

## 🌐 API Endpoints

### Quick Test

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"magic2024"}'

# Get startups (replace TOKEN with your JWT)
curl http://localhost:5000/api/startups \
  -H "Authorization: Bearer TOKEN"
```

### Endpoint Summary

| Category | Endpoints | Description |
|----------|-----------|-------------|
| Auth | 3 | Login, get user, change password |
| Startups | 8 | CRUD, search, upload, stats |
| SMC | 4 | Schedule, complete, manage |
| One-on-One | 4 | Sessions, feedback, tracking |
| Guests | 4 | User management |
| Settings | 3 | Configuration |
| Landing Page | 2 | Content management |
| Achievements | 2 | Add/remove achievements |

**Total: 30+ endpoints**

See [API_REFERENCE.md](backend/API_REFERENCE.md) for complete documentation.

---

## 🔧 Configuration

### Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/magic-incubation

# Security
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🗄️ Database Models

### 1. User
- Admin and guest users
- Password hashing
- Role-based access

### 2. Startup
- Complete startup information
- Auto-generated MAGIC codes
- Pitch and mentorship history
- Achievements tracking
- Document uploads

### 3. SMCSchedule
- Pitch session scheduling
- Time slot management
- Feedback tracking

### 4. OneOnOneSession
- Mentorship sessions
- Progress monitoring

### 5. Settings
- Dynamic configuration
- Key-value storage

### 6. LandingPage
- Dynamic content management

---

## 🔐 Security Features

✅ JWT authentication  
✅ Password hashing (bcrypt)  
✅ Role-based access control  
✅ Rate limiting (100 req/15min)  
✅ Input validation  
✅ CORS protection  
✅ Helmet security headers  
✅ File upload restrictions  
✅ SQL injection prevention  
✅ XSS protection  

---

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
cd backend

# Create .env file
cp .env.example .env

# Start services
docker-compose up -d

# Seed database
docker-compose exec backend npm run seed

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📊 Development Commands

```bash
# Install dependencies
npm install

# Development (with auto-reload)
npm run dev

# Production
npm start

# Seed database
npm run seed

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f
```

---

## 🧪 Testing the API

### Using curl

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"magic2024"}'

# Save the token from response
TOKEN="your-jwt-token-here"

# Get all startups
curl http://localhost:5000/api/startups \
  -H "Authorization: Bearer $TOKEN"

# Create startup
curl -X POST http://localhost:5000/api/startups \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Startup",
    "email": "test@startup.com",
    "mobile": "+91 9876543210",
    "city": "Aurangabad",
    "sector": "Technology",
    "stageOfIdea": "MVP Ready",
    "problemSolving": "Test problem",
    "solution": "Test solution",
    "teamSize": "5",
    "founderName": "John Doe",
    "founderAge": "30",
    "founderGender": "Male",
    "college": "MIT",
    "address": "Test Address"
  }'
```

### Using Postman

1. Import the API collection (create from API_REFERENCE.md)
2. Set environment variable: `baseUrl = http://localhost:5000/api`
3. Login to get token
4. Set token in Authorization header
5. Test endpoints

---

## 🔄 Frontend Integration

### 1. Install API Client

The API client is already created at `src/utils/api.js`

### 2. Configure Frontend

```bash
# In project root
cp .env.example .env

# Edit .env
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 3. Use in Components

```javascript
import { api } from './utils/api';

// Login
const { token, user } = await api.login('admin', 'magic2024');

// Get startups
const startups = await api.getStartups();

// Create startup
const newStartup = await api.createStartup(data);
```

See [BACKEND_INTEGRATION_GUIDE.md](BACKEND_INTEGRATION_GUIDE.md) for complete integration guide.

---

## 🚀 Deployment

### Supported Platforms

- ✅ Heroku
- ✅ Railway
- ✅ DigitalOcean App Platform
- ✅ AWS (EC2 + MongoDB Atlas)
- ✅ Vercel (Frontend) + Railway (Backend)
- ✅ Docker (Any platform)

### Quick Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create project
railway init

# Add MongoDB
railway add mongodb

# Deploy
railway up
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](backend/README.md) | Backend quick start |
| [API_REFERENCE.md](backend/API_REFERENCE.md) | Complete API documentation |
| [BACKEND_COMPLETE.md](BACKEND_COMPLETE.md) | Feature summary |
| [BACKEND_INTEGRATION_GUIDE.md](BACKEND_INTEGRATION_GUIDE.md) | Frontend integration |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Deployment instructions |

---

## 🆘 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
mongosh

# If not installed, install MongoDB or use MongoDB Atlas
# Update MONGODB_URI in .env
```

### Port Already in Use

```bash
# Change PORT in .env
PORT=5001
```

### CORS Errors

```bash
# Update CORS_ORIGIN in backend .env
CORS_ORIGIN=http://localhost:5173

# Restart backend
npm run dev
```

### Authentication Errors

```bash
# Clear browser localStorage
# Re-login to get new token
```

---

## 📈 Performance Tips

1. **Use MongoDB Atlas** for production (free tier available)
2. **Enable compression** (already configured)
3. **Use Redis** for caching (optional enhancement)
4. **Deploy close to users** (choose appropriate region)
5. **Monitor with PM2** in production

---

## 🔒 Production Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET (use `openssl rand -base64 32`)
- [ ] Use production MongoDB (MongoDB Atlas recommended)
- [ ] Set NODE_ENV=production
- [ ] Configure CORS with specific origin
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure automated backups
- [ ] Test all endpoints
- [ ] Update documentation

---

## 🎯 Next Steps

### 1. Setup Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

### 2. Test API
- Visit http://localhost:5000/health
- Test login endpoint
- Verify database connection

### 3. Integrate Frontend
- Update frontend to use API
- Replace localStorage calls
- Test integration

### 4. Deploy
- Choose platform
- Follow deployment guide
- Configure production environment

---

## 💡 Tips

- **Development**: Use `npm run dev` for auto-reload
- **Debugging**: Check logs in `backend/logs/`
- **Database**: Use MongoDB Compass for GUI
- **API Testing**: Use Postman or Thunder Client
- **Monitoring**: Use PM2 in production

---

## 🤝 Support

For issues or questions:

1. Check [API_REFERENCE.md](backend/API_REFERENCE.md)
2. Review [BACKEND_INTEGRATION_GUIDE.md](BACKEND_INTEGRATION_GUIDE.md)
3. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
4. Check troubleshooting section above

---

## 📝 Summary

You now have:

✅ Complete REST API (30+ endpoints)  
✅ MongoDB database with 6 models  
✅ JWT authentication & authorization  
✅ File upload support  
✅ Email notifications (optional)  
✅ Comprehensive security  
✅ Docker support  
✅ Complete documentation  
✅ Multiple deployment options  
✅ Frontend API client  
✅ Migration guides  

**Everything you need to run a production-ready backend!**

---

## 🎉 Ready to Go!

Your MAGIC backend is complete and ready to power your incubation management system.

**Start the backend:**
```bash
cd backend
npm run dev
```

**Start the frontend:**
```bash
npm run dev
```

**Happy coding! 🚀**
