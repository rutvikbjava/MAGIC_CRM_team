# MAGIC - Startup Incubation Management System

A comprehensive web-based platform for managing startup incubation programs, built for CMIA Marathwada Industries, Aurangabad. This system streamlines the entire incubation lifecycle from application to graduation.

## 🌟 Features

### Core Functionality
- **Startup Management** - Track startups through multiple stages (S0, S1, S2, S3, One-on-One, Onboarded, Graduated)
- **SMC Scheduling** - Schedule and manage Selection & Monitoring Committee pitch sessions
- **One-on-One Sessions** - Coordinate mentorship sessions between startups and mentors
- **Achievement Tracking** - Record and showcase startup milestones and achievements
- **Document Management** - Upload and manage startup documents securely
- **Guest Access** - Create limited-access accounts for external stakeholders
- **Landing Page CMS** - Customizable public-facing landing page
- **Statistics Dashboard** - Real-time insights into incubation program metrics

### Security & Performance
- JWT-based authentication
- Role-based access control (Admin/Guest)
- Password encryption with bcrypt
- Rate limiting and security headers
- File upload validation
- CORS protection

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB** - NoSQL database
- **JWT** - Secure authentication
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **Morgan** - HTTP request logging

## 📋 Prerequisites

- Node.js v18 or higher
- MongoDB v6 or higher
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/magic-incubation-system.git
cd magic-incubation-system
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/magic-incubation
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=magic2024
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=5242880
```

### 5. Seed the Database
```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin` / `magic2024`
- Guest user: `guest` / `guest123`
- Sample startup data

### 6. Start the Application

#### Option A: Start Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

#### Option B: Use Start Script

**Windows:**
```bash
start-all.bat
```

**Linux/Mac:**
```bash
chmod +x start-all.sh
./start-all.sh
```

### 7. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health

## 📁 Project Structure

```
magic-incubation-system/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── middleware/          # Custom middleware (auth, validation)
│   ├── scripts/             # Utility scripts (seeding, etc.)
│   ├── uploads/             # File upload directory
│   ├── server.js            # Express server entry point
│   └── package.json
├── src/
│   ├── components/          # React components
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # React entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json
```

## 🔑 Default Credentials

After seeding the database:

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | admin    | magic2024  |
| Guest | guest    | guest123   |

**⚠️ Important:** Change these credentials in production!

## 📚 API Documentation

Complete API documentation is available in [`backend/API_REFERENCE.md`](backend/API_REFERENCE.md)

### Quick API Examples

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"magic2024"}'
```

**Get All Startups:**
```bash
curl http://localhost:5000/api/startups \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create SMC Schedule:**
```bash
curl -X POST http://localhost:5000/api/smc \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"startupId":"STARTUP_ID","date":"2024-12-10","timeSlot":"10 AM"}'
```

## 🎯 Key Workflows

### Startup Progression Flow
1. **S0 (Application)** → Initial application received
2. **S1 (First Pitch)** → First SMC presentation
3. **S2 (Second Pitch)** → Follow-up SMC presentation
4. **S3 (Final Pitch)** → Final evaluation
5. **One-on-One** → Mentorship phase
6. **Onboarded** → Accepted into program
7. **Graduated** → Successfully completed program

### SMC Scheduling Workflow
1. Admin schedules SMC session for a startup
2. Session appears in calendar view
3. After pitch, admin marks session as completed
4. System automatically:
   - Records pitch in startup history
   - Progresses startup to next stage
   - Updates startup status

## 🚢 Deployment

### Frontend (Vercel/Netlify)

**Build Command:**
```bash
npm run build
```

**Output Directory:** `dist`

### Backend (Heroku/Railway)

**Heroku:**
```bash
cd backend
heroku create magic-backend
heroku addons:create mongolab
heroku config:set JWT_SECRET=your-production-secret
heroku config:set NODE_ENV=production
git subtree push --prefix backend heroku main
```

**Railway:**
```bash
cd backend
railway login
railway init
railway add mongodb
railway up
```

### Environment Variables for Production

Ensure these are set in your hosting platform:
- `NODE_ENV=production`
- `MONGODB_URI` (production database)
- `JWT_SECRET` (strong random string)
- `CORS_ORIGIN` (your frontend URL)
- `ADMIN_USERNAME` & `ADMIN_PASSWORD`

## 🧪 Testing

### Test Backend Endpoints
```bash
cd backend
npm test
```

### Manual Testing
Use the included test file:
```bash
# Open in browser
backend/test.html
```

Or use the test documentation:
```bash
backend/TEST_ENDPOINTS.md
```

## 🔒 Security Best Practices

- Change default admin credentials immediately
- Use strong JWT secrets (minimum 32 characters)
- Enable HTTPS in production
- Regularly update dependencies
- Implement backup strategy for MongoDB
- Set appropriate file upload limits
- Use environment variables for sensitive data
- Enable rate limiting in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is built for CMIA Marathwada Industries, Aurangabad.

## 👥 Authors

CMIA Marathwada Industries, Aurangabad

## 🐛 Known Issues

- File upload size limited to 5MB (configurable)
- No pagination on large datasets (planned enhancement)
- Email notifications not yet implemented

## 🗺️ Roadmap

- [ ] Email notification system
- [ ] SMS alerts for scheduled sessions
- [ ] Advanced analytics dashboard
- [ ] Export data to Excel/PDF
- [ ] Mobile app version
- [ ] Integration with payment gateways
- [ ] Automated stage progression rules
- [ ] Multi-language support

## 📞 Support

For issues and questions:
- Create an issue in this repository
- Contact: CMIA Marathwada Industries, Aurangabad

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for efficient startup incubation management
- Inspired by best practices in accelerator programs

---

**Made with ❤️ for the startup ecosystem**
