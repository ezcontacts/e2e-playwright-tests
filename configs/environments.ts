export interface EnvironmentConfig {
  baseUrl: string;
}

export enum Environment {
  dev = "dev",
  stage = "stage",
  prod = "prod",
  preprod = "preprod",
  // other environment ...
}

export const environmentConfig: {
  [key in Environment | string]: EnvironmentConfig;
} = {
  dev: {
    baseUrl: "https://dev.ezcontacts.com",
  },
  stage: {
    baseUrl: "https://staging.ezcontacts.com",
  },
  prod: {
    baseUrl: "https://www.ezcontacts.com",
  },
  preprod: {
    baseUrl: "https://preprod.ezcontacts.com",
  },
  // other environment ...
};
