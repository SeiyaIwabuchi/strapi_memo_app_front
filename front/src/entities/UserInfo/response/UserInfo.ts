  export interface UserInfo {
    id: number
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: any
  }
  
  export interface Headers {
    "content-length": string
    "content-type": string
  }
  
  export interface Config {
    transitional: Transitional
    adapter: string[]
    transformRequest: any[]
    transformResponse: any[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Env
    headers: Headers2
    baseURL: string
    responseType: string
    withCredentials: boolean
    params: Params
    method: string
    url: string
  }
  
  export interface Transitional {
    silentJSONParsing: boolean
    forcedJSONParsing: boolean
    clarifyTimeoutError: boolean
  }
  
  export interface Env {}
  
  export interface Headers2 {
    Accept: string
    Authorization: string
  }
  
  export interface Params {}
  
  export interface Request {}
  