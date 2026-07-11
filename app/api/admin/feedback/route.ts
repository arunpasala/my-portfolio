import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

function isValidId(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const { data, error } =
    await supabaseAdmin
      .from("portfolio_feedback")
      .select(
        `
          id,
          name,
          email,
          auth_user_id,
          role,
          message,
          avatar_url,
          card_color,
          status,
          created_at
        `
      )
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "Admin feedback loading error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to load feedback.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    feedback: data ?? [],
  });
}

export async function PATCH(
  request: Request
) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  let body: {
    id?: unknown;
    status?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      }
    );
  }

  if (!isValidId(body.id)) {
    return NextResponse.json(
      {
        error:
          "A valid feedback ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    body.status !== "pending" &&
    body.status !== "approved"
  ) {
    return NextResponse.json(
      {
        error:
          "Status must be pending or approved.",
      },
      {
        status: 400,
      }
    );
  }

  const { data, error } =
    await supabaseAdmin
      .from("portfolio_feedback")
      .update({
        status: body.status,
      })
      .eq("id", body.id)
      .select(
        `
          id,
          name,
          email,
          auth_user_id,
          role,
          message,
          avatar_url,
          card_color,
          status,
          created_at
        `
      )
      .single();

  if (error) {
    console.error(
      "Feedback update error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update feedback.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    feedback: data,
    message:
      body.status === "approved"
        ? "Feedback approved."
        : "Feedback moved to pending.",
  });
}

export async function DELETE(
  request: Request
) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const requestUrl = new URL(request.url);
  const id =
    requestUrl.searchParams.get("id");

  if (!isValidId(id)) {
    return NextResponse.json(
      {
        error:
          "A valid feedback ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  const { error } =
    await supabaseAdmin
      .from("portfolio_feedback")
      .delete()
      .eq("id", id);

  if (error) {
    console.error(
      "Feedback delete error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete feedback.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    id,
    message: "Feedback deleted.",
  });
}