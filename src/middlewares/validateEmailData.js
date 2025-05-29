const validateEmailData = (req, res, next) => {

  const { username, email } = req.body;

  if (!username || !email) {

    return res.status(400).json({ error: 'Faltan datos en el formulario.' });
  };

  if (typeof username !== 'string' || username.trim().length === 0) {

    return res.status(400).json({ error: 'El nombre no es válido.' });
  };

  if (typeof email !== 'string' || !email.includes('@')) {

    return res.status(400).json({ error: 'El email no es válido.' });
  };

  next();
};

module.exports = validateEmailData; 