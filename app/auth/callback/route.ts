import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const errorDescription =
    requestUrl.searchParams.get("error_description");

  let next =
    requestUrl.searchParams.get("next") ?? "/#feedback";

  // Prevent redirects to external websites.
  if (!next.startsWith("/")) {
    next = "/#feedback";
  }

  if (errorDescription) {
    console.error("OAuth provider error:", errorDescription);

    return NextResponse.redirect(
      new URL(
        `/?authError=${encodeURIComponent(errorDescription)}#feedback`,
        requestUrl.origin
      )
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?authError=missing_code#feedback", requestUrl.origin)
    );
  }

  const supabase = await createServerSupabaseClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth code exchange error:", error.message);

    return NextResponse.redirect(
      new URL(
        `/?authError=${encodeURIComponent(error.message)}#feedback`,
        requestUrl.origin
      )
    );
  }

  return NextResponse.redirect(
    new URL(next, requestUrl.origin)
  );
}