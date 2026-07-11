import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type BlogStatus = "draft" | "published";

type BlogPayload = {
  id?: unknown;
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  content?: unknown;
  coverImageUrl?: unknown;
  category?: unknown;
  tags?: unknown;
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
): value is BlogStatus {
  return (
    value === "draft" ||
    value === "published"
  );
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ======================================================
// GET BLOGS
// ======================================================

export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_blogs")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image_url,
        category,
        tags,
        status,
        featured,
        author_name,
        published_at,
        created_at,
        updated_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Blog loading error:", error);

    return NextResponse.json(
      {
        error: "Unable to load blogs.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    blogs: data ?? [],
  });
}

// ======================================================
// CREATE BLOG
// ======================================================

export async function POST(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  let body: BlogPayload;

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

  const title = textValue(body.title);
  const content = textValue(body.content);

  const requestedSlug = textValue(body.slug);
  const slug = createSlug(
    requestedSlug || title
  );

  const status: BlogStatus =
    isValidStatus(body.status)
      ? body.status
      : "draft";

  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter(
          (tag): tag is string =>
            typeof tag === "string"
        )
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  if (!title) {
    return NextResponse.json(
      {
        error: "Blog title is required.",
      },
      {
        status: 400,
      }
    );
  }

  if (!slug) {
    return NextResponse.json(
      {
        error: "A valid slug is required.",
      },
      {
        status: 400,
      }
    );
  }

  if (!content) {
    return NextResponse.json(
      {
        error: "Blog content is required.",
      },
      {
        status: 400,
      }
    );
  }

  const publishedAt =
    status === "published"
      ? new Date().toISOString()
      : null;

  const { data, error } = await supabaseAdmin
    .from("portfolio_blogs")
    .insert({
      title,
      slug,
      excerpt: nullableText(body.excerpt),
      content,
      cover_image_url: nullableText(
        body.coverImageUrl
      ),
      category: nullableText(body.category),
      tags,
      status,
      featured:
        typeof body.featured === "boolean"
          ? body.featured
          : false,
      published_at: publishedAt,
    })
    .select()
    .single();

  if (error) {
    console.error("Blog creation error:", error);

    const duplicateSlug =
      error.code === "23505";

    return NextResponse.json(
      {
        error: duplicateSlug
          ? "A blog with this slug already exists."
          : "Unable to create blog.",
      },
      {
        status: duplicateSlug ? 409 : 500,
      }
    );
  }

  return NextResponse.json(
    {
      blog: data,
      message:
        status === "published"
          ? "Blog published."
          : "Blog saved as draft.",
    },
    {
      status: 201,
    }
  );
}

// ======================================================
// UPDATE BLOG
// ======================================================

export async function PATCH(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  let body: BlogPayload;

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
  const title = textValue(body.title);
  const content = textValue(body.content);

  const requestedSlug = textValue(body.slug);
  const slug = createSlug(
    requestedSlug || title
  );

  if (!id) {
    return NextResponse.json(
      {
        error: "Blog ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  if (!title || !content || !slug) {
    return NextResponse.json(
      {
        error:
          "Title, slug and content are required.",
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

  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter(
          (tag): tag is string =>
            typeof tag === "string"
        )
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const { data: currentBlog } =
    await supabaseAdmin
      .from("portfolio_blogs")
      .select("status, published_at")
      .eq("id", id)
      .single();

  let publishedAt =
    currentBlog?.published_at ?? null;

  if (
    body.status === "published" &&
    !publishedAt
  ) {
    publishedAt = new Date().toISOString();
  }

  if (body.status === "draft") {
    publishedAt = null;
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_blogs")
    .update({
      title,
      slug,
      excerpt: nullableText(body.excerpt),
      content,
      cover_image_url: nullableText(
        body.coverImageUrl
      ),
      category: nullableText(body.category),
      tags,
      status: body.status,
      featured:
        typeof body.featured === "boolean"
          ? body.featured
          : false,
      published_at: publishedAt,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Blog update error:", error);

    return NextResponse.json(
      {
        error:
          error.code === "23505"
            ? "A blog with this slug already exists."
            : "Unable to update blog.",
      },
      {
        status:
          error.code === "23505"
            ? 409
            : 500,
      }
    );
  }

  return NextResponse.json({
    blog: data,
    message:
      body.status === "published"
        ? "Blog published."
        : "Blog saved as draft.",
  });
}

// ======================================================
// DELETE BLOG
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
        error: "Blog ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  const { error } = await supabaseAdmin
    .from("portfolio_blogs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Blog deletion error:", error);

    return NextResponse.json(
      {
        error: "Unable to delete blog.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    id,
    message: "Blog deleted.",
  });
}