/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_STRAPI_API_TOKEN: string
    readonly VITE_STRAPI_BASE_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }