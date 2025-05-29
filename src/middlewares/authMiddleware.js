const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'SlztIJvefUHFyVQrNAYS6rtk23';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    };

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        };

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
