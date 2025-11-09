# User Flow Diagram - Landing Pages & Authentication

## Visual User Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MAIN LANDING PAGE (/)                                │
│                        MarketplaceHome.tsx                                   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ HERO SECTION                                                          │  │
│  │ • Headline: "Connect Consultants & Companies"                        │  │
│  │ • Animated typing effect with gradient underline                     │  │
│  │ • Search bar                                                         │  │
│  │                                                                       │  │
│  │ ┌─────────────────────┐    ┌─────────────────────┐                 │  │
│  │ │ I'm a Consultant    │    │ I'm a Company       │                 │  │
│  │ │ (Blue Button)       │    │ (Pink Button)       │                 │  │
│  │ └─────────┬───────────┘    └─────────┬───────────┘                 │  │
│  └───────────┼──────────────────────────┼─────────────────────────────┘  │
│              │                           │                                 │
│  ┌───────────▼──────────────────────────▼─────────────────────────────┐  │
│  │ ABOUT US SECTION                                                     │  │
│  │ • Mission & Vision statements                                       │  │
│  │ • 4 Key Statistics (animated counters)                              │  │
│  │ • 3 Core Values cards                                               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ WHY CHOOSE US SECTION                                                │  │
│  │ • 6 Feature cards with gradient icons                               │  │
│  │ • Verified Consultants, Secure Payments, etc.                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ HOW IT WORKS SECTION                                                 │  │
│  │ ┌─────────────────────┐    ┌─────────────────────┐                 │  │
│  │ │ For Companies       │    │ For Consultants     │                 │  │
│  │ │ (Pink theme)        │    │ (Blue theme)        │                 │  │
│  │ │ 4 steps             │    │ 4 steps             │                 │  │
│  │ └─────────────────────┘    └─────────────────────┘                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ CATEGORIES SECTION (Maintained)                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└──────────────────┬───────────────────────────────┬───────────────────────────┘
                   │                               │
                   │                               │
        ┌──────────▼──────────┐         ┌─────────▼──────────┐
        │ Click "Consultant"  │         │ Click "Company"    │
        │ Button              │         │ Button             │
        └──────────┬──────────┘         └─────────┬──────────┘
                   │                               │
                   │                               │
┌──────────────────▼──────────────────┐ ┌─────────▼──────────────────────┐
│ AUTH PAGE (/auth)                   │ │ AUTH PAGE (/auth)              │
│ ?tab=signup&role=consultant         │ │ ?tab=signup&role=company       │
│                                     │ │                                │
│ • Signup form                       │ │ • Signup form                  │
│ • Role pre-selected: Consultant     │ │ • Role pre-selected: Company   │
│ • Submit registration               │ │ • Submit registration          │
└──────────────────┬──────────────────┘ └─────────┬──────────────────────┘
                   │                               │
                   │ After Signup                  │ After Signup
                   │                               │
