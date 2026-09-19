const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Validate required fields
function getMissingFields(body) {
  const required = ["name", "email", "phone", "message"];

  return required.filter((field) => {
    const value = body[field];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

// Escape HTML so user input cannot inject HTML into the email
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Build notification email
function buildNotificationEmail({
  name,
  email,
  phone,
  message,
  submittedAt,
}) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">

      <div style="background: linear-gradient(135deg, #3B82F6, #A855F7); padding: 20px 24px; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; color: #ffffff; font-size: 18px;">
          New Lead — INNOVEXA STUDIOS
        </h2>
      </div>

      <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; padding: 24px;">

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">

          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 120px;">
              Name
            </td>
            <td style="padding: 8px 0; font-weight: 600;">
              ${escapeHtml(name)}
            </td>
          </tr>

          <tr>
            <td style="padding: 8px 0; color: #6b7280;">
              Email
            </td>
            <td style="padding: 8px 0;">
              <a href="mailto:${escapeHtml(email)}"
                 style="color: #3B82F6; text-decoration: none;">
                ${escapeHtml(email)}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 8px 0; color: #6b7280;">
              Phone
            </td>
            <td style="padding: 8px 0;">
              ${escapeHtml(phone)}
            </td>
          </tr>

        </table>

        <p style="margin: 20px 0 6px; color: #6b7280; font-size: 14px;">
          Message
        </p>

        <p style="white-space: pre-wrap; background: #f3f4f6; padding: 14px; border-radius: 8px; font-size: 14px; line-height: 1.6; margin: 0;">
          ${escapeHtml(message)}
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

        <p style="font-size: 12px; color: #9ca3af; margin: 0;">
          Submitted ${escapeHtml(submittedAt)}
        </p>

      </div>
    </div>
  `;
}

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    // 1. Validate form
    const missing = getMissingFields(req.body);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or empty field(s): ${missing.join(", ")}`,
      });
    }

    const { name, email, phone, message } = req.body;

    // 2. Save lead to MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    const submittedAt = new Date(contact.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // 3. Send email through Brevo
    const notifyAddress =
      process.env.NOTIFY_EMAIL || "jefrinabcde@gmail.com";

    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "INNOVEXA STUDIOS Website",
            email: process.env.BREVO_SENDER_EMAIL,
          },

          to: [
            {
              email: notifyAddress,
              name: "INNOVEXA STUDIOS",
            },
          ],

          replyTo: {
            email: email.trim(),
            name: name.trim(),
          },

          subject: `New Lead: ${name.trim()} — INNOVEXA STUDIOS Contact Form`,

          textContent:
            `New contact form submission:\n\n` +
            `Name: ${name.trim()}\n` +
            `Email: ${email.trim()}\n` +
            `Phone: ${phone.trim()}\n` +
            `Message:\n${message.trim()}\n\n` +
            `Submitted: ${submittedAt}`,

          htmlContent: buildNotificationEmail({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
            submittedAt,
          }),
        }),
      }
    );

    // Check Brevo response
    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text();

      console.error("Brevo error:", brevoError);

      return res.status(500).json({
        success: false,
        message: "Your message could not be sent. Please try again later.",
      });
    }

    const brevoData = await brevoResponse.json();

    console.log("Brevo email sent:", brevoData.messageId);

    // 4. Success response
    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      emailSent: true,
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