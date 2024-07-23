const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion

function conMysql() {
    conexion = mysql.createConnection(dbconfig)

    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql)
        } else {
            console.log('DB conectado!!')
        }
    })

    conexion.on('error', err => {
        console.log('[db err]', err)
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err
        }
    })
}

conMysql()

function todos(tabla) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${tabla}`;
        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE idusuario="${id}"`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function acutalizar(tabla, data, idUsuario) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE idUsuario = ?`, [data, idUsuario], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function agregar(tabla, data) {
    if (data) {
        return insertar(tabla, data)
    } else {
        return acutalizar(tabla, data)
    }
}

function eliminar(tabla, data) {
    const idusuario = data.idusuario.toString()
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE idusuario=?`, idusuario, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function consulta(tabla, filtro) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${tabla}`;
        if (filtro) {
            query += ` WHERE ${filtro}`;
        }
        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function consulta_join(tabla1, tabla2, filtro, x) {
    return new Promise((resolve, reject) => {
        let query = `SELECT ${tabla1}.idDonacion, ${tabla1}.fecha, ${tabla2}.descripcion, ${tabla2}.categoria, ${tabla2}.cantidad FROM ${tabla1} JOIN ${tabla2} ON `;
        switch (x) {
            case 0:
                query += `${tabla1}.idUsuario = ${tabla2}.idUsuario`;
                break;
            case 1:
                query += `${tabla1}.idDonacion = ${tabla2}.idDonacion`;
                break;
        }

        if (filtro) {
            query += ` WHERE ${filtro}`;
        }

        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function join(filtro) {
    return new Promise((resolve, reject) => {
        let query = `SELECT *
        FROM Donacion
        JOIN lleva_acabo ON lleva_acabo.idDonacion = Donacion.idDonacion
        `;

        if (filtro) {
            query += ` WHERE Donacion.idDonacion ='${filtro}'`;
        }

        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function join_users_rol(tabla, id_tipo, filtro) {
    return new Promise((resolve, reject) => {
        let query = `SELECT *
        FROM Usuario
        JOIN ${tabla} ON ${tabla}.${id_tipo} = Usuario.${id_tipo}
        `;

        if (filtro) {
            query += ` WHERE Donacion.idDonacion ='${filtro}'`;
        }

        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function acutalizarParmetrizado(tabla, pregunta, data, respuesta) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE ${pregunta} = ?`, [data, respuesta], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

module.exports = {
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