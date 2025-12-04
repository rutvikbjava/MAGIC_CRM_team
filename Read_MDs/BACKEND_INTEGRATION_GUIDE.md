# Backend Integration Guide

This guide explains how to integrate the frontend with the new backend API.

## 🚀 Quick Start

### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update MongoDB URI in .env
# MONGODB_URI=mongodb://localhost:27017/magic-incubation

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Setup Frontend

```bash
# In project root directory
# Create .env file
cp .env.example .env

# Install dependencies (if not already done)
npm install

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📝 Migration from localStorage to Backend

### Current State
The application currently uses `localStorage` for data persistence via `src/utils/storage.js`.

### Migration Options

#### Option 1: Gradual Migration (Recommended)
Keep both localStorage and API working together during transition:

1. **Dual Mode**: Use localStorage as fallback when API is unavailable
2. **Sync on Login**: Sync localStorage data to backend on first login
3. **Gradual Component Updates**: Update components one by one

#### Option 2: Complete Migration
Replace all localStorage calls with API calls:

1. Update `src/utils/storage.js` to use API
2. Update all components to use async/await
3. Add loading states and error handling

## 🔄 API Usage Examples

### Authentication

```javascript
import { api } from './utils/api';

// Login
try {
  const { token, user } = await api.login('admin', 'magic2024');
  console.log('Logged in:', user);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Get current user
const user = await api.getCurrentUser();

// Logout
api.logout();
```

### Startups

```javascript
// Get all startups
const startups = await api.getStartups();

// Filter startups
const s1Startups = await api.getStartups({ stage: 'S1' });

// Search startups
const results = await api.getStartups({ search: 'tech' });

// Get single startup
const startup = await api.getStartup(startupId);

// Create startup
const newStartup = await api.createStartup({
  companyName: 'Tech Startup',
  email: 'contact@startup.com',
  mobile: '+91 9876543210',
  // ... other fields
});

// Update startup
await api.updateStartup(startupId, {
  stage: 'S2',
  status: 'Active'
});

// Delete startup
await api.deleteStartup(startupId);

// Add pitch history
await api.addPitchHistory(startupId, {
  stage: 'S1',
  date: '2024-12-01',
  time: '10:30',
  panelistName: 'Dr. Sharma',
  feedback: 'Great presentation'
});

// Upload document
await api.uploadDocument(startupId, file);
```

### SMC Scheduling

```javascript
// Get schedules
const schedules = await api.getSMCSchedules();

// Get schedules for specific date
const dateSchedules = await api.getSMCSchedules({ 
  date: '2024-12-02' 
});

// Create schedule
await api.createSMCSchedule({
  startupId: startupId,
  date: '2024-12-02',
  timeSlot: '10 AM'
});

// Complete SMC session
await api.completeSMCSchedule(scheduleId, {
  panelistName: 'Dr. Sharma',
  feedback: 'Excellent pitch'
});

// Delete schedule
await api.deleteSMCSchedule(scheduleId);
```

### One-on-One Sessions

```javascript
// Get sessions
const sessions = await api.getOneOnOneSessions();

// Create session
await api.createOneOnOneSession({
  startup: startupId,
  date: '2024-12-05',
  time: '15:00',
  mentorName: 'Mr. Kapoor'
});

// Complete session
await api.completeOneOnOneSession(sessionId, {
  feedback: 'Great progress',
  progress: 'Ready for next stage'
});
```

## 🔧 Component Update Examples

### Before (localStorage)

```javascript
import { storage } from '../utils/storage';

function Dashboard() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const data = storage.get('startups', []);
    setStartups(data);
  }, []);

  const addStartup = (startup) => {
    const updated = [...startups, startup];
    storage.set('startups', updated);
    setStartups(updated);
  };
}
```

### After (API)

```javascript
import { api } from '../utils/api';

