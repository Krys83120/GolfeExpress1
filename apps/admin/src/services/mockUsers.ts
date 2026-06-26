import { UserRole, UserStatus } from "@golfeexpress/types";

export interface AdminUserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joinedAtLabel: string;
}

export const MOCK_ADMIN_USERS: AdminUserRow[] = [
  { id: "u1", firstName: "Sophie", lastName: "Martin", email: "sophie.m@example.fr", phone: "06 12 34 56 78", role: UserRole.CLIENT, status: UserStatus.ACTIVE, joinedAtLabel: "12 mars 2025" },
  { id: "u2", firstName: "Lucas", lastName: "Bertrand", email: "lucas.b@example.fr", phone: "06 98 76 54 32", role: UserRole.RIDER, status: UserStatus.ACTIVE, joinedAtLabel: "2 avril 2025" },
  { id: "u3", firstName: "Poke", lastName: "Paradise", email: "contact@pokeparadise.fr", phone: "04 94 00 00 01", role: UserRole.PRO, status: UserStatus.ACTIVE, joinedAtLabel: "15 janvier 2025" },
  { id: "u4", firstName: "Thomas", lastName: "Roux", email: "thomas.r@example.fr", phone: "06 55 44 33 22", role: UserRole.CLIENT, status: UserStatus.ACTIVE, joinedAtLabel: "8 mai 2025" },
  { id: "u5", firstName: "Inès", lastName: "Moreau", email: "ines.m@example.fr", phone: "07 11 22 33 44", role: UserRole.RIDER, status: UserStatus.PENDING_VERIFICATION, joinedAtLabel: "20 juin 2026" },
  { id: "u6", firstName: "Karim", lastName: "Djebbar", email: "karim.d@example.fr", phone: "06 00 11 22 33", role: UserRole.CLIENT, status: UserStatus.SUSPENDED, joinedAtLabel: "3 février 2025" },
  { id: "u7", firstName: "Admin", lastName: "GolfeExpress", email: "admin@golfeexpress.fr", phone: "04 94 99 00 00", role: UserRole.SUPER_ADMIN, status: UserStatus.ACTIVE, joinedAtLabel: "1 janvier 2025" },
];

export const ROLE_LABELS: Record<UserRole, { label: string; emoji: string }> = {
  [UserRole.CLIENT]: { label: "Client", emoji: "🧑" },
  [UserRole.PRO]: { label: "Commerçant", emoji: "🏪" },
  [UserRole.RIDER]: { label: "Livreur", emoji: "🛵" },
  [UserRole.ADMIN]: { label: "Admin", emoji: "🛡️" },
  [UserRole.SUPER_ADMIN]: { label: "Super Admin", emoji: "👑" },
};

export const STATUS_LABELS: Record<UserStatus, { label: string; bg: string; text: string }> = {
  [UserStatus.ACTIVE]: { label: "Actif", bg: "#E8F5E9", text: "#2ECC71" },
  [UserStatus.SUSPENDED]: { label: "Suspendu", bg: "#FFF3E0", text: "#FF6B35" },
  [UserStatus.BANNED]: { label: "Banni", bg: "#FFEBEE", text: "#F44336" },
  [UserStatus.PENDING_VERIFICATION]: { label: "En attente", bg: "#E3F2FD", text: "#2196F3" },
};
