# Signup Flow Implementation Guide

## Overview
New multi-step signup flow with user/consultant selection, company registration, and admin approval workflow.

## Completed Components

### 1. SignupSelection.tsx ✅
**Path**: `/signup`
**Features**:
- Two card options: User vs Consultant
- Earth-tone styling with hover effects
- Navigation to credentials page with type parameter

### 2. SignupCredentials.tsx ✅
**Path**: `/signup/credentials?type={user|consultant}`
**Features**:
- Email validation (regex pattern)
- Password strength indicator
- Real-time validation feedback
- Password requirements checklist
- Confirm password matching
- Two registration buttons:
  - "Register as Individual" → `/signup/individual`
  - "Register as Company" → `/signup/company-search`

### 3. CompanySearch.tsx ✅
**Path**: `/signup/company-search`
**Features**:
- Search bar with real-time filtering
- Industry filter options
- Paginated company list (10 per page)
- Company selection with visual feedback
- "My Applications" section showing pending registrations
- "Company Not Found" card with registration button

## Remaining Components to Create

### 4. CompanyRegister.tsx (IN PROGRESS)
**Path**: `/signup/company-register`
**Required Fields**:
- Company Name (required, 2-100 chars)
- Registration Number/CIN (required)
- Company Email (required, email format)
- Industry/Sector (dropdown, required)
- Custom Industry (if "Other" selected)
- Website (optional, URL format)
- Phone (required, phone format)
- Street Address (required)
- City (required)
- State/Province (dropdown, required)
- ZIP/Postal Code (required)
- Country (default: India)
- Description (required, 20-500 chars with counter)
- Employee Count (dropdown, required)
- Logo Upload (optional, JPG/PNG/GIF, max 5MB)
- Documents Upload (optional, PDF/JPG/PNG, max 10MB each)
- Terms & Conditions checkbox (required)

**Validation**:
- Real-time field validation
- Error messages with icons
- Touch-based validation (only show errors after blur)
- Form-level validation on submit

**Submit Action**:
- Generate application ID
- Store in sessionStorage
- Navigate to application submitted page

### 5. ApplicationSubmitted.tsx
**Path**: `/signup/application-submitted?id={applicationId}`
**Features**:
- Success checkmark icon
- Application status card with:
  - Status badge: "Waiting for Admin Approval" (yellow/orange)
  - Company name
  - Submission timestamp
  - Reference/Application ID
- "What Happens Next" section
- Action buttons:
  - "Go to Dashboard"
  - "Continue to Company Search"
  - "View My Applications"

### 6. IndividualRegister.tsx
**Path**: `/signup/individual?type={user|consultant|company}`
**Features**:
- Name, phone, profile picture
- Address/location
- Role/expertise selection (if consultant)
- Complete existing flow

## Routing Configuration

Add to `App.tsx`:

```typescript
import SignupSelection from '@/pages/signup/SignupSelection';
import SignupCredentials from '@/pages/signup/SignupCredentials';
import CompanySearch from '@/pages/signup/CompanySearch';
import CompanyRegister from '@/pages/signup/CompanyRegister';
import ApplicationSubmitted from '@/pages/signup/ApplicationSubmitted';
import IndividualRegister from '@/pages/signup/IndividualRegister';

// In routes:
<Route path="/signup" element={<SignupSelection />} />
<Route path="/signup/credentials" element={<SignupCredentials />} />
<Route path="/signup/company-search" element={<CompanySearch />} />
<Route path="/signup/company-register" element={<CompanyRegister />} />
<Route path="/signup/application-submitted" element={<ApplicationSubmitted />} />
<Route path="/signup/individual" element={<IndividualRegister />} />
```

## Session Storage Structure

### signupCredentials
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "userType": "user|consultant",
  "registrationType": "individual|company"
}
```

### selectedCompany
```json
{
  "id": "1",
  "name": "Tech Solutions India",
  "logo": "url",
  "description": "...",
  "industry": "IT",
  "employeeCount": "201-500"
}
```

### pendingApplications
```json
[
  {
    "id": "APP-1234567890",
    "companyName": "New Company",
    "status": "pending",
    "submittedDate": "11/9/2025",
    "applicationId": "APP-1234567890",
    ...allFormFields
  }
]
```

## Color Scheme (Earth Tones)

### Primary Colors
- Cream: #FDFBF7 (backgrounds)
- Warm Beige: #F5E6D3 (sections)
- Charcoal: #2B2520 (headings)
- Warm Gray: #8B8680 (body text)

### Accent Colors
- Warm Gold: #C9A876 (primary actions, consultant theme)
- Warm Taupe: #D4C5B9 (secondary actions, company theme)
- Dusty Rose: #B89B8E (tertiary accent)

### Status Colors
- Success/Approved: Green (#10B981)
- Pending: Yellow/Orange (#F59E0B)
- Error/Rejected: Red (#EF4444)

### Borders & Backgrounds
- Light Beige Gray: #E8E3DE (borders)
- Very Light Taupe: #F9F6F3 (hover states)

## Validation Rules

### Email
- Required
- Format: `^[^\s@]+@[^\s@]+\.[^\s@]+$`

### Password
- Required
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

### Phone
- Required
- Format: `^\+?[\d\s-()]+$`

### URL (Website)
- Optional
- Format: `^https?:\/\/.+\..+$`

### Description
- Required
- Min 20 characters
- Max 500 characters
- Show character count

## File Upload Specifications

### Logo
- Formats: JPG, PNG, GIF
- Max size: 5 MB
- Preview after upload
- Remove option

### Documents
- Formats: PDF, JPG, PNG
- Max size: 10 MB per file
- Multiple files allowed
- Show file list with remove option

## Next Steps

1. ✅ Complete SignupSelection
2. ✅ Complete SignupCredentials
3. ✅ Complete CompanySearch
4. ⏳ Complete CompanyRegister (form fields and validation)
5. ⏳ Create ApplicationSubmitted
6. ⏳ Create IndividualRegister
7. ⏳ Update App.tsx routing
8. ⏳ Test complete flow
9. ⏳ Backend API integration

## Testing Checklist

- [ ] User can select User or Consultant
- [ ] Email validation works correctly
- [ ] Password strength indicator updates
- [ ] Password requirements are enforced
- [ ] Passwords must match
- [ ] Individual registration redirects correctly
- [ ] Company search filters work
- [ ] Company selection persists
- [ ] Company registration form validates all fields
- [ ] File uploads work (logo and documents)
- [ ] Application submission creates pending record
- [ ] Application status displays correctly
- [ ] Navigation between pages works
- [ ] Back buttons function properly
- [ ] Session storage persists data
- [ ] Responsive design on mobile/tablet/desktop