function Dashboard() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStartups();
  }, []);

  const loadStartups = async () => {
    try {
      setLoading(true);
      const data = await api.getStartups();
      setStartups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addStartup = async (startup) => {
    try {
      const newStartup = await api.createStartup(startup);
      setStartups([...startups, newStartup]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // ... component JSX
  );
}
```

## 🔐 Authentication Flow

### Update App.jsx

```javascript
import { api } from './utils/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
      loadCurrentUser();
    }
  }, []);

  const loadCurrentUser = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      // Token invalid, logout
      handleLogout();
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const { token, user } = await api.login(username, password);
      setUser(user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  // ... rest of component
}
```

## 📊 Data Migration Script

To migrate existing localStorage data to backend:

```javascript
// src/utils/migrate.js
import { api } from './api';
import { storage } from './storage';

export async function migrateToBackend() {
  try {
    // Get all localStorage data
    const startups = storage.get('startups', []);
    const smcSchedules = storage.get('smcSchedules', []);
    const oneOnOneSessions = storage.get('oneOnOneSessions', []);

    // Migrate startups
    for (const startup of startups) {
      try {
        await api.createStartup(startup);
      } catch (error) {
        console.error('Failed to migrate startup:', startup.magicCode, error);
      }
    }

    // Migrate SMC schedules
    for (const schedule of smcSchedules) {
      try {
        await api.createSMCSchedule(schedule);
      } catch (error) {
        console.error('Failed to migrate schedule:', error);
      }
    }

    // Migrate one-on-one sessions
    for (const session of oneOnOneSessions) {
      try {
        await api.createOneOnOneSession(session);
      } catch (error) {
        console.error('Failed to migrate session:', error);
      }
    }

    console.log('Migration completed!');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}
```

## 🎯 Best Practices

### 1. Error Handling

```javascript
try {
  const data = await api.getStartups();
  setStartups(data);
} catch (error) {
  if (error.message.includes('401')) {
    // Unauthorized - redirect to login
    handleLogout();
  } else {
    // Show error message to user
    setError(error.message);
  }
}
```

### 2. Loading States

```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    await api.createStartup(data);
    // Success
  } catch (error) {
    // Error
  } finally {
    setLoading(false);
  }
};
```

### 3. Optimistic Updates

```javascript
const deleteStartup = async (id) => {
  // Optimistically update UI
  setStartups(startups.filter(s => s.id !== id));
  
  try {
    await api.deleteStartup(id);
  } catch (error) {
    // Revert on error
    loadStartups();
    setError('Failed to delete startup');
  }
};
```

## 🔄 Offline Support (Optional)

For offline functionality, implement a service worker or use libraries like:
- `workbox` for PWA
- `localforage` for better storage
- `react-query` for caching and sync

## 📱 Testing

### Test Backend
```bash
cd backend
npm run dev

# In another terminal
curl http://localhost:5000/health
```

### Test API Integration
```javascript
// In browser console
import { api } from './utils/api';

// Test login
await api.login('admin', 'magic2024');

// Test getting startups
const startups = await api.getStartups();
console.log(startups);
```

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or DigitalOcean
- Set environment variables
- Configure MongoDB Atlas for production database

### Frontend Deployment
- Update `VITE_API_URL` in `.env` to production backend URL
- Build: `npm run build`
- Deploy to Vercel, Netlify, or similar

## 📝 Checklist

- [ ] Backend server running
- [ ] MongoDB connected
- [ ] Database seeded
- [ ] Frontend .env configured
- [ ] API client tested
- [ ] Authentication working
- [ ] Components updated
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] Data migrated (if needed)
- [ ] Production deployment configured

## 🆘 Troubleshooting

### CORS Errors
Update `CORS_ORIGIN` in backend `.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

### Connection Refused
Ensure backend is running on correct port:
```bash
cd backend
npm run dev
```

### Authentication Errors
Check JWT token in localStorage and verify it's being sent in headers.

### MongoDB Connection Issues
Verify MongoDB is running:
```bash
# For local MongoDB
mongosh

# Check connection string in .env
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Authentication](https://jwt.io/)
- [React Query](https://tanstack.com/query/latest) (for advanced data fetching)
