import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const { data, error } = await supabaseAdmin
    .from("portfolio_quotes")
    .select(
      `
        id,
        quote,
        author,
        source,
        featured,
        publish_date,
        created_at
      `
    )
    .eq("status", "published")
    .or(
      `publish_date.is.null,publish_date.lte.${today}`
    )
    .order("publish_date", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(20);

  if (error) {
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