# Inactive Startups - Navigation & Features

## Overview
A comprehensive system to track and manage startups that have been inactive for more than 30 days, accessible through multiple entry points.

## Access Points

### 1. Navigation Sidebar
- **Location:** Left sidebar menu
- **Icon:** ⚠️ Warning triangle icon
- **Label:** "Inactive Startups"
- **Position:** Third item in the menu (after Dashboard and All Startups)

### 2. Dashboard Notification Card
- **Location:** Bottom of the dashboard
- **Visibility:** Only appears when there are inactive startups
- **Features:**
  - Shows count of inactive startups
  - Displays up to 3 startups with details
  - "View All Inactive Startups" button to navigate to full page
  - Individual dismiss buttons
  - "Dismiss All" option for multiple startups

## Inactive Startups Page Features

### Statistics Overview
Six filter cards showing:
- **Total** - All inactive startups (orange/red gradient)
- **S0** - Inactive startups in S0 stage (gray)
- **S1** - Inactive startups in S1 stage (blue)
- **S2** - Inactive startups in S2 stage (purple)
- **S3** - Inactive startups in S3 stage (orange)
- **1-on-1** - Inactive startups in One-on-One stage (indigo)

Click any card to filter the list by that stage.

### Startup Cards Display
Each inactive startup card shows:

#### Left Section - Startup Information
- Company name (large, bold)
- Current stage badge (color-coded)
- Days inactive badge (red, prominent)
- Founder name
- City and sector
- Last activity type (SMC Meeting, One-on-One, Pitch Session, etc.)
- Last activity date
- MAGIC code

#### Right Section - Contact & Actions
- Email address with icon
- Phone number with icon
- **Send Email** button (blue) - Opens default email client
- **Call Now** button (green) - Initiates phone call

### Page Actions
- **Refresh Button** - Top right corner, manually refresh the list
- **Filter Cards** - Click to filter by stage
- **Contact Buttons** - Direct email and phone actions

## Monitoring Criteria

### Eligible Stages
Only monitors startups in:
- S0 (Registered)
- S1 (Stage 1)
- S2 (Stage 2)
- S3 (Stage 3)
- One-on-One (Mentorship)

### Excluded Statuses
Does NOT monitor:
- Onboarded startups
- Graduated startups
- Rejected startups

### Activity Sources Checked
The system checks for activity from:
1. **Completed SMC meetings** - From SMC scheduling
2. **Completed One-on-One sessions** - From mentorship scheduling
3. **Pitch history** - Recorded pitch sessions
4. **One-on-One history** - Mentorship session records
5. **Registration date** - Fallback if no other activity

### Inactivity Threshold
- **30 days** - Startups with no activity for more than 30 days are flagged

## User Workflow

### For Administrators
1. **Check Dashboard** - View notification card for quick overview
2. **Navigate to Page** - Click "View All Inactive Startups" or sidebar menu
3. **Filter by Stage** - Click stage cards to focus on specific stages
4. **Review Details** - Check last activity and days inactive
5. **Take Action:**
   - Click "Send Email" to reach out
   - Click "Call Now" to make a phone call
   - Schedule new meetings in SMC or One-on-One pages
6. **Refresh** - Click refresh button to update the list after taking action

### Best Practices
- Check the page at least once a week
- Follow up with startups inactive for 35+ days
- Document all follow-up attempts
- Schedule regular check-in meetings
- Use filters to prioritize by stage

## Technical Details

### Data Refresh
- **Dashboard card:** Auto-refreshes every 60 minutes
- **Dedicated page:** Manual refresh via button
- **Real-time updates:** When meetings are completed

### Performance
- Efficient filtering and sorting
- Responsive design for all screen sizes
- Smooth animations and transitions
- Fast load times even with many startups

## Color Coding

### Stage Colors
- **S0:** Gray
- **S1:** Blue
- **S2:** Purple
- **S3:** Orange
- **One-on-One:** Indigo

### Alert Colors
- **Warning:** Orange/Red gradient
- **Inactive badge:** Red background
- **Days count:** Red text

## Benefits
✅ **Proactive Management** - Catch inactive startups early
✅ **Easy Access** - Multiple entry points for convenience
✅ **Quick Actions** - Direct contact buttons for immediate follow-up
✅ **Visual Clarity** - Color-coded stages and clear indicators
✅ **Filtering** - Focus on specific stages as needed
✅ **Complete Information** - All relevant details in one place
