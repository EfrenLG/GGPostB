const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/userModel');
const { checkUserValidations, createUserValidations, loginUserValidations } = require('../validations/userValidations');

const JWT_SECRET = 'SlztIJvefUHFyVQrNAYS6rtk23';

const authController = {

    // Check de usuario
    check: [
        ...checkUserValidations,
        async (req, res) => {
            try {

                const { username, email } = req.body;

                const usuario = await Usuario.findOne({ username });
                const correo = await Usuario.findOne({ email });

                res.json({
                    "username": !!usuario,
                    "email": !!correo
                });

            } catch (error) {

                res.status(500).json({ error: error.message });
            };
        }],

    // Registro de usuario
    register: [
        ...createUserValidations,
        async (req, res) => {
            try {
                const { username, email, password } = req.body;

                const newUser = new Usuario({
                    username,
                    email,
                    password,
                });

                await newUser.save();

                res.status(201).json({ status: 200 });
            } catch (error) {
                res.status(500).json({ error: error.message });
            };
        }],

    // Login de usuario
    login: [
        ...loginUserValidations,
        async (req, res) => {
            try {
                const { username, password } = req.body;

                // Buscar usuario
                const user = await Usuario.findOne({ username });
                if (!user) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                };

                // Comparar contraseñas
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                };

                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 3600000,
                });

                res.json({
                    message: 'Login exitoso',
                    user: { id: user._id, icon: user.icon },
                    token: token,
                    status: 200,
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            };
        }]
};

module.exports = authController;