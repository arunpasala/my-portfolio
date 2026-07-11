import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
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
          featured,
          author_name,
          published_at,
          created_at
        `
      )
      .eq("status", "published")
      .order("published_at", {
        ascending: false,
      });

    if (error) {
      console.error("Public blog error:", error);

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
  } catch (error) {
    console.error(
      "Unexpected public blog error:",
      error
    );

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}