# 📥 Installation Guide - MAGIC Incubation System

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Check Your Versions

```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from: https://nodejs.org/

## Installation Steps

### Step 1: Extract or Clone the Project

If you received a ZIP file:
```bash
# Extract the ZIP file to your desired location
# Navigate to the extracted folder
cd magic-incubation-system
```

If using Git:
```bash
git clone <repository-url>
cd magic-incubation-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styling)
- Vite (build tool)
- And all other dependencies

**Installation time:** ~2-3 minutes (depending on internet speed)

### Step 3: Start Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

### Step 5: Login

Use the default credentials:
- **Username:** `admin`
- **Password:** `magic2024`

## 🎉 You're Ready!

The app is now running locally on your machine.

## Common Installation Issues

### Issue 1: "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### Issue 2: "Port 5173 is already in use"

**Solution:** 
```bash
# Kill the process using port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Or use a different port:
npm run dev -- --port 3000
```

### Issue 3: "Module not found" errors

**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: "Permission denied" errors

**Solution:**
```bash
# On Mac/Linux, use sudo:
sudo npm install

# Or fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue 5: Slow installation

**Solution:**
```bash
# Use a faster registry
npm install --registry=https://registry.npmmirror.com
```

## Verify Installation

After installation, verify everything works:

1. **Check if dev server starts:**
   ```bash
   npm run dev
   ```

2. **Check if build works:**
   ```bash
   npm run build
   ```

3. **Check if preview works:**
   ```bash
   npm run preview
   ```

## Directory Structure After Installation

```
magic-incubation-system/
├── node_modules/          # Installed dependencies (auto-generated)
├── src/                   # Source code
├── dist/                  # Build output (after npm run build)
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file (auto-generated)
└── ...other config files
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean install (if issues occur)
rm -rf node_modules package-lock.json
npm install
```

## Browser Requirements

The app works on all modern browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Note:** Internet Explorer is NOT supported.

## System Requirements

### Minimum:
- **RAM:** 4GB
- **Storage:** 500MB free space
- **OS:** Windows 10, macOS 10.14, or Linux

### Recommended:
- **RAM:** 8GB or more
- **Storage:** 1GB free space
- **OS:** Latest version of Windows, macOS, or Linux

## Network Requirements

- Internet connection required for initial installation
- No internet needed after installation (app runs locally)
- No backend or API calls

## Optional: Load Sample Data

To test with sample data:

1. Start the app and login
2. Go to **Settings** page
3. Click **Import Data**
4. Select `sample-data.json` from the project root
5. Refresh the page

You'll now have 3 sample startups to explore!

## Optional: Configure IDE

### VS Code (Recommended)

Install these extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### WebStorm

Enable:
- React support
- Tailwind CSS support
- ESLint integration

## Troubleshooting Tips

### Clear Browser Cache

If you see old content:
1. Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache manually

### Check Console for Errors

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

### Restart Development Server

```bash
# Stop server: Ctrl+C
# Start again:
npm run dev
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Or update specific package
npm update react
```

## Getting Help

If you encounter issues:

1. Check this installation guide
2. Check `README.md` for general info
3. Check `QUICKSTART.md` for usage guide
4. Check browser console for errors
5. Contact CMIA Marathwada Industries support

## Next Steps

After successful installation:

1. ✅ Read `QUICKSTART.md` for usage guide
2. ✅ Read `FEATURES.md` to learn all features
3. ✅ Import `sample-data.json` to test
4. ✅ Register your first startup
5. ✅ Explore all pages and features

## Uninstallation

To remove the app:

```bash
# Delete the project folder
rm -rf magic-incubation-system

# Or on Windows:
rmdir /s magic-incubation-system
```

Your browser's localStorage will retain data until you clear it manually.

---

**Installation complete! Start building your startup ecosystem with MAGIC! 🚀**

For questions, contact CMIA Marathwada Industries, Aurangabad.
