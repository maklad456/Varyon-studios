import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

const serviceId = process.env.EMAILJS_SERVICE_ID;
const userTemplate = process.env.EMAILJS_USER_TEMPLATE_ID;
const adminTemplate = process.env.EMAILJS_ADMIN_TEMPLATE_ID;
const privateKey = process.env.EMAILJS_PRIVATE_KEY;
const publicKey = process.env.EMAILJS_PUBLIC_KEY;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Validate required fields
    if (!serviceId || !privateKey || !publicKey || !payload.code || !payload.email) {
      return NextResponse.json({ ok: false, message: "Missing data" }, { status: 400 });
    }

    if (!userTemplate || !adminTemplate) {
      return NextResponse.json({ ok: false, message: "Email templates not configured" }, { status: 500 });
    }

    // Send email to customer
    await emailjs.send(serviceId, userTemplate, payload, {
      publicKey: publicKey,
      privateKey: privateKey,
    });
    
    // Send email to internal team
    await emailjs.send(serviceId, adminTemplate, payload, {
      publicKey: publicKey,
      privateKey: privateKey,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("EmailJS API error:", err);
    return NextResponse.json({ ok: false, message: "Failed to send emails" }, { status: 500 });
  }
}
