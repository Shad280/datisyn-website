import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mail = {
      from: `"Datisyn Website" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `Demo request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`
    };

    await transporter.sendMail(mail);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
