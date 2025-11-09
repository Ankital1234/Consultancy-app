# Testing Guide - Landing Pages & User Flow

## Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Testing Scenarios

### Scenario 1: New Consultant User Journey

1. **Visit Main Landing Page**
   - Navigate to `http://localhost:5173/`
   - Observe the enhanced hero section with dual CTAs
   - Scroll through About Us, Why Choose Us, and How It Works sections

2. **Sign Up as Consultant**
   - Click "I'm a Consultant" button (blue)
   - Fill in the signup form
   - Select "Consultant" role
   - Submit the form

3. **Consultant Landing Page**
   - After signup, you should be redirected to `/consultant-home`
   - Verify personalized greeting appears
   - Check the stats dashboard preview
   - Review the 4-step "Getting Started" cards
   - Scroll through "How It Works" timeline
   - Check Resources & Support section

4. **Complete Profile**
   - Click "Complete Your Profile" or "Set Up Profile"
   - Should navigate to `/become-consultant`

5. **View Dashboard**
   - Click "View Dashboard" button
   - Should navigate to `/consultant-dashboard`

---

### Scenario 2: New Company User Journey

1. **Visit Main Landing Page**
   - Navigate to `http://localhost:5173/`
   - Observe the dual CTA buttons

2. **Sign Up as Company**
   - Click "I'm a Company" button (pink)
   - Fill in the signup form
   - Select "Company" role
   - Submit the form

3. **Company Landing Page**
   - After signup, you should be redirected to `/company-home`
   - Verify personalized greeting appears
   - Use the search bar to search for consultants
   - Browse the 8 service categories
   - Click on a category to filter consultants
   - Review "How to Get Started" timeline
   - Check Featured Consultants section
   - Review "Why Companies Choose Us" benefits

4. **Browse Consultants**
   - Click "Browse Consultants" or "View All Consultants"
   - Should navigate to `/consultants`

5. **View Dashboard**
   - Click "View Dashboard" button
   - Should navigate to `/dashboard` (SmartDashboard will show CompanyDashboard)

---

### Scenario 3: Existing User Login

1. **Login as Consultant**
   - Navigate to `/auth`
   - Enter consultant credentials
   - After login, should redirect to `/consultant-home`

2. **Login as Company**
   - Navigate to `/auth`
   - Enter company credentials
   - After login, should redirect to `/company-home`

---

## Visual Checks

### Main Landing Page (`/`)
- [ ] Hero section has animated typing effect
- [ ] Dual CTA buttons (blue and pink) are visible
- [ ] Search bar is functional
- [ ] About Us section displays with decorative underline
- [ ] Key statistics cards animate on scroll
- [ ] Core values cards display properly
- [ ] Why Choose Us section has 6 feature cards
- [ ] How It Works shows two columns (Companies & Consultants)
- [ ] Categories section maintained
- [ ] Trust badges section displays
- [ ] Footer is present

### Consultant Landing Page (`/consultant-home`)
- [ ] Blue gradient hero background
- [ ] Personalized greeting with user name
- [ ] Floating particle animations
- [ ] Stats dashboard with 4 metrics
- [ ] Profile completion progress bar
- [ ] 4 getting started step cards with status badges
- [ ] Timeline-style "How It Works" section (7 steps)
- [ ] Resources section with 4 cards
- [ ] Blue-themed CTA section
- [ ] Footer is present

### Company Landing Page (`/company-home`)
- [ ] Pink/Purple gradient hero background
- [ ] Personalized greeting with company name
- [ ] Search bar in hero section
- [ ] 8 service category cards in grid
- [ ] Each category shows consultant count
- [ ] "How to Get Started" timeline (5 steps)
- [ ] Featured consultants section (3 cards)
- [ ] "Why Companies Choose Us" section (6 benefits)
- [ ] Pink/Purple-themed CTA section
- [ ] Footer is present

---

## Animation Checks

### On Page Load
- [ ] Elements fade in smoothly
- [ ] Stagger effect on multiple items
- [ ] Typing animation on main landing hero

### On Scroll
- [ ] Sections animate when entering viewport
- [ ] Stats counters animate (if implemented)
- [ ] Cards lift on hover

### Hover Effects
- [ ] Buttons scale slightly on hover
- [ ] Cards elevate with shadow
- [ ] Icons rotate or animate
- [ ] Color transitions are smooth

---

## Responsive Design Checks

### Mobile (< 768px)
- [ ] Navigation menu works
- [ ] Hero sections are readable
- [ ] CTA buttons stack vertically
- [ ] Grid layouts adjust to single column
- [ ] Text sizes are appropriate
- [ ] Images scale properly

### Tablet (768px - 1024px)
- [ ] Grid layouts show 2 columns
- [ ] Hero sections display well
- [ ] Navigation is accessible
- [ ] Cards have proper spacing

### Desktop (> 1024px)
- [ ] Full grid layouts (3-4 columns)
- [ ] Hero sections use full width
- [ ] All animations work smoothly
- [ ] Spacing is generous

---

## Functionality Checks

### Navigation
- [ ] Main landing → Auth (with role parameter)
- [ ] Auth → Role-specific landing page
- [ ] Role-specific landing → Dashboard
- [ ] Role-specific landing → Profile setup
- [ ] Category cards → Filtered consultants page
- [ ] Search bar → Consultants page with search query

### Authentication
- [ ] Signup creates user account
- [ ] Login authenticates user
- [ ] Role-based redirect works
- [ ] Protected routes enforce authentication
- [ ] Role-based access control works

### Data Display
- [ ] User name appears in greetings
- [ ] Stats display (even if mock data)
- [ ] Profile completion shows percentage
- [ ] Categories show consultant counts
- [ ] Featured consultants display properly

---

## Browser Testing

Test in the following browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Performance Checks

- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts during load
- [ ] Images load progressively
- [ ] No console errors
- [ ] No console warnings (or minimal)

---

## Accessibility Checks

- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Color contrast is sufficient
- [ ] Images have alt text
- [ ] Buttons have descriptive labels
- [ ] Form inputs have labels

---

## Common Issues & Solutions

### Issue: Redirect not working after login
**Solution**: Check that the user role is correctly set in the Auth.tsx file

### Issue: Animations not triggering
**Solution**: Ensure Framer Motion is properly installed and viewport detection is working

### Issue: Protected routes not working
**Solution**: Verify ProtectedRoute component is correctly checking user authentication and role

### Issue: Stats not displaying
**Solution**: Check that mock data is properly defined in the component

### Issue: Images not loading
**Solution**: Verify image URLs are accessible and CORS is configured if needed

---

## Test Data

### Consultant Test Account
```
Email: consultant@test.com
Password: test123
Role: consultant
```

### Company Test Account
```
Email: company@test.com
Password: test123
Role: company
```

---

## Reporting Issues

When reporting issues, please include:
1. Browser and version
2. Screen size / device
3. Steps to reproduce
4. Expected behavior
5. Actual behavior
6. Screenshots (if applicable)
7. Console errors (if any)

---

## Success Criteria

✅ All three landing pages display correctly
✅ User flow works from main page → auth → role-specific landing → dashboard
✅ Animations are smooth and performant
✅ Design is responsive across all devices
✅ No critical console errors
✅ All CTAs navigate to correct pages
✅ Role-based access control works
✅ Visual design matches specifications

---

## Next Steps After Testing

1. Fix any identified bugs
2. Optimize performance if needed
3. Add analytics tracking
4. Prepare for production deployment
5. Create user documentation
6. Train support team on new flow
