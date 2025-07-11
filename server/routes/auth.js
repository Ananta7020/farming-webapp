// routes/auth.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model') 

const JWT_SECRET = 'yoursecretkey'

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ msg: 'User already exists' })
    const hash = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hash })
    await user.save()
    res.status(201).json({ msg: 'Signup successfully!' })
  } catch (err) {
    res.status(500).json({ msg: 'Error signing up', error: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in', error: err.message })
  }
})



module.exports = router
