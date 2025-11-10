# 📋 Consultant Application - Quick Reference Guide

## 🚀 User Journey

```
User Dashboard
     ↓
[See "Become Consultant" Card]
     ↓
[Click "Get Started" Button]
     ↓
Application Form (/become-consultant)
     ↓
[Fill All Sections]
     ↓
[Upload Documents]
     ↓
[Accept Terms]
     ↓
[Submit Application]
     ↓
Success Page (/consultant-application-submitted)
     ↓
[View Timeline & Next Steps]
```

---

## 📝 Form Sections

### 1. Personal Information (Blue Header)
```
✓ First Name        [Pre-filled]
✓ Last Name         [Pre-filled]
✓ Email             [Disabled - Linked to account]
✓ Phone Number      [10 digits required]
```

### 2. Professional Information (Nude Header)
```
✓ Domain/Expertise  [12 options dropdown]
✓ Years Experience  [6 levels dropdown]
✓ Hourly Charge     [Minimum ₹100]
✓ Summary           [50-500 characters]
```

### 3. Document Verification (Blue Header)
```
✓ Aadhar Card       [JPG/PNG/PDF - 5 MB]
✓ PAN Card          [JPG/PNG/PDF - 5 MB]
✓ Certificates      [JPG/PNG/PDF - 10 MB each, multiple]
✓ Resume/CV         [PDF/DOC/DOCX - 5 MB]
```

### 4. Terms & Conditions
```
✓ Acceptance Checkbox [Required]
```

---

## 🎨 Color Scheme

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Button | Sky Blue | `#0088CC` |
| Gradient Start | Sky Blue | `#0088CC` |
| Gradient End | Light Blue | `#00A8E8` |
| Nude Header | Nude | `#E8D4C4` |
| Success Green | Green | `#10B981` |
| In Progress Blue | Blue | `#3B82F6` |
| Pending Gray | Gray | `#9CA3AF` |

---

## 📊 Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| First Name | Required | "This field is required" |
| Last Name | Required | "This field is required" |
| Phone | 10 digits | "Please enter a valid 10-digit phone number" |
| Domain | Required | "Please select an option" |
| Experience | Required | "Please select an option" |
| Hourly Charge | ≥ ₹100 | "Minimum hourly charge is ₹100" |
| Summary | 50-500 chars | "Minimum 50 characters required" / "Maximum 500 characters allowed" |
| Aadhar | Required | "Aadhar card is required" |
| PAN | Required | "PAN card is required" |
| Certificates | ≥ 1 file | "At least one certificate is required" |
| Resume | Required | "Resume is required" |
| Terms | Checked | "You must accept the terms and conditions" |

---

## 📂 File Upload Specifications

| Document | Formats | Max Size | Multiple |
|----------|---------|----------|----------|
| Aadhar Card | JPG, PNG, PDF | 5 MB | No |
| PAN Card | JPG, PNG, PDF | 5 MB | No |
| Certificates | JPG, PNG, PDF | 10 MB | Yes |
| Resume/CV | PDF, DOC, DOCX | 5 MB | No |

---

## 🎯 Domain Options

1. Business Strategy
2. Marketing & Sales
3. Finance & Accounting
4. Human Resources
5. Information Technology
6. Legal & Compliance
7. Operations Management
8. Product Management
9. Data Analytics
10. Digital Transformation
11. Supply Chain
12. Customer Experience

---

## 📈 Experience Levels

1. 0-1 years
2. 1-3 years
3. 3-5 years
4. 5-10 years
5. 10-15 years
6. 15+ years

---

## 🔄 Application Timeline

### Step 1: Application Received ✅
- **Status**: Completed
- **Icon**: FileText (green)
- **Description**: "We have received your application"

### Step 2: Document Verification 🔄
- **Status**: In Progress
- **Icon**: Shield (blue)
- **Description**: "Our team is verifying your documents"

### Step 3: Profile Approval ⏳
- **Status**: Pending
- **Icon**: UserCheck (gray)
- **Description**: "Final review and approval"

---

## 📧 What Happens Next?

1. ✅ **Document Review**
   - Team reviews application and verifies documents

