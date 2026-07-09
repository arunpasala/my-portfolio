import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // ===============================
    // READ FORM DATA FROM FRONTEND
    // These fields come from the contact form in your page.tsx.
    // ===============================
    const { name, email, subject, message } = await req.json();

    // ===============================
    // BASIC VALIDATION
    // This prevents empty messages from being sent.
    // ===============================
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill all contact form fields." },
        { status: 400 }
      );
    }

    // ===============================
    // EMAIL TRANSPORT CONFIGURATION
    // Add SMTP_USER and SMTP_PASS in .env.local.
    // For Gmail, SMTP_PASS must be a Google App Password.
    // ===============================
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ===============================
    // SEND EMAIL TO YOUR MAIL
    // Change CONTACT_RECEIVER_EMAIL in .env.local if you want another inbox.
    // ===============================
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || "balaarunpasala.dev@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
