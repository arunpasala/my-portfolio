import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type FeedbackPayload = {
  name?: string;
  role?: string;
  message?: string;
  cardColor?: string;
};

// ======================================================
// GET APPROVED FEEDBACK
// ======================================================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("portfolio_feedback")
      .select(
        "id, name, role, message, avatar_url, card_color, created_at"
      )
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Feedback fetch error:", error);

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
  } catch (error) {
    console.error("Unexpected feedback fetch error:", error);

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

// ======================================================
// SUBMIT NEW FEEDBACK
// ======================================================
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FeedbackPayload;

    const name = body.name?.trim();
    const role = body.role?.trim();
    const message = body.message?.trim();
    const cardColor = body.cardColor?.trim() || "purple";

    if (!name || !message) {
      return NextResponse.json(
        {
          error: "Name and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 60) {
      return NextResponse.json(
        {
          error: "Name must be 60 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    if (role && role.length > 80) {
      return NextResponse.json(
        {
          error: "Role must be 80 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 300) {
      return NextResponse.json(
        {
          error: "Message must be 300 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedColors = [
      "purple",
      "green",
      "blue",
      "red",
      "indigo",
      "cyan",
    ];

    const safeColor = allowedColors.includes(cardColor)
      ? cardColor
      : "purple";

    const { error } = await supabase.from("portfolio_feedback").insert({
      name,
      role: role || null,
      message,
      card_color: safeColor,
      status: "pending",
    });

    if (error) {
      console.error("Feedback insert error:", error);

      return NextResponse.json(
        {
          error: "Unable to submit feedback.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted for approval.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Unexpected feedback submission error:", error);

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