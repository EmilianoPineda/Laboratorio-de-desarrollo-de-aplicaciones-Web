const mongoose = require('mongoose')
const Reserva = require('./reserva')
let Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const saltRounds = 10
const mailer = require('../mailer/mailer')


let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email válido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingrese un email válido']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
    next()
})

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
    let reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta})
    //console.log(reserva)
    reserva.save(cb)
}

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compare(password, this.password)
}

usuarioSchema.methods.enviar_mail_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')})
    const email_destination = this.email
    token.save(function (err) {
        if(err) { return console.log(err.message) }
        const mailOptions = {
            from: 'no-reply@easybici.com',
            to: email_destination,
            subject: 'Verificación de cuenta en easybici.com',
            text: 'Hola,\n\nPor favor, para verificar su cuenta haga clic en el siguiente enlace: \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '\n'
        }
 
        mailer.sendMail(mailOptions, function(err){
            if(err) { return console.log(err.message) }
 
            console.log('Se envió un mail de confirmación a: ' + email_destination)
        })
    })
}

usuarioSchema.plugin(uniqueValidator, {message: 'Ya existe un usuario con ese {PATH}'})

module.exports = mongoose.model('Usuario', usuarioSchema) 

