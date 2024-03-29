const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
// Loading ENV variables
dotenv.config({ path: './config/config.env' })

const products = require('./routes/productRoutes')
const auth = require('./routes/authRoutes')
const users = require('./routes/userRoutes')

const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

// Mount routers
app.use('/api/v1/products', products)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)

// Error handler middleware after the router mounting
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(
    `Server is started in ${process.env.NODE_ENV} mode at port:${PORT}`.magenta
      .bold
  )
})

// Handle unhandled rejection and close the server and exit the process
process.on('unhandledRejection', (reason, promise) => {
  console.log(
    `Unhandled Rejection. Reason: ${reason.message}, Promise: ${promise}`.red
  )
  // Close server and exit the process
  server.close(() => process.exit(1))
})
