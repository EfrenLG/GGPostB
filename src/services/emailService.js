const { createTransporter, config } = require('../config/config');

const createEmailHtml = (username) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a GameZone!</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #1e1e2f;
          color: #f0f0f0;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #2b2d42;
          color: #00ff88;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
          border-bottom: 3px solid #00ff88;
        }
        .content {
          color: #f0f0f0;
          padding: 20px;
          background-color: #2c2f4a;
          border: 1px solid #3a3d5c;
          border-radius: 0 0 10px 10px;
        }
        .highlight {
          background-color: #1a1c2e;
          padding: 15px;
          border-left: 5px solid #00ff88;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          color: #888;
        }
        h1, h3 {
          font-family: 'Orbitron', sans-serif;
        }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="header">
        <h1>¡Bienvenido, ${username}!</h1>
      </div>
      <div class="content">
        <p>🎮 Gracias por unirte a <strong>GameZone</strong>, tu nuevo punto de encuentro para todo lo relacionado con videojuegos.</p>

        <div class="highlight">
          <p>Prepárate para explorar lo último en noticias gamer, reseñas épicas, foros de discusión y desafíos semanales.</p>
        </div>

        <p>Ya formas parte de nuestra comunidad, donde cada jugador cuenta. No olvides configurar tu perfil y comenzar a explorar.</p>

        <p>¡Nos alegra tenerte en el equipo!</p>
      </div>
      <div class="footer">
        <p>Este mensaje fue generado automáticamente. No respondas a este correo.</p>
        <p>&copy; ${new Date().getFullYear()} GameZone. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;
};

const sendEmail = async (data) => {

  const { username, email } = data;
  const transporter = createTransporter();

  const mailOptions = {

    from: config.EMAIL_USER,
    to: email,
    subject: `¡Bienvenido a GameZone, ${username}!`,
    html: createEmailHtml(username),
    text: `Hola ${username},
  
            ¡Gracias por unirte a GameZone! 🎮
            
            Ya formas parte de una comunidad apasionada por los videojuegos. Prepárate para explorar noticias, reseñas, foros y mucho más.
            
            No olvides configurar tu perfil y comenzar tu aventura gamer con nosotros.
            
            ¡Nos alegra tenerte en el equipo!
            
            Saludos,
            El equipo de GameZone.
     `,
  };


  try {

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);

    return { success: true, message: 'Correo enviado exitosamente.' };

  } catch (error) {

    console.error('Error al enviar el email:', error);
    return { success: false, error: 'Error al enviar el correo.' };
  }
};

module.exports = {
  sendEmail
}; 