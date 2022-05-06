const nodemailer = require('nodemailer')

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'madelynn.beer58@ethereal.email',
        pass: '3BV6dP6t8Rfn18C6PS'
    }
}

module.exports = nodemailer.createTransport(mailConfig)
