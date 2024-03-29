const express = require('express')
const router = express.Router()

const {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
  postImage,
  uploadImages,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

//Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/images').get(postImage).post(uploadImages)

router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/admin/tickets').get(protect, getAllTickets)

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

module.exports = router
