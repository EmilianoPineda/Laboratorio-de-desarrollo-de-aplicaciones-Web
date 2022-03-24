const { check } = require('express-validator');

// Escribimos las reglas de validación para la acción register
exports.store = [
  // Revisa que el color no sea vacío
  check('color').notEmpty(),
  check('modelo').notEmpty(),
  check('lat').notEmpty(),
  check('lon').notEmpty()
];