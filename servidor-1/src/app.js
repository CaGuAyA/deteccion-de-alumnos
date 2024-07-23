const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const svgCaptcha = require('svg-captcha');
const axios = require('axios');
const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const config = require('./config');
const querystring = require('querystring');
const controlador = require('./modulos/crud/index.js')
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json({ type: "*/*" }))

app.use(cors())

// muestra la consulta qe se hizo
app.use(morgan('dev'));

app.set('port', config.app.port);

app.get('/api/prueba', async (req, res) => {
    console.log("esto es una prueba")
    res.send("Hola dice el servidor")
})

app.get('/api/captcha', (req, res) => {
    const captcha = svgCaptcha.create();
    res.send({
        captchaImage: captcha.data,
        captchaText: captcha.text
    })
});

app.post('/api/verify-captcha', (req, res) => {
    const captcha = req.body.captcha;
    const captchaText = req.body.captchaText;

    if (captcha === captchaText) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/login', async (req, res) => {
    const tabla = req.query.tabla;
    const filtro = `correo = "${req.query.correo}"`;
    try {
        items = await controlador.consulta(tabla, filtro);
        const contraseña = req.query.contraseña;
        const contraseñaAlmacenada = items[0].contraseña;
        const comparacion = await bcrypt.compare(contraseña, contraseñaAlmacenada);
        resolve = {
            comparacion: comparacion,
            message: 'Item consultado con exito',
            idUsuario: comparacion ? items[0].idUsuario : "credenciales incorrectas",
        }
    } catch (e) {
        resolve = e;
    }
    res.send(resolve);
})

app.get('/api/consultaDonante', async (req, res) => {
    const tabla = req.query.tabla;
    const filtro = `idUsuario = "${req.query.idUsuario}"`;
    try {
        items = await controlador.consulta(tabla, filtro);
        resolve = {
            message: 'Item consultado con exito',
            items: items[0],
        }
    } catch (e) {
        resolve = e;
    }
    res.send(resolve);
})

app.get('/api/obtenerProductos', async (req, res) => {
    let tabla1, tabla2, filtro;
    tabla1 = req.query.tabla1;
    tabla2 = req.query.tabla2;
    filtro = `${tabla2}.estadoDonacion = "Pendiente" ORDER BY ${tabla1}.fecha ASC;`;

    try {
        items = await controlador.consulta_join(tabla1, tabla2, filtro, 1);
        resolve = {
            message: 'Productos obtenidos exitosamente',
            productos: items
        }
    } catch (e) {
        resolve = e;
    }

    res.send(resolve);
});

