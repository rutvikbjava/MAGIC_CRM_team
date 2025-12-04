# 🚀 MAGIC Backend - Quick Start

## ✅ Status: Ready to Use!

Your backend is **complete** and **seeded** with sample data. No database needed!

---

## 🎯 Start in 3 Commands

```bash
# 1. Go to backend
cd backend

# 2. Start server
npm run dev

# 3. Test it works
# Open browser: http://localhost:5000/health
```

**That's it!** Your backend is running! 🎉

---

## 🔑 Login

| Username | Password   | Role  |
|----------|------------|-------|
| admin    | magic2024  | Admin |
| guest    | guest123   | Guest |

---

## 🧪 Quick Test

### Health Check
```
http://localhost:5000/health
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"magic2024\"}"
```

### Get Startups
```bash
curl http://localhost:5000/api/startups \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 What You Have

- ✅ **30+ API endpoints** working
- ✅ **3 sample startups** loaded
- ✅ **2 users** (admin + guest)
- ✅ **JSON file storage** (no database!)
- ✅ **Full authentication** & security
- ✅ **Complete documentation**

---

## 🔌 Connect Frontend

```bash
# In project root (not backend folder)
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
```

Then use the API client in your components:

```javascript
import { api } from './utils/api';

// Login
const { token, user } = await api.login('admin', 'magic2024');

// Get startups
const startups = await api.getStartups();
```

---

## 📁 Data Location

All data is in JSON files:

```
backend/data/
├── users.json          # 2 users ✅
├── startups.json       # 3 startups ✅
├── smc-schedules.json
├── one-on-one-sessions.json
├── settings.json
└── landing-page.json
```

---

## 🔧 Useful Commands

```bash
# Start server
npm run dev

# Reset data
npm run seed

# View data
cat data/startups.json

# Backup data
cp -r data data-backup
```

---

## 📚 Documentation

- `BACKEND_NO_DATABASE.md` - Complete guide
- `backend/README_JSON.md` - JSON storage details
- `backend/API_REFERENCE.md` - All endpoints
- `BACKEND_INTEGRATION_GUIDE.md` - Frontend integration

---

## 🆘 Problems?

### Port in use?
```bash
# Change port in backend/.env
PORT=5001
```

### CORS errors?
```bash
# Update backend/.env
CORS_ORIGIN=http://localhost:5173
```

### Reset data?
```bash
npm run seed
```

---

## 🎉 You're Ready!

**Backend:** http://localhost:5000  
**Health:** http://localhost:5000/health  
**Login:** admin / magic2024  

Start building! 🚀
