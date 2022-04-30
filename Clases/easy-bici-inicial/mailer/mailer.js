const nodemailer = require('nodemailer')

const transporter = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mustafa.connelly57@ethereal.email',
        pass: 'gkquXMKsjtzWnmuJhT'
    }
}

module.exports = nodemailer.createTransport(transporter)