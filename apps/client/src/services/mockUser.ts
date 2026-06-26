import { UserRole, UserStatus } from "@golfeexpress/types";

export const MOCK_CLIENT_USER = {
  id: "demo-user",
  email: "krys@example.fr",
  phone: "+33 6 12 34 56 78",
  firstName: "Krys",
  lastName: "B.",
  avatar: null,
  role: UserRole.CLIENT,
  status: UserStatus.ACTIVE,
  createdAt: new Date("2025-03-12").toISOString(),
  updatedAt: new Date().toISOString(),
};
