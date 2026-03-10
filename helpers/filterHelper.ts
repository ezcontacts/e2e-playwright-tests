export function toFilterFormat(text: string): string {
  let result = text.replace(/\s*\(\d+\)/, "");

  if (result.startsWith("Under")) {
    result = result.replace("Under", "$0 to");
  }

  return result;
}

export function escapeRegex(text: string): string {
  console.log("escapeRegex: " + text);
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
