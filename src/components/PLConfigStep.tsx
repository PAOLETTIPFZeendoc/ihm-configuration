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
  Switch,
  FormControlLabel,
  Tooltip,
  Chip,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LinkIcon from "@mui/icons-material/Link";
import { Configuration, PLConfig, CollectionConfig } from "../types/Config";
import CardContainer from "./ui/CardContainer";
import { dummy_customs } from "./testData/dummy_customs";
import { dummy_colls } from "./testData/dummy_cols";

interface PLConfigStepProps {
  config: Configuration;
  setConfig: (config: Configuration) => void;
}

// Descriptions des champs pour les tooltips
const fieldDescriptions = {
  "access-token": "Token d'accès à l'API Penny Lane",
  "refresh-token": "Token de rafraîchissement pour l'API",
  "expires-in": "Durée de validité du token en secondes",
  "token-type": "Type de token d'authentification",
  suppliers_list: "Liste pour la synchronisation des fournisseurs",
  journals_list: "Liste pour la synchronisation des journaux",
  families_list: "Liste pour la synchronisation des familles",
  category_groups_list:
    "Liste pour la synchronisation des groupes de catégories",
  categories_list: "Liste pour la synchronisation des catégories",
  imputationHT_list: "Liste pour la synchronisation des imputations HT",
  imputationTVA_list: "Liste pour la synchronisation des imputations TVA",
  colls: "Collections associées à cette configuration",
  repertoire: "Répertoire de stockage",
  "search-id": "ID de recherche",
  "customer-email": "Email du client",
  "tdf-autoexport-enabled": "Activer l'export automatique des TDF",
};

const PLConfigStep: React.FC<PLConfigStepProps> = ({ config, setConfig }) => {
  const [newConfigName, setNewConfigName] = useState("");
  const [expandedConfig, setExpandedConfig] = useState<string | false>(false);

  const handleAddConfig = () => {
    if (!newConfigName) return;

    const newConfig: PLConfig = {
      "access-token": "",
      "refresh-token": "",
      "expires-in": "",
      "token-type": "",
      suppliers_list: ["", ""],
      journals_list: ["", ""],
      families_list: ["", ""],
      category_groups_list: ["", ""],
      categories_list: ["", ""],
      imputationHT_list: ["", ""],
      imputationTVA_list: ["", ""],
      colls: [],
      repertoire: "",
      "search-id": "",
      "customer-email": "",
      "tdf-autoexport-enabled": false,
    };

    setConfig({
      ...config,
      "PL-config": {
        ...((config["PL-config"] as Record<string, PLConfig>) || {}),
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
      const PLConfig = {
        ...((newConfig["PL-config"] as Record<string, PLConfig>) || {}),
      };

      // Supprimer toutes les associations avec cette configuration
      if (newConfig.collections) {
        Object.entries(newConfig.collections).forEach(
          ([collName, collConfig]: [string, CollectionConfig]) => {
            if (collConfig["PL-config"] === configName) {
              const newCollections = { ...newConfig.collections };
              delete newCollections[collName];
              newConfig.collections = newCollections;
            }
          }
        );
      }

      delete PLConfig[configName];
      newConfig["PL-config"] = PLConfig;
      setConfig(newConfig);
    }
  };

  const handleConfigChange = (
    configName: string,
    field: keyof PLConfig,
    value: any
  ) => {
    const newConfig = { ...config };
    const PLConfig = {
      ...((newConfig["PL-config"] as Record<string, PLConfig>) || {}),
    };
    PLConfig[configName] = {
      ...PLConfig[configName],
      [field]: value,
    };
    newConfig["PL-config"] = PLConfig;
    setConfig(newConfig);
  };

  const handleArrayChange = (
    configName: string,
    field: keyof PLConfig,
    index: number,
    value: string
  ) => {
    const newConfig = { ...config };
    const PLConfig = {
      ...((newConfig["PL-config"] as Record<string, PLConfig>) || {}),
    };
    const array = [...(PLConfig[configName][field] as string[])];
    array[index] = value;
    PLConfig[configName] = {
      ...PLConfig[configName],
      [field]: array,
    };
    newConfig["PL-config"] = PLConfig;
    setConfig(newConfig);
  };

  const PLConfigs = (config["PL-config"] as Record<string, PLConfig>) || {};

  const availableCustoms = dummy_customs;

  return (
    <Box>
      <CardContainer
        title="Ajouter une nouvelle configuration PL"
        tooltip="Créez une nouvelle configuration PL en lui donnant un nom"
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Nom de la configuration"
            value={newConfigName}
            onChange={(e) => setNewConfigName(e.target.value)}
            placeholder="Exemple: deploy1"
          />
          <Button
            variant="contained"
            onClick={handleAddConfig}
            disabled={!newConfigName}
          >
            Ajouter
          </Button>
        </Box>
      </CardContainer>

      <CardContainer
        title="Configurations PL existantes"
        tooltip="Configurez les paramètres des configurations PL"
      >
        {Object.keys(PLConfigs).length > 0 ? (
          Object.entries(PLConfigs).map(([name, configData]) => (
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                      {name}
                    </Typography>
                    <Badge
                      badgeContent={configData.colls.length}
                      color="primary"
                      sx={{ ml: 2 }}
                    >
                      <Chip
                        size="small"
                        label="Collections"
                        variant="outlined"
                        icon={<LinkIcon fontSize="small" />}
                      />
                    </Badge>
                  </Box>
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                    >
                      Informations d'authentification
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      {[
                        "access-token",
                        "refresh-token",
                        "expires-in",
                        "token-type",
                      ].map((field) => (
                        <Box
                          key={field}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <TextField
                            fullWidth
                            label={field}
                            value={configData[field as keyof PLConfig]}
                            onChange={(e) =>
                              handleConfigChange(
                                name,
                                field as keyof PLConfig,
                                e.target.value
                              )
                            }
                          />
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
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                    >
                      Listes de synchronisation
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: "grid", gap: 3 }}>
                      {[
                        "suppliers_list",
                        "journals_list",
                        "families_list",
                        "category_groups_list",
                        "categories_list",
                        "imputationHT_list",
                        "imputationTVA_list",
                      ].map((field) => {
                        const value = configData[field as keyof PLConfig] as [
                          string,
                          string
                        ];
                        return (
                          <Box key={field}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {field
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                              </Typography>
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
                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                  xs: "1fr",
                                  sm: "1fr 1fr",
                                },
                                gap: 2,
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel>Classeur</InputLabel>
                                <Select
                                  value={value[0]}
                                  label="Classeur"
                                  onChange={(e) =>
                                    handleArrayChange(
                                      name,
                                      field as keyof PLConfig,
                                      0,
                                      e.target.value
                                    )
                                  }
                                >
                                  <MenuItem value="">Aucun</MenuItem>
                                  {dummy_colls.map((coll) => (
                                    <MenuItem key={coll.id} value={coll.id}>
                                      {coll.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <InputLabel>Custom</InputLabel>
                                <Select
                                  value={value[1]}
                                  label="Custom"
                                  onChange={(e) =>
                                    handleArrayChange(
                                      name,
                                      field as keyof PLConfig,
                                      1,
                                      e.target.value
                                    )
                                  }
                                >
                                  <MenuItem value="">Aucun</MenuItem>
                                  {availableCustoms.map((custom) => (
                                    <MenuItem key={custom} value={custom}>
                                      {custom}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                    >
                      Autres paramètres
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      {["repertoire", "search-id", "customer-email"].map(
                        (field) => (
                          <Box
                            key={field}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <TextField
                              fullWidth
                              label={field}
                              value={configData[field as keyof PLConfig]}
                              onChange={(e) =>
                                handleConfigChange(
                                  name,
                                  field as keyof PLConfig,
                                  e.target.value
                                )
                              }
                            />
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
                        )
                      )}
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={configData["tdf-autoexport-enabled"]}
                          onChange={(e) =>
                            handleConfigChange(
                              name,
                              "tdf-autoexport-enabled",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Activer l'export automatique des TDF"
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Alert severity="info">
            Aucune configuration PL existante. Ajoutez-en une à l'aide du
            formulaire ci-dessus.
          </Alert>
        )}
      </CardContainer>
    </Box>
  );
};

export default PLConfigStep;
