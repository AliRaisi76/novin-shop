const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

// Loading ENV variables
dotenv.config({ path: './config/config.env' })

const app = express()

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server is started in ${process.env.NODE_ENV} mode at port:${PORT}`.magenta
      .bold
  )
})
