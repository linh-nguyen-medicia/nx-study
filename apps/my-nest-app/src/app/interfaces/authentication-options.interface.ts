export interface IAuthenticationOptions {
  uri?: string;
  issuer: string;
  audience: string;
  usePhysicalFile?: boolean;
  ignoreExpiration: boolean;
  key?: string;
}
