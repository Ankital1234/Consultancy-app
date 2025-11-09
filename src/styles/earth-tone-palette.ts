/**
 * Earth-Tone Color Palette
 * Professional nude & warm color scheme for landing pages
 */

export const earthTonePalette = {
  // Primary Colors (Nude & Earth Tones)
  warmBeige: '#F5E6D3',      // Soft, warm, premium feel - backgrounds
  warmTaupe: '#D4C5B9',      // Sophisticated, neutral accent - borders, accents
  warmGray: '#8B8680',       // Text and secondary elements
  charcoal: '#2B2520',       // Headlines and primary text
  cream: '#FDFBF7',          // Clean backgrounds

  // Accent Colors (Minimal, Professional)
  warmGold: '#C9A876',       // Subtle accents, hover states, CTAs
  dustyRose: '#B89B8E',      // Secondary accent (optional, very muted)
  softSage: '#A8A892',       // Tertiary accent (very subtle)

  // Neutral Grays
  lightBeigeGray: '#E8E3DE', // Borders, section backgrounds
  mediumGray: '#9B9490',     // Secondary text
  darkCharcoal: '#3D3935',   // Dark backgrounds (footer)

  // Supporting Colors
  white: '#FFFFFF',          // Cards, overlays
  veryLightTaupe: '#F9F6F3', // Subtle backgrounds, hover states
  softBrown: '#6B5D52',      // Borders, dividers

  // Gradient Backgrounds
  gradients: {
    heroMain: 'linear-gradient(to bottom, #FDFBF7, #FAF3E6)',
    heroConsultant: 'linear-gradient(to bottom, #FDFBF7, #F8F7F5)',
    heroCompany: 'linear-gradient(to bottom, #FDFBF7, #F5F0ED)',
  }
};

/**
 * Tailwind CSS Custom Colors Configuration
 * Add these to your tailwind.config.js
 */
export const tailwindColors = {
  'warm-beige': '#F5E6D3',
  'warm-taupe': '#D4C5B9',
  'warm-gray': '#8B8680',
  'charcoal': '#2B2520',
  'cream': '#FDFBF7',
  'warm-gold': '#C9A876',
  'dusty-rose': '#B89B8E',
  'soft-sage': '#A8A892',
  'light-beige-gray': '#E8E3DE',
  'medium-gray': '#9B9490',
  'dark-charcoal': '#3D3935',
  'very-light-taupe': '#F9F6F3',
  'soft-brown': '#6B5D52',
};

/**
 * Component-Specific Color Usage
 */
export const componentColors = {
  // Buttons
  button: {
    primary: {
      bg: '#C9A876',        // Warm Gold
      hover: '#B89B7F',     // Darker Gold
      text: '#FFFFFF',
      border: '#C9A876',
    },
    secondary: {
      bg: '#FFFFFF',
      hover: '#F9F1E8',
      text: '#2B2520',
      border: '#C9A876',
    },
    tertiary: {
      bg: '#F5E6D3',        // Warm Beige
      hover: '#E8DCC8',
      text: '#2B2520',
      border: '#D4C5B9',
    },
  },

  // Cards
  card: {
    bg: '#FFFFFF',
    border: '#E8E3DE',
    borderHover: '#D4C5B9',
    shadow: 'rgba(43, 37, 32, 0.08)',
    shadowHover: 'rgba(43, 37, 32, 0.12)',
  },

  // Text
  text: {
    heading: '#2B2520',     // Charcoal
    body: '#8B8680',        // Warm Gray
    caption: '#9B9490',     // Medium Gray
    accent: '#C9A876',      // Warm Gold
    disabled: '#A8A892',    // Soft Sage
  },

  // Forms
  form: {
    bg: '#FFFFFF',
    border: '#D4C5B9',
    borderFocus: '#C9A876',
    placeholder: '#A8A892',
    label: '#2B2520',
  },

  // Icons
  icon: {
    active: '#C9A876',      // Warm Gold
    neutral: '#8B8680',     // Warm Gray
    hover: '#C9A876',
  },

  // Backgrounds
  background: {
    primary: '#FDFBF7',     // Cream
    secondary: '#F5E6D3',   // Warm Beige
    tertiary: '#E8E3DE',    // Light Beige Gray
    dark: '#2B2520',        // Charcoal (footer)
  },

  // Progress & Status
  progress: {
    completed: '#C9A876',   // Warm Gold
    current: '#D4C5B9',     // Warm Taupe
    pending: '#A8A892',     // Soft Sage
    track: '#E8E3DE',       // Light Beige Gray
  },

  // Page-Specific Accents
  pages: {
    main: {
      primary: '#C9A876',   // Warm Gold
      secondary: '#F5E6D3', // Warm Beige
    },
    consultant: {
      primary: '#C9A876',   // Warm Gold (elegance, trust)
      secondary: '#F8F7F5', // Soft Sage background
    },
    company: {
      primary: '#D4C5B9',   // Warm Taupe
      secondary: '#B89B8E', // Dusty Rose
    },
  },
};

/**
 * Usage Examples
 */
export const usageExamples = {
  // Hero Section
  hero: {
    background: earthTonePalette.cream,
    gradient: earthTonePalette.gradients.heroMain,
    heading: earthTonePalette.charcoal,
    subheading: earthTonePalette.warmGray,
    underline: earthTonePalette.warmGold,
  },

  // About Us Section
  aboutUs: {
    background: earthTonePalette.warmBeige,
    cardBg: earthTonePalette.white,
    cardBorder: earthTonePalette.lightBeigeGray,
    iconBg: earthTonePalette.warmGold,
    statNumber: earthTonePalette.warmGold,
    statLabel: earthTonePalette.warmGray,
  },

  // Why Choose Us Section
  whyChooseUs: {
    background: earthTonePalette.cream,
    cardBg: earthTonePalette.white,
    cardBorder: earthTonePalette.lightBeigeGray,
    cardBorderHover: earthTonePalette.warmTaupe,
    iconBg: earthTonePalette.warmGold,
  },

  // How It Works Section
  howItWorks: {
    background: earthTonePalette.cream,
    cardBg: earthTonePalette.warmBeige,
    cardBorder: earthTonePalette.lightBeigeGray,
    stepCircle: {
      company: earthTonePalette.warmGold,
      consultant: earthTonePalette.warmTaupe,
    },
  },

  // Categories Section
  categories: {
    background: earthTonePalette.lightBeigeGray,
    cardBg: earthTonePalette.white,
    cardBorder: earthTonePalette.lightBeigeGray,
    cardBorderHover: earthTonePalette.warmGold,
    iconBg: earthTonePalette.warmBeige,
    iconBgHover: earthTonePalette.warmGold,
  },

  // Footer
  footer: {
    background: earthTonePalette.charcoal,
    text: earthTonePalette.cream,
    linkHover: earthTonePalette.warmGold,
    divider: earthTonePalette.softBrown,
  },
};

export default earthTonePalette;
