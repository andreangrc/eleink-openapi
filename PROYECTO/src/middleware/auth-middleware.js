/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'root';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });
  }

  const tokenReal = req.headers.authorization.substring(7);

  try {
    // Verificar el token con la clave secreta
    const decodedToken = jwt.verify(tokenReal, secret);

    // Buscar al usuario correspondiente al ID del token en la base de datos
    const user = await User.findById(decodedToken.userId);

    // Si no se encontró ningún usuario con ese ID, devolver un error 401
    if (!user) {
      return res.status(401).json({ message: 'El usuario no está registrado.' });
    }

    // Adjuntar el usuario al objeto de la solicitud para que los controladores puedan utilizarlo
    req.user = user;

    // Llamar a la siguiente función en la cadena de middlewares
    next();
  } catch (err) {
    // Si el token no es válido, devolver un error 401
    return res.status(401).send({ message: 'El token de autenticación no es válido.' });
  }
};

const itsMe = async (req, res, next) => {
  if (req.user.rol === 'admin') {
    next();
  } else {
    if (req.params.password === req.user.email) {
      next();
    }

    return res.status(403).send({ message: 'Forbidden' });
  }
};

module.exports = {
  authMiddleware,
  itsMe,
};
