# QREA Landing Page — Master Task Plan

## Project Configuration
- **Google Sheet Account:** Ahmedlotfyy0@gmail.com
- **Admin Email 1:** jale.guseynova@qrea.ae
- **Admin Email 2:** Ahmedlotfyy0@gmail.com
- **Confirmation emails sent from:** Ahmedlotfyy0@gmail.com

---

## PHASE 1 — Form Backend (Google Apps Script)
- [x] T1.1: Log in to Google Sheets as Ahmedlotfyy0@gmail.com and create a new spreadsheet named "QREA Leads". Add the following column headers in row 1 exactly: Name, Phone, Email, Budget, Goal, Timestamp.
- [x] T1.2: In the same Google account, open Apps Script (script.google.com), create a new project named "QREA Form Handler", and write a `doPost(e)` function that parses incoming JSON POST request data from the contact form.
- [x] T1.3: Inside `doPost(e)`, after parsing the request, append a new row to the "QREA Leads" spreadsheet with the values: Name, Phone, Email, Budget, Goal, and a server-generated timestamp (new Date()).
- [x] T1.4: Inside `doPost(e)`, after writing to the sheet, use `MailApp.sendEmail()` to send a notification email to both jale.guseynova@qrea.ae and Ahmedlotfyy0@gmail.com. The subject should be "New QREA Lead" and the body should include all submitted field values.
- [x] T1.5: Inside `doPost(e)`, use `MailApp.sendEmail()` to send a confirmation email to the submitted email address. The email must be in Arabic, sent from Ahmedlotfyy0@gmail.com, with a subject and body confirming receipt of their inquiry and stating that the team will follow up shortly.
- [x] T1.6: In the Apps Script editor, go to Deploy → New Deployment. Set type to "Web App", set "Execute as" to "Me (Ahmedlotfyy0@gmail.com)", and set "Who has access" to "Anyone". Copy the deployment URL — this is the endpoint `script.js` will POST to.
- [x] T1.7: In `script.js`, replace the existing `alert()` call in the form submission handler with a `fetch()` POST request to the Apps Script deployment URL. Send form field values as a JSON body with `Content-Type: application/json`. Handle the response to trigger success or error UI.
- [x] T1.8: In `script.js`, add the following UX states to the form submit handler: (1) on submit, disable the submit button and show a visible loading spinner or text; (2) on success response, hide the form and show a success message in Arabic; (3) on fetch error or non-OK response, show an inline error message in Arabic without clearing the form fields.
- [x] T1.9: Fixed `Code.gs` — replaced unreliable `DriveApp.getFilesByName()` + `SpreadsheetApp.open()` / `SpreadsheetApp.create()` with `SpreadsheetApp.openById(SHEET_ID)`. Added `const SHEET_ID = "PASTE_SHEET_ID_HERE"` constant at top of file. Replace `PASTE_SHEET_ID_HERE` with the actual Sheet ID from the Google Sheets URL before deploying.
- [x] T1.10: Fixed `script.js` — `form.name.value` conflicted with the `HTMLFormElement.name` IDL attribute (a reserved property on form elements), causing it to read the form's own empty `name` attribute instead of the input field. Changed to `form.elements['name'].value`. Also changed `form.lang` to `form.elements['lang']` for the same reason (`lang` is an inherited IDL attribute on all HTML elements).

> **PHASE 1 review note:** All other Phase 1 output is correct. HTML structure, form fields, hidden `lang` field, success/error UI, admin notification emails, Arabic confirmation email, CORS-compatible fetch with JSON body, button disable/restore on error, and response handling are all properly implemented. No further issues found.

## PHASE 2 — Google Tag Manager
- [ ] T2.1: Go to tagmanager.google.com and create a new GTM Container for the QREA website. Select platform "Web". Save the Container ID (format: GTM-XXXXXXX).
- [ ] T2.2: Open `index.html`. Paste the GTM `<script>` snippet inside `<head>` as high as possible, and paste the GTM `<noscript>` iframe snippet immediately after the opening `<body>` tag. Use the Container ID from T2.1.
- [ ] T2.3: In GTM, create a new Tag of type "Google Analytics: GA4 Configuration". Enter the GA4 Measurement ID. Set the trigger to "All Pages". Name the tag "GA4 - Config".
- [ ] T2.4: In GTM, create a new Trigger of type "Custom Event". Set the event name to `form_success` (this is the event that `script.js` will push to `dataLayer` on successful form submission). Name the trigger "Trigger - Form Submission Success".
- [ ] T2.5: In GTM, create a new Tag of type "Google Analytics: GA4 Event". Set the connected GA4 Config tag to the one from T2.3. Set the event name to `lead_generated`. Attach the trigger from T2.4. Name the tag "GA4 - Event - lead_generated". Also update `script.js` to push `{ event: 'form_success' }` to `window.dataLayer` on successful form submission.
- [ ] T2.6: In GTM, click Preview, enter the site URL, and verify that: (1) the GA4 Config tag fires on page load, (2) submitting the form fires the `lead_generated` GA4 event. Fix any tag or trigger misconfigurations before publishing.

