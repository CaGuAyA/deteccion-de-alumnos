const db = require('../../db/mysql.js')

module.exports = function (dbInyectada) {
    let db = dbInyectada

    if (!db) {
        db = require('../../db/mysql.js')
    }

    function todos(tabla) {
        return db.todos(tabla)
    }

    function uno(tabla, id) {
        return db.uno(tabla, id)
    }

    function agregar(tabla, body) {
        return db.agregar(tabla, body)
    }

    function eliminar(tabla, body) {
        return db.eliminar(tabla, body)
    }

    function consulta(tabla, filtro) {
        return db.consulta(tabla, filtro)
    }
    
    function consulta_join(tabla1, tabla2, filtro, x) {
        return db.consulta_join(tabla1, tabla2, filtro, x)
    }

    function acutalizar(tabla, data, idUsuario) {
        return db.acutalizar(tabla, data, idUsuario)
    }

    function join(filtro) {
        return db.join(filtro)
    }

    function join_users_rol(tabla, id_tipo, filtro) {
        return db.join_users_rol(tabla, id_tipo, filtro)
    }

    function acutalizarParmetrizado(tabla, pregunta, data, respuesta) {
        return db.acutalizarParmetrizado(tabla, pregunta, data, respuesta)
    }

    return {
        todos,
        uno,
        agregar,
        eliminar,
        consulta,
        consulta_join,
        acutalizar,
        join,
        join_users_rol,
        acutalizarParmetrizado,
    }
}