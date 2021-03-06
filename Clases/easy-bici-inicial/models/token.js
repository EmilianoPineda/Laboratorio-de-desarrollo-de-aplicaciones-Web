const mongoose = require('mongoose')
const Usuario = require('../models/usuario')
let Schema = mongoose.Schema

let TokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true , default: Date.now, expires: 43200 }
})

module.exports = mongoose.model('Token', TokenSchema)