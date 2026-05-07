export enum ProductType {
  Eyeglasses = "eyeglasses",
 ContactLenses = "contact-lenses",
  Sunglasses = "sunglasses",
  EyeDrops = "eye-drops",
  HairAndScalpTreatments = "hair-and-scalp-treatments",
  BracesCare = "braces-care",
  TaxableProduct = "taxable-product",
  RabiaTester = "rabia-tester",
  EyeTest = "Eye Test",
  EyecareTest = "eyecare-test",
  EyeVitamins = "eye-vitamins",
  EyeCream = "eye-cream",
}

export enum MatchType {
  Eyeglasses = "eyeglasses",
  ContactLenses = "contact-lenses",
  Sunglasses = "sunglasses",
  EyeDrops = "eye-drops",
  HairAndScalpTreatments = "hair-and-scalp-treatments",
  BracesCare = "braces-care",
  TaxableProduct = "taxable-product",
  RabiaTester = "rabia-tester",
  EyeTest = "Eye Test",
  EyecareTest = "eyecare-test",
  EyeVitamins = "eye-vitamins",
  EyeCream = "eye-cream",
}

export enum MatchFilterType {
  BEST_MATCH = "Best Match",
  POPULARITY = "Popularity",
  NEWEST = "Newest",
  NAME_AZ = "Name (A-Z)",
  NAME_ZA = "Name (Z-A)",
  PRICE_LOW = "Price ($-$$$)",
  PRICE_HIGH = "Price ($$$-$)",
  BESTSELLING = "Bestselling",
  PRICE_LOW_TO_HIGHT = "Price: Low to High",
  PRICE_HIGHT_TO_LOW = "Price: High to Low",
}

export enum AccountMenu {
  AccountSettings = "Account Settings",
  AddressAndPayment = "Address & Payment",
  OrderHistory = "Order History",
  RxInformation = "Rx Information",
  EzPoints = "EZ Points",
  RecentPrescriptions = "Recent",
  WishList = "Wish List",
  OnlineVisionTest = "Online Vision Test",
  EzRefill = "EZ Refill",
  StoreCredit = "Store Credit",
}

export enum AccountInfoFields {
  FirstName = "First Name",
  LastName = "Last Name",
  Phone = "Phone",
  Email = "Email",
  EmailSignUp = "Email Sign up",
}

export enum AccountSettingsFields {
  FirstName = "First Name",
  LastName = "Last Name",
  Phone = "Phone Number",
  CurrentEmail = "Current Email",
  NewEmail = "New Email",
  ConfirmEmail = "Confirm Email",
}

export enum PrescriptionOptions {
  DistanceSingleVision = "Distance (Single Vision)",
  ReadingSingleVision = "Reading (Single Vision)",
  ProgressiveBifocal = "Progressive / Bifocal",
}

export enum NonPrescriptionOptions {
  FrameOnly = "Manufacturer's Display Lenses",
  NonCorrectivePlano = "Non-Corrective (Plano) Lenses",
  BlueLightLenses = "Blue Light Lenses",
}

//Updated the Name from LensType to LensMaterialType. As Lenstype refers to Bifocal options.
export enum LensMaterialType {
  PremiumStandardPlastic = "Premium Standard Plastic",
  ImpactResistantPolycarbonate = "Impact Resistant Polycarbonate",
  SuperThinHiIndex167 = "Super Thin 1.67 Hi Index",
  UltraThinHiIndex174 = "Ultra Thin 1.74 Hi Index",
  EyezenLenses = "Eyezen + Anti-Fatigue Lenses",
  DigitallySurfacedLenses = "Digitally Surfaced Lenses",
  UltravioletProtection = "Ultraviolet Protection",
  EdgePolish = "Edge Polish"
}

export enum LensType {
  StandardProgressive = "Standard Progressive",
  PremiumProgressive = "Premium Progressive (Varilux Comfort DRX)",
  Varilux = "Varilux X",
  Bifocal28 = "Bifocal - Flat Top 28",
  Bifocal35 = "Bifocal - Flat Top 35"
}

export enum LensCoatingType {
  StandardAR = "Standard Anti Reflective",
  SuperHydrophobicAR = "Super Hydrophobic AR",
  SuperiorAR = "Superior Anti Reflective (Crizal Easy Pro)",
  EnhancedAR = "Enhanced Anti Reflective (Crizal Sapphire HR)",
  BlueLightAR = "Blue Light Blocking AR (BlueShield)",
  BlueVioletAR = "Blue-Violet Light AR (Crizal Prevencia)",
}

export enum LensColorType {
  Clear = "Clear",
  ColorTinted = "Color Tinted - Lenses",
  Mirror = "Mirror",
  Polarized = "Polarized Lenses",
  TransitionsGen8 = "Transitions® Gen 8™",
  TransitionsGenS = "Transitions® Gen S™",
  TransitionsXTRActive = "Transitions® XTRActive Lenses",
  TransitionsXTRActivePolarized = "Transitions® XTRActive - Polarized",
  Photochromic = "Photochromic Light-Adaptive",
}