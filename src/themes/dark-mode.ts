export const lightTheme = {
  colors: {
    // Primary
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#dbeafe',
    primaryDark: '#1e40af',
    
    // Secondary
    secondary: '#64748b',
    secondaryHover: '#475569',
    secondaryLight: '#f1f5f9',
    
    // Semantic
    success: '#16a34a',
    successLight: '#dcfce7',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    error: '#dc2626',
    errorLight: '#fee2e2',
    info: '#0ea5e9',
    infoLight: '#e0f2fe',
    
    // Neutral
    background: '#ffffff',
    backgroundSecondary: '#f8fafc',
    backgroundTertiary: '#f1f5f9',
    surface: '#ffffff',
    surfaceHover: '#f8fafc',
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
    
    // Text
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#94a3b8',
    textInverse: '#ffffff',
    textLink: '#2563eb',
    
    // Status
    statusReceived: '#94a3b8',
    statusTriaged: '#3b82f6',
    statusPlanned: '#a855f7',
    statusInProgress: '#f59e0b',
    statusShipped: '#22c55e',
    statusClosed: '#64748b',
    
    // Overlay
    overlay: 'rgba(15, 23, 42, 0.5)',
    overlayLight: 'rgba(255, 255, 255, 0.9)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    dropdown: '100',
    sticky: '200',
    modal: '300',
    popover: '400',
    tooltip: '500',
  },
};

export const darkTheme = {
  colors: {
    // Primary
    primary: '#3b82f6',
    primaryHover: '#60a5fa',
    primaryLight: '#1e3a5f',
    primaryDark: '#1e40af',
    
    // Secondary
    secondary: '#94a3b8',
    secondaryHover: '#cbd5e1',
    secondaryLight: '#1e293b',
    
    // Semantic
    success: '#22c55e',
    successLight: '#14532d',
    warning: '#fbbf24',
    warningLight: '#78350f',
    error: '#ef4444',
    errorLight: '#7f1d1d',
    info: '#38bdf8',
    infoLight: '#0c4a6e',
    
    // Neutral
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    surface: '#1e293b',
    surfaceHover: '#334155',
    border: '#334155',
    borderHover: '#475569',
    
    // Text
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    textInverse: '#0f172a',
    textLink: '#60a5fa',
    
    // Status
    statusReceived: '#64748b',
    statusTriaged: '#60a5fa',
    statusPlanned: '#c084fc',
    statusInProgress: '#fbbf24',
    statusShipped: '#4ade80',
    statusClosed: '#94a3b8',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(30, 41, 59, 0.9)',
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  },
  typography: lightTheme.typography,
  transitions: lightTheme.transitions,
  breakpoints: lightTheme.breakpoints,
  zIndex: lightTheme.zIndex,
};

export type Theme = typeof lightTheme;

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
