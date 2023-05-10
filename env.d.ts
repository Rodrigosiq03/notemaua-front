export interface IProcessEnv {
  NEXT_PUBLIC_STAGE: string;
  NEXT_PUBLIC_REGION: string;
  NEXT_PUBLIC_USER_POOL_ID: string;
  NEXT_PUBLIC_USER_POOL_CLIENT_ID: string;
  NEXT_PUBLIC_IDENTITY_POOL_ID: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}
