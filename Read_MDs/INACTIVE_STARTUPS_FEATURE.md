# Inactive Startups Notification Feature

## Overview
The system now automatically detects and displays notifications for startups that have been inactive for more than 30 days.

## How It Works

### Eligible Stages
The notification system monitors startups in the following stages:
- **S0** (Registered)
- **S1** (Stage 1)
- **S2** (Stage 2)
- **S3** (Stage 3)
- **One-on-One** (Mentorship)

### Excluded Stages
The following statuses are **NOT** monitored:
- **Onboarded** - These startups have completed the program
- **Graduated** - These startups have successfully graduated
- **Rejected** - These startups are no longer active

### Activity Tracking
The system checks for the most recent activity from multiple sources:
1. **SMC Meetings** - Completed Saturday Mentorship Clinic sessions
2. **One-on-One Meetings** - Completed mentorship sessions
3. **Pitch History** - Recorded pitch sessions
4. **Registration Date** - Initial startup registration

### Notification Criteria
A startup is flagged as inactive if:
- No meeting has been scheduled or completed in the last 30 days
- No activity has been recorded in the last 30 days

## Access Points

### 1. Dashboard Notification Card
When inactive startups are detected, an alert card appears on the dashboard showing:
- **Total count** of inactive startups
- **Company name** and current stage
- **Days inactive** - Number of days since last activity
- **Last activity type** - What was the last recorded activity
- **Last activity date** - When the last activity occurred
- **Contact information** - Email and phone number
- **Quick actions** - Send email or call buttons

### Features (Dashboard Card)
- **Auto-refresh** - Checks every hour for new inactive startups
- **Dismissible** - Individual notifications can be dismissed
- **Dismiss all** - Option to dismiss all notifications at once
- **Contact shortcuts** - Direct email and phone links for quick follow-up

### 2. Dedicated Inactive Startups Page
A full page accessible from the navigation sidebar that displays:
- **Complete list** of all inactive startups
- **Filter by stage** - View inactive startups by S0, S1, S2, S3, or One-on-One
- **Statistics cards** - Quick overview of inactive count per stage
- **Detailed information** - Full startup details including founder, city, sector, MAGIC code
- **Activity tracking** - Shows last activity type and date
- **Days inactive** - Clear indicator of how long the startup has been inactive
- **Contact actions** - Direct email and phone buttons for each startup
- **Refresh button** - Manually refresh the list at any time

### Navigation
Access the Inactive Startups page from:
- **Sidebar menu** - Click "Inactive Startups" (with warning icon)
- **Dashboard notification** - Click on any inactive startup card

## Usage

### For Administrators
1. Check the dashboard regularly for inactive startup notifications
2. Click "Send Email" to reach out via email
3. Click "Call" to initiate a phone call
4. Dismiss notifications after following up
5. Schedule new meetings to reactivate startups

### Best Practices
- Follow up with inactive startups within 35-40 days
- Document all follow-up attempts
- Schedule regular check-in meetings
- Use the notification system as an early warning system

## Technical Details

### Data Sources
- `startups` - Main startup data from localStorage
- `smcSchedules` - SMC meeting schedules
- `oneOnOneSchedules` - One-on-one meeting schedules

### Update Frequency
- Automatic check every 60 minutes
- Manual refresh on page reload
- Real-time updates when meetings are completed

## Benefits
- **Proactive engagement** - Catch inactive startups before they drop out
- **Better retention** - Maintain regular contact with all startups
- **Time management** - Focus attention on startups that need it most
- **Data-driven** - Make decisions based on actual activity data
