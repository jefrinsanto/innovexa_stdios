const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// ---------------------------------------------------------------------------
// Nodemailer transporter — created once at module load and reused for every
// request (creating a new SMTP connection per-request is slow and wasteful).
// Uses Gmail SMTP with an App Password by default; any SMTP provider works
// by overriding SMTP_HOST/SMTP_PORT in .env.
// ---------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for port 465 (SSL), false for port 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Validates that every required field is present and not just whitespace.
 * Returns an array of field names that failed validation (empty array = valid).
 */
function getMissingFields(body) {
  const required = ["name", "email", "phone", "message"];
  return required.filter((field) => {
    const value = body[field];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

/**
 * Builds the HTML notification email body. Kept as its own function so the
 * template is easy to find and edit without touching the route logic.
 */
function buildNotificationEmail({ name, email, phone, message, submittedAt }) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: linear-gradient(135deg, #3B82F6, #A855F7); padding: 20px 24px; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; color: #ffffff; font-size: 18px;">New Lead — INNOVEXA STUDIOS</h2>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Phone</td>
            <td style="padding: 8px 0;">${phone}</td>
          </tr>
        </table>
        <p style="margin: 20px 0 6px; color: #6b7280; font-size: 14px;">Message</p>
        <p style="white-space: pre-wrap; background: #f3f4f6; padding: 14px; border-radius: 8px; font-size: 14px; line-height: 1.6; margin: 0;">${message}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">Submitted ${submittedAt}</p>
      </div>
    </div>
  `;
}

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    // ---- 1. Validation: reject if any required field is missing or blank ----
    const missing = getMissingFields(req.body);
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or empty field(s): ${missing.join(", ")}`,
      });
    }

    const { name, email, phone, message } = req.body;

    // ---- 2. Persist the lead in MongoDB first ----
    // If this fails, we haven't sent an email for a submission we can't
    // retrieve later, so there's nothing inconsistent to clean up.
    const contact = await Contact.create({ name, email, phone, message });

    const submittedAt = new Date(contact.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ---- 3. Send the notification email ----
    // A failed email should not fail the whole request — the lead is
    // already safely stored in MongoDB even if Gmail is temporarily down.
    const notifyAddress = process.env.NOTIFY_EMAIL || "jefrinabcde@gmail.com";
    let emailSent = true;

    try {
      await transporter.sendMail({
        from: `"INNOVEXA STUDIOS Website" <${process.env.SMTP_USER}>`,
        to: notifyAddress,
        replyTo: email, // lets you hit "Reply" in Gmail and reach the client directly
        subject: `New Lead: ${name} — INNOVEXA STUDIOS Contact Form`,
        text:
          `New contact form submission:\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone}\n` +
          `Message:\n${message}\n\n` +
          `Submitted: ${submittedAt}`,
        html: buildNotificationEmail({ name, email, phone, message, submittedAt }),
      });
    } catch (mailErr) {
      emailSent = false;
      console.error("Nodemailer error:", mailErr.message);
    }

    // ---- 4. Respond ----
    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      emailSent, // lets the frontend/ops know if the DB write succeeded but the email didn't
      data: contact,
    });
  } catch (err) {
    console.error("Contact route error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
