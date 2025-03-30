import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A3E0", // Bleu Zeendoc
      light: "#4BC7FF",
      dark: "#0077A9",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F58220", // Orange Zeendoc
      light: "#FFA64D",
      dark: "#D35F00",
      contrastText: "#fff",
    },
    background: {
      default: "#F5F7F9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
    },
    success: {
      main: "#10B981", // Vert Zeendoc
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B", // Jaune/Orange Zeendoc
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444", // Rouge Zeendoc
      light: "#F87171",
      dark: "#DC2626",
    },
    info: {
      main: "#00A3E0", // Bleu Zeendoc
      light: "#4BC7FF",
      dark: "#0077A9",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        },
        outlined: {
          borderWidth: 1.5,
        },
        sizeSmall: {
          padding: "6px 12px",
          fontSize: "0.8125rem",
        },
        sizeLarge: {
          padding: "10px 22px",
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
          overflow: "visible",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 20px 8px",
        },
        title: {
          fontSize: "1.125rem",
          fontWeight: 600,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 20px 20px",
          "&:last-child": {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00A3E0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
          },
        },
        input: {
          padding: "12px 14px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 8,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: "#E5F5FD", // Bleu clair Zeendoc
          color: "#00A3E0",
          "&.MuiChip-colorPrimary": {
            backgroundColor: "#E5F5FD",
            color: "#00A3E0",
          },
          "&.MuiChip-colorSecondary": {
            backgroundColor: "#FEF0E6",
            color: "#F58220",
          },
          "&.MuiChip-colorSuccess": {
            backgroundColor: "#D1FAE5",
            color: "#10B981",
          },
          "&.MuiChip-colorError": {
            backgroundColor: "#FEE2E2",
            color: "#EF4444",
          },
          "&.MuiChip-colorWarning": {
            backgroundColor: "#FEF3C7",
            color: "#F59E0B",
          },
        },
        outlined: {
          "&.MuiChip-colorPrimary": {
            borderColor: "#4BC7FF",
          },
          "&.MuiChip-colorSecondary": {
            borderColor: "#FFA64D",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          overflow: "hidden",
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 16px",
          minHeight: 56,
          "&.Mui-expanded": {
            minHeight: 56,
          },
        },
        content: {
          margin: "12px 0",
          "&.Mui-expanded": {
            margin: "12px 0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "8px 16px 16px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
        },
        elevation2: {
          boxShadow:
            "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "#F9FAFB",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: "#D1FAE5",
          color: "#065F46",
        },
        standardInfo: {
          backgroundColor: "#E5F5FD",
          color: "#0077A9",
        },
        standardWarning: {
          backgroundColor: "#FEF3C7",
          color: "#92400E",
        },
        standardError: {
          backgroundColor: "#FEE2E2",
          color: "#B91C1C",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-active": {
            fontWeight: 600,
          },
          "&.Mui-completed": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          "&.Mui-selected": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: 64,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
