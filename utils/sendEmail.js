const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT * 1, // Multiply to 1 to make it a number
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

const sendEmail = async (options) => {
  const message = {
    from: `${process.env.NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  const info = await transporter.sendMail(message)

  console.log('Message send: %s', info.messageId)
}

module.exports = sendEmail
