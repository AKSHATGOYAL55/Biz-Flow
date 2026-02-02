// lib/constants.ts
export const ROLES = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
  CLIENT: "CLIENT",
} as const;

export type Role = keyof typeof ROLES;
