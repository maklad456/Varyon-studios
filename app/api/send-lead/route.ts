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
    if (!serviceId || !privateKey || !publicKey) {
      console.error("Missing EmailJS configuration:", {
        hasServiceId: !!serviceId,
        hasPrivateKey: !!privateKey,
        hasPublicKey: !!publicKey,
      });
      return NextResponse.json({ ok: false, message: "Email service not configured" }, { status: 500 });
    }

    if (!payload.code || !payload.email) {
      console.error("Missing payload data:", { hasCode: !!payload.code, hasEmail: !!payload.email });
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 });
    }

    if (!userTemplate || !adminTemplate) {
      console.error("Missing template IDs:", { hasUserTemplate: !!userTemplate, hasAdminTemplate: !!adminTemplate });
      return NextResponse.json({ ok: false, message: "Email templates not configured" }, { status: 500 });
    }

    let userEmailSent = false;
    let adminEmailSent = false;
    let lastError: any = null;

    // Send email to customer
    try {
      const userResponse = await emailjs.send(serviceId, userTemplate, payload, {
        publicKey: publicKey,
        privateKey: privateKey,
      });
      userEmailSent = true;
      console.log("User email sent successfully:", userResponse.status);
    } catch (err: any) {
      console.error("Failed to send user email:", err);
      lastError = err;
    }
    
    // Send email to internal team
    try {
      const adminResponse = await emailjs.send(serviceId, adminTemplate, payload, {
        publicKey: publicKey,
        privateKey: privateKey,
      });
      adminEmailSent = true;
      console.log("Admin email sent successfully:", adminResponse.status);
    } catch (err: any) {
      console.error("Failed to send admin email:", err);
      lastError = err;
    }

    // Return success if at least one email was sent
    if (userEmailSent || adminEmailSent) {
      return NextResponse.json({ 
        ok: true, 
        userEmailSent,
        adminEmailSent 
      });
    }

    // If both failed, return error with details
    const errorMessage = lastError?.text || lastError?.message || "Failed to send emails";
    console.error("Both emails failed to send. Last error:", errorMessage);
    return NextResponse.json({ 
      ok: false, 
      message: errorMessage 
    }, { status: 500 });

  } catch (err: any) {
    console.error("EmailJS API error:", err);
    return NextResponse.json({ 
      ok: false, 
      message: err?.message || "Failed to send emails" 
    }, { status: 500 });
  }
}
