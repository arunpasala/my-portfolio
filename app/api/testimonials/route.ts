import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

type TestimonialPayload = {
  name?: unknown;
  role?: unknown;
  company?: unknown;
  email?: unknown;
  avatarUrl?: unknown;
  title?: unknown;
  message?: unknown;
  cardColor?: unknown;
};

const allowedColors = [
  "purple",
  "blue",
  "green",
  "indigo",
] as const;

function textValue(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("portfolio_testimonials")
      .select(
        `
          id,
          name,
          role,
          company,
          avatar_url,
          title,
          message,
          card_color,
          created_at
        `
      )
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Public testimonials loading error:",
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
  } catch (error) {
    console.error(
      "Unexpected testimonials error:",
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

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as TestimonialPayload;

    const name = textValue(body.name);
    const role = textValue(body.role);
    const company = textValue(body.company);
    const email = textValue(body.email);
    const avatarUrl = textValue(body.avatarUrl);
    const title = textValue(body.title);
    const message = textValue(body.message);
    const requestedColor =
      textValue(body.cardColor);

    if (!name || !title || !message) {
      return NextResponse.json(
        {
          error:
            "Name, title, and testimonial are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 80) {
      return NextResponse.json(
        {
          error:
            "Name must be 80 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    if (title.length > 120) {
      return NextResponse.json(
        {
          error:
            "Title must be 120 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 700) {
      return NextResponse.json(
        {
          error:
            "Testimonial must be 700 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    const cardColor = allowedColors.includes(
      requestedColor as (typeof allowedColors)[number]
    )
      ? requestedColor
      : "purple";

    const { error } = await supabaseAdmin
      .from("portfolio_testimonials")
      .insert({
        name,
        role: role || null,
        company: company || null,
        email: email || null,
        avatar_url: avatarUrl || null,
        title,
        message,
        card_color: cardColor,
        status: "pending",
      });

    if (error) {
      console.error(
        "Testimonial submission error:",
        error
      );

      return NextResponse.json(
        {
          error: "Unable to submit testimonial.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your testimonial was submitted for review.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Unexpected testimonial submission error:",
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