// services/registrarService.js
const db = require('../db');
const smsService = require('./sms');

exports.processRegistration = async (payload) => {
  const { full_name, email, phone, domain_name } = payload;

  // 1. Store incoming registration
  const insertResult = await db.query(`
    INSERT INTO incoming_registrations
    (full_name, email, phone, domain_name, status)
    VALUES ($1,$2,$3,$4,'received')
    RETURNING id
  `, [full_name, email, phone, domain_name]);

  const incomingId = insertResult.rows[0].id;

  // 2. Send acknowledgement SMS
  const ackMessage = `
Hi ${full_name},

Greetings from HostAfrica.

Your registration request for ${domain_name}
has been received and is currently being processed.
We will notify you once processing is complete.
  `;

  try {
    await smsService.sendSMS(phone, ackMessage.trim());
  } catch (err) {
    console.error("SMS send failed:", err.message);
  }

  // 3. Insert into processed_domains (simulation)
  const registrar_reference_id = `REG-${Date.now()}`;

  await db.query(`
    INSERT INTO processed_domains
    (incoming_id, registrar_reference_id, status)
    VALUES ($1,$2,'completed')
  `, [incomingId, registrar_reference_id]);

  // 4. Return acknowledgement
  return {
    registrar_reference_id,
    status: "RECEIVED",
    message: "Registrar successfully received the request"
  };
};