## PHASE 3 — English Version

### T3.1 — Create `en/index.html` with full English content
- [x] Created `en/index.html` with full English content, mirroring `index.html` structure. `<html lang="en" dir="ltr">`, English title, English hero/sections/final text, English form labels and placeholders, budget/goal options in English, success/error messages in English, hidden `lang` field set to `en`, language switcher linking to `/index.html`, script and stylesheet paths updated for the `en/` subdirectory.

### T3.2 — Create `en/style.css` with LTR-specific overrides
- [x] Created `en/style.css` with two small overrides: (1) mobile step badge padding and position flipped to LTR, (2) desktop step badge position flipped to LTR inside `@media(min-width:768px)`.

### T3.3 — Add language switcher to nav on both pages
- [x] Added `.lang-switch` and `.lang-switch:hover` rules to `css/style.css` after `.nav-pill`. Updated `.nav` in `index.html` and `en/index.html` to wrap `.nav-pill` and `.lang-switch` in a flex container.

### T3.4 — Update `script.js` to support both Arabic and English pages
- [x] Updated `js/script.js` to read `document.documentElement.lang` and set the loading button text to `'Sending...'` for English or `'جاري الإرسال...'` for Arabic.

### T3.5 — Verify `Code.gs` bilingual email logic
- [x] Verified all five points in `apps-script/Code.gs`: (1) `isEnglish` detects `data.lang === "en"`, (2) English confirm subject is `"We received your inquiry — QREA"`, (3) English confirm body is a complete, properly addressed message, (4) `en/index.html` hidden field sends `"en"`, (5) no re-deployment required.

Create the file `en/index.html`. This is a complete, standalone HTML document — mirror the structure of `index.html` exactly, with all Arabic text replaced by the English equivalents listed below.

**Document root and `<head>`:**
- `<html lang="en" dir="ltr">`
- `<title>QREA | Dubai Real Estate Opportunities</title>`
- Same `<meta charset>` and `<meta viewport>` tags as `index.html`
- Same Google Fonts `<link>` tags (Tajawal is used for both languages)
- Two stylesheet links in this order:
  1. `<link rel="stylesheet" href="../css/style.css">`
  2. `<link rel="stylesheet" href="./style.css">` (the LTR override created in T3.2)

**`<script>` tag at end of `<body>`:** `<script src="../js/script.js"></script>`

**Sticky CTA bar (`.sticky-cta`):**
- `<b>Book a Free Consultation</b>`
- `<p>Find the best property matched to your budget</p>`
- Button: `Register Now`

**Nav (`.nav`):** See T3.4 for the language switcher element to include here. Logo and nav-pill text are unchanged (`Q<span>REA</span>` and `Dubai Real Estate`).

**Hero section:**
- Badge: `Selected opportunities for serious investors`
- `<h1>`: `Own property in <span>Dubai</span> with a clear plan and trusted advisory`
- Sub paragraph (`.sub`): `We help you select the best real estate projects in Dubai based on your investment or residential goal, with full clarity on pricing, payment plans, and available benefits.`
- Proof stats (`.proof`) — three items:
  - `<b>10%</b>` / `<span>Down payment available</span>`
  - `<b>1%</b>` / `<span>Monthly payment plans</span>`
  - `<b>0%</b>` / `<span>Income tax</span>`

**Lead card (`.lead-card`):**
- Success div `#formSuccess` (hidden by default): `<h3>Your details have been received!</h3>` / `<p>Thank you for registering. One of our advisors will contact you shortly to present the best available options.</p>`
- Error div `#formError` (hidden by default, inline style same as Arabic page): `An error occurred while submitting. Please try again.`
- Form heading `<h3>`: `Register your details to get the best options`
- Form description `<p>`: `Please fill in your details and one of our advisors will contact you to present projects suited to your budget and goal.`
- Name input: `placeholder="Full Name"` / `name="name"` / `required`
- Phone input: `placeholder="WhatsApp Number"` / `name="phone"` / `required`
- Email input: `placeholder="Email Address"` / `name="email"` / `required`
- Budget `<select name="budget" required>`:
  - `<option value="">Select a range</option>`
  - `<option>600K – 1M AED</option>`
  - `<option>1M – 2M AED</option>`
  - `<option>2M – 5M AED</option>`
  - `<option>Over 5M AED</option>`