app.get('/api/join', async (req, res) => {
    let tabla1, tabla2, filtro;
    tabla1 = req.query.tabla1;
    tabla2 = req.query.tabla2;
    filtro = `${tabla1}.idUsuario = "${req.query.idUsuario}"`;

    try {
        items = await controlador.consulta_join(tabla1, tabla2, filtro, 0);
        tabla1 = req.query.tabla3;
        tabla2 = req.query.tabla4;
        filtro = `${tabla1}.idDonante = ${items[0]['idDonante']}`;
        resolve = {
            titulo: `Registro ${tabla2}`,
            datos_user: items,
            productos: await controlador.consulta_join(tabla1, tabla2, filtro, 1),
        }
    } catch (e) {
        resolve = e;
    }

    try {
        pdf = await axios.post('http://127.0.0.1:3030/crear_pdf', resolve);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/registrar', async (req, res) => {
    const tabla = req.body.tabla;
    const datos = Object.entries(req.body);
    const datosMenosCabecera = datos.slice(1);
    const body = Object.fromEntries(datosMenosCabecera);

    if ('contraseña' in body) {
        body.contraseña = await bcrypt.hash(body.contraseña, 8);
    }

    let response
    try {
        const items = await controlador.agregar(tabla, body)
        response = {
            success: true,
            message: `Item guardado con éxito ${tabla}`,
            data: items
        };
        res.json(response);
    } catch (e) {
        response = {
            success: false,
            error: e.message
        };
        res.status(500).json(response);
    }
})

app.post('/api/recuperar-contrasenia', async (req, res) => {
    const tabla = req.body.tabla;
    const correo = req.body.correo;
    const filtro = `correo = "${correo}"`;

    let response
    try {
        items = await controlador.consulta(tabla, filtro);
        if (items.length > 0) {
            const idUsuario = items[0].idUsuario;
            const contraseña = "pepito1A";
            const contraseña_encritado = await bcrypt.hash(contraseña, 8);
            const data = {
                contraseña: contraseña_encritado
            }
            items = await controlador.acutalizar(tabla, data, idUsuario)

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'nutriredverificado@gmail.com',
                    pass: 'mziz fdol iawn wtte'
                }
            });

            let mailOptions = {
                from: 'nutriredverificado@gmail.com',
                to: `${correo}`,
                subject: 'Recuperación de contraseña',
                text: `Este es un correo enviado por NutrRed.\nNo es necesario que responda al correo.\nSu nueva contraseña es: ${contraseña}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log('Error al enviar el correo:', error);
                }
                console.log('Correo electrónico enviado:', info.response);
            });

            response = {
                success: true,
                message: `Item actualizado con éxito ${tabla}`,
                data: items
            };
        } else {
            response = {
                success: false,
                message: 'No existe el correo electrónico'
            }
        }
        res.json(response);
    } catch (e) {
        response = {
            success: false,
            error: e.message
        };
        res.status(500).json(response);
    }
})

app.get('/api/consulta', async (req, res) => {
    const tabla1 = req.query.tabla1;
    const filtro = `${req.query.pregunta}='${req.query.estadoDonacion}'`
    try {
        items = await controlador.consulta(tabla1, filtro);
        resolve = {
            message: `${tabla1} obtenidos exitosamente`,
            productos: items
        }
    } catch (e) {
        resolve = e;
    }

    res.send(resolve);
});

app.get('/api/obtener-prod-dir', async (req, res) => {
    const filtro = req.query.idDonacion;
    try {
        items = await controlador.join(filtro);
        resolve = {
            message: 'Productos obtenidos exitosamente',
            productos: items
        }
    } catch (e) {
        resolve = e;
    }

    res.send(resolve);
});

app.get('/api/join_users_rol', async (req, res) => {
    const tabla = req.query.tabla;
    const id_tipo = req.query.id_tipo;
    const filtro = req.query.filtro;
    try {
        items = await controlador.join_users_rol(tabla, id_tipo, filtro);
        resolve = {
            message: 'Usuarios obtenidos exitosamente',
            users: items
        }
    } catch (e) {
        resolve = e;
    }

    res.send(resolve);
})

app.get('/api/todos', async (req, res) => {
    const tabla = req.query.tabla;
    try {
        items = await controlador.todos(tabla);
        resolve = {
            message: `${tabla} obtenidos exitosamente`,
            [tabla]: items
        }
    } catch (e) {
        resolve = e;
    }

    res.send(resolve);
})

/*
app.post('/generate-qr', async (req, res) => {
    const formData = req.body;

    try {
        const formDataString = JSON.stringify(formData);
        const qrCodeDataUrl = await QRCode.toDataURL(formDataString);

        res.json({ qrCodeDataUrl });
    } catch (err) {
        console.error('Error al generar el código QR:', err);
        res.status(500).json({ error: 'Error al generar el código QR' });
    }
});
*/

app.post('/generate-qr', async (req, res) => {
    const formData = req.body;
    console.log(formData);
    try {
        const queryString = querystring.stringify(formData);
        const scanUrl = `http://localhost:3000/scan-qr-code?${queryString}`;
        const qrCodeDataUrl = await QRCode.toDataURL(scanUrl);
        res.json({ qrCodeDataUrl });
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        res.status(500).json({ error: 'Error al generar el código QR' });
    }
});

app.get('/scan-qr-code', async (req, res) => {
    let response;
    const tabla = req.query.tabla;
    const body = {
        idInventario: req.query.idInventario,
        idDonacion: req.query.idDonacion,
        ubicacion: req.query.ubicacion,
        stock: req.query.stock,
        fechaIngreso: req.query.fechaIngreso,
        estado: req.query.estado,
        responsable: req.query.responsable,
        capacidadTotal: req.query.capacidadTotal,
    };

    try {
        const items = await controlador.agregar(tabla, body);
        response = {
            success: true,
            message: `Item guardado con éxito ${tabla}`,
            data: items
        };

        const tabla1 = "Donacion"
        const pregunta = "idDonacion"
        const respuesta = req.query.idDonacion
        const data = {
            estadoDonacion: `Aceptado`
        }
        const d = await controlador.acutalizarParmetrizado(tabla1, pregunta, data, respuesta)
        
        res.json(response);
        console.log("Cambio de estado correctamente", d);
        console.log("Se escaneo el codigo exitosamente");
    } catch (e) {
        response = {
            success: false,
            error: e.message
        };
        res.status(500).json(response);
    }
});

module.exports = app;