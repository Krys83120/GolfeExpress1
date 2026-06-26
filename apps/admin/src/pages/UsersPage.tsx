import React, { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { UserRole } from "@golfeexpress/types";
import { MOCK_ADMIN_USERS, ROLE_LABELS, STATUS_LABELS } from "@/services/mockUsers";

type RoleFilter = "ALL" | UserRole;

export function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");

  const filtered = MOCK_ADMIN_USERS.filter((u) => {
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesSearch = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="flex-1 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-nuit">Utilisateurs</h1>
          <p className="text-sm text-gris">{MOCK_ADMIN_USERS.length} comptes sur la plateforme</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-sm border border-gris-light bg-white px-3 py-2">
          <Search size={16} className="text-gris" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="flex-1 text-sm outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
          className="rounded-sm border border-gris-light bg-white px-3 py-2 text-sm"
        >
          <option value="ALL">Tous les rôles</option>
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role].label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gris-light text-xs uppercase tracking-wide text-gris">
              <th className="py-2 pr-4 font-medium">Utilisateur</th>
              <th className="py-2 pr-4 font-medium">Contact</th>
              <th className="py-2 pr-4 font-medium">Rôle</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Inscrit le</th>
              <th className="py-2 pr-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const roleMeta = ROLE_LABELS[user.role];
              const statusMeta = STATUS_LABELS[user.status];
              return (
                <tr key={user.id} className="border-b border-gris-light last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gris-light text-sm font-bold text-nuit">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <span className="text-sm font-semibold text-nuit">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gris">
                    <p>{user.email}</p>
                    <p className="text-xs">{user.phone}</p>
                  </td>
                  <td className="py-3 pr-4 text-sm text-nuit">
                    {roleMeta.emoji} {roleMeta.label}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ backgroundColor: statusMeta.bg, color: statusMeta.text }}
                    >
                      {statusMeta.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gris">{user.joinedAtLabel}</td>
                  <td className="py-3 pr-4 text-right">
                    <button className="rounded-sm p-1.5 text-gris hover:bg-gris-light">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
