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
  if (!emailJsReady && publicKey) {
    try {
      emailjs.init({ publicKey });
      emailJsReady = true;
    } catch (err) {
      console.error("[EmailJS Init Error]:", err);
    }
  }
}

export async function submitContactForm({ name, email, service, message }) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  const recipientEmail = "eshabajaj1626@gmail.com";
  const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${service || "General"}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService Requested: ${service || "Not specified"}\n\nMessage:\n${message}`
  );
  const fallbackMailto = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  if (!serviceId || !templateId || !publicKey) {
    const missing = [
      !serviceId && "VITE_EMAILJS_SERVICE_ID",
      !templateId && "VITE_EMAILJS_TEMPLATE_ID",
      !publicKey && "VITE_EMAILJS_PUBLIC_KEY",
    ].filter(Boolean);

    console.error(
      `[EmailJS Config Notice]: Contact form environment variables are missing (${missing.join(
        ", "
      )}). Please add them to .env.local and restart the dev server.`
    );

    return {
      ok: false,
      message: "Could not send message automatically right now. Please email me directly below.",
      mailtoUrl: fallbackMailto,
    };
  }

  try {
    ensureEmailJsInit(publicKey);

    const templateParams = {
      from_name: name,
      from_email: email,
      reply_to: email,
      name: name,
      email: email,
      user_name: name,
      user_email: email,
      to_name: "Esha Bajaj",
      service: service || "Not specified",
      message: message,
      subject: `Portfolio inquiry${service ? `: ${service}` : ""}`,
    };

    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

    if (result.status === 200) {
      return {
        ok: true,
        message: "Thank you! I've received your message and will reach out to you soon. ✨",
      };
    }

    console.error("[EmailJS Send Non-200 Result]:", result);
    return {
      ok: false,
      message: "Could not send message automatically right now. Feel free to email me directly below!",
      mailtoUrl: fallbackMailto,
    };
  } catch (err) {
    console.error("[EmailJS Submission Failure]:", err);
    return {
      ok: false,
      message: "Could not send message automatically right now. Feel free to email me directly below!",
      mailtoUrl: fallbackMailto,
    };
  }
}

