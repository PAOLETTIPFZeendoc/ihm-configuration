import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Configuration, CollConfig } from "../types/Config";
import CardContainer from "./ui/CardContainer";
import { dummy_customs } from "./testData/dummy_customs";

interface CollConfigStepProps {
  config: Configuration;
  setConfig: (config: Configuration) => void;
}

// Liste des customs disponibles
const customValues = dummy_customs;

// Définition des types de champs
const fieldTypes = {
  code_journal: "numeric",
  compte_fournisseur: "numeric",
  imputationHT: "numeric",
  imputationTVA: "numeric",
  libelle: "text",
  numero_piece: "text",
  date_echeance: "date",
  export: "text",
  erreur: "text",
  devise: "text",
  "ledger-entry-id": "text",
  "attachment-id": "text",
};

// Descriptions des champs pour les tooltips
const fieldDescriptions = {
  code_journal: "Code du journal comptable",
  compte_fournisseur: "Compte fournisseur associé",
  imputationHT: "Imputation HT pour la comptabilité",
  imputationTVA: "Imputation TVA pour la comptabilité",
  libelle: "Libellé de l'opération",
  numero_piece: "Numéro de pièce comptable",
  date_echeance: "Date d'échéance",
  export: "Marqueur d'export",
  erreur: "Champ pour les erreurs",
  devise: "Devise utilisée",
  "ledger-entry-id": "ID d'entrée du registre",
  "attachment-id": "ID de la pièce jointe",
};

const CollConfigStep: React.FC<CollConfigStepProps> = ({
  config,
  setConfig,
}) => {
  const [newConfigName, setNewConfigName] = useState("");
  const [expandedConfig, setExpandedConfig] = useState<string | false>(false);

  const handleAddConfig = () => {
    if (!newConfigName) return;

    const newConfig: CollConfig = {
      code_journal: "",
      compte_fournisseur: "",
      imputationHT: "",
      imputationTVA: "",
      libelle: "",
      numero_piece: "",
      date_echeance: "",
      export: "",
      erreur: "",
      devise: "",
      "ledger-entry-id": "",
      "attachment-id": "",
    };

    setConfig({
      ...config,
      coll_config: {
        ...((config.coll_config as Record<string, CollConfig>) || {}),
        [newConfigName]: newConfig,
      },
    });

    setNewConfigName("");
  };

  const handleDeleteConfig = (configName: string) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer la configuration "${configName}" ?`
      )
    ) {
      const newConfig = { ...config };
      const collConfig = {
        ...((newConfig.coll_config as Record<string, CollConfig>) || {}),
      };
      delete collConfig[configName];
      newConfig.coll_config = collConfig;
      setConfig(newConfig);
    }
  };

  const handleConfigChange = (
    configName: string,
    field: keyof CollConfig,
    value: string
  ) => {
    const newConfig = { ...config };
    const collConfig = {
      ...((newConfig.coll_config as Record<string, CollConfig>) || {}),
    };
    collConfig[configName] = {
      ...collConfig[configName],
      [field]: value,
    };
    newConfig.coll_config = collConfig;
    setConfig(newConfig);
  };

  const collConfigs = (config.coll_config as Record<string, CollConfig>) || {};

  return (
    <Box>
      <CardContainer
        title="Ajouter une nouvelle configuration"
        tooltip="Créez une nouvelle configuration de collection en lui donnant un nom"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Nom de la configuration"
            value={newConfigName}
            onChange={(e) => setNewConfigName(e.target.value)}
            placeholder="Exemple: config1"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddConfig}
            disabled={!newConfigName}
          >
            Ajouter
          </Button>
        </Box>
      </CardContainer>

      <CardContainer
        title="Configurations existantes"
        tooltip="Configurez les champs en sélectionnant les customs appropriés"
      >
        {Object.keys(collConfigs).length > 0 ? (
          Object.entries(collConfigs).map(([name, configData]) => (
            <Accordion
              key={name}
              expanded={expandedConfig === name}
              onChange={() =>
                setExpandedConfig(expandedConfig === name ? false : name)
              }
              sx={{ mb: 2, overflow: "visible" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                    {name}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConfig(name);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {Object.entries(configData).map(([field, value]) => {
                    const fieldType =
                      fieldTypes[field as keyof typeof fieldTypes] || "text";

                    return (
                      <Box
                        key={field}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id={`${name}-${field}-label`}>
                            {field}
                          </InputLabel>
                          <Select
                            labelId={`${name}-${field}-label`}
                            value={value}
                            label={field}
                            onChange={(e) =>
                              handleConfigChange(
                                name,
                                field as keyof CollConfig,
                                e.target.value
                              )
                            }
                          >
                            {customValues.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {fieldDescriptions[
                          field as keyof typeof fieldDescriptions
                        ] && (
                          <Tooltip
                            title={
                              fieldDescriptions[
                                field as keyof typeof fieldDescriptions
                              ]
                            }
                          >
                            <IconButton size="small">
                              <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Card variant="outlined" sx={{ bgcolor: "background.default", p: 2 }}>
            <CardContent>
              <Typography color="text.secondary" align="center">
                Aucune configuration existante. Ajoutez-en une à l'aide du
                formulaire ci-dessus.
              </Typography>
            </CardContent>
          </Card>
        )}
      </CardContainer>
    </Box>
  );
};

export default CollConfigStep;