- Goal `<select name="goal" required>`:
  - `<option value="">Purchase Goal</option>`
  - `<option>Investment</option>`
  - `<option>Residential</option>`
  - `<option>Golden Visa</option>`
  - `<option>Still Comparing</option>`
- Submit button (`.submit`): `I want to see the best available opportunities`
- Safe text (`.safe`): `Your data is secure and will not be shared with any third party`
- Hidden lang field: `<input type="hidden" name="lang" value="en">`

**Section 1 — Why Register With Us:**
- `<h2 class="section-title">Why register <span>with us?</span></h2>`
- Section desc: `Instead of searching through dozens of projects, we help you reach the most suitable options based on your goal and budget.`
- Card 1 — icon `01` / title: `Budget-Matched Options` / body: `We review your budget and suggest projects with realistic payment plans suited to your needs.`
- Card 2 — icon `02` / title: `Clear Project Comparisons` / body: `We explain the differences between areas, expected returns, the developer, and the payment plan.`
- Card 3 — icon `03` / title: `Direct Follow-Up from Dubai` / body: `A real estate team inside Dubai follows up with you on the details and provides the information you need before making a decision.`
- Deal box: `<b>Limited-time offers</b>` / `<p>Some projects offer discounts, fee waivers, or special payment plans depending on availability and registration timing.</p>`

**Section 2 — What Happens After You Register:**
- `<h2 class="section-title">What happens after <span>you register?</span></h2>`
- Step 1 — title: `We contact you` / body: `A real estate advisor will reach out to understand your budget and purchase goal.`
- Step 2 — title: `We recommend the best options` / body: `We send you suitable projects with pricing, payment plans, and locations.`
- Step 3 — title: `Make your decision with confidence` / body: `You receive a clear comparison to help you choose the most suitable project.`

**Section 3 — Why Dubai:**
- `<h2 class="section-title">Why <span>Dubai?</span></h2>`
- Card 1 — title: `Stable Global Market` / body: `Dubai is one of the most attractive real estate markets for investors in the region.`
- Card 2 — title: `Attractive Rental Yields` / body: `Opportunities suited to those seeking rental income or future resale potential.`
- Card 3 — title: `Freehold Ownership & Flexible Payment Plans` / body: `Freehold projects with multiple payment plans suited to a wide range of investors.`

**Final section (`.final`):**
- `<h2 class="section-title">Want to find the right property for you?</h2>`
- Section desc: `Register now to receive tailored recommendations that help you make a clearer investment decision.`
- CTA link (`.submit-link`): `Register Your Details Now`

---

### T3.2 — Create `en/style.css` with LTR-specific overrides

Create `en/style.css` as a **small override file only** — do not copy or duplicate `css/style.css`. This file is loaded after `../css/style.css` in `en/index.html` and only needs to neutralize the two RTL-specific rules found in `css/style.css`.

**Override 1 — Mobile step counter badge (no media query):**

In `css/style.css` the step badge is anchored to the right: `.step { padding:16px 58px 16px 16px }` and `.step:before { right:16px }`. In LTR the badge should be on the left.

```css
.step { padding: 16px 16px 16px 58px; }
.step:before { right: auto; left: 16px; }
```

**Override 2 — Desktop step counter badge (`@media(min-width:768px)`):**

In `css/style.css` the desktop badge is anchored to the top-right: `.step:before { right:22px; top:22px }`. In LTR it should be top-left.

```css
@media (min-width: 768px) {
  .step:before { right: auto; left: 22px; }
}
```

No other rules in `css/style.css` are direction-specific. `text-align` is not set globally; flexbox and grid layouts respond to the `dir` attribute automatically. The desktop hero grid (`1.05fr .95fr`) places hero-content in the first column and lead-card in the second — in LTR this renders content on the left and card on the right, which is the correct visual order.

---

### T3.3 — Add language switcher to nav on both pages

**Step 1 — Add `.lang-switch` style to `css/style.css`:**

Append the following rule after the existing `.nav-pill` rule block:

```css
.lang-switch{font-size:11px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);padding:7px 11px;border-radius:999px;color:rgba(255,255,255,.82);margin-inline-start:8px}
.lang-switch:hover{background:rgba(255,255,255,.14)}
```

