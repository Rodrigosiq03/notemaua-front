export interface IProcessEnv {
   NEXT_PUBLIC_STAGE: string;
}
 
declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}