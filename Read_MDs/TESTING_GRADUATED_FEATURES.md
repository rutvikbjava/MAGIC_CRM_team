# Testing Guide: Graduated Section & Achievements

## Quick Test Scenarios

### Scenario 1: Graduate a Startup

**Prerequisites:**
- Have at least one startup with "Onboarded" status

**Steps:**
1. Login as admin (username: `admin`, password: `magic2024`)
2. Navigate to "Onboarded" section from sidebar
3. Click on any onboarded startup card
4. In the detail modal, look for the purple/pink gradient box
5. Click "Graduate Startup" button
6. When prompted, enter a date (e.g., `2024-12-01`) or leave empty for today
7. Click OK to confirm
8. Modal should close

**Expected Results:**
- ✅ Startup disappears from Onboarded section
- ✅ Startup appears in Graduated section
- ✅ Dashboard "Graduated" count increases by 1
- ✅ Dashboard "Onboarded" count decreases by 1
- ✅ Startup status badge shows "Graduated" in purple

---

### Scenario 2: View Graduated Startups

**Steps:**
1. Click "Graduated" in the sidebar
2. View the graduated startups page

**Expected Results:**
- ✅ Page title shows "Graduated Startups" in purple/pink gradient
- ✅ Count shows correct number of graduated startups
- ✅ Graduation cap icon visible
- ✅ Search bar works for filtering
- ✅ Grid/List view toggle works
- ✅ Export CSV button present
- ✅ Graduated date displayed (if available)

---

### Scenario 3: Add Achievement (Admin)

**Prerequisites:**
- Have at least one Onboarded or Graduated startup

**Steps:**
1. Open any Onboarded or Graduated startup detail
2. Scroll to "Achievements & Updates" section
3. Click "Add New" button
4. Fill in the form:
   - Type: Select "Patent"
   - Date: Select today's date
   - Title: "AI Algorithm Patent Approved"
   - Description: "Our innovative AI algorithm received patent approval from USPTO"
5. Click "Add Achievement" button

**Expected Results:**
- ✅ Form expands when "Add New" clicked
- ✅ All fields are editable
- ✅ Achievement appears in the list immediately
- ✅ Purple badge shows "Patent"
- ✅ Date displays correctly
- ✅ Title and description are visible
- ✅ Delete button (trash icon) is visible

---

### Scenario 4: Add Achievement with Attachments

**Prerequisites:**
- Have a test PDF file and an image file ready

**Steps:**
1. Open any Onboarded or Graduated startup
2. Go to "Achievements & Updates" section
3. Click "Add New"
4. Fill basic details:
   - Type: "Award"
   - Title: "Best Startup Award 2024"
   - Description: "Won first place at Tech Innovation Summit"
5. Click the upload area under "Attachments"
6. Select a PDF file (e.g., certificate.pdf)
7. Click upload area again
8. Select an image file (e.g., award-photo.jpg)
9. Verify both files appear in the list
10. Click "Add Achievement"

**Expected Results:**
- ✅ Upload area accepts multiple files
- ✅ File names and sizes display correctly
- ✅ Different icons for PDF vs image
- ✅ Can remove files before saving (X button)
- ✅ Achievement saves with attachments
- ✅ Attachments appear as downloadable links
- ✅ Clicking attachment link downloads the file

---

### Scenario 5: View Achievements (Guest Mode)

**Steps:**
1. Logout from admin account
2. Login as guest (create a guest account first via Settings)
3. Navigate to Graduated section
4. Open any startup with achievements
5. Try to click "Add New" button

**Expected Results:**
- ✅ Can view all achievements
- ✅ Can see attachment links
- ✅ Can download attachments
- ✅ "Add New" button shows lock icon
- ✅ Clicking "Add New" shows guest restriction modal
- ✅ No delete buttons visible on achievements
- ✅ Modal explains view-only access

---

### Scenario 6: Delete Achievement (Admin)

**Prerequisites:**
- Have at least one achievement added

**Steps:**
1. Login as admin
2. Open startup with achievements
3. Click trash icon on any achievement
4. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Achievement is removed from list
- ✅ Data persists after page refresh

---

### Scenario 7: Export Graduated Startups

**Steps:**
1. Navigate to Graduated section
2. Click "Export CSV" button

