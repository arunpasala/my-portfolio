import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type QuoteStatus = "draft" | "published";

type QuotePayload = {
  id?: unknown;
  quote?: unknown;
  author?: unknown;
  source?: unknown;
  publishDate?: unknown;
  status?: unknown;
  featured?: unknown;
};

function textValue(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function nullableText(value: unknown) {
  const result = textValue(value);
  return result || null;
}

function isValidStatus(
  value: unknown
): value is QuoteStatus {
  return (
    value === "draft" ||
    value === "published"
  );
}

// ======================================================
// GET QUOTES
// ======================================================

export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_quotes")
    .select(
      `
        id,
        quote,
        author,
        source,
        status,
        featured,
        publish_date,
        created_at,
        updated_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Quote loading error:", error);

    return NextResponse.json(
      {
        error: "Unable to load quotes.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    quotes: data ?? [],
  });
}

// ======================================================
// CREATE QUOTE
// ======================================================

export async function POST(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  let body: QuotePayload;

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

  const quote = textValue(body.quote);

  if (!quote) {
    return NextResponse.json(
      {
        error: "Quote is required.",
      },
      {
        status: 400,
      }
    );
  }

  const status: QuoteStatus =
    isValidStatus(body.status)
      ? body.status
      : "draft";

  const { data, error } = await supabaseAdmin
    .from("portfolio_quotes")
    .insert({
      quote,
      author: nullableText(body.author),
      source: nullableText(body.source),
      status,
      featured:
        typeof body.featured === "boolean"
          ? body.featured
          : false,
      publish_date:
        nullableText(body.publishDate),
    })
    .select()
    .single();

  if (error) {
    console.error("Quote creation error:", error);

    return NextResponse.json(
      {
        error: "Unable to create quote.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      quote: data,
      message:
        status === "published"
          ? "Quote published."
          : "Quote saved as draft.",
    },
    {
      status: 201,
    }
  );
}

// ======================================================
// UPDATE QUOTE
// ======================================================

export async function PATCH(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  let body: QuotePayload;

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
  const quote = textValue(body.quote);

  if (!id || !quote) {
    return NextResponse.json(
      {
        error:
          "Quote ID and quote text are required.",
      },
      {
        status: 400,
      }
    );
  }

  if (!isValidStatus(body.status)) {
    return NextResponse.json(
      {
        error:
          "Status must be draft or published.",
      },
      {
        status: 400,
      }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_quotes")
    .update({
      quote,
      author: nullableText(body.author),
      source: nullableText(body.source),
      status: body.status,
      featured:
        typeof body.featured === "boolean"
          ? body.featured
          : false,
      publish_date:
        nullableText(body.publishDate),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Quote update error:", error);

    return NextResponse.json(
      {
        error: "Unable to update quote.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    quote: data,
    message:
      body.status === "published"
        ? "Quote published."
        : "Quote saved as draft.",
  });
}

// ======================================================
// DELETE QUOTE
// ======================================================

export async function DELETE(request: Request) {
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
        error: "Quote ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  const { error } = await supabaseAdmin
    .from("portfolio_quotes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Quote deletion error:", error);

    return NextResponse.json(
      {
        error: "Unable to delete quote.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    id,
    message: "Quote deleted.",
  });
}