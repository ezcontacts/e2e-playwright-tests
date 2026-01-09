import { ENDPOINT } from "./endpoint.js";

export type TokenValues = {
  [token: string]: string[];
};

export const TOKENS: TokenValues = {
  CATEGORY: [
    'SUNGLASSES',
    'EYEGLASSES',
    'CONTACT LENSES',
    'EYE CARE',
    'DEALS'
  ],
};

export const TOKEN_ENDPOINT: Record<string, string> = {
  'SUNGLASSES': ENDPOINT.sunglasses,
  'EYEGLASSES': ENDPOINT.eyeglasses,
  'CONTACT LENSES': ENDPOINT.contactLenses,
  'EYE CARE': ENDPOINT.eyeCare,
  'DEALS': ENDPOINT.deals,
};