
import  express, { response } from 'express';
import {loginToExternalApi , registerToExternalApi, obtenerPlanetas} from './services/dataService.js';
import  { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = express.Router(); // <--- Aquí se inicializa
let backendToken =''; // Aquí podrías almacenar un token de autenticación si el microservicio lo requiere

// Definimos las reglas de limpieza/validación
const loginValidation = [
  body('name').isString().trim().escape().notEmpty(),
  body('password').isString().trim().notEmpty()
];

const registerValidation = [
  body('name').isString().trim().escape().notEmpty(),
  body('apellidos').isString().trim().escape().notEmpty(),
  body('nickname').isString().trim().escape().notEmpty(),
  body('password').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail()
];

router.all('/auth/login',loginValidation, // 1. Limpia y valida el body
  (req, res, next) => {
    // Check de errores de validación antes de seguir
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }, async (req, res) => {
  console.log('Login request received', req.body);
  const { name, password } = req.body;
  console.log('Request body:', req.body);
  console.log('Login attempt:', name);
  try {
    // 1. Verificar si el usuario existe
    if (!name || !password ) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Comparar la contraseña enviada con la hasheada en la DB
    // Recuerda: en DXC/Banca la seguridad es prioridad, nunca compares en texto plano
    let payload = await loginToExternalApi(name, password);
   
    
    
    // 3. Firmar el Token
    jwt.sign(
      { id: payload.id },
      "hola", // Guardado en variables de entorno por seguridad
      { expiresIn: '1h' }, // Expira en 1 hora
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token: token, user: {id: payload.id, nickname: payload.nickname, monedas: payload.monedas,planetas: payload.planetas } }); // El cliente guarda esto (LocalStorage o Cookie) // El cliente guarda esto (LocalStorage o Cookie)
      }
    );

  } catch (err) {
    console.error('Login Error:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { msg: 'Server error' });
  }
 
});


export const verifyToken = (req, res, next) => {
    // El frontend enviará el token así: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        // Verificamos el token con la clave secreta de tu .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardamos los datos del usuario en el objeto 'req' para que 
        // las siguientes funciones puedan saber quién es el usuario.
        req.user = decoded; 
        
        next(); // ¡Todo bien! Pasa a la siguiente función
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};


router.all('/auth/register', registerValidation, // 1. Limpia y valida el body
  (req, res, next) => {
    // Check de errores de validación antes de seguir
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  async (req, res) =>{
  console.log('Register request received', req.body);
  try {
    // 1. Verificamos los datos del usuario
      const { name, apellidos, nickname, password, email } = req.body;
      console.log('Request body:', req.body);
      console.log('Register attempt:', name);
    if (!name || !apellidos || !nickname || !password || !email ) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Comparar la contraseña enviada con la hasheada en la DB
    backendToken = await registerToExternalApi(req.body);
    res.status(200).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error('Register Error:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { msg: 'Server error' });
  }
});


router.get('/planetas',(req, res, next) => {
    // 1 . Check de errores de validación antes de seguir
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }, async (req, res) => {
  console.log('Get planetas received');
  try {

    // 2. le pedimos al backend los planetas disponibles para ese usuario (con su token de autenticación)
    let payload = await obtenerPlanetas(req.headers.authorization.split(' ')[1]);
    res.status(200).json({ planetas: payload }); // El cliente guarda esto (LocalStorage o Cookie) // El cliente guarda esto (LocalStorage o Cookie)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
 
});


export default router;