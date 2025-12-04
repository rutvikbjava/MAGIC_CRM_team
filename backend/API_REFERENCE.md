# MAGIC Backend API Reference

Complete API documentation for the MAGIC Incubation Management System.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Health Check

#### GET /health
Check server status

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-12-02T10:00:00.000Z",
  "uptime": 12345
}
```

---

## Authentication Endpoints

### POST /api/auth/login
Login user and get JWT token

**Request Body:**
```json
{
  "username": "admin",
  "password": "magic2024"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "role": "admin",
    "email": "admin@magic.com"
  }
}
```

**Status Codes:**
- 200: Success
- 401: Invalid credentials
- 400: Validation error

---

### GET /api/auth/me
Get current authenticated user

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "role": "admin",
  "email": "admin@magic.com"
}
```

**Status Codes:**
- 200: Success
- 401: Unauthorized

---

### POST /api/auth/change-password
Change user password

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

**Status Codes:**
- 200: Success
- 400: Invalid current password
- 401: Unauthorized

---

## Startup Endpoints

### GET /api/startups
Get all startups with optional filters

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `stage` (optional): Filter by stage (S0, S1, S2, S3, One-on-One, Onboarded, Graduated, Rejected)
- `status` (optional): Filter by status (Active, Onboarded, Graduated, Rejected)
- `search` (optional): Search by company name, MAGIC code, or founder name

**Example:**
```
GET /api/startups?stage=S1&search=tech
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "magicCode": "MAGIC001",
    "companyName": "TechVenture Solutions",
    "city": "Aurangabad",
    "sector": "Technology",
    "stage": "S1",
    "status": "Active",
    "founderName": "Rajesh Kumar",
    "email": "rajesh@techventure.com",
    "mobile": "+91 9876543210",
    "pitchHistory": [],
    "oneOnOneHistory": [],
    "achievements": [],
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### GET /api/startups/:id
Get single startup by ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "magicCode": "MAGIC001",
  "companyName": "TechVenture Solutions",
  ...
}
```

**Status Codes:**
- 200: Success
- 404: Startup not found
- 401: Unauthorized

---

### POST /api/startups
Create new startup (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "companyName": "New Startup",
  "city": "Aurangabad",
  "sector": "Technology",
  "stageOfIdea": "MVP Ready",
  "problemSolving": "Problem description",
  "solution": "Solution description",
  "teamSize": "5",
  "founderName": "John Doe",
  "founderAge": "30",
  "founderGender": "Male",
  "college": "MIT Aurangabad",
  "email": "contact@startup.com",
  "mobile": "+91 9876543210",
  "address": "123 Street, City"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "magicCode": "MAGIC004",
  "companyName": "New Startup",
  ...
}
```

**Status Codes:**
- 201: Created
- 400: Validation error or duplicate email
- 401: Unauthorized
- 403: Admin only

---

### PUT /api/startups/:id
Update startup (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "stage": "S2",
  "status": "Active",
  "followUpRemark": "Updated remark"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "stage": "S2",
  ...
}
```

---

### DELETE /api/startups/:id
Delete startup (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Startup deleted successfully"
}
```

---

### POST /api/startups/:id/pitch
Add pitch history to startup (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "stage": "S1",
  "date": "2024-12-01",
  "time": "10:30",
  "panelistName": "Dr. Sharma",
  "feedback": "Excellent presentation"
}
```

---

