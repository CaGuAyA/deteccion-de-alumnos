import React, { useEffect, useState } from "react";
import "./styles/asigVolunReco.css";

export const AsigVolunReco = ({ idDonacion, handleFormAsignar }) => {
    const [productos, setProductos] = useState([]);
    const [users, setUsers] = useState([]);
    const [volunterAssigned, setVolunterAssigned] = useState([]);

    const obtenerVoluntarios = async () => {
        try {
            const queryString = "tabla=Voluntario&id_tipo=idUsuario&filtro";
            const response = await fetch(
                `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/join_users_rol?${queryString}`,
                {
                    method: "GET",
                },
            );
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            setUsers(data.users);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        obtenerVoluntarios();
    }, []);

    const obtenerProductos = async () => {
        try {
            const queryString = `idDonacion=${idDonacion}`;
            const response = await fetch(
                `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/obtener-prod-dir?${queryString}`,
                {
                    method: "GET",
                },
            );
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            setProductos(data.productos);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const addVolunter = (user) => {
        setVolunterAssigned((prevVolunters) => [...prevVolunters, user]);
    };

    const obtenerIdInventario = async () => {
        try {
            const queryString = `tabla=Inventario`;
            const response = await fetch(
                `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/todos?${queryString}`,
                {
                    method: "GET",
                },
            );
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            return data;
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            return null;
        }
    };

    const colletDonation = async (event) => {
        event.preventDefault();

        try {
            const inventario = await obtenerIdInventario();
            const nroProductos = inventario.Inventario.length;
            console.log(inventario, nroProductos);
            const idInventario =
                nroProductos !== 0 ? String(nroProductos + 1) + "inv" : "1inv";

            const formData = {
                tabla: "Inventario",
                idInventario: idInventario,
                idDonacion: event.target.idDonacion.value,
                ubicacion: event.target.direccion.value,
                stock: parseInt(event.target.cantidad.value),
                fechaIngreso: event.target.fecha.value,
                estado: "Aceptado",
                responsable: event.target.responsable.value,
                capacidadTotal: 100,
            };

            console.log(formData);

            const response = await fetch(
                "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/generate-qr",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            );

            if (response.ok) {
                const data = await response.json();
                const qrCodeDataUrl = data.qrCodeDataUrl;

                const newWindow = window.open("", "_blank");
                newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>QR Code</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            margin: 0;
                            padding: 20px;
                        }
                    
                        .container {
                            max-width: 400px;
                            margin: 0 auto;
                            background-color: #fff;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                    
                        h1 {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                    
                        .qr-code {
                            display: block;
                            margin: 0 auto;
                            border: 4px solid #333;
                            border-radius: 8px;
                        }
                    
                        .download-link {
                            display: block;
                            text-align: center;
                            margin-top: 20px;
                        }
                    
                        .download-link a {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 4px;
                        }
                    
                        .download-link a:hover {
                            background-color: #0056b3;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <h1>QR Code</h1>
                        <img class="qr-code" src="${qrCodeDataUrl}" alt="Código QR">
                        <div class="download-link">
                            <a href="${qrCodeDataUrl}" download="qrcode.png">Descargar QR</a>
                        </div>
                    </div>
                    </body>
                    </html>
                `);
            } else {
                const errorMessage = await response.text();
                console.error("Error al generar el código QR:", errorMessage);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div className="coontenedor_form_reco">
            <button className="btn_cerrar" onClick={handleFormAsignar}>
                <img src="/src/icons/close.png" />
            </button>
            <h2>Datos del producto para su recogida</h2>
            <form id="form-reco" onSubmit={colletDonation}>
                {productos.length > 0 && (
                    <div className="contenedor_form_datos_reco">
                        <div>
                            <label>Id. Donación:</label>
                            <input
                                name="idDonacion"
                                defaultValue={productos[0].idDonacion}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Descripción:</label>
                            <input
                                name="descripcion"
                                defaultValue={productos[0].descripcion}
                                disabled
                            ></input>
                        </div>
                        <div>
                            <label>Cantidad:</label>
                            <input
                                name="cantidad"
                                defaultValue={productos[0].cantidad}
                                disabled
                            ></input>
                        </div>
                        <div>
                            <label>Categoria:</label>
                            <input
                                name="categoria"
                                defaultValue={productos[0].categoria}
                                disabled
                            ></input>
                        </div>
                        <div>
                            <label>Estado Donación:</label>
                            <input
                                name="estadoDonacion"
                                defaultValue={productos[0].estadoDonacion}
                                className="text_negate"
                            ></input>
                        </div>
                        <div>
                            <label>Fecha de recogida:</label>
                            <input
                                name="fecha"
                                defaultValue={productos[0].fecha.slice(0, 10)}
                                disabled
                            ></input>
                        </div>
                        <div>
                            <label>Dirección de recogida:</label>
                            <input
                                name="direccion"
                                defaultValue={productos[0].direccion}
                                disabled
                            ></input>
                        </div>
                        <div>
                            <label>Voluntarios asignados</label>
                            {volunterAssigned.length !== 0 &&
                                volunterAssigned.map((volunter) => (
                                    <div key={volunter.id}>
                                        <input
                                            name="responsable"
                                            type="text"
                                            defaultValue={
                                                "C.I.:" +
                                                volunter.ciNit +
                                                "; " +
                                                "Nombre: " +
                                                volunter.nombre +
                                                " " +
                                                volunter.apellidoPaterno +
                                                " " +
                                                volunter.apellidoMaterno
                                            }
                                            disabled
                                        />
                                    </div>
                                ))}
                        </div>
                        <div>
                            <br></br>
                            <label>Voluntarios Disponibles</label>
                            <table>
                                <thead className="table_head_asig">
                                    <tr>
                                        <td>Ci / Nit</td>
                                        <td>Nombre</td>
                                        <td>Ap. Paterno</td>
                                        <td>Ap. Materno</td>
                                        <td>Habilidades</td>
                                        <td>Horario disponible</td>
                                        <td>Asignar</td>
                                    </tr>
                                </thead>
                                <tbody className="table_body_volunter_asig">
                                    {Array.isArray(users) &&
                                        users.map((user) => (
                                            <tr key={user.idUsuario}>
                                                <td>{user.ciNit}</td>
                                                <td>{user.nombre}</td>
                                                <td>{user.apellidoPaterno}</td>
                                                <td>{user.apellidoMaterno}</td>
                                                <td>{user.habilidades}</td>
                                                <td>
                                                    {user.disponibilidadHoraria}
                                                </td>
                                                <td className="tabla_boton">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addVolunter(user)
                                                        }
                                                    >
                                                        Asignar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <button className="btn_recoger" type="submit">
                    Recoger Producto
                </button>
            </form>
        </div>
    );
};
