import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Tooltip,
  Badge,
  Chip,
  Paper,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderIcon from "@mui/icons-material/Folder";
import LinkIcon from "@mui/icons-material/Link";

import { Configuration } from "../types/Config";
import CardContainer from "./ui/CardContainer";
import ListItemWithBadge from "./ui/ListItemWithBadge";
import { dummy_colls } from "./testData/dummy_cols";
import { dummy_customs } from "./testData/dummy_customs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

interface CollectionsStepProps {
  config: Configuration;
  setConfig: (config: Configuration) => void;
}

interface ListConfig {
  collection: string;
  custom: string;
}

const CollectionsStep: React.FC<CollectionsStepProps> = ({
  config,
  setConfig,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedPennylaneConfig, setSelectedPennylaneConfig] = useState("");
  const [selectedCollConfig, setSelectedCollConfig] = useState("");
  const [newCollConfigName, setNewCollConfigName] = useState("");
  const [newPennylaneConfigName, setNewPennylaneConfigName] = useState("");
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [duplicateSourceName, setDuplicateSourceName] = useState("");
  const [duplicateNewName, setDuplicateNewName] = useState("");
  const [editListsDialogOpen, setEditListsDialogOpen] = useState(false);
  const [editingConfigName, setEditingConfigName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [listConfigs, setListConfigs] = useState<{
    suppliers_list: ListConfig;
    journals_list: ListConfig;
    families_list: ListConfig;
    category_groups_list: ListConfig;
    categories_list: ListConfig;
    imputationHT_list: ListConfig;
    imputationTVA_list: ListConfig;
  }>({
    suppliers_list: { collection: "", custom: "" },
    journals_list: { collection: "", custom: "" },
    families_list: { collection: "", custom: "" },
    category_groups_list: { collection: "", custom: "" },
    categories_list: { collection: "", custom: "" },
    imputationHT_list: { collection: "", custom: "" },
    imputationTVA_list: { collection: "", custom: "" },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeletePennylaneConfig = (configName: string) => {
    if (
      window.confirm(
        `Voulez-vous vraiment supprimer la configuration "${configName}" ?`
      )
    ) {
      setProcessing(true);

      // Simulation d'un délai pour montrer le loader
      setTimeout(() => {
        const newConfig = { ...config };
        const pennyLaneConfigs = { ...(newConfig["pennylane-config"] || {}) };
        delete pennyLaneConfigs[configName];
        newConfig["pennylane-config"] = pennyLaneConfigs;
        setConfig(newConfig);
        setProcessing(false);
      }, 300);
    }
  };

  const handleEditListsClick = (configName: string) => {
    setEditingConfigName(configName);
    const pennyLaneConfig = config["pennylane-config"]?.[configName];
    if (pennyLaneConfig) {
      setListConfigs({
        suppliers_list: {
          collection: pennyLaneConfig.suppliers_list[0],
          custom: pennyLaneConfig.suppliers_list[1],
        },
        journals_list: {
          collection: pennyLaneConfig.journals_list[0],
          custom: pennyLaneConfig.journals_list[1],
        },
        families_list: {
          collection: pennyLaneConfig.families_list[0],
          custom: pennyLaneConfig.families_list[1],
        },
        category_groups_list: {
          collection: pennyLaneConfig.category_groups_list[0],
          custom: pennyLaneConfig.category_groups_list[1],
        },
        categories_list: {
          collection: pennyLaneConfig.categories_list[0],
          custom: pennyLaneConfig.categories_list[1],
        },
        imputationHT_list: {
          collection: pennyLaneConfig.imputationHT_list[0],
          custom: pennyLaneConfig.imputationHT_list[1],
        },
        imputationTVA_list: {
          collection: pennyLaneConfig.imputationTVA_list[0],
          custom: pennyLaneConfig.imputationTVA_list[1],
        },
      });
    }
    setEditListsDialogOpen(true);
  };

  const handleListConfigChange = (
    listName: keyof typeof listConfigs,
    field: "collection" | "custom",
    value: string
  ) => {
    setListConfigs((prev) => ({
      ...prev,
      [listName]: {
        ...prev[listName],
        [field]: value,
      },
    }));
  };

  const handleSaveListConfigs = () => {
    if (!editingConfigName) return;

    setProcessing(true);

    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      const newConfig = { ...config };
      const pennyLaneConfigs = { ...(newConfig["pennylane-config"] || {}) };
      const currentConfig = { ...pennyLaneConfigs[editingConfigName] };

      // Convertir les ListConfig en tuples [string, string]
      currentConfig.suppliers_list = [
        listConfigs.suppliers_list.collection,
        listConfigs.suppliers_list.custom,
      ];
      currentConfig.journals_list = [
        listConfigs.journals_list.collection,
        listConfigs.journals_list.custom,
      ];
      currentConfig.families_list = [
        listConfigs.families_list.collection,
        listConfigs.families_list.custom,
      ];
      currentConfig.category_groups_list = [
        listConfigs.category_groups_list.collection,
        listConfigs.category_groups_list.custom,
      ];
      currentConfig.categories_list = [
        listConfigs.categories_list.collection,
        listConfigs.categories_list.custom,
      ];
      currentConfig.imputationHT_list = [
        listConfigs.imputationHT_list.collection,
        listConfigs.imputationHT_list.custom,
      ];
      currentConfig.imputationTVA_list = [
        listConfigs.imputationTVA_list.collection,
        listConfigs.imputationTVA_list.custom,
      ];

      pennyLaneConfigs[editingConfigName] = currentConfig;
      newConfig["pennylane-config"] = pennyLaneConfigs;
      setConfig(newConfig);

      setEditListsDialogOpen(false);
      setEditingConfigName("");
      setProcessing(false);
    }, 500);
  };

  const handleAddCollection = () => {
    if (!newCollectionName || !selectedPennylaneConfig || !selectedCollConfig)
      return;

    setProcessing(true);

    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      const newConfig = { ...config };
      const collections = { ...(newConfig.collections || {}) };

      collections[newCollectionName] = {
        "pennylane-config": selectedPennylaneConfig,
        coll_config: selectedCollConfig,
      };

      newConfig.collections = collections;
      setConfig(newConfig);

      // Mettre à jour la liste des collections dans la configuration PennyLane
      const pennyLaneConfigs = { ...(newConfig["pennylane-config"] || {}) };
      const pennyLaneConfig = { ...pennyLaneConfigs[selectedPennylaneConfig] };
      pennyLaneConfig.colls = [
        ...(pennyLaneConfig.colls || []),
        newCollectionName,
      ];
      pennyLaneConfigs[selectedPennylaneConfig] = pennyLaneConfig;
      newConfig["pennylane-config"] = pennyLaneConfigs;

      setConfig(newConfig);

      // Reset form
      setNewCollectionName("");
      setSelectedPennylaneConfig("");
      setSelectedCollConfig("");
      setProcessing(false);
    }, 300);
  };

  const handleDeleteCollection = (collectionName: string) => {
    if (
      window.confirm(
        `Voulez-vous vraiment supprimer la collection "${collectionName}" ?`
      )
    ) {
      setProcessing(true);

      // Simulation d'un délai pour montrer le loader
      setTimeout(() => {
        const newConfig = { ...config };
        const collections = { ...(newConfig.collections || {}) };

        // Récupérer le nom de la config PennyLane avant de supprimer
        const pennylaneConfigName =
          collections[collectionName]?.["pennylane-config"];

        // Supprimer la collection
        delete collections[collectionName];
        newConfig.collections = collections;

        // Supprimer la collection de la liste des collections dans PennyLane
        if (
          pennylaneConfigName &&
          newConfig["pennylane-config"] &&
          newConfig["pennylane-config"][pennylaneConfigName]
        ) {
          const pennyLaneConfigs = { ...(newConfig["pennylane-config"] || {}) };
          const pennyLaneConfig = { ...pennyLaneConfigs[pennylaneConfigName] };

          // S'assurer que pennyLaneConfig.colls existe avant de le filtrer
          if (pennyLaneConfig.colls) {
            pennyLaneConfig.colls = pennyLaneConfig.colls.filter(
              (coll) => coll !== collectionName
            );
            pennyLaneConfigs[pennylaneConfigName] = pennyLaneConfig;
            newConfig["pennylane-config"] = pennyLaneConfigs;
          }
        }

        setConfig(newConfig);
        setProcessing(false);
      }, 300);
    }
  };

  const handleDuplicateClick = (collectionName: string) => {
    setDuplicateSourceName(collectionName);
    setDuplicateNewName(`${collectionName}_copy`);
    setDuplicateDialogOpen(true);
  };

  const handleDuplicateConfirm = () => {
    if (!duplicateNewName) return;

    setProcessing(true);

    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      const collectionConfig = config.collections?.[duplicateSourceName];
      if (!collectionConfig) {
        setProcessing(false);
        return;
      }

      const newConfig = { ...config };
      const collections = { ...(newConfig.collections || {}) };

      collections[duplicateNewName] = { ...collectionConfig };
      newConfig.collections = collections;

      // Ajouter la nouvelle collection à la liste des collections dans PennyLane
      const pennylaneConfigName = collectionConfig["pennylane-config"];
      const pennyLaneConfigs = { ...(newConfig["pennylane-config"] || {}) };
      const pennyLaneConfig = { ...pennyLaneConfigs[pennylaneConfigName] };
      pennyLaneConfig.colls = [
        ...(pennyLaneConfig.colls || []),
        duplicateNewName,
      ];
      pennyLaneConfigs[pennylaneConfigName] = pennyLaneConfig;
      newConfig["pennylane-config"] = pennyLaneConfigs;

      setConfig(newConfig);

      setDuplicateDialogOpen(false);
      setDuplicateSourceName("");
      setDuplicateNewName("");
      setProcessing(false);
    }, 300);
  };

  const handleAddCollConfig = () => {
    if (!newCollConfigName) return;

    setProcessing(true);

    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      const newConfig = { ...config };
      const collConfigs = { ...(newConfig.coll_config || {}) };

      collConfigs[newCollConfigName] = {
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

      newConfig.coll_config = collConfigs;
      setConfig(newConfig);
      setNewCollConfigName("");
      setProcessing(false);
    }, 300);
  };

  const handleAddPennylaneConfig = () => {
    if (!newPennylaneConfigName) return;

    setProcessing(true);

    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      const newConfig = { ...config };
      const pennyLaneConfigs = { ...(newConfig["pennylane-config"] || {}) };

      pennyLaneConfigs[newPennylaneConfigName] = {
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

      newConfig["pennylane-config"] = pennyLaneConfigs;
      setConfig(newConfig);
      setNewPennylaneConfigName("");
      setProcessing(false);
    }, 300);
  };

  const collections = config.collections || {};
  const pennyLaneConfigs = config["pennylane-config"] || {};
  const collConfigs = config.coll_config || {};

  const hasPennyLaneConfigs = Object.keys(pennyLaneConfigs).length > 0;
  const hasCollConfigs = Object.keys(collConfigs).length > 0;
  const hasConfigurations = hasPennyLaneConfigs && hasCollConfigs;

  return (
    <Box>
      <Paper sx={{ borderRadius: 1, mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="onglets de configuration"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Configurations"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            icon={<FolderIcon />}
            iconPosition="start"
            label={
              <Badge
                color="primary"
                badgeContent={Object.keys(collConfigs).length}
                showZero
              >
                Configurations des Collections
              </Badge>
            }
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label={
              <Badge
                color="secondary"
                badgeContent={Object.keys(pennyLaneConfigs).length}
                showZero
              >
                Configurations PennyLane
              </Badge>
            }
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<LinkIcon />}
            iconPosition="start"
            label={
              <Badge
                color="info"
                badgeContent={Object.keys(collections).length}
                showZero
              >
                Associations
              </Badge>
            }
            id="tab-3"
            aria-controls="tabpanel-3"
          />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Bienvenue dans le générateur de configuration. Suivez les 3 étapes
          pour créer votre configuration complète.
        </Alert>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <CardContainer
            title="1. Configurations des Collections"
            tooltip="Créez d'abord les configurations des collections"
            subtitle={`${
              Object.keys(collConfigs).length
            } configurations créées`}
          >
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setTabValue(1)}
              fullWidth
            >
              Gérer les configurations
            </Button>
          </CardContainer>

          <CardContainer
            title="2. Configurations PennyLane"
            tooltip="Créez ensuite les configurations PennyLane"
            subtitle={`${
              Object.keys(pennyLaneConfigs).length
            } configurations créées`}
          >
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setTabValue(2)}
              fullWidth
            >
              Gérer les configurations
            </Button>
          </CardContainer>

          <CardContainer
            title="3. Associations des Collections"
            tooltip="Associez enfin les collections aux configurations"
            subtitle={`${Object.keys(collections).length} associations créées`}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setTabValue(3)}
              fullWidth
              disabled={!hasConfigurations}
            >
              Gérer les associations
            </Button>
          </CardContainer>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CardContainer
          title="Configuration des Collections"
          tooltip="Créez et gérez les configurations des collections"
        >
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Nom de la configuration"
              value={newCollConfigName}
              onChange={(e) => setNewCollConfigName(e.target.value)}
              placeholder="Exemple: config1"
            />
            <Button
              variant="contained"
              onClick={handleAddCollConfig}
              disabled={!newCollConfigName}
            >
              Ajouter
            </Button>
          </Box>

          {Object.keys(collConfigs).length > 0 ? (
            <List>
              {Object.keys(collConfigs).map((name) => (
                <ListItemWithBadge
                  key={name}
                  primary={name}
                  secondaryItems={[
                    {
                      label: "Type",
                      value: "Configuration Collection",
                      color: "primary",
                    },
                  ]}
                  actions={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteCollection(name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              ))}
            </List>
          ) : (
            <Alert severity="info">
              Aucune configuration de collection créée. Ajoutez-en une en
              utilisant le formulaire ci-dessus.
            </Alert>
          )}
        </CardContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <CardContainer
          title="Configuration PennyLane"
          tooltip="Créez et gérez les configurations PennyLane"
        >
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Nom de la configuration"
              value={newPennylaneConfigName}
              onChange={(e) => setNewPennylaneConfigName(e.target.value)}
              placeholder="Exemple: deploy1"
            />
            <Button
              variant="contained"
              onClick={handleAddPennylaneConfig}
              disabled={!newPennylaneConfigName}
            >
              Ajouter
            </Button>
          </Box>

          {Object.keys(pennyLaneConfigs).length > 0 ? (
            <List>
              {Object.entries(pennyLaneConfigs).map(
                ([name, pennyLaneConfig]) => (
                  <ListItemWithBadge
                    key={name}
                    primary={name}
                    secondaryItems={[
                      {
                        label: "Type",
                        value: "Configuration PennyLane",
                        color: "secondary",
                      },
                      {
                        label: "Collections",
                        value: `${
                          (pennyLaneConfig.colls || []).length
                        } associée(s)`,
                      },
                    ]}
                    actions={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditListsClick(name)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeletePennylaneConfig(name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  />
                )
              )}
            </List>
          ) : (
            <Alert severity="info">
              Aucune configuration PennyLane créée. Ajoutez-en une en utilisant
              le formulaire ci-dessus.
            </Alert>
          )}
        </CardContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <CardContainer
          title="Associations des Collections"
          tooltip="Associez les collections aux configurations"
        >
          {hasConfigurations ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                  gap: 2,
                  mb: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Nom de la collection"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Exemple: coll_1"
                />
                <FormControl fullWidth>
                  <InputLabel>Configuration PennyLane</InputLabel>
                  <Select
                    value={selectedPennylaneConfig}
                    label="Configuration PennyLane"
                    onChange={(e) => setSelectedPennylaneConfig(e.target.value)}
                  >
                    {Object.keys(pennyLaneConfigs).map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Configuration Coll</InputLabel>
                  <Select
                    value={selectedCollConfig}
                    label="Configuration Coll"
                    onChange={(e) => setSelectedCollConfig(e.target.value)}
                  >
                    {Object.keys(collConfigs).map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddCollection}
                disabled={
                  !newCollectionName ||
                  !selectedPennylaneConfig ||
                  !selectedCollConfig
                }
                sx={{ mb: 3 }}
              >
                Ajouter
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Collections existantes
              </Typography>

              {Object.keys(collections).length > 0 ? (
                <List>
                  {Object.entries(collections).map(
                    ([name, collectionConfig]) => (
                      <ListItemWithBadge
                        key={name}
                        primary={name}
                        secondaryItems={[
                          {
                            label: "PennyLane",
                            value: collectionConfig["pennylane-config"],
                            color: "secondary",
                          },
                          {
                            label: "Coll",
                            value: collectionConfig["coll_config"],
                            color: "primary",
                          },
                        ]}
                        actions={
                          <>
                            <IconButton
                              edge="end"
                              aria-label="duplicate"
                              onClick={() => handleDuplicateClick(name)}
                              sx={{ mr: 1 }}
                            >
                              <ContentCopyIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteCollection(name)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                      />
                    )
                  )}
                </List>
              ) : (
                <Alert severity="info">
                  Aucune collection créée. Ajoutez-en une en utilisant le
                  formulaire ci-dessus.
                </Alert>
              )}
            </>
          ) : (
            <Alert severity="warning">
              Vous devez d'abord créer au moins une configuration de collection
              et une configuration PennyLane avant de pouvoir créer des
              associations.
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setTabValue(1)}
                  sx={{ mr: 1 }}
                >
                  Créer une configuration de collection
                </Button>
                <Button variant="outlined" onClick={() => setTabValue(2)}>
                  Créer une configuration PennyLane
                </Button>
              </Box>
            </Alert>
          )}
        </CardContainer>
      </TabPanel>

      {/* Dialogue de duplication */}
      <Dialog
        open={duplicateDialogOpen}
        onClose={() => setDuplicateDialogOpen(false)}
      >
        <DialogTitle>Dupliquer la collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nouveau nom"
            fullWidth
            value={duplicateNewName}
            onChange={(e) => setDuplicateNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDuplicateDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDuplicateConfirm} variant="contained">
            Dupliquer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue d'édition des listes */}
      <Dialog
        open={editListsDialogOpen}
        onClose={() => setEditListsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Configurer les listes de synchronisation
          <Typography variant="subtitle2" color="text.secondary">
            Configuration: {editingConfigName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            {Object.entries(listConfigs).map(([listName, config]) => (
              <Box
                key={listName}
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: "background.default",
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "medium" }}
                >
                  {listName
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Classeur</InputLabel>
                    <Select
                      value={config.collection}
                      label="Classeur"
                      onChange={(e) =>
                        handleListConfigChange(
                          listName as keyof typeof listConfigs,
                          "collection",
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
                      value={config.custom}
                      label="Custom"
                      onChange={(e) =>
                        handleListConfigChange(
                          listName as keyof typeof listConfigs,
                          "custom",
                          e.target.value
                        )
                      }
                    >
                      <MenuItem value="">Aucun</MenuItem>
                      {dummy_customs.map((custom) => (
                        <MenuItem key={custom} value={custom}>
                          {custom}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditListsDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleSaveListConfigs} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loader backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={processing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default CollectionsStep;
