export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// export const properNameToIdentifier = (name: string): string => {
//   return name
//     .toLowerCase()
//     .replace(/\s+/g, "_")
//     .replace(/[^a-z0-9_]/g, "");
// };

// export const identifierToProperName = (identifier: string): string => {
//   return identifier
//     .replace(/_/g, " ")
//     .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
// };