┌──────────────────▼──────────────────┐ ┌─────────▼──────────────────────┐
│ CONSULTANT LANDING PAGE             │ │ COMPANY LANDING PAGE           │
│ (/consultant-home)                  │ │ (/company-home)                │
│ ConsultantLanding.tsx               │ │ CompanyLanding.tsx             │
│                                     │ │                                │
│ ┌─────────────────────────────────┐ │ │ ┌────────────────────────────┐ │
│ │ HERO SECTION (Blue Gradient)    │ │ │ │ HERO (Pink/Purple Gradient)│ │
│ │ • Welcome, [Name]!              │ │ │ │ • Welcome, [Company]!      │ │
│ │ • "Start Your Journey..."       │ │ │ │ • "Find Perfect Consultant"│ │
│ │ • Complete Profile CTA          │ │ │ │ • Search Bar               │ │
│ └─────────────────────────────────┘ │ │ └────────────────────────────┘ │
│                                     │ │                                │
│ ┌─────────────────────────────────┐ │ │ ┌────────────────────────────┐ │
│ │ QUICK STATS DASHBOARD           │ │ │ │ BROWSE SERVICES            │ │
│ │ • Profile Views                 │ │ │ │ • 8 Category Cards         │ │
│ │ • Pending Requests              │ │ │ │ • Consultant Counts        │ │
│ │ • Total Earnings                │ │ │ │ • Click to Filter          │ │
│ │ • Average Rating                │ │ │ │                            │ │
│ │ • Profile Completion Bar        │ │ │ │                            │ │
│ └─────────────────────────────────┘ │ │ └────────────────────────────┘ │
│                                     │ │                                │
│ ┌─────────────────────────────────┐ │ │ ┌────────────────────────────┐ │
│ │ GETTING STARTED (4 Steps)       │ │ │ │ HOW TO GET STARTED         │ │
│ │ 1. Complete Profile ✓           │ │ │ │ 1. Define Needs            │ │
│ │ 2. Get Verified (Pending)       │ │ │ │ 2. Browse & Search         │ │
│ │ 3. Create Services (Pending)    │ │ │ │ 3. Review Profiles         │ │
│ │ 4. Receive Requests (Locked)    │ │ │ │ 4. Send Request/Hire       │ │
│ │                                 │ │ │ │ 5. Manage & Pay            │ │
│ └─────────────────────────────────┘ │ │ └────────────────────────────┘ │
│                                     │ │                                │
│ ┌─────────────────────────────────┐ │ │ ┌────────────────────────────┐ │
│ │ HOW IT WORKS (7 Steps)          │ │ │ │ FEATURED CONSULTANTS       │ │
│ │ • Set Profile                   │ │ │ │ • Top 3 Consultants        │ │
│ │ • List Services                 │ │ │ │ • Ratings & Reviews        │ │
│ │ • Receive Inquiries             │ │ │ │ • Expertise Tags           │ │
│ │ • Negotiate & Accept            │ │ │ │ • Hourly Rates             │ │
│ │ • Deliver Work                  │ │ │ │ • View Profile CTAs        │ │
│ │ • Get Paid Securely             │ │ │ │                            │ │
│ │ • Build Reputation              │ │ │ │                            │ │
│ └─────────────────────────────────┘ │ │ └────────────────────────────┘ │
│                                     │ │                                │
│ ┌─────────────────────────────────┐ │ │ ┌────────────────────────────┐ │
│ │ RESOURCES & SUPPORT             │ │ │ │ WHY COMPANIES CHOOSE US    │ │
│ │ • FAQ                           │ │ │ │ • 6 Benefit Cards          │ │
│ │ • Best Practices                │ │ │ │ • Verified Experts         │ │
│ │ • Pricing Guide                 │ │ │ │ • Transparent Pricing      │ │
│ │ • Video Tutorials               │ │ │ │ • Secure Payments          │ │
│ └─────────────────────────────────┘ │ │ └────────────────────────────┘ │
│                                     │ │                                │
│ ┌─────────────────────────────────┐ │ │ ┌────────────────────────────┐ │
│ │ PRIMARY CTA                     │ │ │ │ PRIMARY CTA                │ │
│ │ • Complete Your Profile ──────┐ │ │ │ • Browse Consultants ─────┐ │ │
│ │ • View Dashboard              │ │ │ │ • View Dashboard          │ │ │
│ └───────────────────────────────┼─┘ │ │ └──────────────────────────┼┘ │
└─────────────────────────────────┼───┘ └────────────────────────────┼──┘
                                  │                                  │
                                  │                                  │
                    ┌─────────────▼──────────┐      ┌──────────────▼─────────┐
                    │ /become-consultant     │      │ /consultants           │
                    │ Profile Setup Page     │      │ Browse Consultants     │
                    └─────────────┬──────────┘      └──────────────┬─────────┘
                                  │                                  │
                                  │                                  │
                    ┌─────────────▼──────────────────────────────────▼─────────┐
                    │                    /dashboard                            │
                    │                  SmartDashboard                          │
                    │                                                          │
                    │  ┌────────────────────┐      ┌────────────────────┐    │
                    │  │ ConsultantDashboard│  OR  │ CompanyDashboard   │    │
                    │  │ (if consultant)    │      │ (if company)       │    │
                    │  └────────────────────┘      └────────────────────┘    │
                    └──────────────────────────────────────────────────────────┘
```

---

## Existing User Login Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    EXISTING USER                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           │ Navigate to /auth
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                    AUTH PAGE (/auth)                          │
│                    Tab: Sign In                               │
│                                                               │
│  • Enter email                                               │
│  • Enter password                                            │
│  • Submit login                                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           │ Check user role
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼──────────┐   ┌─────────▼──────────┐
    │ Role: Consultant   │   │ Role: Company      │
    └─────────┬──────────┘   └─────────┬──────────┘
              │                         │
              │                         │
    ┌─────────▼──────────┐   ┌─────────▼──────────┐
    │ /consultant-home   │   │ /company-home      │
    │ (Landing Page)     │   │ (Landing Page)     │
    └─────────┬──────────┘   └─────────┬──────────┘
              │                         │
              │                         │
              └────────────┬────────────┘
                           │
                           │ Navigate to Dashboard
                           │
              ┌────────────▼────────────┐
              │      /dashboard         │
              │    SmartDashboard       │
              │  (Role-based routing)   │
              └─────────────────────────┘
```