### POST /api/startups/:id/upload
Upload document for startup (Admin only)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `document`: File (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "documents": [
    {
      "name": "business-plan.pdf",
      "url": "/uploads/document-1234567890.pdf",
      "uploadedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

---

### GET /api/startups/stats/overview
Get startup statistics

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "stageStats": [
    { "_id": "S0", "count": 5 },
    { "_id": "S1", "count": 3 },
    { "_id": "Onboarded", "count": 2 }
  ],
  "statusStats": [
    { "_id": "Active", "count": 8 },
    { "_id": "Onboarded", "count": 2 }
  ]
}
```

---

## SMC Scheduling Endpoints

### GET /api/smc
Get all SMC schedules

**Query Parameters:**
- `date` (optional): Filter by date
- `status` (optional): Filter by status (Scheduled, Completed, Cancelled)

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "startup": {
      "_id": "507f1f77bcf86cd799439012",
      "magicCode": "MAGIC001",
      "companyName": "TechVenture"
    },
    "date": "2024-12-02",
    "timeSlot": "10 AM",
    "status": "Scheduled",
    "panelistName": "",
    "feedback": "",
    "createdAt": "2024-12-01T10:00:00.000Z"
  }
]
```

---

### POST /api/smc
Create SMC schedule (Admin only)

**Request Body:**
```json
{
  "startupId": "507f1f77bcf86cd799439012",
  "date": "2024-12-02",
  "timeSlot": "10 AM"
}
```

**Status Codes:**
- 201: Created
- 400: Time slot already booked

---

### PUT /api/smc/:id/complete
Mark SMC session as completed (Admin only)

**Request Body:**
```json
{
  "panelistName": "Dr. Sharma",
  "feedback": "Excellent pitch. Ready for next stage."
}
```

**Note:** This automatically:
- Updates schedule status to "Completed"
- Adds pitch history to startup
- Progresses startup stage (S0→S1, S1→S2, S2→S3)

---

### DELETE /api/smc/:id
Delete SMC schedule (Admin only)

---

## One-on-One Session Endpoints

### GET /api/one-on-one
Get all one-on-one sessions

**Query Parameters:**
- `status` (optional): Filter by status

---

### POST /api/one-on-one
Create one-on-one session (Admin only)

**Request Body:**
```json
{
  "startup": "507f1f77bcf86cd799439012",
  "date": "2024-12-05",
  "time": "15:00",
  "mentorName": "Mr. Kapoor"
}
```

**Note:** This automatically updates startup stage to "One-on-One"

---

### PUT /api/one-on-one/:id/complete
Mark session as completed (Admin only)

**Request Body:**
```json
{
  "feedback": "Great progress on product development",
  "progress": "Ready for investment pitch"
}
```

---

### DELETE /api/one-on-one/:id
Delete session (Admin only)

---

## Guest Management Endpoints

### GET /api/guests
Get all guest users (Admin only)

---

### POST /api/guests
Create guest user (Admin only)

**Request Body:**
```json
{
  "username": "guest1",
  "password": "password123",
  "email": "guest@example.com"
}
```

---

### PUT /api/guests/:id
Update guest user (Admin only)

**Request Body:**
```json
{
  "username": "guest1_updated",
  "email": "newemail@example.com",
  "isActive": false
}
```

---

### DELETE /api/guests/:id
Delete guest user (Admin only)

---

## Settings Endpoints

### GET /api/settings
Get all settings

**Response:**
```json
{
  "darkMode": false,
  "emailNotifications": true,
  "maxFileSize": 5242880
}
```

---

### GET /api/settings/:key
Get specific setting

---

### PUT /api/settings/:key
Update setting (Admin only)

**Request Body:**
```json
{
  "value": true,
  "description": "Enable dark mode"
}
```

---

## Landing Page Endpoints

### GET /api/landing-page
Get landing page content (Public)

---

### PUT /api/landing-page
Update landing page content (Admin only)

**Request Body:**
```json
{
  "hero": {
    "title": "Welcome to MAGIC",
    "subtitle": "Empowering Startups",
    "ctaText": "Get Started"
  },
  "features": [],
  "stats": [],
  "testimonials": [],
  "contact": {}
}
```

---

## Achievement Endpoints

### POST /api/achievements/:startupId
Add achievement to startup (Admin only)

**Request Body:**
```json
{
  "id": "achievement-123",
  "type": "milestone",
  "title": "First Pitch Completed",
  "description": "Successfully completed first SMC pitch",
  "date": "2024-12-01",
  "icon": "Trophy",
  "category": "pitch",
  "metadata": {}
}
```

---

### DELETE /api/achievements/:startupId/:achievementId
Remove achievement from startup (Admin only)

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Rate Limiting

API is rate limited to 100 requests per 15 minutes per IP address.

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1638360000
```

---

## File Upload Limits

- Maximum file size: 5MB
- Allowed types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
- Files stored in `/uploads` directory

---

## Pagination (Future Enhancement)

For large datasets, pagination can be added:

```
GET /api/startups?page=1&limit=20
```

Response:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```
