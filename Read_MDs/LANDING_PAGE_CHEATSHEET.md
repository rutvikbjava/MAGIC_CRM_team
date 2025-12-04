# Landing Page Cheatsheet 📋

## 🚀 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Login Credentials

```
Admin Access:
Username: admin
Password: magic2024

Guest Access:
(Created by admin in Guest Management)
```

## 📍 Navigation Paths

```
Landing Page → Click "Login" → Login Page
Login Page → Click "Back to Home" → Landing Page
Dashboard → Sidebar "Landing Page" → Editor (Admin Only)
Dashboard → Click "Logout" → Landing Page
```

## ✏️ Editor Quick Actions

| Action | Steps |
|--------|-------|
| **Edit Content** | Login → Sidebar "Landing Page" → Select Tab → Edit → Save |
| **Add News** | News Tab → "+ Add News Item" → Fill Form → Save |
| **Add Feature** | Features Tab → "+ Add Feature" → Fill Form → Save |
| **Add Stat** | Stats Tab → "+ Add Stat" → Fill Form → Save |
| **Delete Item** | Click 🗑️ icon → Confirm → Save |
| **Preview** | Click "Preview" button (top right) |
| **Reset** | Click "Reset" button → Confirm |
| **Save** | Click "Save Changes" button (top right) |

## 🎨 Available Icons

```javascript
Rocket      // 🚀 Launches, startups
TrendingUp  // 📈 Growth, acceleration
Users       // 👥 Community, mentorship
Award       // 🏆 Success, achievements
Target      // 🎯 Goals, objectives
Lightbulb   // 💡 Innovation, ideas
Sparkles    // ✨ Special features
```

## 📝 Content Sections

```
1. Header       → Title, Subtitle
2. Hero         → Badge, Title, Description, CTA
3. Stats        → Value, Label (4 items recommended)
4. Features     → Icon, Title, Description (6 items recommended)
5. News         → Date, Title, Content (3-6 items recommended)
6. Contact      → Email, Phone, Address
7. Footer       → Title, Tagline, Copyright, Description
```

## 💾 Data Storage Keys

```javascript
// Landing page content
localStorage.getItem('landingPageData')

// User session
localStorage.getItem('adminSession')

// Dark mode preference
localStorage.getItem('darkMode')
```

## 🎯 File Locations

```
Components:
├── src/components/LandingPage.jsx
├── src/components/LandingPageEditor.jsx
└── src/components/Login.jsx (updated)

Utils:
└── src/utils/landingPageData.js

Main:
└── src/App.jsx (updated)

Docs:
├── LANDING_PAGE_GUIDE.md
├── LANDING_PAGE_QUICK_START.md
├── LANDING_PAGE_FEATURES.md
├── LANDING_PAGE_FLOW.md
├── LANDING_PAGE_IMPLEMENTATION_SUMMARY.md
└── LANDING_PAGE_CHEATSHEET.md (this file)
```

## 🔧 Common Code Snippets

### Get Landing Page Data
```javascript
import { storage } from '../utils/storage';
const data = storage.get('landingPageData');
```

### Save Landing Page Data
```javascript
import { storage } from '../utils/storage';
storage.set('landingPageData', updatedData);
```

### Reset to Defaults
```javascript
import { defaultLandingData } from '../utils/landingPageData';
storage.set('landingPageData', defaultLandingData);
```

### Check User Role
```javascript
const session = storage.get('adminSession');
const isAdmin = session?.role === 'admin';
```

## 🎨 Color Classes

```css
/* Gradient backgrounds */
.magic-gradient          /* Purple to blue gradient */
.magic-gradient-hover    /* Darker gradient for hover */

/* Text gradients */
.magic-text-gradient     /* Gradient text effect */

/* Shadows */
.shadow-magic           /* Purple shadow */
.shadow-magic-lg        /* Larger purple shadow */

/* Colors */
.bg-purple-500          /* Purple background */
.bg-blue-500            /* Blue background */
.text-purple-600        /* Purple text */
.text-blue-600          /* Blue text */
```

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
default     /* < 640px  - Mobile */
sm:         /* ≥ 640px  - Small tablets */
md:         /* ≥ 768px  - Tablets */
lg:         /* ≥ 1024px - Laptops */
xl:         /* ≥ 1280px - Desktops */
2xl:        /* ≥ 1536px - Large screens */
```

## 🐛 Debug Commands

```javascript
// Check landing page data
console.log(localStorage.getItem('landingPageData'));

