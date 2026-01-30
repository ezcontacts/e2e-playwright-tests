import { AccountSettingsFields } from "../test/data-test/productTypes";

function randomId(length = 6) {
  return Math.random().toString(36).slice(2, 2 + length);
}

function generateUser() {
  const id = randomId();

  return {
    firstName: `Name${id}`,
    lastName: `Surname${id}`,
    email: `maksyms@ezcontacts.com`,
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