`margin-inline-start` correctly adds spacing on the trailing side of `.nav-pill` in both RTL and LTR without needing a separate override.

**Step 2 — Modify `.nav` in `index.html`:**

Wrap `.nav-pill` and the new language switcher in a flex container so they stay grouped on the right (in RTL, the end side):

```html
<div class="nav">
  <div class="logo">Q<span>REA</span></div>
  <div style="display:flex;align-items:center">
    <div class="nav-pill">Dubai Real Estate</div>
    <a class="lang-switch" href="/en/index.html">EN</a>
  </div>
</div>
```

**Step 3 — Add the same structure in `en/index.html`:**

```html
<div class="nav">
  <div class="logo">Q<span>REA</span></div>
  <div style="display:flex;align-items:center">
    <div class="nav-pill">Dubai Real Estate</div>
    <a class="lang-switch" href="/index.html">AR</a>
  </div>
</div>
```

**Note on paths:** The `href` values above assume the site is served from its root (e.g. `https://example.com/`). If served from a subdirectory, use relative paths: `../index.html` in `en/index.html` and `en/index.html` (no leading slash) in `index.html`.

---

### T3.4 — Update `script.js` to support both Arabic and English pages

`script.js` is shared by both pages and contains one hardcoded Arabic string: `btn.textContent = 'جاري الإرسال...';`. This must become language-aware. Success and error message text lives in the HTML (`#formSuccess`, `#formError`) so those divs already show the correct language per page — no JS changes needed for them.

**Change to make in `js/script.js`:**

Locate the two lines:
```js
btn.disabled = true;
btn.textContent = 'جاري الإرسال...';
```

Replace them with:
```js
const lang = document.documentElement.lang;
btn.disabled = true;
btn.textContent = lang === 'en' ? 'Sending...' : 'جاري الإرسال...';
```

`document.documentElement.lang` reads the `lang` attribute of `<html>`, which is `"ar"` in `index.html` and `"en"` in `en/index.html`. No other strings in `script.js` need changing: `originalText` is captured from `btn.textContent` which is set in the HTML, so it restores the correct language text on error automatically. The `data.lang` value comes from the hidden `<input name="lang">` in each page's form, so the backend receives the correct language without any JS change.

---

### T3.5 — Verify `Code.gs` bilingual email logic (no code changes expected)

`Code.gs` already contains complete bilingual logic. This task is a verification step only — **do not change any code unless a specific issue is found.**

Verify the following five points against the live file at `apps-script/Code.gs`:

1. **Line 37** reads `const isEnglish = data.lang === "en";` — confirms the backend detects the language from the submitted JSON body.
2. **Lines 38–40** set `confirmSubject` to `"We received your inquiry — QREA"` when `isEnglish` is true.
3. **Lines 43–44** set `confirmBody` to a complete English message: addressed to the lead by name, confirming receipt of their inquiry, and promising a follow-up from a real estate consultant.
4. The hidden field `<input type="hidden" name="lang" value="en">` in `en/index.html` (created in T3.1) will cause `data.lang` to equal `"en"` in `doPost`, triggering the English email path.
5. No re-deployment of the Apps Script Web App is needed — the existing deployed URL in `script.js` continues to handle both Arabic and English submissions.

If all five points check out, mark complete. If the English email body needs rewording, edit `Code.gs` and redeploy via Apps Script → Deploy → Manage Deployments → edit the **existing** deployment (do not create a new one — creating a new deployment changes the URL, which would require updating `script.js`).

## PHASE 4 — QA & Launch
- [ ] T4.1: Submit the form on `index.html` with real test data. Verify all three outcomes: (1) a new row appears in the "QREA Leads" Google Sheet with correct values and timestamp; (2) a notification email arrives at both jale.guseynova@qrea.ae and Ahmedlotfyy0@gmail.com; (3) a confirmation email in Arabic arrives at the submitted email address.
- [ ] T4.2: Open GA4 → Admin → DebugView. Submit the form while GTM Preview is active and confirm the `lead_generated` event appears in DebugView with no errors.
- [ ] T4.3: Test both `index.html` and `en/index.html` in Chrome, Firefox, and Safari (or Edge). Test on at least one iOS device and one Android device. Check layout, form usability, language switcher, and RTL/LTR rendering at common breakpoints (375px, 768px, 1280px).
- [ ] T4.4: Run both `index.html` and `en/index.html` through Google PageSpeed Insights. Target a Performance score of 90+ on mobile. Fix any flagged issues (image sizing, render-blocking resources, layout shift) before launch.
