export interface EnvironmentConfig {
  baseUrl: string;
}

export enum Environment {
  dev = "dev",
  qa = "qa",
  stage = "stage",
  prod = "prod",
  // other environment ...
}

export const environmentConfig: {
  [key in Environment | string]: EnvironmentConfig;
} = {
  dev: {
    baseUrl: "",
  },
  qa: {
    baseUrl: "",
  },
  stage: {
    baseUrl: "",
  },
  prod: {
    baseUrl: "https://www.ezcontacts.com",
  },
  // other environment ...
};
