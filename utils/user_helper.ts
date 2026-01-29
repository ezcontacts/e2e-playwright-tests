function randomId(length = 6) {
  return Math.random().toString(36).slice(2, 2 + length);
}

export function generateUser() {
  const id = randomId();

  return {
    firstName: `Name${id}`,
    lastName: `Surname${id}`,
    email: `test+${id}@example.com`,
    phone: `+1${Math.floor(100000000 + Math.random() * 900000000)}`,
  };
}