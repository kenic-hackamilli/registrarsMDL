// services/sms.js
const { env } = require("../config/env.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Send SMS using TextSMS API
 * @param {string} to - Recipient number (e.g., 2547XXXXXXXX)
 * @param {string} message - SMS content
 * @returns {Promise<Object>}
 */
async function sendSMS(to, message) {
  try {
    const payload = {
      apikey: env.smsApiKey,
      shortcode: env.smsShortcode,
      partnerID: env.smsPartnerId,
      mobile: to,
      message,
    };

    const response = await fetch(
      "https://sms.textsms.co.ke/api/services/sendsms/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.text();

    if (!response.ok) {
      console.error("SMS API error:", data);
      return { success: false, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendSMS };
