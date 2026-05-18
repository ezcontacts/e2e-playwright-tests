export enum OverstockStatus {

  NEW = "NEW",

  DUPLICATE = "DUPLICATE",

  NOT_FOUND = "NOT_FOUND",

  INVALID = "INVALID",

  EMPTY = "EMPTY",

  REMOVED = "REMOVED",

  FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS",

  INVALID_EXTENSION = "INVALID_EXTENSION"
}

export const OverstockMessages:
Record<OverstockStatus, string> = {

  [OverstockStatus.NEW]:
    "Product has been marked as over-stock. Price Updated.",

  [OverstockStatus.DUPLICATE]:
    "Already a over-stock product. Price Updated.",

  [OverstockStatus.NOT_FOUND]:
    "Product not found.",

  [OverstockStatus.INVALID]:
    "Invalid",

  [OverstockStatus.EMPTY]:
    "File has no valid record to process.",

  [OverstockStatus.REMOVED]:
    "Over-Stock OFF",

  [OverstockStatus.FILE_UPLOAD_SUCCESS]:
    "File records has been saved",

  [OverstockStatus.INVALID_EXTENSION]:
  "Please select valid CSV file to process."
};

export const InvalidExtensionMessages: string[] = [

  "Please select valid CSV file to process",

  "Invalid file format",

  "Unsupported file type",

  "File records has been saved and the script is running in background.",

  "Do you really want to remove the selected"
];