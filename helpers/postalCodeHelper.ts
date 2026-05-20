export enum ShippingCountry {
  UnitedStates = "United States",
  Canada = "Canada",
  PuertoRico = "Puerto Rico",
  Mexico = "Mexico",
}

export class PostalCodeHelper {
  public static generateCanadianPostalCode(): string {
    const letters = "ABCEGHJKLMNPRSTVXY";
    const digits = "0123456789";
    const l = () => letters[Math.floor(Math.random() * letters.length)];
    const d = () => digits[Math.floor(Math.random() * digits.length)];
    return `${l()}${d()}${l()} ${d()}${l()}${d()}`;
  }

  public static generateUsZipCode(): string {
    return String(Math.floor(10000 + Math.random() * 89999)).padStart(5, "0");
  }

  public static generateByCountry(country: ShippingCountry): string {
    const generators: Record<ShippingCountry, () => string> = {
      [ShippingCountry.UnitedStates]: this.generateUsZipCode,
      [ShippingCountry.PuertoRico]: this.generateUsZipCode,
      [ShippingCountry.Canada]: this.generateCanadianPostalCode,
      [ShippingCountry.Mexico]: this.generateUsZipCode,
    };

    return generators[country]();
  }
}
