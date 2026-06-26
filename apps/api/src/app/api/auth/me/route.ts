import { NextRequest, NextResponse } from "next/server";
import { requireAuth, withErrorHandling, ApiError } from "@/middleware/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/auth/me
 *
 * Header: Authorization: Bearer <accessToken>
 * Réponse 200: { user, profile } où `profile` est le Client/Pro/Rider/Admin
 * associé selon le rôle de l'utilisateur — c'est cette forme que consomment
 * directement les 4 apps après connexion.
 */
async function handler(req: NextRequest) {
  const auth = await requireAuth(req);

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    include: {
      clientProfile: true,
      proProfile: true,
      riderProfile: true,
      adminProfile: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "Utilisateur introuvable.");
  }

  const { clientProfile, proProfile, riderProfile, adminProfile, ...userBase } = user;
  const profile = clientProfile ?? proProfile ?? riderProfile ?? adminProfile ?? null;

  return NextResponse.json({ user: userBase, profile });
}

export const GET = withErrorHandling(handler);
