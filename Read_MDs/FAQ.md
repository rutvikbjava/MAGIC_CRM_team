# ❓ Frequently Asked Questions - MAGIC Incubation System

## 🔐 Authentication & Login

### Q: What are the default login credentials?
**A:** Username: `admin` | Password: `magic2024`

### Q: Can I change the password?
**A:** Yes, but you'll need to modify the code in `src/App.jsx` in the `handleLogin` function. For production use, consider implementing a proper authentication system.

### Q: What happens if I forget the password?
**A:** The password is hardcoded in the source code. Check `src/App.jsx` or use the default: `magic2024`

### Q: Can multiple admins login?
**A:** Currently, it's a single admin system. All users share the same credentials and data.

### Q: Does the session expire?
**A:** No, the session persists until you logout or clear browser data.

## 💾 Data & Storage

### Q: Where is my data stored?
**A:** All data is stored in your browser's localStorage. It's saved locally on your computer.

### Q: Is my data secure?
**A:** LocalStorage is not encrypted. Don't store highly sensitive information. For production with sensitive data, consider adding a backend.

### Q: How much data can I store?
**A:** Browser localStorage typically allows 5-10MB. This is enough for 1,000-5,000 startups depending on data size.

### Q: Will my data be lost if I close the browser?
**A:** No, localStorage persists even after closing the browser. Data remains until you clear it manually or clear browser data.

### Q: How do I backup my data?
**A:** Go to Settings → Export Data. This downloads a JSON file with all your data. Save it securely.

### Q: How often should I backup?
**A:** We recommend weekly backups, or before any major changes.

### Q: Can I restore data from a backup?
**A:** Yes! Go to Settings → Import Data and select your JSON backup file.

### Q: What happens if I clear browser data?
**A:** All startup data will be lost. Always keep backups!

### Q: Can I transfer data to another computer?
**A:** Yes! Export data on one computer, then import it on another.

## 🚀 Startup Management

### Q: How do I register a new startup?
**A:** Click "Register Startup" button on Dashboard or All Startups page. Fill the 3-section form and submit.

### Q: Can I edit a startup after registration?
**A:** Currently, editing is not implemented. You can delete and re-register, or modify the code to add edit functionality.

### Q: What does "Magic Code" mean?
**A:** It's a unique identifier for each startup (like MAGIC001, MAGIC002). You assign this during registration.

### Q: Can I delete a startup?
**A:** Yes, but only if it's not Onboarded or Rejected. Click the trash icon on the startup card.

### Q: What happens to deleted startups?
**A:** They're permanently removed. Make sure to export data before deleting important startups.

## 📅 SMC Scheduling

### Q: Why can I only schedule on Saturdays?
**A:** SMC stands for "Saturday Mentorship Clinic" - it's designed for Saturday-only sessions.

### Q: Can I change the available days?
**A:** Yes, modify the `getSaturdays()` function in `src/components/SMCScheduling.jsx`.

### Q: What are the available time slots?
**A:** 10 AM, 11 AM, 2 PM, and 3 PM. You can modify these in the `timeSlots` array.

### Q: Can I schedule multiple startups in the same slot?
**A:** No, each time slot can only have one startup to avoid conflicts.

### Q: What if I need to cancel a scheduled SMC?
**A:** Currently, you need to manually manage this. Consider adding a cancel feature or delete the schedule from localStorage.

### Q: How far in advance can I schedule?
**A:** The calendar shows the next 12 Saturdays (about 3 months).

## 🎤 Pitch & Stage Progression

### Q: What do S0, S1, S2, S3 mean?
**A:** 
- **S0:** Just registered, no pitch yet
- **S1:** After 1st pitch
- **S2:** After 2nd pitch  
- **S3:** After 3rd pitch

### Q: How does stage progression work?
**A:** Automatically after completing each SMC session:
- Complete 1st SMC → S0 to S1
- Complete 2nd SMC → S1 to S2
- Complete 3rd SMC → S2 to S3

### Q: Can I manually change a startup's stage?
**A:** Not through the UI. Stages progress automatically based on SMC completions.

### Q: What happens at S1?
**A:** You get 3 decision options: Onboard, Move to One-on-One, or Reject.

### Q: Can I skip stages?
**A:** No, startups must progress through each stage sequentially.

### Q: What if a startup doesn't need 3 pitches?
**A:** At S1, you can directly Onboard them without going through S2 and S3.

## 🤝 One-on-One Mentorship

### Q: When should I use One-on-One?
**A:** When a startup needs personalized mentorship before final onboarding decision.

### Q: How many One-on-One sessions can I add?
**A:** Unlimited. Add as many sessions as needed.

### Q: Can I go back from One-on-One to SMC?
**A:** No, the workflow is one-way. Once in One-on-One, you can only Onboard or Reject.

### Q: Who can be a mentor?
**A:** Anyone you choose. Enter their name when adding a session.

## 🌟 Onboarded & Rejected

### Q: What does "Onboarded" mean?
**A:** The startup has been accepted into your incubation program. This is a success status.

### Q: Can I un-onboard a startup?
**A:** No, Onboarded status is final and locked. This ensures data integrity.

### Q: Can I restore a rejected startup?
**A:** No, Rejected status is also final and locked.

### Q: Why are these statuses locked?
**A:** To maintain clear records and prevent accidental changes to final decisions.

### Q: Can I export onboarded startups?
**A:** Yes! Go to Onboarded page and click "Export CSV".

## 🎨 UI & Appearance

### Q: How do I enable dark mode?
**A:** Click the moon/sun icon in the sidebar, or go to Settings page.

### Q: Does dark mode preference save?
**A:** Yes, it's saved in localStorage and persists across sessions.

### Q: Can I customize the colors?
**A:** Yes! Edit the gradient colors in component files or modify `tailwind.config.js`.

