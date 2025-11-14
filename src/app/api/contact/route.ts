import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const industry = fd.get("industry") as string;
    const challenge = fd.get("challenge") as string;
    const message = fd.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const from = process.env.SMTP_FROM;
    const to = process.env.CONTACT_RECEIVER;

  // Prepare and log a short, masked preview of the key for debugging (first 6 chars + length).
  // Also sanitize common paste problems (trim whitespace and surrounding quotes) before using.
  const rawKey = SENDGRID_API_KEY;
  const cleanedKey = rawKey ? rawKey.trim().replace(/^\"|\"$|^'|'$/g, "") : rawKey;
  const keyPreviewRaw = rawKey ? `${rawKey.slice(0,6)}... (len=${rawKey.length})` : undefined;
  const keyPreviewClean = cleanedKey ? `${cleanedKey.slice(0,6)}... (len=${cleanedKey.length})` : undefined;
  // Also show character codes for the first 6 characters of the raw value to detect invisible chars (won't reveal full key).
  const charCodes = rawKey ? Array.from(rawKey.slice(0,6)).map(c => c.charCodeAt(0)) : undefined;
  console.log("Env vars check:", { hasKey: !!rawKey, keyStartsRaw: rawKey?.startsWith('SG.'), keyStartsClean: cleanedKey?.startsWith('SG.'), hasFrom: !!from, hasTo: !!to, keyPreviewRaw, keyPreviewClean, charCodes });

    if (!SENDGRID_API_KEY || !from || !to) {
      console.error("Missing SendGrid env vars", { hasKey: !!SENDGRID_API_KEY, hasFrom: !!from, hasTo: !!to });
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log("Local test - skipping email send. Message:", { name, email, industry, challenge, message });
      return NextResponse.json({ ok: true });
    }

  // Use the cleaned key to set SendGrid API key
  sgMail.setApiKey(cleanedKey as string);

    const msg = {
      to,
      from,
      subject: `Demo request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nIndustry: ${industry}\nChallenge: ${challenge}\n\n${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Industry:</b> ${industry}</p><p><b>Challenge:</b> ${challenge}</p><p>${message}</p>`,
    };

    await sgMail.send(msg as any);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Log SendGrid response body if available for more actionable errors (without exposing API key).
    if (err?.response?.body) {
      console.error("contact error - sendgrid response:", JSON.stringify(err.response.body));
    } else {
      console.error("contact error", err);
    }
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
