# Testing Guide - Stage Management Updates

## 🚀 Servers Running

- **Frontend**: http://localhost:5175
- **Backend**: http://localhost:5000

## 🧪 Test Scenarios

### Test 1: S0 Stage Rejection
**Objective**: Test rejection at registration stage

1. Navigate to "All Startups" tab
2. Register a new startup (fill all required fields)
3. The startup will be in S0 stage
4. Click on the startup card to expand
5. Look for "Reject Startup" button
6. Click "Reject Startup"
7. **Expected**: Modal appears asking for rejection reason
8. Enter a reason (e.g., "Incomplete documentation")
9. Click "Confirm Rejection"
10. **Expected**: 
    - Startup status changes to "Rejected"
    - Card becomes locked (view-only)
    - Rejection details section appears showing the remark
    - Edit/Delete buttons are hidden

### Test 2: One-on-One Flow
**Objective**: Test complete One-on-One mentorship flow

1. Create or select a startup in S1/S2/S3 stage
2. Click "One-on-One" button
3. **Expected**: Startup moves to One-on-One stage
4. Navigate to "One-on-One" tab
5. Find the startup and expand the card
6. **Expected**: See "Schedule Meeting" button
7. Click "Schedule Meeting"
8. Enter date and time
9. Click "Confirm Meeting"
10. **Expected**: Feedback form appears
11. Enter:
    - Mentor Name: "John Doe"
    - Feedback: "Great progress on MVP development"
12. Click "Submit Feedback"
13. **Expected**: Two buttons appear - "Reject" and "Onboard"
14. Test both paths:
    - **Path A (Reject)**: Click Reject → Enter remark → Confirm → Card locked
    - **Path B (Onboard)**: Click Onboard → Status changes to Onboarded

### Test 3: Onboarded Stage - Achievement Upload
**Objective**: Test achievement tracking for onboarded startups

1. Have a startup in "Onboarded" status
2. Navigate to "Onboarded" tab
3. Find and expand the startup card
4. **Expected**: See "Upload Achievement" button
5. Click "Upload Achievement"
6. Enter:
    - Achievement: "Secured first 100 customers"
    - Revenue: "500000"
7. Click "Save Achievement"
8. **Expected**: Achievement appears in "Achievements & Revenue" section
9. Repeat steps 5-8 to add multiple achievements
10. **Expected**: All achievements are listed with dates

### Test 4: Graduate Startup
**Objective**: Test graduation and final locking

1. Have a startup in "Onboarded" status with at least one achievement
2. Click "Graduate" button
3. Confirm graduation
4. **Expected**:
    - Status changes to "Graduated"
    - Card becomes locked
    - "Upload Achievement" button disappears
    - Edit/Delete buttons are hidden
5. Navigate to "Graduated" tab
6. **Expected**: Startup appears in graduated list

### Test 5: Rejection from Different Stages
**Objective**: Test rejection works at all stages

Test rejection from each stage:
- **S0**: Use "Reject Startup" button
- **S1/S2/S3**: Use "Reject" button in action buttons
- **One-on-One**: Use "Reject" button after feedback

For each:
1. Click reject button
2. **Expected**: Modal appears
3. Try clicking "Confirm Rejection" without entering remark
4. **Expected**: Error message "Rejection reason is required"
5. Enter a detailed reason
6. Click "Confirm Rejection"
7. **Expected**:
    - Status = "Rejected"
    - Card locked
    - Rejection details section shows:
      - Rejection remark
      - Rejected from stage
      - Rejection date

### Test 6: Locked State Verification
**Objective**: Verify locked startups cannot be edited

1. Have a startup in "Rejected" or "Graduated" status
2. Open the startup card
3. **Expected**:
    - Lock icon banner at top
    - "This startup is locked (View Only)" message
    - No Edit button
    - No Delete button
    - No action buttons
    - Card has reduced opacity
4. Try to access any edit functionality
5. **Expected**: No edit options available

### Test 7: Registration Form - All Fields
**Objective**: Test the enhanced registration form