### Q: Why are there different colors for each stage?
**A:** Visual differentiation helps quickly identify startup stages:
- Gray (S0), Blue (S1), Purple (S2), Orange (S3), Indigo (One-on-One), Green (Onboarded), Red (Rejected)

### Q: Can I change the sidebar gradient?
**A:** Yes, edit the gradient classes in `src/components/Sidebar.jsx`.

## 🔍 Search & Filter

### Q: What can I search for?
**A:** Company name, founder name, magic code, sector, and city.

### Q: Is search case-sensitive?
**A:** No, search is case-insensitive.

### Q: Can I search by date?
**A:** Not currently, but you can add this feature by modifying the filter logic.

### Q: How do I clear search?
**A:** Delete the text in the search box or refresh the page.

## 🚀 Deployment & Hosting

### Q: Do I need a server to run this?
**A:** No! It's a static site that runs entirely in the browser.

### Q: Where can I deploy this?
**A:** Netlify, Vercel, GitHub Pages, Firebase Hosting, or any static host. All have free tiers!

### Q: How much does hosting cost?
**A:** Free! All recommended platforms offer free hosting for static sites.

### Q: Do I need a database?
**A:** No, it uses browser localStorage instead of a database.

### Q: Can multiple users access it simultaneously?
**A:** Yes, but each user has their own local data. For shared data, you'd need to add a backend.

### Q: How do I update the deployed version?
**A:** Build the project (`npm run build`) and redeploy the `dist` folder.

## 🔧 Technical Questions

### Q: What if I get "npm: command not found"?
**A:** Install Node.js from https://nodejs.org/

### Q: What Node.js version do I need?
**A:** Version 16 or higher.

### Q: Can I use yarn instead of npm?
**A:** Yes! Replace `npm install` with `yarn install` and `npm run dev` with `yarn dev`.

### Q: Why is the port 5173?
**A:** That's Vite's default port. You can change it with `npm run dev -- --port 3000`.

### Q: How do I fix "port already in use" error?
**A:** Kill the process using that port or use a different port (see above).

### Q: Can I add more features?
**A:** Absolutely! The code is modular and easy to extend.

### Q: Is the code open source?
**A:** Check with CMIA Marathwada Industries for licensing details.

## 📱 Mobile & Responsive

### Q: Does it work on mobile?
**A:** Yes! Fully responsive design works on phones, tablets, and desktops.

### Q: Can I use it on iPad?
**A:** Yes, it works great on tablets.

### Q: Is there a mobile app?
**A:** No, but the web app is mobile-friendly and can be added to home screen.

### Q: Can I make it a PWA (Progressive Web App)?
**A:** Yes, you can add PWA features by configuring a service worker and manifest.

## 🐛 Troubleshooting

### Q: The page is blank after deployment
**A:** Check browser console for errors. Verify all assets loaded correctly.

### Q: Data disappeared after browser update
**A:** Browser updates shouldn't affect localStorage. Check if browser data was cleared.

### Q: Animations are laggy
**A:** Try closing other browser tabs or use a more powerful device.

### Q: Dark mode doesn't work
**A:** Clear browser cache and try again. Check if localStorage is enabled.

### Q: Import data doesn't work
**A:** Ensure the JSON file is valid and in the correct format (export a file first to see the structure).

### Q: Can't schedule SMC
**A:** Make sure you've selected date, time slot, AND startup before clicking Schedule.

## 💡 Best Practices

### Q: How should I organize magic codes?
**A:** Use a consistent format like MAGIC001, MAGIC002, etc. or MAGIC-2024-001.

### Q: Should I fill all form fields?
**A:** Required fields are marked with *. Others are optional but recommended for complete records.

### Q: How often should I export data?
**A:** Weekly, or before any major changes/deletions.

### Q: What's the best workflow?
**A:** 
1. Register startups
2. Schedule SMC sessions
3. Complete sessions with feedback
4. Make decisions at S1 or after One-on-One
5. Export data regularly

### Q: Can I customize the workflow?
**A:** Yes! Modify the stage progression logic in the components.

## 🎓 Training & Support

### Q: Is there a video tutorial?
**A:** Not currently, but the QUICKSTART.md guide provides step-by-step instructions.

### Q: How do I train my team?
**A:** Use the QUICKSTART.md and FEATURES.md documents. Import sample data for practice.

### Q: Where can I get help?
**A:** Contact CMIA Marathwada Industries, Aurangabad for support.

### Q: Can I request new features?
**A:** Contact CMIA Marathwada Industries to discuss feature requests.

## 📊 Reporting & Analytics

### Q: Can I generate reports?
**A:** Export data as JSON or CSV and use Excel/Google Sheets for analysis.

### Q: Are there built-in analytics?
**A:** The dashboard shows basic statistics. For detailed analytics, export and analyze the data.

### Q: Can I track success rates?
**A:** Yes, compare Onboarded vs Rejected counts on the dashboard.

## 🔄 Updates & Maintenance

### Q: How do I update the app?
**A:** Pull the latest code, run `npm install`, then `npm run build` and redeploy.

### Q: Will updates delete my data?
**A:** No, localStorage data persists through updates. But always backup first!

### Q: How do I check the version?
**A:** Go to Settings page to see version information.

## 🌐 Internationalization

### Q: Can I use this in other languages?
**A:** Currently English only, but you can modify the text in components to add other languages.

### Q: How do I add translations?
**A:** Create a translation file and replace hardcoded text with translated strings.

---

## 📞 Still Have Questions?

If your question isn't answered here:

1. Check the documentation files (README, QUICKSTART, etc.)
2. Review the sample data
3. Check browser console for errors
4. Contact CMIA Marathwada Industries, Aurangabad

---

**Happy startup managing! 🚀**
