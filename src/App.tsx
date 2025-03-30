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
import PennyLaneConfigStep from "./components/PennyLaneConfigStep";
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
    label: "Configuration PennyLane",
    description: "Configurer les paramètres PennyLane",
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
        return <PennyLaneConfigStep config={config} setConfig={setConfig} />;
      default:
        return "Étape inconnue";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <SettingsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Générateur de Configuration
          </Typography>
          <Button
            color="inherit"
            onClick={handleLoadDummyData}
            startIcon={<CloudDownloadIcon />}
          >
            Charger exemple
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", mt: 4 }}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              Générateur de Configuration
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Suivez les étapes pour générer facilement un fichier de
              configuration complet.
            </Typography>

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              nonLinear
              sx={{ mb: 5 }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton onClick={() => handleStep(index)}>
                    <StepLabel>
                      <Typography variant="subtitle2">{step.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
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
                p: 1,
                borderLeft: "4px solid",
                borderColor: "primary.main",
                bgcolor: "primary.50",
                mb: 4,
                borderRadius: "0 4px 4px 0",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                {steps[activeStep].label}
              </Typography>
              <Typography variant="body2">
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
              >
                Réinitialiser
              </Button>

              <Box>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Retour
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<NavigateNextIcon />}
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleExport}
                    startIcon={<CloudDownloadIcon />}
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
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
