# 🎨 Color Palette Reference

## Primary Colors

### Sky Blue Theme
```css
Primary Blue:     #0088CC  /* Professional, trustworthy */
Secondary Blue:   #00A8E8  /* Accents, hover states */
```

### Nude/Beige Theme
```css
Nude Primary:     #E8D4C4  /* Warm, professional */
Light Nude:       #F5EFE9  /* Backgrounds, subtle accents */
Nude Secondary:   #D4C4B4  /* Darker nude for gradients */
```

### Text Colors
```css
Dark Text:        #2C3E50  /* Primary text, headers */
Gray Text:        #6B7280  /* Secondary text (gray-600) */
Light Gray:       #9CA3AF  /* Tertiary text (gray-400) */
```

### Status Colors
```css
Success Green:    #10B981  /* Completed, approved */
Warning Yellow:   #F59E0B  /* Pending, in progress */
Error Red:        #EF4444  /* Errors, rejections */
```

---

## Gradients

### Blue Gradients
```css
Primary:    from-[#0088CC] to-[#00A8E8]
Hero:       from-[#0088CC] via-[#00A8E8] to-[#0088CC]
```

### Nude Gradients
```css
Primary:    from-[#E8D4C4] to-[#D4C4B4]
Light:      from-[#E8D4C4] to-[#F5EFE9]
```

### Background Gradients
```css
Page:       from-[#F5EFE9] to-white
Section:    from-[#F5EFE9] via-white to-[#F5EFE9]
```

---

## Usage Guide

### User Dashboard
- **Background**: Light nude gradient (`from-[#F5EFE9] to-white`)
- **Primary Actions**: Sky blue (`#0088CC`)
- **Secondary Actions**: Nude (`#E8D4C4`)
- **Text**: Dark (`#2C3E50`)

### Consultant Landing
- **Hero**: Blue gradient (`from-[#0088CC] to-[#00A8E8]`)
- **Cards**: White with blue/nude accents
- **Icons**: Blue gradient backgrounds
- **Footer**: Dark (`#2C3E50`)

### Buttons
```css
Primary:    bg-[#0088CC] hover:bg-[#0077B3] text-white
Secondary:  bg-[#E8D4C4] hover:bg-[#D4C4B4] text-[#2C3E50]
Outline:    border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white
```

### Cards
```css
Default:    bg-white border-none shadow-lg
Hover:      hover:shadow-xl transition-shadow
Gradient:   bg-gradient-to-r from-[#E8D4C4] to-[#F5EFE9]
```

### Badges
```css
Success:    bg-green-100 text-green-700
Warning:    bg-yellow-100 text-yellow-700
Info:       bg-blue-100 text-blue-700
```

---

## Tailwind Classes

### Backgrounds
- `bg-[#0088CC]` - Primary blue
- `bg-[#E8D4C4]` - Nude primary
- `bg-[#F5EFE9]` - Light nude
- `bg-[#2C3E50]` - Dark footer

### Text
- `text-[#2C3E50]` - Primary text
- `text-gray-600` - Secondary text
- `text-gray-400` - Tertiary text

### Borders
- `border-[#0088CC]` - Blue border
- `border-[#E8D4C4]` - Nude border

### Gradients
- `bg-gradient-to-r from-[#0088CC] to-[#00A8E8]`
- `bg-gradient-to-r from-[#E8D4C4] to-[#D4C4B4]`
- `bg-gradient-to-b from-[#F5EFE9] to-white`

---

## Accessibility

### Contrast Ratios
- `#0088CC` on white: ✅ 4.5:1 (WCAG AA)
- `#2C3E50` on white: ✅ 12:1 (WCAG AAA)
- `#E8D4C4` on white: ⚠️ Use for accents only

### Best Practices
- Use `#2C3E50` for all body text
- Use `#0088CC` for interactive elements
- Use `#E8D4C4` for backgrounds and accents
- Ensure sufficient contrast for readability

---

## Design Tokens

```typescript
const colors = {
  primary: {
    blue: '#0088CC',
    blueLight: '#00A8E8',
    blueDark: '#0077B3',
  },
  secondary: {
    nude: '#E8D4C4',
    nudeLight: '#F5EFE9',
    nudeDark: '#D4C4B4',
  },
  text: {
    primary: '#2C3E50',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};
```

---

## Component Examples

### Primary Button
```tsx
<Button className="bg-[#0088CC] hover:bg-[#0077B3] text-white">
  Click Me
</Button>
```

### Card with Gradient
```tsx
<Card className="bg-gradient-to-r from-[#E8D4C4] to-[#F5EFE9]">
  <CardContent>...</CardContent>
</Card>
```

### Icon with Blue Background
```tsx
<div className="bg-gradient-to-r from-[#0088CC] to-[#00A8E8] p-3 rounded-lg">
  <Icon className="h-6 w-6 text-white" />
</div>
```

---

## 🎨 Visual Harmony

The color palette creates a professional, trustworthy, and warm atmosphere:
- **Sky Blue**: Conveys professionalism and trust
- **Nude/Beige**: Adds warmth and approachability
- **Dark Text**: Ensures readability
- **White Backgrounds**: Clean, modern look

Perfect for a professional consulting platform! ✨
