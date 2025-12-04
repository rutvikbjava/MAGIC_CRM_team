# 🔧 Quick Fix for MongoDB Connection Error

## The Problem

You're seeing this error:
```
❌ Error seeding database: MongooseServerSelectionError: connect ECONNREFUSED
```

This means MongoDB is not running on your computer.

---

## ⚡ Fastest Solution (5 Minutes)

### Use MongoDB Atlas (Free Cloud Database)

#### 1. Create Free Account
Go to: **https://www.mongodb.com/cloud/atlas/register**

#### 2. Create Cluster
- Click "Build a Database"
- Choose **"FREE"** tier (M0)
- Click "Create Cluster"
- Wait 3-5 minutes

#### 3. Create User
- Click "Database Access" → "Add New Database User"
- Username: `magicadmin`
- Password: Create one (e.g., `Magic2024!`)
- Click "Add User"

#### 4. Allow Access
- Click "Network Access" → "Add IP Address"
- Click "Allow Access from Anywhere"
- Click "Confirm"

#### 5. Get Connection String
- Click "Database" → "Connect" → "Connect your application"
- Copy the connection string
- It looks like: `mongodb+srv://magicadmin:<password>@cluster0.xxxxx.mongodb.net/...`

#### 6. Update Your .env File

Open `backend/.env` and replace the MONGODB_URI line:

```env
MONGODB_URI=mongodb+srv://magicadmin:Magic2024!@cluster0.xxxxx.mongodb.net/magic-incubation?retryWrites=true&w=majority
```

**Important:** Replace:
- `Magic2024!` with your actual password
- `cluster0.xxxxx` with your actual cluster address

#### 7. Try Again

```bash
npm run seed
```

Should now work! ✅

---

## 🎯 Complete Commands

```bash
# 1. Make sure you're in backend directory
cd backend

# 2. Update .env with your MongoDB Atlas connection string
# (Edit backend/.env file with the connection string from step 6 above)

# 3. Seed database
npm run seed

# 4. Start server
npm run dev
```

---

## ✅ Success Looks Like

```
✅ Connected to MongoDB
🗑️  Cleared existing data
👤 Created admin user
👤 Created guest user
🚀 Created 3 sample startups

✅ Database seeded successfully!
```

---

## 🆘 Still Not Working?

### Option A: Check Your Connection String

Make sure:
- ✅ Password is correct (no `<` or `>` brackets)
- ✅ Cluster address is correct
- ✅ Database name is at the end: `/magic-incubation`
- ✅ No spaces in the connection string

**Example of CORRECT format:**
```
mongodb+srv://magicadmin:MyPass123@cluster0.abc123.mongodb.net/magic-incubation?retryWrites=true&w=majority
```

### Option B: Install MongoDB Locally (Windows)

If you prefer local installation:

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install:** Run installer, choose "Complete"
3. **Start Service:**
   ```powershell
   net start MongoDB
   ```
4. **Keep .env as:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/magic-incubation
   ```
5. **Try again:**
   ```bash
   npm run seed
   ```

---

## 📚 More Help

See `backend/MONGODB_SETUP.md` for detailed instructions.

---

## 🎉 After It Works

Once you see "✅ Database seeded successfully":

```bash
# Start the backend
npm run dev
```

Then visit: **http://localhost:5000/health**

Should see:
```json
{"status":"OK","timestamp":"...","uptime":123}
```

**Login credentials:**
- Admin: `admin` / `magic2024`
- Guest: `guest` / `guest123`

---

**That's it! Your backend is ready! 🚀**
