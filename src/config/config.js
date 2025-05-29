// Configuración global
const config = {
    PORT: 5173,
    EMAIL_USER: 'gamezoneetp@gmail.com', 
    EMAIL_PASS: 'xfue eest jhjk byvm',
  };
  
  // Configuración de Nodemailer
  const createTransporter = () => {

    const nodemailer = require('nodemailer');
    
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });
  };
  
  module.exports = {
    config,
    createTransporter
  }; 