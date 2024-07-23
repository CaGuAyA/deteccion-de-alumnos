const respuesta = require('./respuestas')

function errors(err = 'Error Interno', req, res, next) {
    console.error('[error', err)

    const message = err.message
    const status = err.statusCode || 500

    respuesta.error(req, res, message, status)
}

module.exports = errors;