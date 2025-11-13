import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const from = process.env.SMTP_FROM;
    const to = process.env.CONTACT_RECEIVER;

    if (!SENDGRID_API_KEY || !from || !to) {
      console.error("Missing SendGrid env vars", { hasKey: !!SENDGRID_API_KEY, hasFrom: !!from, hasTo: !!to });
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to,
      from,
      subject: `Demo request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
    };

    await sgMail.send(msg as any);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
