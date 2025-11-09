# 🧭 Navigation Reference Guide

## Quick Navigation by User Type

### 👤 Regular User
**Role**: `user`
**Dashboard**: `/user-dashboard`

**Navigation Items**:
```
🏠 Dashboard        → /user-dashboard
🔍 Find Consultants → /marketplace
📁 My Projects      → /my-projects
💬 Messages         → /messages
⚙️  Settings        → /settings
```

**What They SEE**:
- ✅ Find Consultants button
- ✅ My Projects
- ✅ Messages
- ✅ Reviews

**What They DON'T SEE**:
- ❌ Become Consultant
- ❌ Consultant Dashboard
- ❌ Company features

---

### 💼 Consultant
**Role**: `consultant`
**Dashboard**: `/consultant-home`

**Navigation Items**:
```
🏠 Dashboard  → /consultant-home
👤 Profile    → /consultant-profile
📦 Services   → /my-services
👥 Clients    → /my-clients
💰 Earnings   → /earnings
⚙️  Settings  → /settings
```

**What They SEE**:
- ✅ Complete Your Profile
- ✅ Service Packages
- ✅ Start Consulting
- ✅ Earnings Dashboard

**What They DON'T SEE**:
- ❌ Find Consultants (they ARE consultants)
- ❌ User Dashboard
- ❌ Company features

---

### 🏢 Company
**Role**: `company`
**Dashboard**: `/company-home`

**Navigation Items**:
```
🏠 Dashboard    → /company-home
📦 Services     → /company-services
👥 Consultants  → /company-consultants
📊 Analytics    → /company-analytics
⚙️  Settings    → /settings
```

**What They SEE**:
- ✅ Manage Consultants
- ✅ Analytics
- ✅ Services
- ✅ Billing

**What They DON'T SEE**:
- ❌ Find Consultants
- ❌ Become Consultant
- ❌ User features

---

## 🎨 User Badge Colors

| Role | Badge Color | Hex Code |
|------|------------|----------|
| User | Blue | `#0088CC` |
| Consultant | Green | `#10B981` |
| Company | Purple | `#9333EA` |

---

## 🚫 Access Control Matrix

| Route | User | Consultant | Company |
|-------|------|------------|---------|
| `/user-dashboard` | ✅ | ❌ | ❌ |
| `/consultant-home` | ❌ | ✅ | ❌ |
| `/company-home` | ❌ | ❌ | ✅ |
| `/marketplace` | ✅ | ❌ | ✅ |
| `/consultant-profile` | ❌ | ✅ | ❌ |
| `/my-services` | ❌ | ✅ | ❌ |
| `/company-consultants` | ❌ | ❌ | ✅ |

---

## 🔄 Redirect Rules

### Sign In Redirects:
```typescript
'user'       → /user-dashboard
'consultant' → /consultant-home
'company'    → /company-home
```

### Unauthorized Access:
```typescript
Wrong role → /unauthorized → Auto-redirect to correct dashboard (3s)
```

---

## 📱 Mobile Navigation

**All User Types**:
- Hamburger menu (☰) on mobile
- Full navigation in dropdown
- Role badge visible
- Avatar with dropdown
- Logout button accessible

---

## 🎯 Quick Test Commands

### Test Regular User:
1. Sign in with user account
2. Should see: Dashboard, Find Consultants, My Projects, Messages, Settings
3. Should NOT see: Become Consultant, Consultant Dashboard

### Test Consultant:
1. Sign in with consultant account
2. Should see: Dashboard, Profile, Services, Clients, Earnings, Settings
3. Should NOT see: Find Consultants, User Dashboard

### Test Company:
1. Sign in with company account
2. Should see: Dashboard, Services, Consultants, Analytics, Settings
3. Should NOT see: Find Consultants, Become Consultant

---

## 🛠️ Implementation Files

| Component | File | Purpose |
|-----------|------|---------|
| Smart Navigation | `src/components/SmartNavigation.tsx` | Role-based navigation |
| Unauthorized Page | `src/pages/Unauthorized.tsx` | Access denied page |
| Protected Route | `src/components/ProtectedRoute.tsx` | Route protection |
| Auth Context | `src/contexts/AuthContext.tsx` | User role management |
| User Dashboard | `src/pages/UserDashboard.tsx` | Regular user dashboard |
| Consultant Landing | `src/pages/ConsultantLanding.tsx` | Consultant dashboard |
| Company Landing | `src/pages/CompanyLanding.tsx` | Company dashboard |

---

## ✅ Verification Checklist

- [ ] Regular users don't see "Become Consultant"
- [ ] Consultants don't see "Find Consultants"
- [ ] Company users have separate navigation
- [ ] User badge shows correct role
- [ ] Unauthorized access redirects properly
- [ ] Mobile menu works on all devices
- [ ] Role persists across sessions
- [ ] Auto-redirect works on sign-in
- [ ] All colors match design system
- [ ] Animations are smooth

---

## 🎉 Success Criteria

✅ **Zero irrelevant options shown**
✅ **Complete role separation**
✅ **Professional design**
✅ **Responsive on all devices**
✅ **Smooth user experience**

**Perfect implementation!** 🚀
