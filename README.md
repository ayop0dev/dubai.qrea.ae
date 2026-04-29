# QREA — Dubai Real Estate Lead Generation Landing Page

A bilingual (Arabic/English) landing page that connects serious investors with curated real estate opportunities in Dubai.
Captures leads via a custom form, stores them in Google Sheets, and triggers automated email notifications.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Live URL
[https://dubai.qrea.ae/](https://dubai.qrea.ae/)

## Features
- Bilingual interface (Arabic RTL / English LTR) with language switcher
- Responsive mobile-first design with custom CSS
- Lead capture form (name, phone, email, budget, goal)
- Real-time form success/error states
- Sticky bottom CTA bar
- Google Sheets integration via Google Apps Script
- Automated admin notification emails
- Automated bilingual confirmation emails to leads
- Google Tag Manager & GA4 event tracking ready

## Project Structure
```
qrea/
├── index.html              # Arabic landing page (RTL)
├── en/
│   ├── index.html          # English landing page (LTR)
│   └── style.css           # LTR-specific CSS overrides
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── script.js           # Form handling & submission
├── apps-script/
│   └── Code.gs             # Google Apps Script backend
├── .gitignore
├── gtm-scripts.md          # GTM installation instructions
└── tasks.md                # Project task plan
```

## How to Use / Deploy

1. **Static files:** Upload `index.html`, `css/`, `js/`, and `en/` to any static host (Vercel, Netlify, GitHub Pages, Apache, Nginx, etc.).
2. **Google Apps Script:**
   - Open [script.google.com](https://script.google.com) and create a new project.
   - Paste the contents of `apps-script/Code.gs` into the editor.
   - Create a Google Sheet named **"QREA Leads"** with headers: `Name, Phone, Email, Budget, Goal, Timestamp`.
   - Copy the Sheet ID into the `SHEET_ID` constant in `Code.gs`.
   - Deploy as a **Web App** (Execute as: Me, Access: Anyone) and copy the deployment URL.
3. **Connect frontend:** Replace `APPS_SCRIPT_URL` in `js/script.js` with your deployed Web App URL.
4. **Google Tag Manager (optional):** Follow the instructions in `gtm-scripts.md` to install your GTM container.

## License
MIT
