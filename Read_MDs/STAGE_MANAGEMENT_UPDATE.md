# Stage Management System Updates

## ✅ Implemented Features

### 1. One-on-One Stage Updates
- **Stage-Specific UI**: When a startup reaches One-on-One stage, only the One-on-One section is prominently displayed
- **Schedule Meeting Button**: Added button to schedule meetings with date and time fields
- **Post-Meeting Feedback**: After meeting, fields appear for:
  - Feedback (required)
  - Mentor Name (required)
- **Action Options**: After feedback submission, two options appear:
  - Reject (with mandatory remark)
  - Onboard (moves to Onboarded stage)

### 2. Onboarded Stage Updates
- **Achievement Upload**: New section for uploading achievements with:
  - Achievement description (required)
  - Revenue generated (optional)
- **Graduate Button**: Allows moving startup to Graduated status
- **Achievement Display**: Shows all uploaded achievements with revenue in a dedicated section
- **Lock on Graduation**: Once graduated, achievement upload is disabled

### 3. Data Locking After Final Stages
- **Graduated Status**: Startups marked as Graduated are locked (view-only)
- **Rejected Status**: Startups marked as Rejected are locked (view-only)
- **Visual Indicator**: Locked cards show a banner with lock icon
- **No Editing**: Edit and delete buttons are hidden for locked startups
- **Opacity Effect**: Locked cards have reduced opacity for visual distinction

### 4. Rejection Logic (All Stages)
- **Universal Rejection**: Startups can be rejected at ANY stage (S0, S1, S2, S3, One-on-One)
- **Mandatory Remark**: Modal appears requiring rejection reason
- **Rejection Details Saved**:
  - Rejection remark
  - Rejected date
  - Stage from which rejected
- **Rejection Display**: Dedicated section shows rejection details in red-themed card

### 5. S0 Stage Update
- **Reject Button**: Added "Reject Startup" button for S0 stage
- **Same Logic**: Uses the same rejection modal and remark system
- **Early Filtering**: Allows rejecting startups at registration stage

### 6. One-on-One → Onboard Flow
- **Reject Path**: 
  - Click Reject → Remark modal appears → Save → Status = Rejected → Card locked
- **Onboard Path**:
  - Click Onboard → Status = Onboarded → Shows achievement upload UI
  - Can upload multiple achievements with revenue
  - Can graduate when ready

## 🎨 UI Components Created/Updated

### New Components:
1. **RejectionModal.jsx**: Reusable modal for rejection with mandatory remark field

### Updated Components:
1. **StartupCard.jsx**: 
   - Added stage-specific action buttons
   - Added One-on-One meeting scheduling
   - Added achievement upload for Onboarded
   - Added rejection details section
   - Added locked state UI
   
2. **OneOnOne.jsx**:
   - Integrated RejectionModal
   - Updated rejection handler with remark support

3. **RegistrationForm.jsx**:
   - Enhanced with all requested fields
   - Added validation and error handling
   - Improved UI with section headers

## 📊 Data Structure Updates

### Startup Object New Fields:
```javascript
{
  // Rejection fields
  status: 'Active' | 'Onboarded' | 'Rejected' | 'Graduated',
  rejectionRemark: string,
  rejectedDate: ISO date string,
  rejectedFromStage: string,
  
  // Onboarded fields
  onboardedDate: ISO date string,
  achievements: [{
    achievement: string,
    revenue: number,
    date: ISO date string
  }],
  
  // Graduated fields
  graduatedDate: ISO date string,
  
  // One-on-One fields
  oneOnOneFeedbackCompleted: boolean,
  oneOnOneHistory: [{
    date: string,
    time: string,
    mentorName: string,
    feedback: string,
    scheduled: boolean,
    completed: boolean,
    scheduledAt: ISO date string
  }]
}
```

## 🔒 Stage Flow Summary

```
S0 (Registration)
  ├─→ Reject (with remark) → LOCKED
  └─→ Continue to S1

S1/S2/S3 (Pitch Stages)
  ├─→ Reject (with remark) → LOCKED
  ├─→ One-on-One
  └─→ Onboard → Onboarded Stage

One-on-One
  ├─→ Schedule Meeting
  ├─→ Submit Feedback
  ├─→ Reject (with remark) → LOCKED
  └─→ Onboard → Onboarded Stage

Onboarded
  ├─→ Upload Achievements (multiple)
  └─→ Graduate → LOCKED

Graduated/Rejected
  └─→ LOCKED (View Only)
```

## 🎯 Key Features

1. **Stage-Aware UI**: Different action buttons based on current stage
2. **Mandatory Remarks**: All rejections require detailed reasons
3. **Achievement Tracking**: Onboarded startups can track multiple achievements
4. **Revenue Tracking**: Optional revenue field for each achievement
5. **Complete History**: All actions (meetings, feedback, rejections) are logged
6. **Locked States**: Final statuses (Graduated/Rejected) prevent further edits
7. **Visual Feedback**: Color-coded sections and status badges
8. **Responsive Design**: Works on all screen sizes

## 🚀 Usage

### To Reject a Startup (Any Stage):
1. Click "Reject" or "Reject Startup" button
2. Modal appears with startup details
3. Enter mandatory rejection reason
4. Click "Confirm Rejection"
5. Startup is locked and marked as Rejected

### To Schedule One-on-One:
1. Move startup to One-on-One stage
2. Click "Schedule Meeting"
3. Enter date and time
4. Click "Confirm Meeting"
5. Feedback form appears
6. Enter mentor name and feedback
7. Choose to Reject or Onboard

### To Upload Achievement:
1. Startup must be in Onboarded status
2. Click "Upload Achievement"
3. Enter achievement details
4. Optionally enter revenue
5. Click "Save Achievement"
6. Repeat for multiple achievements

### To Graduate:
1. Startup must be in Onboarded status
2. Click "Graduate" button
3. Confirm graduation
4. Startup is locked and marked as Graduated

## ✨ Benefits

- **Clear Workflow**: Each stage has specific actions
- **Accountability**: All rejections require documented reasons
- **Progress Tracking**: Achievements and revenue are tracked
- **Data Integrity**: Locked states prevent accidental changes
- **Better Reporting**: Complete history of all actions
- **User-Friendly**: Intuitive UI with clear visual feedback
