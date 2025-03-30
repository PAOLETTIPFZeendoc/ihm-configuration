import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Container,
  Paper,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Alert,
  Snackbar,
  StepConnector,
  StepButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { Configuration } from "./types/Config";
import CollectionsStep from "./components/CollectionsStep";
import CollConfigStep from "./components/CollConfigStep";
import PLConfigStep from "./components/PLConfigStep";
import theme from "./theme";
import { initialConfig } from "./components/testData/dummy-json";

const steps = [
  {
    label: "Collections",
    description: "Associer les collections aux configurations",
  },
  {
    label: "Configuration des Collections",
    description: "Définir les paramètres des collections",
  },
  {
    label: "Configuration PL",
    description: "Configurer les paramètres PL",
  },
];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [config, setConfig] = useState<Configuration>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStep = (step: number) => {
    setActiveStep(step);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser toute votre configuration ?"
      )
    ) {
      setActiveStep(0);
      setConfig({});
      setSnackbar({
        open: true,
        message: "Configuration réinitialisée",
        severity: "info",
      });
    }
  };

  const handleExport = () => {
    const jsonString = JSON.stringify(config, null, 4);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "configuration.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSnackbar({
      open: true,
      message: "Configuration exportée avec succès",
      severity: "success",
    });
  };

  const handleLoadDummyData = () => {
    setConfig(initialConfig);
    setSnackbar({
      open: true,
      message: "Données d'exemple chargées",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CollectionsStep config={config} setConfig={setConfig} />;
      case 1:
        return <CollConfigStep config={config} setConfig={setConfig} />;
      case 2:
        return <PLConfigStep config={config} setConfig={setConfig} />;
      default:
        return "Étape inconnue";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "primary.main",
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <Toolbar sx={{ height: 64 }}>
          <SettingsIcon sx={{ mr: 2, color: "#fff" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Générateur de Configuration
          </Typography>
          <Button
            color="inherit"
            onClick={handleLoadDummyData}
            startIcon={<CloudDownloadIcon />}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Charger exemple
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", mt: 4 }}>
          <Paper
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              boxShadow:
                "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: { xs: "1.75rem", sm: "2rem" },
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Générateur de Configuration
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1rem", mb: 3 }}
            >
              Suivez les étapes pour générer facilement un fichier de
              configuration complet.
            </Typography>

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              nonLinear
              sx={{
                mb: 5,
                "& .MuiStepConnector-line": {
                  borderColor: "divider",
                },
                "& .MuiStepIcon-root": {
                  color: "rgba(0, 163, 224, 0.2)",
                  "&.Mui-active": {
                    color: "primary.main",
                  },
                  "&.Mui-completed": {
                    color: "primary.main",
                  },
                },
              }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton onClick={() => handleStep(index)}>
                    <StepLabel>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: activeStep === index ? 600 : 500,
                        }}
                      >
                        {step.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <Box
              sx={{
                mt: 2,
                p: 2,
                borderLeft: "4px solid",
                borderColor: "primary.main",
                bgcolor: "rgba(0, 163, 224, 0.08)",
                mb: 4,
                borderRadius: "0 8px 8px 0",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "primary.dark",
                }}
              >
                {steps[activeStep].label}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {steps[activeStep].description}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
                borderTop: "1px solid",
                borderColor: "divider",
                pt: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleReset}
                startIcon={<RestartAltIcon />}
                color="error"
                sx={{
                  borderColor: "error.light",
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "rgba(239, 68, 68, 0.04)",
                    borderColor: "error.main",
                  },
                }}
              >
                Réinitialiser
              </Button>

              <Box>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    "&.Mui-disabled": {
                      opacity: 0.4,
                    },
                  }}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Retour
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<NavigateNextIcon />}
                    sx={{
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleExport}
                    startIcon={<CloudDownloadIcon />}
                    sx={{
                      bgcolor: "secondary.main",
                      "&:hover": {
                        bgcolor: "secondary.dark",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    Exporter JSON
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow:
              "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
