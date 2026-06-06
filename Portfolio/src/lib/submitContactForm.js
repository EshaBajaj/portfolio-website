import emailjs from "@emailjs/browser";

function trimEnv(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getEmailJsConfig() {
  return {
    serviceId: trimEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID),
    templateId: trimEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
    publicKey: trimEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
  };
}

let emailJsReady = false;

function ensureEmailJsInit(publicKey) {
  if (!emailJsReady) {
    emailjs.init({ publicKey });
    emailJsReady = true;
  }
}

export async function submitContactForm({ name, email, service, message }) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  if (!serviceId || !templateId || !publicKey) {
    return {
      ok: false,
      message:
        "Contact form is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to .env.local, then restart the dev server.",
    };
  }

  try {
    ensureEmailJsInit(publicKey);

    const result = await emailjs.send(serviceId, templateId, {
      from_name: name,
      from_email: email,
      reply_to: email,
      service: service || "Not specified",
      message,
      subject: `Portfolio inquiry${service ? `: ${service}` : ""}`,
    });

    if (result.status === 200) {
      return {
        ok: true,
        message: "Message sent! I'll get back to you soon.",
      };
    }

    return {
      ok: false,
      message: "Could not send your message. Please try again or email me directly.",
    };
  } catch (err) {
    const detail = err?.text || err?.message || "";
    const isInvalidKey = /public key is invalid/i.test(detail);

    return {
      ok: false,
      message: isInvalidKey
        ? "EmailJS Public Key is invalid. In EmailJS → Account → API Keys, copy the Public Key (not Private Key). Then in Security, turn OFF “Use Private Key”, restart npm run dev, and try again."
        : detail
          ? `Could not send your message: ${detail}`
          : "Could not send your message right now. Please try again or email me directly.",
    };
  }
}
