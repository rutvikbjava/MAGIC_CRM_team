# 🚀 MAGIC - Startup Incubation Management System

A professional, colorful, and modern **Startup Incubation Management System** for **MAGIC (CMIA Marathwada Industries, Aurangabad)** built with React, Tailwind CSS, and Framer Motion.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)
![License](https://img.shields.io/badge/license-CMIA-green)

---

## 📚 Documentation Hub

**New to MAGIC?** Start here: [INDEX.md](INDEX.md) - Complete documentation index

| Quick Links | Description |
|-------------|-------------|
| [📥 Installation](INSTALLATION.md) | Setup instructions |
| [⚡ Quick Start](QUICKSTART.md) | Get started in 8 steps |
| [✨ Features](FEATURES.md) | 200+ features documented |
| [❓ FAQ](FAQ.md) | Common questions answered |
| [🚀 Deployment](DEPLOYMENT.md) | Deploy to production |
| [✅ Checklist](CHECKLIST.md) | Testing & verification |

---

## 🚀 Features

### 🔐 Authentication
- Single admin login (Username: `admin`, Password: `magic2024`)
- Session management with localStorage
- Beautiful gradient login page

### 📊 Dashboard
- Animated gradient cards showing startup counts by stage
- Quick action buttons for common tasks
- Real-time statistics

### 🚀 Startup Management
- 3-section registration form (Startup Info, Founder Info, Registration Info)
- Smart auto-flow lifecycle: S0 → S1 → S2 → S3 → One-on-One → Onboarded/Rejected
- Expandable startup cards with detailed information
- Search and filter capabilities

### 📅 SMC Scheduling
- Saturday-only calendar view
- 4 time slots per day (10 AM, 11 AM, 2 PM, 3 PM)
- Schedule startups for pitch sessions
- Mark sessions as complete with panelist feedback
- Automatic stage progression after pitch completion

### 🤝 One-on-One Mentorship
- Schedule mentorship sessions
- Track mentor feedback and progress
- Option to onboard or reject after sessions

### 🌟 Onboarded & Rejected
- Separate views for onboarded and rejected startups
- Export to CSV functionality
- Read-only locked status

### 🎨 Design Features
- Vibrant gradient UI (Blue → Purple → Pink → Orange → Green)
- Dark mode support with persistent settings
- Smooth animations with Framer Motion
- Fully responsive design
- Modern SaaS-style interface

### 💾 Data Management
- All data stored in localStorage (no backend required)
- Export all data to JSON
- Import data from JSON
- Clear all data option

## 🛠️ Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **LocalStorage** - Data persistence

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🔑 Default Login Credentials

- **Username:** admin
- **Password:** magic2024

## 📋 Startup Lifecycle

1. **S0 (Registered)** - Initial registration
2. **S1 (Stage 1)** - After first SMC pitch
   - Admin can: Onboard, Move to One-on-One, or Reject
3. **S2 (Stage 2)** - After second SMC pitch
4. **S3 (Stage 3)** - After third SMC pitch
   - Option to start One-on-One mentorship
5. **One-on-One** - Mentorship sessions
   - Admin can: Onboard or Reject
6. **Onboarded/Rejected** - Final status (locked)

## 🎯 Key Features

### Pitch History
Each startup maintains a complete pitch history with:
- Date and time of pitch
- Panelist name
- Feedback received
- Stage progression

### Smart Auto-Flow
- Automatic stage progression after SMC completion
- Manual decision points at S1 and after One-on-One
- Locked status for onboarded/rejected startups

### Data Export/Import
- Export all data as JSON for backup
- Import data to restore or migrate
- CSV export for onboarded startups

## 🌗 Dark Mode

Toggle dark mode from:
- Sidebar menu
- Settings page

Dark mode preference is saved and persists across sessions.

## 📱 Responsive Design

Fully responsive layout that works on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Color Scheme

- **S0:** Gray gradient
- **S1:** Blue gradient
- **S2:** Purple gradient
- **S3:** Orange gradient
- **One-on-One:** Indigo gradient
- **Onboarded:** Green gradient
- **Rejected:** Red/Gray

## 📄 License

Built for CMIA Marathwada Industries, Aurangabad

## 🤝 Support

For support and queries, contact MAGIC CMIA Aurangabad.
