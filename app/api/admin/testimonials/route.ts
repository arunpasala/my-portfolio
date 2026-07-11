import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type TestimonialStatus =
  | "pending"
  | "approved";

function textValue(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_testimonials")
    .select(
      `
        id,
        name,
        role,
        company,
        email,
        avatar_url,
        title,
        message,
        card_color,
        status,
        created_at,
        updated_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Admin testimonials loading error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to load testimonials.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    testimonials: data ?? [],
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

  const id = textValue(body.id);

  if (!id) {
    return NextResponse.json(
      {
        error: "Testimonial ID is required.",
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

  const status =
    body.status as TestimonialStatus;

  const { data, error } = await supabaseAdmin
    .from("portfolio_testimonials")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Testimonial update error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to update testimonial.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    testimonial: data,
    message:
      status === "approved"
        ? "Testimonial approved."
        : "Testimonial moved to pending.",
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

  if (!id) {
    return NextResponse.json(
      {
        error: "Testimonial ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  const { error } = await supabaseAdmin
    .from("portfolio_testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Testimonial deletion error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to delete testimonial.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    id,
    message: "Testimonial deleted.",
  });
}