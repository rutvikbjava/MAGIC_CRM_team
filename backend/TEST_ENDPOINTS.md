# 🧪 Test Your Backend Endpoints

## ✅ Working URLs

### 1. Root API Info
```
http://localhost:5000/api
```
**Shows:** All available endpoints and credentials

### 2. Health Check
```
http://localhost:5000/health
```
**Shows:** Server status and uptime

---

## 🔐 Test Authentication

### Login (Get Token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"magic2024\"}"
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "admin",
    "role": "admin",
    "email": "admin@magic.com"
  }
}
```

**Save the token!** You'll need it for other requests.

---

## 📊 Test Startups API

### Get All Startups
```bash
curl http://localhost:5000/api/startups \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Single Startup
```bash
curl http://localhost:5000/api/startups/STARTUP_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Statistics
```bash
curl http://localhost:5000/api/startups/stats/overview \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Startup
```bash
curl -X POST http://localhost:5000/api/startups \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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

---

## 🌐 Test in Browser

### Open These URLs Directly:

1. **API Info:**
   ```
   http://localhost:5000/api
   ```
   ✅ Should show all endpoints

2. **Health Check:**
   ```
   http://localhost:5000/health
   ```
   ✅ Should show server status

3. **Landing Page (Public):**
   ```
   http://localhost:5000/api/landing-page
   ```
   ✅ Should show landing page content

---

## 🧪 Test with Postman

### 1. Import Collection

Create a new Postman collection with these requests:

**Login:**
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
  ```json
  {
    "username": "admin",
    "password": "magic2024"
  }
  ```

**Get Startups:**
- Method: GET
- URL: `http://localhost:5000/api/startups`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN`

### 2. Set Environment Variable

After login, save the token:
1. Go to Tests tab in Login request
2. Add:
   ```javascript
   pm.environment.set("token", pm.response.json().token);
   ```
3. Use `{{token}}` in Authorization header

---

## 📱 Test with Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Test endpoints same as Postman

---

## ✅ Quick Verification Checklist

- [ ] `/api` shows endpoint list
- [ ] `/health` shows server status
- [ ] Login returns token
- [ ] Get startups works with token
- [ ] Can see 3 sample startups
- [ ] Statistics endpoint works

---

## 🎯 Expected Results

### `/api` Response:
```json
{
  "message": "Welcome to MAGIC Backend API",
  "version": "1.0.0",
  "storage": "JSON Files",
  "endpoints": { ... },
  "credentials": {
    "admin": { "username": "admin", "password": "magic2024" },
    "guest": { "username": "guest", "password": "guest123" }
  }
}
```

### `/health` Response:
```json
{
  "status": "OK",
  "timestamp": "2024-12-02T...",
  "uptime": 123.456,
  "storage": "JSON Files"
}
```

### Login Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "mioe8b5l1t0pkfn7e2a",
    "username": "admin",
    "role": "admin",
    "email": "admin@magic.com"
  }
}
```

### Get Startups Response:
```json
[
  {
    "id": "...",
    "magicCode": "MAGIC001",
    "companyName": "TechVenture Solutions",
    "stage": "S1",
    "status": "Active",
    ...
  },
  ...
]
```

---

## 🆘 Troubleshooting

### "Route not found"
- ✅ This is normal for `/api` alone
- ✅ Use specific endpoints like `/api/startups`

### "Not authorized"
- ❌ Missing or invalid token
- ✅ Login first to get token
- ✅ Add `Authorization: Bearer TOKEN` header

### "CORS error"
- ❌ Frontend and backend on different origins
- ✅ Update `CORS_ORIGIN` in backend/.env
- ✅ Restart backend server

### "Cannot GET /api/startups"
- ❌ Server not running
- ✅ Run `npm run dev` in backend folder

---

## 💡 Pro Tips

1. **Save Token:** After login, save the token for other requests
2. **Use Postman:** Easier than curl for testing
3. **Check Logs:** Server logs show all requests
4. **View Data:** Check `backend/data/*.json` files
5. **Reset Data:** Run `npm run seed` to reset

---

## 🎉 All Working?

If you can:
- ✅ See API info at `/api`
- ✅ Login and get token
- ✅ Get startups with token
- ✅ See 3 sample startups

**Your backend is working perfectly!** 🚀

Now connect your frontend and start building!
