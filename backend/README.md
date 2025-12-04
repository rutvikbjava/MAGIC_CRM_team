# MAGIC Backend API

Complete backend API for the MAGIC Startup Incubation Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/magic-incubation
JWT_SECRET=your-secret-key-here
```

5. Seed the database:
```bash
npm run seed
```

6. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "magic2024"
}

Response:
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "username": "admin",
    "role": "admin"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Startups

#### Get All Startups
```http
GET /api/startups?stage=S1&status=Active&search=tech
Authorization: Bearer {token}
```

#### Get Startup by ID
```http
GET /api/startups/:id
Authorization: Bearer {token}
```

#### Create Startup
```http
POST /api/startups
Authorization: Bearer {token}
Content-Type: application/json

{
  "companyName": "Tech Startup",
  "email": "contact@startup.com",
  "mobile": "+91 9876543210",
  ...
}
```

#### Update Startup
```http
PUT /api/startups/:id
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Startup
```http
DELETE /api/startups/:id
Authorization: Bearer {token}
```

#### Add Pitch History
```http
POST /api/startups/:id/pitch
Authorization: Bearer {token}
Content-Type: application/json

{
  "stage": "S1",
  "date": "2024-12-01",
  "time": "10:30",
  "panelistName": "Dr. Sharma",
  "feedback": "Great presentation"
}
```

#### Upload Document
```http
POST /api/startups/:id/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

document: [file]
```

#### Get Statistics
```http
GET /api/startups/stats/overview
Authorization: Bearer {token}
```

### SMC Scheduling

#### Get All Schedules
```http
GET /api/smc?date=2024-12-02&status=Scheduled
Authorization: Bearer {token}
```

#### Create Schedule
```http
POST /api/smc
Authorization: Bearer {token}
Content-Type: application/json

{
  "startupId": "startup-id",
  "date": "2024-12-02",
  "timeSlot": "10 AM"
}
```

#### Complete SMC Session
```http
PUT /api/smc/:id/complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "panelistName": "Dr. Sharma",
  "feedback": "Excellent pitch"
}
```

#### Delete Schedule
```http
DELETE /api/smc/:id
Authorization: Bearer {token}
```

### One-on-One Sessions

#### Get All Sessions
```http
GET /api/one-on-one?status=Scheduled
Authorization: Bearer {token}
```

#### Create Session
```http
POST /api/one-on-one
Authorization: Bearer {token}
Content-Type: application/json

{
  "startup": "startup-id",
  "date": "2024-12-05",
  "time": "15:00",
  "mentorName": "Mr. Kapoor"
}
```

#### Complete Session
```http
PUT /api/one-on-one/:id/complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "feedback": "Great progress",
  "progress": "Ready for next stage"
}
```

### Guest Management

#### Get All Guests
```http
GET /api/guests
Authorization: Bearer {token}
```

#### Create Guest
```http
POST /api/guests
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "guest1",
  "password": "password123",
  "email": "guest@example.com"
}
```

#### Update Guest
```http
PUT /api/guests/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "isActive": false
}
```

#### Delete Guest
```http
DELETE /api/guests/:id
Authorization: Bearer {token}
```

### Settings

#### Get All Settings
```http
GET /api/settings
Authorization: Bearer {token}
```

#### Get Setting by Key
```http
GET /api/settings/:key
Authorization: Bearer {token}
```

#### Update Setting
```http
PUT /api/settings/:key
Authorization: Bearer {token}
Content-Type: application/json

{
  "value": "new-value",
  "description": "Setting description"
}
```

### Landing Page

#### Get Landing Page Content
```http
GET /api/landing-page
```

#### Update Landing Page
```http
PUT /api/landing-page
Authorization: Bearer {token}
Content-Type: application/json

{
  "hero": {
    "title": "Welcome to MAGIC",
    "subtitle": "Empowering Startups"
  }
}
```

### Achievements

#### Add Achievement
```http
POST /api/achievements/:startupId
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": "achievement-id",
  "type": "milestone",
  "title": "First Pitch",
  "description": "Completed first pitch",
  "date": "2024-12-01",
  "icon": "Trophy",
  "category": "pitch"
}
```

#### Delete Achievement
```http
DELETE /api/achievements/:startupId/:achievementId
Authorization: Bearer {token}
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS protection
- Input validation
- File upload restrictions

## 📁 Project Structure

```
backend/
├── models/           # Mongoose models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── scripts/          # Utility scripts
├── uploads/          # File uploads directory
├── server.js         # Main server file
├── package.json
└── .env.example
```

## 🛠️ Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/magic-incubation
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=magic2024
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=5242880
```

## 📊 Database Models

- **User**: Admin and guest users
- **Startup**: Startup information and history
- **SMCSchedule**: SMC pitch schedules
- **OneOnOneSession**: Mentorship sessions
- **Settings**: Application settings
- **LandingPage**: Landing page content

## 🧪 Testing

Default credentials after seeding:
- Admin: `admin` / `magic2024`
- Guest: `guest` / `guest123`

## 🚀 Deployment

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure production MongoDB URI
- [ ] Set NODE_ENV=production
- [ ] Configure CORS_ORIGIN
- [ ] Set up SSL/TLS
- [ ] Configure file upload limits
- [ ] Set up backup strategy
- [ ] Configure logging
- [ ] Set up monitoring

### Deploy to Heroku
```bash
heroku create magic-backend
heroku addons:create mongolab
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Deploy to Railway
```bash
railway login
railway init
railway add mongodb
railway up
```

## 📝 License

Built for CMIA Marathwada Industries, Aurangabad
