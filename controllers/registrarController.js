// controllers/registrarController.js
const registrarService = require('../services/registrarService');

exports.receiveRegistration = async (req, res) => {
  try {
    const payload = req.body;
    const { full_name, email, phone, domain_name } = payload;

    // Validate required fields
    if (!full_name || !email || !phone || !domain_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Process registration
    const result = await registrarService.processRegistration(payload);

    // Respond to central system
    return res.status(200).json({
      registrar_reference_id: result.registrar_reference_id,
      status: result.status,
      message: result.message
    });
  } catch (err) {
    console.error("Registrar Controller Error:", err);
    return res.status(500).json({ message: "Registrar server error" });
  }
};
