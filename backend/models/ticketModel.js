const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fullName: {
      type: String,
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low Priority', 'Medium Priority', 'High Priority'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
    images: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
