# MongoDB Setup Guide

## ❌ Error: Cannot Connect to MongoDB

You're seeing this error because MongoDB is not running on your computer.

```
MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

## ✅ Solution: Choose One Option

---

## Option 1: MongoDB Atlas (Cloud) - RECOMMENDED ⭐

**No installation needed! Free tier available.**

### Step 1: Create Free Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Choose "Free Shared" tier (M0)

### Step 2: Create Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select a cloud provider and region (closest to you)
4. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. Click "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `magicadmin`
5. Password: Create a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Allow Network Access

1. Click "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in left menu
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://magicadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update .env File

1. Open `backend/.env`
2. Replace the MONGODB_URI line with your connection string
3. Replace `<password>` with your actual password
4. Add database name at the end:

```env
MONGODB_URI=mongodb+srv://magicadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/magic-incubation?retryWrites=true&w=majority
```

### Step 7: Test Connection

```bash
cd backend
npm run seed
```

Should see: ✅ Connected to MongoDB

---

## Option 2: Install MongoDB Locally

### Windows

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server (Windows)
   - Run the installer

2. **Install:**
   - Choose "Complete" installation
   - Install as a Service (check the box)
   - Install MongoDB Compass (optional GUI)

3. **Verify Installation:**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service:**
   ```powershell
   net start MongoDB
   ```

5. **Keep .env as is:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/magic-incubation
   ```

6. **Test:**
   ```bash
   cd backend
   npm run seed
   ```

### Mac

1. **Install with Homebrew:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

3. **Verify:**
   ```bash
   mongosh
   ```

### Linux (Ubuntu/Debian)

1. **Install:**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

2. **Start:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Verify:**
   ```bash
   mongosh
   ```

---

## 🧪 Test Your Connection

After setting up MongoDB (either option):

```bash
cd backend
npm run seed
```

**Success looks like:**
```
✅ Connected to MongoDB
🗑️  Cleared existing data
👤 Created admin user
👤 Created guest user
🚀 Created 3 sample startups

✅ Database seeded successfully!

📝 Login credentials:
   Admin - username: admin, password: magic2024
   Guest - username: guest, password: guest123
```

---

## 🆘 Still Having Issues?

### Check MongoDB is Running

**Windows:**
```powershell
# Check service status
Get-Service MongoDB

# Start service if stopped
net start MongoDB
```

**Mac:**
```bash
brew services list
```

**Linux:**
```bash
sudo systemctl status mongod
```

### Test Connection Manually

**With mongosh (MongoDB Shell):**
```bash
mongosh "mongodb://localhost:27017"
```

**With MongoDB Atlas:**
```bash
mongosh "mongodb+srv://username:password@cluster.mongodb.net"
```

### Common Issues

**Issue: "mongod: command not found"**
- MongoDB not installed or not in PATH
- Reinstall MongoDB or use MongoDB Atlas

**Issue: "Authentication failed"**
- Check username and password in connection string
- Verify database user was created in Atlas

**Issue: "Network timeout"**
- Check IP whitelist in MongoDB Atlas
- Verify internet connection

---

## 💡 Recommendation

**For Development:** Use MongoDB Atlas (Option 1)
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works from anywhere
- ✅ Automatic backups
- ✅ Easy to share with team

**For Production:** Also use MongoDB Atlas
- ✅ Scalable
- ✅ Managed service
- ✅ High availability
- ✅ Security features

---

## 📝 Quick Reference

### MongoDB Atlas Connection String Format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

### Local MongoDB Connection String:
```
mongodb://localhost:27017/magic-incubation
```

### Environment Variable (.env):
```env
MONGODB_URI=your-connection-string-here
```

---

## ✅ Next Steps After Setup

1. **Seed Database:**
   ```bash
   npm run seed
   ```

2. **Start Backend:**
   ```bash
   npm run dev
   ```

3. **Test API:**
   - Visit: http://localhost:5000/health
   - Should see: `{"status":"OK",...}`

4. **Login:**
   - Username: `admin`
   - Password: `magic2024`

---

**Need more help?** Check the main documentation or MongoDB's official guides.
