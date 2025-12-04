import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import startupRoutes from './routes/startups.js';
import smcRoutes from './routes/smc.js';
import oneOnOneRoutes from './routes/oneOnOne.js';
import guestRoutes from './routes/guests.js';
import settingsRoutes from './routes/settings.js';
import landingPageRoutes from './routes/landingPage.js';
import achievementRoutes from './routes/achievements.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Create necessary directories
const dirs = ['data', 'uploads', 'logs'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    storage: 'JSON Files'
  });
});

// API welcome route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to MAGIC Backend API',
    version: '1.0.0',
    storage: 'JSON Files',
    endpoints: {
      health: '/health',
      auth: {
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        changePassword: 'POST /api/auth/change-password'
      },
      startups: {
        list: 'GET /api/startups',
        get: 'GET /api/startups/:id',
        create: 'POST /api/startups',
        update: 'PUT /api/startups/:id',
        delete: 'DELETE /api/startups/:id',
        stats: 'GET /api/startups/stats/overview'
      },
      smc: {
        list: 'GET /api/smc',
        create: 'POST /api/smc',
        complete: 'PUT /api/smc/:id/complete',
        delete: 'DELETE /api/smc/:id'
      },
      oneOnOne: {
        list: 'GET /api/one-on-one',
        create: 'POST /api/one-on-one',
        complete: 'PUT /api/one-on-one/:id/complete',
        delete: 'DELETE /api/one-on-one/:id'
      },
      guests: {
        list: 'GET /api/guests',
        create: 'POST /api/guests',
        update: 'PUT /api/guests/:id',
        delete: 'DELETE /api/guests/:id'
      },
      settings: {
        list: 'GET /api/settings',
        get: 'GET /api/settings/:key',
        update: 'PUT /api/settings/:key'
      },
      landingPage: {
        get: 'GET /api/landing-page',
        update: 'PUT /api/landing-page'
      },
      achievements: {
        add: 'POST /api/achievements/:startupId',
        delete: 'DELETE /api/achievements/:startupId/:achievementId'
      }
    },
    documentation: 'See API_REFERENCE.md for complete documentation',
    credentials: {
      admin: { username: 'admin', password: 'magic2024' },
      guest: { username: 'guest', password: 'guest123' }
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/smc', smcRoutes);
app.use('/api/one-on-one', oneOnOneRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/landing-page', landingPageRoutes);
app.use('/api/achievements', achievementRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log('✅ Data storage initialized (JSON files)');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  process.exit(0);
});
