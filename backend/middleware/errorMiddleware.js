const errorHandler = (err, req, res, next) => {
  // res.statusCode is whatever I set as res.status in the controllers
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    //err.stack tells you the line numbers etc to look at
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler }
