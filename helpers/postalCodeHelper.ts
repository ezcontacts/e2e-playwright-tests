export function generateCanadianPostalCode(): string {
  const letters = 'ABCEGHJKLMNPRSTVXY';
  const digits = '0123456789';
  const l = () => letters[Math.floor(Math.random() * letters.length)];
  const d = () => digits[Math.floor(Math.random() * digits.length)];
  return `${l()}${d()}${l()} ${d()}${l()}${d()}`;
}

export function generateUsZipCode(): string {
  return String(Math.floor(10000 + Math.random() * 89999)).padStart(5, '0');
}
