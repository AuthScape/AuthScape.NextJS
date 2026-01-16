import { createTheme } from "@mui/material/styles";

// Modern AI-themed color palette matching the IDP pages
const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#4f46e5", // Indigo - matches IDP button gradient start
      light: "#eef2ff",
      dark: "#1a1a2e", // Dark navy - matches IDP primary dark
    },
    secondary: {
      main: "#63b3ed", // Light blue - matches IDP accent
      light: "#e0f2fe",
      dark: "#0369a1",
    },
    success: {
      main: "#10b981", // Emerald - matches IDP success
      light: "#ecfdf5",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    info: {
      main: "#8b5cf6", // Purple - matches IDP accent
      light: "#f5f3ff",
      dark: "#6d28d9",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444", // Red - matches IDP error
      light: "#fef2f2",
      dark: "#dc2626",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b", // Amber
      light: "#fffbeb",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    green: {
      main: "#10b981",
      light: "#ecfdf5",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    orange: {
      main: "#f97316",
      light: "#fff7ed",
      dark: "#ea580c",
      contrastText: "#ffffff",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#6b7280",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.04,
      hover: "#f8fafc",
    },
    divider: "#e5e7eb",
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.25rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.9375rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    },
    body2: {
      fontSize: "0.875rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1.25rem",
    },
    subtitle1: {
      fontSize: "0.9375rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15) !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "10px 20px",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d5a 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #2d2d5a 0%, #1a1a2e 100%)",
            boxShadow: "0 10px 20px rgba(26, 26, 46, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#63b3ed",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4f46e5",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
        standardSuccess: {
          backgroundColor: "#ecfdf5",
          border: "1px solid #a7f3d0",
          color: "#065f46",
        },
        standardError: {
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#991b1b",
        },
        standardWarning: {
          backgroundColor: "#fffbeb",
          border: "1px solid #fde68a",
          color: "#92400e",
        },
        standardInfo: {
          backgroundColor: "#f0f9ff",
          border: "1px solid #bae6fd",
          color: "#0369a1",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#f9fafb",
            fontWeight: 600,
            color: "#374151",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#e5e7eb",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#e5e7eb",
        },
      },
    },
  },
});

export { baselightTheme };