**Expected Results:**
- ✅ CSV file downloads automatically
- ✅ Filename format: `graduated-startups-YYYY-MM-DD.csv`
- ✅ File contains correct headers
- ✅ All graduated startups included
- ✅ Graduation dates included

---

### Scenario 8: Dashboard Integration

**Steps:**
1. Go to Dashboard
2. Locate the "Graduated" card

**Expected Results:**
- ✅ Card displays with purple border
- ✅ Graduation cap icon visible
- ✅ Correct count of graduated startups
- ✅ Clicking card navigates to Graduated section

---

### Scenario 9: Data Persistence

**Steps:**
1. Graduate a startup
2. Add 2-3 achievements with attachments
3. Close browser completely
4. Reopen application
5. Navigate to Graduated section
6. Open the graduated startup

**Expected Results:**
- ✅ Graduated status persists
- ✅ Graduation date retained
- ✅ All achievements visible
- ✅ Attachments still downloadable
- ✅ No data loss

---

### Scenario 10: Large File Upload

**Steps:**
1. Try to upload a file larger than 10MB
2. Try to upload a non-supported file type (e.g., .exe)

**Expected Results:**
- ✅ Alert shows "File size should be less than 10MB"
- ✅ File is not added to the list
- ✅ Can continue with other files

---

## Edge Cases to Test

### Edge Case 1: Graduate Already Graduated Startup
- Open a graduated startup
- Verify no "Graduate" button appears
- Only achievements section should be editable

### Edge Case 2: Empty Achievements List
- Open startup with no achievements
- Should show empty state with icon
- Message: "No achievements added yet"

### Edge Case 3: Multiple Attachments
- Add achievement with 5+ attachments
- Verify all display correctly
- Test downloading each one

### Edge Case 4: Long Text in Achievements
- Add achievement with very long title (100+ characters)
- Add very long description (500+ words)
- Verify text wraps properly
- No layout breaking

### Edge Case 5: Special Characters
- Add achievement with special characters in title: `"Test & Achievement <2024>"`
- Verify displays correctly
- No XSS vulnerabilities

---

## Performance Tests

### Test 1: Many Achievements
- Add 20+ achievements to one startup
- Verify scrolling is smooth
- Check load time

### Test 2: Large Attachments
- Add multiple 8-9MB files
- Check localStorage usage
- Verify browser doesn't slow down

### Test 3: Many Graduated Startups
- Graduate 50+ startups
- Check grid view performance
- Test search functionality

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Regression Tests

Ensure existing features still work:
- [ ] Register new startup
- [ ] Move through S1, S2, S3 stages
- [ ] Onboard startup
- [ ] Reject startup
- [ ] Schedule SMC
- [ ] One-on-One sessions
- [ ] Edit startup profile
- [ ] Dark mode toggle
- [ ] Guest mode restrictions
- [ ] Export other sections

---

## Bug Report Template

If you find issues, report using this format:

```
**Bug Title:** [Brief description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Browser:** [Chrome/Firefox/Safari/Edge]
**Version:** [Browser version]
**User Role:** [Admin/Guest]

**Screenshots:** [If applicable]

**Console Errors:** [Any errors in browser console]
```

---

## Success Criteria

All tests pass when:
- ✅ No console errors
- ✅ All features work as expected
- ✅ Data persists correctly
- ✅ Guest restrictions enforced
- ✅ UI is responsive
- ✅ No performance issues
- ✅ Files upload/download correctly
- ✅ Export functions work

---

## Test Data Cleanup

After testing, you can:
1. Go to Settings
2. Use "Clear All Data" to reset
3. Or manually delete graduated startups
4. Or keep test data for demo purposes

---

## Automated Testing (Future)

Consider adding:
- Unit tests for AchievementManager
- Integration tests for graduation flow
- E2E tests with Playwright/Cypress
- File upload/download tests
- LocalStorage tests

---

## Notes for Testers

- Test with realistic data (company names, descriptions, etc.)
- Try to break the system (edge cases)
- Test on different screen sizes
- Check accessibility (keyboard navigation)
- Verify all text is readable in dark mode
- Test with slow internet (if applicable)

---

## Feedback Collection

After testing, provide feedback on:
1. Ease of use
2. UI/UX clarity
3. Performance
4. Missing features
5. Improvement suggestions
6. Documentation clarity

---

Happy Testing! 🚀
