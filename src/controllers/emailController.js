const emailService = require('../services/emailService');

const sendEmail = async (req, res) => {

  try {

    const result = await emailService.sendEmail(req.body);

    if (result.success) {

      return res.status(200).json({ status: 200 });

    } else {

      return res.status(500).json({ error: result.error });
    }
  } catch (error) {

    console.error('Error en el controlador de email:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  sendEmail
};