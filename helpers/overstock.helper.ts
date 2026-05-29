import * as fs from "fs";

export function parseCsv(filePath: string) {
  const csvContent = fs.readFileSync(filePath, "utf-8");

  const rows = csvContent
    .split(/\r?\n/)
    .map((r: string) => r.trim())
    .filter(Boolean);

  const headers = rows[0]
    ?.split(",")
    .map((h: string) => h.trim().toLowerCase()) || [];

  return { rows, headers };
}