1. Click "Register Startup" button
2. **Expected**: Form opens with 3 sections
3. Verify all sections are collapsible
4. **Section 1 - Startup Info**:
   - Required fields have red asterisk (*)
   - Test "Sector" dropdown - select "Other"
   - **Expected**: Text field appears for custom sector
   - Test "Do You Have a Patent?" - select "Yes"
   - **Expected**: Patent number field appears
   - Test "Is your Startup Registered?" - select "Yes"
   - **Expected**: Registration date field appears
   - Test "Do you have paying customers?" - select "Yes"
   - **Expected**: Revenue field appears
4. **Section 2 - Founder Info**:
   - All required fields marked with *
   - Test email validation
   - Test mobile number format
5. **Section 3 - Registration Info**:
   - Registration date auto-filled with today
6. Try submitting without filling required fields
7. **Expected**: Error messages in red below empty required fields
8. Fill all required fields and submit
9. **Expected**: Startup created successfully

### Test 8: Data Persistence
**Objective**: Verify all data is saved correctly

1. Create a startup and add various data:
   - Basic info
   - One-on-One sessions
   - Achievements
   - Rejection remarks
2. Refresh the page
3. **Expected**: All data persists
4. Navigate between tabs
5. **Expected**: Data remains consistent

### Test 9: Visual Feedback
**Objective**: Test UI/UX elements

1. Check color coding:
   - S0: Gray gradient
   - S1: Blue gradient
   - S2: Purple gradient
   - S3: Orange gradient
   - One-on-One: Indigo gradient
   - Onboarded: Green gradient
   - Graduated: Purple gradient
   - Rejected: Red gradient
2. Check status badges:
   - Active: Blue
   - Onboarded: Green
   - Rejected: Red
   - Graduated: Purple
3. Check hover effects on buttons
4. Check responsive design (resize browser)

### Test 10: Edge Cases
**Objective**: Test unusual scenarios

1. **Empty States**:
   - Navigate to each tab with no startups
   - **Expected**: Friendly empty state message
2. **Multiple Actions**:
   - Try rapid clicking on action buttons
   - **Expected**: Confirmation dialogs prevent duplicate actions
3. **Long Text**:
   - Enter very long rejection remarks
   - **Expected**: Text wraps properly
4. **Special Characters**:
   - Enter special characters in text fields
   - **Expected**: Handled gracefully

## ✅ Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Smooth transitions between stages
- ✅ Data persists correctly
- ✅ Locked states prevent editing
- ✅ All required fields validated
- ✅ Rejection remarks mandatory and displayed
- ✅ Achievements tracked properly
- ✅ UI responsive and intuitive

## 🐛 Known Issues to Watch For

- Ensure rejection modal closes after confirmation
- Verify achievement upload form resets after submission
- Check that locked cards don't show action buttons
- Confirm rejection remarks display in dedicated section

## 📊 Test Data Examples

### Sample Rejection Remarks:
- "Incomplete business model documentation"
- "Market validation insufficient"
- "Team lacks technical expertise"
- "Product not aligned with incubator focus"

### Sample Achievements:
- "Secured seed funding of ₹50,00,000"
- "Launched MVP with 500+ active users"
- "Signed partnership with major enterprise client"
- "Generated ₹10,00,000 in first quarter revenue"

### Sample Feedback:
- "Excellent progress on product development. Focus on customer acquisition next."
- "Need to improve pitch deck and financial projections."
- "Strong team dynamics. Ready for investor meetings."

## 🎯 Priority Test Order

1. **High Priority**:
   - Test 5: Rejection from all stages
   - Test 6: Locked state verification
   - Test 2: One-on-One flow

2. **Medium Priority**:
   - Test 3: Achievement upload
   - Test 4: Graduate startup
   - Test 7: Registration form

3. **Low Priority**:
   - Test 9: Visual feedback
   - Test 10: Edge cases
   - Test 8: Data persistence

## 📝 Bug Report Template

If you find issues, report using this format:

```
**Bug Title**: [Brief description]
**Test Scenario**: [Which test from above]
**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Result**: 
**Actual Result**: 
**Screenshots**: [If applicable]
**Browser**: [Chrome/Firefox/etc.]
**Console Errors**: [Copy any errors]
```

## 🎉 Happy Testing!

The system is now ready for comprehensive testing. All features have been implemented according to the requirements.
