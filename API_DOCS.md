# 🚀 Rayyan — API & Pages Documentation

> **Tech Stack**: Next.js · TypeScript · JWT (jose) · HttpOnly Cookies  
> **Base URL**: `http://localhost:3000` (development)  
> **Auth**: Session cookie `rayyan_session` (HS256 JWT, HttpOnly)

---

## 📑 Table of Contents

1. [🔐 Authentication APIs](#-authentication-apis)
   - [POST /api/auth/login](#post-apiauthlogin)
   - [POST /api/auth/logout](#post-apiauthlogout)
2. [📄 Pages](#-pages)
   - [🏠 Landing Page](#-landing-page)
   - [🔑 Login Page](#-login-page)
   - [📝 Register Page](#-register-page)
   - [🔒 Forgot Password](#-forgot-password)
   - [📊 Overview / Dashboard](#-overview--dashboard)
   - [📋 Proposal Details Modal](#-proposal-details-modal)
   - [✉️ Contact Us Page](#️-contact-us-page)
3. [🧩 Data Types](#-data-types)
4. [🗺️ Route Protection](#️-route-protection)
5. [🌐 Internationalization](#-internationalization)
6. [🚧 Not Yet Implemented](#-not-yet-implemented)

---

## 🔐 Authentication APIs

### `POST /api/auth/login`

> 🍪 Sets an HttpOnly session cookie on success.

**Request**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | ✅ | User email address |
| `password` | `string` | ✅ | User password |
| `remember` | `boolean` | ❌ | Extend session to 30 days (default: 7 days) |

```json
{
  "email": "user@example.com",
  "password": "123456",
  "remember": true
}
```

**Responses**

| Status | Meaning | Body |
|--------|---------|------|
| `200 OK` | Login successful 🎉 | `{ "redirectTo": "/dashboard" }` |
| `401 Unauthorized` | Wrong credentials 🚫 | `{ "error": "Invalid email or password" }` |

**Cookie set on success**

| Property | Value |
|----------|-------|
| Name | `rayyan_session` |
| Algorithm | HS256 (via `jose`) |
| Payload | `{ email, role: "user" }` |
| HttpOnly | ✅ |
| Expiry (remember=false) | 7 days |
| Expiry (remember=true) | 30 days |

**Demo credentials** (development only)

| Email | Password |
|-------|----------|
| `user@example.com` | `123456` |

---

### `POST /api/auth/logout`

> 🗑️ Clears the session cookie. No request body needed.

**Request**: _empty_

**Responses**

| Status | Meaning | Body |
|--------|---------|------|
| `200 OK` | Logged out successfully 👋 | `{ "ok": true }` |

**Effect**: Sets `rayyan_session` cookie `maxAge` to `0`, effectively deleting it. The client then redirects to `/login`.

---

## 📄 Pages

### 🏠 Landing Page

**Route**: `/`  
**File**: `src/app/page.tsx`  
**APIs used**: _none — fully static_

A marketing page composed of these sections:

| Section Component | Purpose |
|-------------------|---------|
| `HomeHeroSection` | Main hero with CTA |
| `HomeSecondSection` | Feature highlights |
| `HomeCapabilitiesSection` | What the platform can do |
| `HomeBuiltSection` | Built-for details |
| `HomeTestimonialsSection` | Customer quotes |
| `HomePricingSection` | Pricing tiers |
| `HomeInsightsSection` | Blog / insights teaser |
| `HomeCommunitySection` | Community links |
| `HomeFooterSection` | Footer links & legal |

---

### 🔑 Login Page

**Route**: `/login`  
**File**: `src/features/auth/components/LoginPage.tsx`  
**Middleware**: Redirects to `/dashboard` if already authenticated.

**Form Fields**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Email | `email` input | ✅ | — |
| Password | `password` input | ✅ | Toggle visibility button |
| Remember Me | `checkbox` | ❌ | Passed to login API |

**Client → API flow**

```
User submits form
  └─► POST /api/auth/login  { email, password, remember }
        ├── 200 OK  →  redirect to /dashboard
        └── 401    →  show inline error message
```

**UI extras** (not yet wired up)

| Element | Status |
|---------|--------|
| Google sign-in button | 🎨 UI only |
| Forgot password link | 🎨 UI only |

---

### 📝 Register Page

**Route**: `/signup`  
**File**: `src/features/auth/components/SignUpPage.tsx`  
**APIs used**: _none yet — marked `TODO: connect to auth`_

**Form Fields**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | `text` input | ✅ | — |
| Email | `email` input | ✅ | — |
| Password | `password` input | ✅ | Toggle visibility button |
| Confirm Password | `password` input | ✅ | Toggle visibility button |

**Expected future API** (not yet created)

```
POST /api/auth/register
Body: { name, email, password }
```

**UI extras** (not yet wired up)

| Element | Status |
|---------|--------|
| Google sign-in button | 🎨 UI only |

---

### 🔒 Forgot Password

**Route**: N/A (button inside Login page)  
**Status**: 🎨 UI button exists, no page or API created yet.

**Expected future flow**

```
Step 1 → POST /api/auth/forgot-password   { email }
Step 2 → POST /api/auth/reset-password    { token, newPassword }
```

---

### 📊 Overview / Dashboard

**Route**: `/dashboard`  
**File**: `src/features/dashboard/components/DashboardPage.tsx`  
**Middleware**: Redirects to `/login` if not authenticated.  
**APIs used**: _none yet — inputs held in local state, no submission endpoint exists_

#### ✍️ Text Input

| Property | Detail |
|----------|--------|
| Element | `<textarea>` (resizable off) |
| State key | `prompt: string` |
| Placeholder | i18n `dashboard.overview.promptPlaceholder` |
| Sent to API? | ❌ Not yet — stored locally until Send is pressed |

#### 📎 File Upload

| Property | Detail |
|----------|--------|
| Element | Hidden `<input type="file" multiple>` triggered by attach button |
| Accepted types | Any (no `accept` filter set) |
| Multiple files | ✅ |
| State key | `attachedFiles: File[]` |
| Sent to API? | ❌ Not yet — passed as `initialFiles` prop into `ProposalDetailsModal` |

#### 🚀 Send Button flow

```
User types prompt + attaches files
  └─► clicks Send
        └─► opens ProposalDetailsModal(initialFiles)
              └─► [future] POST /api/proposals  { prompt, files, ...modalFields }
```

**Type chips** (filter/tag selection — UI only, not sent anywhere yet)

| Chip | Key |
|------|-----|
| Technical | `technical` |
| Financial | `financial` |
| Visualization | `visualization` |

**Local state**

| State | Type | Default |
|-------|------|---------|
| `prompt` | `string` | `""` |
| `attachedFiles` | `File[]` | `[]` |
| `showDetailsModal` | `boolean` | `false` |

**Dashboard layout extras** (from `DashboardRightControls`)

| Control | Wired up? |
|---------|-----------|
| Theme toggle (dark/light) | ✅ |
| Language toggle (EN/AR) | ✅ |
| Search | 🎨 UI only |
| Notifications (red dot) | 🎨 UI only |
| User menu + Logout | ✅ → calls `POST /api/auth/logout` |

---

### 📋 Proposal Details Modal

**Trigger**: Send button on Dashboard Overview  
**File**: `src/features/dashboard/components/ProposalDetailsModal.tsx`  
**APIs used**: _none — local state only_

The modal is split into two main sections.

#### Section 1 — RFP Configuration

| Mode | Description |
|------|-------------|
| `none` | No RFP selected yet |
| `upload` | Upload an RFP file or pick from database |
| `manual` | Manually write the RFP content |

When mode is `upload`, two tabs appear:

| Tab | Description |
|-----|-------------|
| `system` | Drag-and-drop file upload |
| `database` | Pick from mock stored documents |

#### Section 2 — Proposal Metadata Form

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Client Name | `text` input | ✅ | — |
| Project Name | `text` input | ✅ | — |
| Proposal Language | `ar` \| `en` selector | ✅ | Arabic / English |
| Sector / Industry | `text` input | ✅ | — |
| Start Date | `date` input | ❌ | — |
| End Date | `date` input | ❌ | — |

#### Section 3 — Company Documents

| Mode | Description |
|------|-------------|
| `database` | Select from mock stored company docs |
| `manual` | Drag-and-drop upload |

**Full local state shape**

```typescript
{
  rfpMode:      "none" | "upload" | "manual";
  rfpTab:       "system" | "database";
  clientName:   string;
  projectName:  string;
  language:     "ar" | "en";
  sector:       string;
  startDate:    string;  // ISO date string
  endDate:      string;  // ISO date string
  docsMode:     "database" | "manual";
  docs:         UploadDoc[];
  selectedDocs: Set<string>;
}
```

**`UploadDoc` shape**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | File name |
| `size` | `string` | Human-readable size (e.g. `"1.2 MB"`) |

**Expected future API** (not yet created)

```
POST /api/proposals
Body: { clientName, projectName, language, sector, startDate, endDate, rfpFile, docs[] }
```

---

### ✉️ Contact Us Page

**Route**: `/contact`  
**File**: `src/app/contact/page.tsx` → `src/features/home/components/HomeContactHeroSection.tsx`  
**Middleware**: Public — no auth required.  
**APIs used**: _none — form is not yet wired to a backend_

**Page sections**

| Section Component | Purpose |
|-------------------|---------|
| `HomeContactHeroSection` | Navbar + hero heading + contact form |
| `HomeTestimonialsSection` | Customer testimonials |
| `HomeCommunitySection` | Community / social links |
| `HomeFooterSection` | Footer links & legal |

**Contact Form Fields**

| Field | Input type | Required | Notes |
|-------|-----------|----------|-------|
| Full Name | `text` | ❌ | Placeholder from i18n `contact.namePlaceholder` |
| Email | `email` | ❌ | Placeholder from i18n `contact.emailPlaceholder` |
| Message | `textarea` (8 rows) | ❌ | Placeholder from i18n `contact.messagePlaceholder` |

**Navbar controls** (inside `HomeContactHeroSection`)

| Control | Wired up? |
|---------|-----------|
| Theme toggle (light/dark) | ✅ |
| Language cycle (EN/AR) | ✅ |
| "Contact Us" link → `/contact` | ✅ |
| "Login Now" link → `/login` | ✅ |
| Mobile hamburger menu | ✅ |

**Expected future API** (not yet created)

```
POST /api/contact
Body: { name, email, message }
```

---

## 🧩 Data Types

```typescript
// JWT payload stored in session cookie
type SessionPayload = {
  email: string;
  role: "user";
};

// Auth
type LoginRequest = {
  email: string;
  password: string;
  remember?: boolean;
};

// Documents
type UploadDoc = {
  id: string;
  name: string;
  size: string;         // formatted: "1.2 MB", "340 KB", etc.
};

// i18n
type Language = "en" | "ar";
```

---

## 🗺️ Route Protection

Handled by `src/middleware.ts` — validates `rayyan_session` JWT on every request.

| Route | Unauthenticated | Authenticated |
|-------|----------------|---------------|
| `/login` | ✅ Accessible | ➡️ Redirect → `/dashboard` |
| `/signup` | ✅ Accessible | — |
| `/dashboard/*` | ➡️ Redirect → `/login` | ✅ Accessible |
| `/` | ✅ Accessible | ✅ Accessible |

---

## 🌐 Internationalization

**Supported languages**

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | `ltr` |
| `ar` | Arabic | `rtl` |

**Files**

| File | Purpose |
|------|---------|
| `src/lib/i18n/en.ts` | English translations |
| `src/lib/i18n/ar.ts` | Arabic translations |
| `src/contexts/LanguageContext` | Provides `t()` and `dir` to all components |

---

## 🚧 Not Yet Implemented

| Feature | What's missing |
|---------|---------------|
| 📝 Register | `POST /api/auth/register` endpoint |
| 🔒 Forgot Password | Full page + `POST /api/auth/forgot-password` + `POST /api/auth/reset-password` |
| 🔍 Search | No backend, UI only |
| 🔔 Notifications | No backend, UI only |
| 🏷️ Google OAuth | Buttons exist but not wired |
| 💾 Proposal save | `POST /api/proposals` — modal only manages local state |
| ✉️ Contact form submit | `POST /api/contact` — form is UI only, no submission handler |
| 📁 File upload | No backend storage, client-side only |
| 📋 Proposals list | `/dashboard/proposals` shows "coming soon" |
| ⚙️ Settings | `/dashboard/settings` not reviewed / not built |
| 🗄️ Database page | `/dashboard/database` not reviewed / not built |

---

*Generated: 2026-05-11 · Project: Rayyan*
