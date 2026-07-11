import "server-only";

import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

type AdminAuthSuccess = {
  authorized: true;
  userId: string;
  email: string;
};

type AdminAuthFailure = {
  authorized: false;
  response: NextResponse;
};

type AdminAuthResult =
  | AdminAuthSuccess
  | AdminAuthFailure;

function getBearerToken(request: Request) {
  const authorization =
    request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization
    .slice("Bearer ".length)
    .trim();
}

export async function requireAdmin(
  request: Request
): Promise<AdminAuthResult> {
  const token = getBearerToken(request);

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: "Authentication is required.",
        },
        {
          status: 401,
        }
      ),
    };
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: "Your session is invalid or expired.",
        },
        {
          status: 401,
        }
      ),
    };
  }

  const adminEmail =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  const userEmail =
    user.email
      ?.trim()
      .toLowerCase();

  if (!adminEmail) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: "Admin access is not configured.",
        },
        {
          status: 500,
        }
      ),
    };
  }

  if (!userEmail || userEmail !== adminEmail) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error:
            "You are not authorized to manage feedback.",
        },
        {
          status: 403,
        }
      ),
    };
  }

  return {
    authorized: true,
    userId: user.id,
    email: userEmail,
  };
}