// Check session
console.log(localStorage.getItem('adminSession'));

// Clear all data
localStorage.clear();

// Remove specific item
localStorage.removeItem('landingPageData');
```

## ✅ Pre-Launch Checklist

```
Content:
□ Update all text content
□ Add current news items
□ Update statistics
□ Verify contact information
□ Check copyright year

Technical:
□ Test on mobile
□ Test on tablet
□ Test on desktop
□ Check all animations
□ Verify all links work
□ Test login flow
□ Test logout flow
□ Check dark mode

Quality:
□ No spelling errors
□ No broken images
□ No console errors
□ Fast loading time
□ Smooth animations
```

## 🆘 Emergency Fixes

### Landing Page Broken?
```javascript
// Reset to defaults
localStorage.removeItem('landingPageData');
// Refresh page
location.reload();
```

### Can't Login?
```javascript
// Clear session
localStorage.removeItem('adminSession');
// Refresh page
location.reload();
```

### Editor Not Saving?
```javascript
// Check localStorage quota
console.log(JSON.stringify(localStorage).length);
// Clear old data if needed
localStorage.clear();
```

## 📊 Content Guidelines

### Headlines
- ✅ Short and punchy (5-10 words)
- ✅ Action-oriented
- ✅ Clear value proposition

### Descriptions
- ✅ 1-2 sentences
- ✅ Focus on benefits
- ✅ Easy to scan

### Statistics
- ✅ Use "+" for growth (500+)
- ✅ Use currency symbols (₹50Cr+)
- ✅ Use percentages (95%)
- ✅ Keep labels short

### News
- ✅ Recent and relevant
- ✅ Consistent date format
- ✅ Engaging titles
- ✅ Brief content

## 🔗 Useful Links

```
Documentation:
- Quick Start: LANDING_PAGE_QUICK_START.md
- Full Guide: LANDING_PAGE_GUIDE.md
- Features: LANDING_PAGE_FEATURES.md
- Flow: LANDING_PAGE_FLOW.md
- Summary: LANDING_PAGE_IMPLEMENTATION_SUMMARY.md

External:
- Framer Motion: https://www.framer.com/motion/
- Lucide Icons: https://lucide.dev/
- Tailwind CSS: https://tailwindcss.com/
```

## 💡 Pro Tips

1. **Update Regularly**: Keep news section fresh (weekly/monthly)
2. **Mobile First**: Always test on mobile devices
3. **Save Often**: Click save after each major change
4. **Preview First**: Use preview before finalizing
5. **Backup Content**: Copy content before major changes
6. **Use Icons Wisely**: Match icons to content meaning
7. **Keep It Simple**: Less is more for landing pages
8. **Test Logout**: Verify landing page shows after logout
9. **Check Performance**: Ensure fast loading times
10. **Monitor Engagement**: Track visitor behavior

## 🎓 Learning Path

```
Day 1: Read Quick Start → Login → Explore Editor
Day 2: Make small changes → Save → Preview
Day 3: Add news item → Update stats
Day 4: Customize features → Update contact
Day 5: Review full guide → Advanced customization
```

## 📞 Support

```
Issue: Landing page not showing
Fix: Clear cache, check localStorage

Issue: Changes not saving
Fix: Click "Save Changes", check console

Issue: Icons not displaying
Fix: Check icon name spelling

Issue: Animations laggy
Fix: Check browser performance, update browser

Issue: Mobile view broken
Fix: Test responsive breakpoints, check CSS
```

---

## 🎯 Remember

- **Always save changes** after editing
- **Test on mobile** regularly
- **Update news** frequently
- **Keep content** concise
- **Preview before** publishing

---

**Quick Access**: Keep this cheatsheet handy for fast reference! 📌

**Last Updated**: November 24, 2025
