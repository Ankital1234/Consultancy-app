# Premium UI Components Guide

This guide provides implementation patterns for additional premium UI components following the same design philosophy as the Premium Footer.

## 🎨 Design System Overview

### Color Palette
```css
/* Primary Colors */
--blue-primary: #3B82F6 → #2563EB
--purple-accent: #A855F7 → #9333EA
--teal-secondary: #14B8A6 → #0D9488

/* Luxury Accents */
--rose-gold: #FB7185 → #F43F5E
--gold: #FBBF24 → #F59E0B

/* Dark Navy Background */
--navy-dark: #020617
--navy-medium: #0F172A
--navy-light: #1E293B
```

### Glassmorphic Base Classes
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 1. Hero Section Component

### Features
- Dark-mode minimalist design
- Glassmorphism cards
- Apple-inspired styling
- Animated background gradients

### Implementation Pattern

```tsx
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h1 className="text-7xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Premium Design
            </span>
          </h1>
          
          {/* Glassmorphic Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <p className="text-slate-300">Your content here</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
```

---

## 2. Navigation Bar Component

### Features
- Fixed glassmorphic navbar
- Hover states with smooth transitions
- Scroll-based backdrop blur

### Implementation Pattern

```tsx
import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

const PremiumNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Brand
          </motion.div>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {['Features', 'Pricing', 'About'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
```

---

## 3. Card Components

### Features
- Dashboard cards with gradient overlays
- Multiple variations (default, hover, active)
- Glassmorphic backgrounds

### Implementation Pattern

```tsx
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PremiumCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
}

const PremiumCard = ({ 
  title, 
  description, 
  icon: Icon,
  gradient = 'from-blue-500 to-purple-500'
}: PremiumCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      {/* Card */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-20 mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
      />
    </motion.div>
  );
};
```

---

## 4. Interactive Buttons

### Features
- Complete button design system
- All states (default, hover, active, disabled, loading)
- Gradient backgrounds with shadows

### Implementation Pattern

```tsx
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const PremiumButton = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick
}: PremiumButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
    secondary: 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10',
    outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      `}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
};
```

---

## 5. Form Fields

### Features
- Modern input designs
- Focus states with glow effects
- Micro-interactions

### Implementation Pattern

```tsx
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PremiumInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const PremiumInput = ({ 
  label, 
  type = 'text', 
  placeholder,
  icon 
}: PremiumInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3
            bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg
            text-white placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
            transition-all duration-300
          `}
        />
        
        {/* Focus Glow */}
        <motion.div
          animate={{ opacity: focused ? 1 : 0 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"
        />
      </div>
    </div>
  );
};
```

---

## 6. Dropdown Menus

### Features
- Premium menu components
- Smooth animations
- Glassmorphic backgrounds

### Implementation Pattern

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PremiumDropdown = ({ 
  label, 
  items 
}: { 
  label: string; 
  items: string[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full min-w-[200px] p-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl"
          >
            {items.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-full px-4 py-2 text-left text-slate-300 hover:text-white rounded-lg transition-colors duration-200"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

## 7. Section Dividers

### Features
- Elegant separators
- Gradient patterns
- Animated reveals

### Implementation Pattern

```tsx
import { motion } from 'framer-motion';

const PremiumDivider = ({ 
  variant = 'gradient' 
}: { 
  variant?: 'gradient' | 'dots' | 'line' 
}) => {
  if (variant === 'gradient') {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2 py-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      className="h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent rounded-full"
    />
  );
};
```

---

## 8. Animated Hover Effects

### Showcase of Premium Interaction Patterns

```tsx
// Lift and Glow
<motion.div
  whileHover={{ y: -5 }}
  className="relative group"
>
  <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
    Content
  </div>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl rounded-lg" />
</motion.div>

// Scale and Shadow
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
>
  Button
</motion.button>

// Slide and Fade
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## 9. Dark Mode Aesthetic Reference

### Complete Design System

```tsx
// Background Layers
const backgrounds = {
  primary: 'bg-slate-950',      // #020617
  secondary: 'bg-slate-900',    // #0F172A
  tertiary: 'bg-slate-800',     // #1E293B
};

// Text Colors
const textColors = {
  primary: 'text-white',
  secondary: 'text-slate-300',
  muted: 'text-slate-400',
  disabled: 'text-slate-600',
};

// Border Colors
const borders = {
  subtle: 'border-white/10',
  medium: 'border-white/20',
  strong: 'border-white/30',
};

// Glassmorphic Layers
const glass = {
  light: 'bg-white/5 backdrop-blur-sm',
  medium: 'bg-white/10 backdrop-blur-md',
  strong: 'bg-white/20 backdrop-blur-lg',
};
```

---

## 🎯 Implementation Tips

### 1. Consistent Spacing
Use Tailwind's spacing scale consistently:
- `gap-4`, `gap-6`, `gap-8` for layouts
- `p-4`, `p-6`, `p-8` for padding
- `space-y-4`, `space-y-6` for vertical spacing

### 2. Animation Timing
- Quick interactions: 200-300ms
- Standard transitions: 300-400ms
- Smooth animations: 400-500ms
- Background effects: 8-10s

### 3. Glassmorphic Best Practices
- Always use `backdrop-blur`
- Keep opacity low (5-20%)
- Add subtle borders with `border-white/10`
- Layer multiple glass elements for depth

### 4. Gradient Usage
- Use 2-3 colors maximum
- Maintain consistent color palette
- Apply to text, backgrounds, and borders
- Use `bg-clip-text` for gradient text

### 5. Responsive Design
```tsx
// Mobile-first approach
className="
  text-base md:text-lg lg:text-xl
  p-4 md:p-6 lg:p-8
  grid-cols-1 md:grid-cols-2 lg:grid-cols-4
"
```

---

## 📦 Reusable Component Library Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── PremiumButton.tsx
│   │   ├── PremiumCard.tsx
│   │   ├── PremiumInput.tsx
│   │   ├── PremiumDropdown.tsx
│   │   └── PremiumDivider.tsx
│   ├── layout/
│   │   ├── PremiumNavbar.tsx
│   │   ├── PremiumFooter.tsx
│   │   └── PremiumHero.tsx
│   └── shared/
│       ├── GlassCard.tsx
│       └── AnimatedBackground.tsx
```

---

## 🚀 Quick Start Template

```tsx
import { motion } from 'framer-motion';

const PremiumPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Your content here */}
        </motion.div>
      </div>
    </div>
  );
};
```

---

**Built with premium design principles from Apple, Stripe, and Vercel** ✨