---

## Page Color Schemes

```
┌─────────────────────────────────────────────────────────────┐
│ MAIN LANDING PAGE                                            │
│ • Neutral white background                                  │
│ • Blue/Pink/Purple gradient accents                         │
│ • Balanced color distribution                               │
│ • Professional and welcoming                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CONSULTANT LANDING PAGE                                      │
│ • Blue gradient hero (from-blue-600 to-blue-800)           │
│ • Blue-50 background sections                               │
│ • White cards with blue accents                             │
│ • Professional and trustworthy feel                         │
│ • Dashboard-style layout                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ COMPANY LANDING PAGE                                         │
│ • Pink/Purple gradient hero (from-pink-600 to-purple-700)  │
│ • Pink-50 background sections                               │
│ • White cards with pink/purple accents                      │
│ • Vibrant and discovery-focused feel                        │
│ • Browse-oriented layout                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Decision Points

```
USER ARRIVES ON SITE
        │
        ├─ New User?
        │   ├─ Yes → Main Landing Page
        │   │         │
        │   │         ├─ Want to Consult? → Click "I'm a Consultant"
        │   │         │                      → Sign Up → Consultant Landing
        │   │         │
        │   │         └─ Need Consultant? → Click "I'm a Company"
        │   │                               → Sign Up → Company Landing
        │   │
        │   └─ No → Login
        │            │
        │            ├─ Consultant → Consultant Landing
        │            │
        │            └─ Company → Company Landing
        │
        └─ From Landing Pages
            │
            ├─ Consultant Landing
            │   ├─ Complete Profile → /become-consultant
            │   └─ View Dashboard → /consultant-dashboard
            │
            └─ Company Landing
                ├─ Browse Consultants → /consultants
                └─ View Dashboard → /company-dashboard
```

---

## Route Protection Matrix

| Route                | Auth Required | Allowed Roles      | Redirect If Unauthorized |
|---------------------|---------------|-------------------|-------------------------|
| `/`                 | No            | All               | N/A                     |
| `/auth`             | No            | All               | N/A                     |
| `/consultant-home`  | Yes           | consultant        | `/auth`                 |
| `/company-home`     | Yes           | company           | `/auth`                 |
| `/dashboard`        | Yes           | All               | `/auth`                 |
| `/consultants`      | Yes           | company           | `/auth`                 |
| `/become-consultant`| Yes           | All               | `/auth`                 |
| `/consultant-dashboard` | Yes       | consultant        | `/auth`                 |
| `/company-dashboard`| Yes           | company           | `/auth`                 |

---

## Animation Timeline

```
PAGE LOAD (Main Landing)
0.0s  │ Page structure loads
0.3s  │ Hero section fades in
0.5s  │ Typing animation starts
2.0s  │ Typing animation completes
2.2s  │ Gradient underline animates
2.5s  │ Dual CTAs fade in
2.7s  │ Search bar fades in

SCROLL ANIMATIONS
      │ User scrolls down
      │ About Us section enters viewport
      │   ├─ Title fades in (0.6s)
      │   ├─ Content fades in (0.8s)
      │   ├─ Stats cards stagger in (0.1s each)
      │   └─ Values cards stagger in (0.1s each)
      │
      │ Why Choose Us section enters viewport
      │   ├─ Title fades in (0.6s)
      │   └─ Feature cards stagger in (0.1s each)
      │
      │ How It Works section enters viewport
      │   ├─ Title fades in (0.6s)
      │   ├─ Company column slides in from left (0.6s)
      │   └─ Consultant column slides in from right (0.6s)

HOVER INTERACTIONS
      │ User hovers over card
      │   ├─ Card lifts (y: -10px, 0.3s)
      │   ├─ Shadow increases
      │   └─ Border color changes
      │
      │ User hovers over button
      │   ├─ Scale increases (1.05, 0.2s)
      │   └─ Color transitions
```

---

## Mobile Responsive Breakpoints

```
< 640px (Mobile)
├─ Single column layouts
├─ Stacked CTAs
├─ Reduced font sizes
├─ Smaller spacing
└─ Simplified animations

640px - 768px (Large Mobile)
├─ 2-column grids where appropriate
├─ Larger touch targets
└─ Optimized spacing

768px - 1024px (Tablet)
├─ 2-3 column grids
├─ Side-by-side CTAs
├─ Full animations
└─ Generous spacing

> 1024px (Desktop)
├─ 3-4 column grids
├─ Full-width hero sections
├─ All animations enabled
└─ Maximum spacing
```

---

This diagram provides a complete visual overview of the user journey through the new landing pages and authentication flow!
