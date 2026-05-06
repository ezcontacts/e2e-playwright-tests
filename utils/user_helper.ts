import { AccountSettingsFields } from "../test/data-test/productTypes";

function randomId(length = 6) {
  return Math.random().toString(36).slice(2, 2 + length);
}

function generateUser() {
  const id = randomId();

  return {
    firstName: `Name${id}`,
    lastName: `Surname${id}`,
    email: `vigoyoc952@hopesx.com`,
    phone: `1${Math.floor(100000000 + Math.random() * 900000000)}`,
  };
}

export function generateAccountField(field: AccountSettingsFields | string): string {
  
  const key = getAccountSettingsFieldKey(field);

  const user = generateUser();
  switch (field) {
    case AccountSettingsFields.FirstName:
      return user.firstName;
    case AccountSettingsFields.LastName:
      return user.lastName;
    case AccountSettingsFields.NewEmail:
      return user.email;
    case AccountSettingsFields.Phone:
      return user.phone;
    default:
      return user.phone;
  }
}

function getAccountSettingsFieldKey(
  value: AccountSettingsFields | string
): AccountSettingsFields {
  if (typeof value === 'string') {
    const key = Object.entries(AccountSettingsFields)
      .find(([_, v]) => v === value) as keyof typeof AccountSettingsFields | undefined;

    if (key === undefined) {
      throw new Error(`Invalid AccountSettingsFields value: ${value}`);
    }

    return AccountSettingsFields[key];
  }

  return value;
}

//Use this function to generate the random card number.
function generateRandomCardNumber(prefix = '4', length = 16): string {
  const digits: number[] = [];

  // Add prefix digits
  prefix.split('').forEach(d => digits.push(Number(d)));

  // Fill remaining digits except check digit
  while (digits.length < length - 1) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // Apply Luhn algorithm
  let sum = 0;
  const shouldDouble = (length % 2 === 0);

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];

    if ((i % 2 === 0) === shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  digits.push(checkDigit);

  return digits.join('');
}

// Expiry Month -> Format - MM
function generateExpiryMonth(): string {
  const month = Math.floor(Math.random() * 12) + 1;
  return month.toString().padStart(2, '0');
}
// Eypiry Year -> Format - YY
function generateExpiryYear(): string {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(Math.random() * 6) + 1;
  return (year % 100).toString().padStart(2, '0');
}

export function generatePaymentData() {
  return {
    cardNumber: generateRandomCardNumber(),
    expiryMonth: generateExpiryMonth(),
    expiryYear: generateExpiryYear(),
   };
}

//Use this function to generate the random Customer address details.
export function generateUSAddress() {
  const firstNames = ['John', 'Jane', 'Mike', 'Emily', 'Chris'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson'];
  const cities = ['New York', 'New Jersey', 'Chicago', 'Houston', 'Phoenix'];
  const states = ['CA', 'NY', 'TX', 'IL', 'AZ'];

  const random = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  return {
    firstName: random(firstNames),
    lastName: random(lastNames),
    address1: `${Math.floor(Math.random() * 9999)} Main St`,
    city: random(cities),
    state: random(states),
    zip: (10000 + Math.floor(Math.random() * 89999)).toString(),
    phone: `555${Math.floor(1000000 + Math.random() * 9000000)}`,
  };
}