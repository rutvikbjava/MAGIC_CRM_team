# Graduated Section Workflow Diagram

## Startup Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        STARTUP JOURNEY                               │
└─────────────────────────────────────────────────────────────────────┘

    Registration
         │
         ▼
    ┌─────────┐
    │   S0    │  Initial Registration
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │   S1    │  First Pitch Round
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │   S2    │  Second Pitch Round
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │   S3    │  Final Pitch Round
    └────┬────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────┐  ┌──────────┐
│Reject│  │One-on-One│
└──────┘  └────┬─────┘
               │
               ▼
          ┌──────────┐
          │Onboarded │ ◄─── Can add achievements
          └────┬─────┘      Upload documents
               │            Track milestones
               │
               │ (After ~18 months)
               │
               ▼
          ┌──────────┐
          │Graduated │ ◄─── Continue adding achievements
          └──────────┘      Maintain relationship
                            Alumni status
```

---

## Achievement System Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ACHIEVEMENT MANAGEMENT                            │
└─────────────────────────────────────────────────────────────────────┘

Onboarded/Graduated Startup
         │
         ▼
    Open Detail Modal
         │
         ▼
    Achievements Section
         │
    ┌────┴────┐
    │         │
    ▼         ▼
Add New    View Existing
    │         │
    │         ├─── Download Attachments
    │         ├─── View Details
    │         └─── Delete (Admin only)
    │
    ▼
Fill Form:
├─── Type (Achievement/Patent/Award/Update/Milestone)
├─── Date
├─── Title
├─── Description
└─── Attachments
         │
         ▼
    Upload Files
    ├─── Images (PNG, JPG, etc.)
    ├─── PDFs
    ├─── Documents (DOC, DOCX)
    └─── Text files
         │
         ▼
    Save Achievement
         │
         ▼
    Display in List
    ├─── Color-coded badge
    ├─── Date indicator
    ├─── Downloadable attachments
    └─── Delete option (Admin)
```

---

## User Permission Matrix

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PERMISSIONS                                   │
└─────────────────────────────────────────────────────────────────────┘

Action                      │  Admin  │  Guest
────────────────────────────┼─────────┼────────
View Graduated Section      │    ✅   │   ✅
Graduate Startup            │    ✅   │   ❌
View Achievements           │    ✅   │   ✅
Add Achievement             │    ✅   │   ❌
Delete Achievement          │    ✅   │   ❌
Upload Attachments          │    ✅   │   ❌
Download Attachments        │    ✅   │   ✅
Export CSV                  │    ✅   │   ✅
Edit Startup Profile        │    ✅   │   ❌
```

---

## Data Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                      STARTUP OBJECT                                  │
└─────────────────────────────────────────────────────────────────────┘

Startup {
  id: "unique-id"
  companyName: "Company Name"
  status: "Graduated" | "Onboarded" | "Rejected" | "Active"
  stage: "S0" | "S1" | "S2" | "S3" | "One-on-One"
  
  // Graduation Info
  graduatedDate: "2024-12-01"  // ISO date string
  
  // Achievements Array
  achievements: [
    {
      id: "achievement-id"
      type: "Patent" | "Achievement" | "Award" | "Update" | "Milestone"
      title: "Achievement Title"
      description: "Detailed description"
      date: "2024-11-15"
      createdAt: "2024-11-15T10:30:00Z"
      
      // Attachments Array
      attachments: [
        {
          name: "certificate.pdf"
          type: "application/pdf"
          size: 245678  // bytes
          data: "base64-encoded-file-data"
        },
        {
          name: "photo.jpg"
          type: "image/jpeg"
          size: 156789
          data: "base64-encoded-image-data"
        }
      ]
    }
  ]
  
  // Other startup fields...
  founderName: "Founder Name"
  email: "email@example.com"
  // ... etc
}
```

---

## UI Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COMPONENT STRUCTURE                               │
└─────────────────────────────────────────────────────────────────────┘

App
├── Sidebar
│   └── Graduated Menu Item (NEW)
│
├── Dashboard
│   └── Graduated Card (NEW)
│
├── Graduated Component (NEW)
│   ├── Search Bar
│   ├── View Toggle (Grid/List)
│   ├── Export CSV Button
│   └── Startup Grid/List
│       └── StartupGridCard
│           └── onClick → StartupDetailModal
│
└── StartupDetailModal
    ├── Header (with Graduate button)
    ├── Startup Info Sections
    └── Achievements Section (NEW)
        └── AchievementManager (NEW)
            ├── Add Achievement Form
            │   ├── Type Selector
            │   ├── Date Picker
            │   ├── Title Input
            │   ├── Description Textarea
            │   └── File Upload Area
            │
            └── Achievements List
                └── Achievement Card
                    ├── Type Badge
                    ├── Date Display
                    ├── Title & Description
                    ├── Attachments List
                    └── Delete Button (Admin)