2. ✅ **Email Notification**
   - Status update within 3-5 business days

3. ✅ **Dashboard Access**
   - Once approved, access to consultant dashboard

4. ✅ **Contact Availability**
   - May contact for additional information

---

## 🔐 Access Control

| User Type | Can Access Form? | Redirect If No |
|-----------|------------------|----------------|
| User | ✅ Yes | - |
| Consultant | ❌ No | /unauthorized |
| Company | ❌ No | /unauthorized |

---

## 🎨 UI Components

### Become Consultant Card (Dashboard)
```
┌─────────────────────────────────────────┐
│ 🔵 Gradient Background (Blue)          │
│                                         │
│ Ready to Share Your Expertise?         │
│ Join our network of professional...    │
│                                         │
│ ✓ Earn income by sharing expertise     │
│ ✓ Build your professional brand         │
│ ✓ Flexible schedule - work on terms    │
│ ✓ Connect with clients worldwide        │
│                                         │
│ [Get Started - Become a Consultant]    │
└─────────────────────────────────────────┘
```

### File Upload Area
```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                       │
│         📤 Upload Icon                │
│    Click to upload Aadhar Card        │
│                                       │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

### Success Page
```
┌─────────────────────────────────────────┐
│              ✅ (Animated)              │
│                                         │
│   Application Submitted Successfully!   │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Application ID: APP-123456789       │ │
│ │ Submission Date: Nov 9, 2025        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Timeline:                               │
│ ✅ Application Received                 │
│ 🔄 Document Verification                │
│ ⏳ Profile Approval                     │
│                                         │
│ [Go to Dashboard] [View Applications]  │
└─────────────────────────────────────────┘
```

---

## 💾 Session Storage Structure

```json
{
  "consultantApplication": {
    "applicationId": "APP-1699520000000-ABC123XYZ",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "domain": "Business Strategy",
    "yearsOfExperience": "5-10 years",
    "hourlyCharge": "2500",
    "professionalSummary": "Experienced business strategist with...",
    "files": {
      "aadharCard": "aadhar.pdf",
      "panCard": "pan.pdf",
      "certificates": ["cert1.pdf", "cert2.pdf"],
      "resume": "resume.pdf"
    },
    "status": "pending_approval",
    "submittedDate": "2025-11-09T03:30:00.000Z"
  }
}
```

---

## 🧪 Quick Test Scenarios

### Scenario 1: Valid Submission
1. Fill all required fields
2. Upload all documents
3. Accept terms
4. Submit → Success page

### Scenario 2: Missing Fields
1. Leave phone empty
2. Try to submit
3. See error: "Please enter a valid 10-digit phone number"

### Scenario 3: Invalid Hourly Charge
1. Enter ₹50
2. Blur field
3. See error: "Minimum hourly charge is ₹100"

### Scenario 4: Short Summary
1. Enter 30 characters
2. Blur field
3. See error: "Minimum 50 characters required"

### Scenario 5: Invalid File
1. Try to upload .txt file
2. See toast: "Please check file type and size requirements"

---

## 📱 Responsive Design

### Desktop (≥768px)
- Two-column layout for form fields
- Side-by-side action buttons
- Large icon on Become Consultant card

### Tablet (≥640px)
- Two-column layout maintained
- Stacked action buttons
- Adjusted padding

### Mobile (<640px)
- Single-column layout
- Full-width buttons
- Hidden icon on Become Consultant card
- Stacked form fields

---

## ✅ Success Criteria

- [x] Form loads with pre-filled data
- [x] All validations work correctly
- [x] Files upload successfully
- [x] Application submits without errors
- [x] Success page shows correct data
- [x] Timeline displays properly
- [x] Navigation buttons work
- [x] Responsive on all devices
- [x] Animations smooth
- [x] Access control enforced

---

## 🎉 Result

**Complete consultant application flow with:**
- ✅ Professional UI/UX
- ✅ Comprehensive validation
- ✅ File upload with preview
- ✅ Success confirmation
- ✅ Timeline tracking
- ✅ Responsive design
- ✅ Smooth animations

**Ready for production!** 🚀
