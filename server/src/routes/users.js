const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

const router = Router()

// Validación de datos para la ruta '/signup'
const validateSignupData = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
]

// Validación de datos para la ruta '/signin'
const validateSigninData = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
]

//////// GET USERS ////////

router.get('/', async (req, res) => {
  const Users = await User.find({}).limit(30).exec();
  console.log(Users);
  res.json(Users)
})

//////// POST SIGNUP ////////

router.post('/signup', validateSignupData, async (req, res) => {
  const { name, password: passwordPlainText } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(passwordPlainText, salt)

    const newUser = await User.create({name, password})

    const token = newUser.generateJWT()
    res.setHeader('access-control-expose-headers', 'x-auth-token')
    res.setHeader('x-auth-token', token).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al registrar el usuario' })
  }
})

//////// POST SIGNIN ////////

router.post('/signin', validateSigninData, async (req, res) => {
  const { name, password: passwordPlainText } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrecta' })
    }

    const isUser = await bcrypt.compare(passwordPlainText, user.password)
    if (!isUser) {
      return res.status(401).json({ message: 'CUsuario o contraseña incorrecta' })
    }

    const token = user.generateJWT()
       res.setHeader('access-control-expose-headers', 'x-auth-token')
    res.setHeader('x-auth-token', token).json({ message: 'Inicio de sesión exitoso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en el inicio de sesión' })
  }
})

module.exports = router