/**
 * ============================================
 * AUTHSCAPE THEME CONFIGURATION
 * ============================================
 *
 * This file contains all the theme colors and styling for the application.
 * To customize the theme for your brand, simply edit the values below.
 *
 * HOW TO CUSTOMIZE:
 * 1. Change the brand colors in the 'brand' section
 * 2. The light and dark mode colors will use these brand colors
 * 3. For deeper customization, edit the light/dark sections directly
 *
 * COLOR GUIDE:
 * - primary: Your main brand color (buttons, links, accents)
 * - secondary: Secondary accent color (hover states, highlights)
 * - accent: Third accent color (badges, notifications)
 *
 * ============================================
 */

export const themeConfig = {
  // ============================================
  // BRAND COLORS - CUSTOMIZE THESE FOR YOUR BRAND
  // ============================================
  brand: {
    primary: '#4f46e5',      // Main brand color (indigo) - Used for buttons, active states
    secondary: '#8b5cf6',    // Secondary accent (purple) - Used for hover states, gradients
    accent: '#63b3ed',       // Accent color (blue) - Used for highlights, badges
  },

  // Status colors (usually don't need to change these)
  status: {
    success: '#10b981',      // Green - Success messages, positive actions
    error: '#ef4444',        // Red - Error messages, destructive actions
    warning: '#f59e0b',      // Amber - Warning messages
    info: '#8b5cf6',         // Purple - Info messages
  },

  // ============================================
  // LIGHT MODE CONFIGURATION
  // ============================================
  light: {
    // Sidebar styling
    sidebar: {
      background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
      backgroundColor: '#ffffff',
      textColor: '#1a1a2e',
      textColorMuted: '#6b7280',
      borderColor: '#e5e7eb',
      shadowColor: 'rgba(0, 0, 0, 0.08)',
    },

    // Header bar styling
    header: {
      background: '#ffffff',
      borderBottom: '#e5e7eb',
      shadowColor: 'rgba(0, 0, 0, 0.06)',
    },

    // Main content area
    content: {
      background: '#f9fafb',
    },

    // Menu items
    menu: {
      iconColor: '#6b7280',  // Neutral gray for light mode icons
      hoverBackground: 'rgba(0, 0, 0, 0.04)',
      hoverColor: '#1f2937',
      activeBackground: '#1f2937',
      activeColor: '#ffffff',
      disabledColor: '#9ca3af',
    },
  },

  // ============================================
  // DARK MODE CONFIGURATION
  // ============================================
  dark: {
    // Sidebar styling
    sidebar: {
      background: 'linear-gradient(180deg, #1a1a2e 0%, #12121f 100%)',
      backgroundColor: '#1a1a2e',
      textColor: '#f9fafb',
      textColorMuted: '#9ca3af',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },

    // Header bar styling
    header: {
      background: '#1a1a2e',
      borderBottom: 'rgba(255, 255, 255, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },

    // Main content area
    content: {
      background: '#0f0f1a',
    },

    // Menu items
    menu: {
      iconColor: '#818cf8',
      hoverBackground: 'rgba(139, 92, 246, 0.15)',
      hoverColor: '#ffffff',
      activeBackground: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
      activeColor: '#ffffff',
      disabledColor: '#6b7280',
    },
  },
};

/**
 * Helper function to get theme values based on current mode
 * @param {string} mode - 'light' or 'dark'
 * @returns {object} Theme configuration for the specified mode
 */
export const getTheme = (mode) => {
  return {
    brand: themeConfig.brand,
    status: themeConfig.status,
    ...themeConfig[mode] || themeConfig.light,
  };
};

export default themeConfig;
