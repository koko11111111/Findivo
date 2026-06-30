import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendWaitlistConfirmation(email: string) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL ?? "Findivo <onboarding@resend.dev>";

  if (!resend) {
    console.log("[waitlist] Resend not configured, skipping email to:", email);
    return;
  }

  await resend.emails.send({
    from,
    to: email,
    subject: "You're on the Findivo waitlist",
    html: `
      <h1>Welcome to Findivo</h1>
      <p>Thanks for joining our waitlist. We're building an AI shopping assistant that finds real deals across online stores.</p>
      <p>We'll email you when we launch.</p>
      <p>— The Findivo team</p>
    `,
  });
}
