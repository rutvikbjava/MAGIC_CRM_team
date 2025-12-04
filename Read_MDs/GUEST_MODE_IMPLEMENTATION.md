# Guest Mode Implementation - View Only Access

## Overview
Implemented comprehensive guest mode restrictions to ensure guests can only view the website without making any changes.

## Key Features

### 1. Guest Restrictions
Guests are now restricted from:
- ✅ Adding new startups
- ✅ Editing startup information
- ✅ Deleting startups
- ✅ Scheduling SMC sessions
- ✅ Marking SMC sessions as complete (giving feedback)
- ✅ Adding one-on-one sessions
- ✅ Onboarding startups
- ✅ Rejecting startups

### 2. Visual Indicators
- All restricted buttons show "View only mode" text below them
- Lock icon displayed on restricted buttons
- Buttons are visually dimmed (60% opacity) for guests

### 3. Access Request System
When a guest clicks on any restricted button:
- A modal popup appears with:
  - Clear message: "You cannot [action] in guest mode"
  - Highlighted warning about view-only access
  - Two options:
    - Close the modal
    - "Ask Admin for Access" button

### 4. Admin Access Request Management
- Admin can see all pending access requests in Settings page
- Requests show:
  - Guest username
  - Action type requested (add, edit, delete, schedule, feedback, onboard, reject)
  - Timestamp
- Admin can:
  - Approve requests (marks as approved)
  - Deny requests (marks as denied)
- Requests appear in a highlighted orange section at the top of Settings

## Technical Implementation

### New Component: GuestRestrictedButton
- Wraps all action buttons throughout the application
- Props:
  - `isGuest`: Boolean to determine if user is guest
  - `onClick`: Function to execute when clicked (only for admin)
  - `actionType`: Type of action (add, edit, delete, schedule, feedback, onboard, reject)
  - `className`: Button styling
  - `children`: Button content
- Shows modal when guest clicks
- Stores access requests in localStorage

### Updated Components
1. **AllStartups.jsx** - Register Startup button
2. **StartupCard.jsx** - Edit, Delete, Onboard, One-on-One, Reject buttons
3. **StartupGridCard.jsx** - Delete button
4. **SMCScheduling.jsx** - Schedule SMC, Mark Done buttons
5. **OneOnOne.jsx** - Add Session, Onboard, Reject buttons
6. **Onboarded.jsx** - Passes isGuest prop
7. **Rejected.jsx** - Passes isGuest prop
8. **Settings.jsx** - Access request management section

### Data Storage
- Access requests stored in localStorage under key: `accessRequests`
- Each request contains:
  - id: Unique identifier
  - username: Guest username
  - actionType: Type of action requested
  - timestamp: When request was made
  - status: 'pending', 'approved', or 'denied'

## Usage

### For Guests
1. Login with guest credentials
2. Browse all pages and view all information
3. Click on any action button to see restriction message
4. Request access from admin if needed

### For Admins
1. Login with admin credentials
2. Navigate to Settings page
3. View pending access requests at the top
4. Approve or deny requests as needed

## Bug Fixes Applied

### Issue 1: Buttons Not Showing Modal
**Problem**: Guest buttons were disabled, preventing click events from firing.
**Solution**: Removed `disabled` attribute and changed cursor to `cursor-pointer` so guests can click to see the restriction modal.

### Issue 2: Edit Profile Not Restricted
**Problem**: Guests could access the Edit Profile modal from StartupDetailModal.
**Solution**: Added GuestRestrictedButton wrapper to the Edit button in StartupDetailModal and all action buttons (Onboard, One-on-One, Reject).

## Testing
Test the following scenarios:
1. ✅ Guest cannot add new startup - Shows modal popup
2. ✅ Guest cannot edit existing startup - Shows modal popup
3. ✅ Guest cannot delete startup - Shows modal popup
4. ✅ Guest cannot schedule SMC - Shows modal popup
5. ✅ Guest cannot mark SMC as complete - Shows modal popup
6. ✅ Guest cannot add one-on-one session - Shows modal popup
7. ✅ Guest cannot onboard/reject startups - Shows modal popup
8. ✅ Guest can click buttons to see restriction message
9. ✅ Guest can request access from modal
10. ✅ Admin can see and manage access requests in Settings
11. ✅ All buttons show "View only mode" indicator for guests
12. ✅ Modal appears when guest clicks any restricted button
