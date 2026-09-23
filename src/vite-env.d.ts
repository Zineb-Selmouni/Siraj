/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint qui reçoit les demandes de pilote (voir src/config.ts). */
  readonly VITE_PILOT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
