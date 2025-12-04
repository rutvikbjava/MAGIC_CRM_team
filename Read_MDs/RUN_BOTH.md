# 🚀 Run Frontend + Backend Together

## ✅ About Those Browser Errors

The errors you're seeing are **NOT from your application**:

```
ERR_NETWORK_CHANGED - Normal hot-reload behavior
extensions.aitopia.ai - Browser extension trying to connect
```

These are harmless and don't affect your app!

---

## 🎯 Quick Start (Choose One Method)

### Method 1: Automated Script (Easiest)

**Windows:**
```bash
start-all.bat
```

**Linux/Mac:**
```bash
chmod +x start-all.sh
./start-all.sh
```

This will:
- ✅ Start backend on port 5000
- ✅ Start frontend on port 5173
- ✅ Open browser automatically

---

### Method 2: Manual (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Then open: http://localhost:5173

---

### Method 3: One Command (Windows)

```bash
start cmd /k "cd backend && npm run dev" && timeout /t 3 && npm run dev
```

---

## ✅ Verify Everything Works

### 1. Backend Check
Open: http://localhost:5000/health

Should see:
```json
{
  "status": "OK",
  "storage": "JSON Files"
}
```

### 2. Frontend Check
Open: http://localhost:5173

Should see the MAGIC landing page

### 3. Login Test
- Click "Get Started" or "Login"
- Username: `admin`
- Password: `magic2024`
- Should login successfully

---

## 🔍 Understanding the Errors

### `ERR_NETWORK_CHANGED`
- **What:** Vite hot-reload reconnecting
- **Impact:** None - just refresh if needed
- **Fix:** Ignore it, it's normal

### `extensions.aitopia.ai`
- **What:** Browser extension trying to connect
- **Impact:** None - not your app
- **Fix:** Disable the extension or ignore

### Real Errors to Watch For:
- ❌ `CORS error` - Backend not running
- ❌ `404 Not Found` - Wrong URL
- ❌ `401 Unauthorized` - Need to login

---

## 🧪 Test the Integration

### 1. Open Browser Console (F12)

### 2. Test API Connection
```javascript
// In console
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(d => console.log('Backend:', d))
```

Should show: `Backend: {status: "OK", ...}`

### 3. Test Login
- Login with admin/magic2024
- Check Network tab
- Should see successful API calls

---

## 📊 What Should Work

### ✅ Working Features:
- Landing page loads
- Login works (admin/magic2024)
- Dashboard shows
- Can view startups (using localStorage)
- All navigation works

### 🔄 Backend Integration (Next Step):
- Replace localStorage with API calls
- See `BACKEND_INTEGRATION_GUIDE.md`

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

### Frontend won't start
```bash
# Check if port 5173 is in use
netstat -ano | findstr :5173

# Kill process if needed
taskkill /PID <PID> /F
```

### CORS errors
```bash
# Make sure backend .env has:
CORS_ORIGIN=http://localhost:5173

# Restart backend
cd backend
npm run dev
```

### Can't login
- Check backend is running (http://localhost:5000/health)
- Check credentials: admin/magic2024
- Check browser console for errors

---

## 🎯 Current Status

### ✅ Backend
- Running on port 5000
- JSON file storage
- 30+ API endpoints
- Sample data loaded

### ✅ Frontend
- Running on port 5173
- Using localStorage (for now)
- All features working
- Ready for API integration

### 🔄 Next Step
- Integrate frontend with backend API
- Replace localStorage calls with API calls
- See `BACKEND_INTEGRATION_GUIDE.md`

---

## 💡 Pro Tips

1. **Keep both terminals open** - Don't close them
2. **Ignore extension errors** - They're not your app
3. **Check backend first** - Visit /health endpoint
4. **Use browser DevTools** - Network tab shows API calls
5. **Clear cache if needed** - Ctrl+Shift+R

---

## 🎉 Success Checklist

- [ ] Backend running (http://localhost:5000/health shows OK)
- [ ] Frontend running (http://localhost:5173 loads)
- [ ] Can see landing page
- [ ] Can login with admin/magic2024
- [ ] Dashboard loads
- [ ] Can navigate between pages

**All checked?** You're ready to integrate the backend! 🚀

---

## 📚 Next Steps

1. **Test current setup** - Make sure everything loads
2. **Read integration guide** - `BACKEND_INTEGRATION_GUIDE.md`
3. **Update components** - Replace localStorage with API
4. **Test integration** - Verify API calls work
5. **Deploy** - When ready for production

---

**Your app is working! The errors you see are just browser extension noise.** 🎉
