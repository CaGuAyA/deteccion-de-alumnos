exports.succes = function (req, res, mensaje = '', status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: JSON.parse(mensaje)
    })
}

exports.error = function (req, res, mensaje = 'Error Interno', status = 500) {
    res.status(status).send({
        error: true,
        status: status,
        body: JSON.parse(mensaje)
    })
}