export interface CollConfig {
  code_journal: string;
  compte_fournisseur: string;
  imputationHT: string;
  imputationTVA: string;
  libelle: string;
  numero_piece: string;
  date_echeance: string;
  export: string;
  erreur: string;
  devise: string;
  "ledger-entry-id": string;
  "attachment-id": string;
}

export interface PennyLaneConfig {
  "access-token": string;
  "refresh-token": string;
  "expires-in": string;
  "token-type": string;
  suppliers_list: [string, string];
  journals_list: [string, string];
  families_list: [string, string];
  category_groups_list: [string, string];
  categories_list: [string, string];
  imputationHT_list: [string, string];
  imputationTVA_list: [string, string];
  colls: string[];
  repertoire: string;
  "search-id": string;
  "customer-email": string;
  "tdf-autoexport-enabled": boolean;
}

export interface CollectionConfig {
  "pennylane-config": string;
  coll_config: string;
}

export interface Configuration {
  collections?: {
    [key: string]: CollectionConfig;
  };
  coll_config?: {
    [key: string]: CollConfig;
  };
  "pennylane-config"?: {
    [key: string]: PennyLaneConfig;
  };
}
