import { Configuration } from "../../types/Config";

export const initialConfig: Configuration = {
  collections: {
    collection_1: {
      "pennylane-config": "config_pennylane_1",
      coll_config: "config_coll_1",
    },
    collection_2: {
      "pennylane-config": "config_pennylane_1",
      coll_config: "config_coll_2",
    },
  },
  coll_config: {
    config_coll_1: {
      code_journal: "custom_n1",
      compte_fournisseur: "custom_n2",
      imputationHT: "custom_n3",
      imputationTVA: "custom_n4",
      libelle: "custom_t1",
      numero_piece: "custom_t2",
      date_echeance: "custom_d1",
      export: "custom_t3",
      erreur: "custom_t4",
      devise: "custom_t5",
      "ledger-entry-id": "custom_t6",
      "attachment-id": "custom_t7",
    },
    config_coll_2: {
      code_journal: "custom_n5",
      compte_fournisseur: "custom_n6",
      imputationHT: "custom_n7",
      imputationTVA: "custom_n8",
      libelle: "custom_t8",
      numero_piece: "custom_t9",
      date_echeance: "custom_d2",
      export: "custom_t10",
      erreur: "custom_t1",
      devise: "custom_t2",
      "ledger-entry-id": "custom_t3",
      "attachment-id": "custom_t4",
    },
  },
  "pennylane-config": {
    config_pennylane_1: {
      "access-token": "token123",
      "refresh-token": "refresh456",
      "expires-in": "3600",
      "token-type": "Bearer",
      suppliers_list: ["coll_1", "custom_n1"] as [string, string],
      journals_list: ["coll_2", "custom_n2"] as [string, string],
      families_list: ["", ""] as [string, string],
      category_groups_list: ["", ""] as [string, string],
      categories_list: ["", ""] as [string, string],
      imputationHT_list: ["", "custom_n3"] as [string, string],
      imputationTVA_list: ["", "custom_n4"] as [string, string],
      colls: ["collection_1", "collection_2"],
      repertoire: "/chemin/vers/repertoire",
      "search-id": "id123",
      "customer-email": "client@example.com",
      "tdf-autoexport-enabled": true,
    },
  },
};