```

---

## File Upload Process

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FILE UPLOAD FLOW                                  │
└─────────────────────────────────────────────────────────────────────┘

User Selects File
      │
      ▼
Validate File
├─── Check size (< 10MB)
├─── Check type (image/pdf/doc)
└─── Check format
      │
      ├─── ❌ Invalid → Show Error
      │
      ▼
      ✅ Valid
      │
      ▼
Read File with FileReader
      │
      ▼
Convert to Base64
      │
      ▼
Store in State
{
  name: "filename.pdf"
  type: "application/pdf"
  size: 245678
  data: "data:application/pdf;base64,..."
}
      │
      ▼
Display Preview
├─── Show filename
├─── Show file size
├─── Show file icon
└─── Show remove button
      │
      ▼
Save with Achievement
      │
      ▼
Store in LocalStorage
      │
      ▼
Available for Download
```

---

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER NAVIGATION                                   │
└─────────────────────────────────────────────────────────────────────┘

Dashboard
    │
    ├─── Click "Graduated" Card
    │         │
    │         ▼
    │    Graduated Section
    │         │
    │         ├─── Search Startups
    │         ├─── Toggle View (Grid/List)
    │         ├─── Export CSV
    │         └─── Click Startup
    │                  │
    │                  ▼
    │            Detail Modal
    │                  │
    │                  └─── View/Add Achievements
    │
    ├─── Sidebar → Graduated
    │         │
    │         └─── (Same as above)
    │
    └─── Onboarded Section
              │
              └─── Click Startup
                        │
                        ▼
                   Detail Modal
                        │
                        ├─── Graduate Button
                        │         │
                        │         ▼
                        │    Confirm Graduation
                        │         │
                        │         ▼
                        │    Moved to Graduated
                        │
                        └─── Add Achievements
```

---

## State Management

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STATE FLOW                                        │
└─────────────────────────────────────────────────────────────────────┘

LocalStorage
     │
     ▼
Load Startups
     │
     ├─── Filter by status: "Graduated"
     │         │
     │         ▼
     │    Graduated Component State
     │         │
     │         ├─── startups: []
     │         ├─── filteredStartups: []
     │         ├─── searchTerm: ""
     │         └─── viewMode: "grid"
     │
     └─── Individual Startup
               │
               ▼
          Detail Modal State
               │
               ├─── startup: {...}
               ├─── expanded: {...}
               └─── showEditProfile: false
                    │
                    └─── Achievement Manager State
                              │
                              ├─── achievements: []
                              ├─── showAddForm: false
                              └─── newAchievement: {...}
                                        │
                                        └─── attachments: []

Update Flow:
User Action → Update State → Update LocalStorage → Re-render
```

---

## Color Coding System

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COLOR SCHEME                                      │
└─────────────────────────────────────────────────────────────────────┘

Status Colors:
├─── Onboarded:  🟢 Green (#10B981)
├─── Graduated:  🟣 Purple (#A855F7)
└─── Rejected:   🔴 Red (#EF4444)

Achievement Type Colors:
├─── Achievement: 🟢 Green
├─── Patent:      🟣 Purple
├─── Award:       🟡 Yellow
├─── Update:      🔵 Blue
└─── Milestone:   ⚪ Gray

Section Themes:
├─── Onboarded:  Green → Emerald gradient
├─── Graduated:  Purple → Pink gradient
└─── Rejected:   Red → Rose gradient
```

---

## Error Handling

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ERROR SCENARIOS                                   │
└─────────────────────────────────────────────────────────────────────┘

File Upload Errors:
├─── File too large (>10MB)
│    └─── Alert: "File size should be less than 10MB"
│
├─── Invalid file type
│    └─── Alert: "Please select a valid file type"
│
└─── Read error
     └─── Console error + user notification

Form Validation:
├─── Missing title
│    └─── Alert: "Please fill in title and description"
│
└─── Missing description
     └─── Alert: "Please fill in title and description"

Permission Errors:
└─── Guest attempts restricted action
     └─── Show Guest Restriction Modal

Data Errors:
├─── LocalStorage full
│    └─── Console error + suggest data cleanup
│
└─── Corrupt data
     └─── Fallback to empty array
```

---

This workflow diagram provides a comprehensive visual guide to understanding how the Graduated section and Achievements system work together in the MAGIC Incubation Management System.
