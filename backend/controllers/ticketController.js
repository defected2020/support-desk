const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const ImageModel = require('../models/imageModel')
const multer = require('multer')

// storage
const Storage = multer.diskStorage({
  destination: 'backend/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: Storage,
}).single('image')

// @desc Get user tickets
// @route GET /api/tickets
// @access Private

const getTickets = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// @desc Get user ticket
// @route GET /api/tickets:id
// @access Private

const getTicket = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (user.isAdmin) {
    res.status(200).json(ticket)
  } else if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } else {
    res.status(200).json(ticket)
  }
})

// @desc Create new tickets
// @route POST /api/tickets
// @access Private

const createTicket = asyncHandler(async (req, res) => {
  const { product, description, priority } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    priority,
    fullName: user.name,
    user: req.user.id,
    status: 'new',
  })
  res.status(201).json(ticket)
})

// @desc Delete ticket
// @route DELETE /api/tickets:id
// @access Private

const deleteTicket = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

// @desc Update ticket
// @route PUT /api/tickets:id
// @access Private

const updateTicket = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTicket)
})

const postImage = asyncHandler(async (req, res) => {
  res.send('upload file')
})

const uploadImages = asyncHandler(async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    } else {
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: 'image/png',
        },
      })
      newImage.save().then(() => res.send('successfully uploaded'))
    }
  })
})

// @desc Get user tickets
// @route GET /api/tickets
// @access Private

const getAllTickets = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  const tickets = await Ticket.find({})

  res.status(200).json(tickets)
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
  postImage,
  uploadImages,
}
