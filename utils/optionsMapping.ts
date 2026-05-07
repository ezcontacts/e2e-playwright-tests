import { PrescriptionOptions } from "../test/data-test/productTypes";
import { NonPrescriptionOptions } from "../test/data-test/productTypes";
// import { LensMaterialType } from "../test/data-test/productTypes";
// import { LensType } from "../test/data-test/productTypes";
// import { LensCoatingType } from "../test/data-test/productTypes";
// import { LensColorType } from "../test/data-test/productTypes";

export const sectionEnumMap = {
  'prescription options': PrescriptionOptions,
  'non-prescription options': NonPrescriptionOptions,
  // 'Lens Material': LensMaterialType, 
  // 'Lens Type': LensType,
  // 'Anti-Reflective Coating': LensCoatingType,
  // 'Lens Color': LensColorType,
} as const;

export type SectionName = keyof typeof sectionEnumMap;

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

export function isSectionName(value: string): value is SectionName {
  return normalize(value) in sectionEnumMap;
}

export function mapOptionBySection(
  sectionName: string,
  option: string
): string {
  const normalizedSection = normalize(sectionName) as SectionName;

  const enumObj = sectionEnumMap[normalizedSection];

  if (!enumObj) {
    throw new Error(`Invalid section: ${sectionName}`);
  }

  const values = Object.values(enumObj);

  if (!values.includes(option)) {
    throw new Error(
      `Invalid option "${option}" for section "${sectionName}"`
    );
  }
  return option;
}