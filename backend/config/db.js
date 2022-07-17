const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // here we connect to mongodb
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.brightMagenta.bold)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB
