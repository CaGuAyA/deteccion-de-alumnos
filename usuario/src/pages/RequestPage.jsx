import { React, useState, useEffect } from "react";
import "./styles/requestPage.css";
import { MessageCorrect } from "../components/messages/MessageCorrect";

export const RequestPage = ({ idUsuario, handlePageChange }) => {
    const [success, setSuccess] = useState(false);
    const [productos, setProductos] = useState([]);

    const handlesSuccess = () => {
        setSuccess(false);
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const queryString = "tabla1=lleva_acabo&tabla2=Donacion";
            const response = await fetch(
                `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/obtenerProductos?${queryString}`,
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

    const submitRequest = (idDonacion) => {
        if (idUsuario != 0) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            const dataSubmit = {
                tabla: "Solicita",
                idAdministrador: "admin1",
                fecha: formattedDate,
                idBenificiario: "1b",
                idDonacion: idDonacion,
            };

            try {
                fetch(
                    "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
                    {
                        method: "POST",
                        body: JSON.stringify(dataSubmit),
                    },
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Respuesta del servidor:", data);
                        setSuccess(data.success);
                    });
            } catch (error) {
                console.error("Error al enviar datos", error);
            }
        } else {
            console.log("No inicio sesión");
        }
    };

    return (
        <div className="contenedor_inventario">
            <h3>Productos listos para solicitar</h3>
            <table>
                <thead>
                    <tr>
                        <td>Fecha de donación</td>
                        <td>Descripción</td>
                        <td>Categoria</td>
                        <td>Cantidad</td>
                        <td>Solicitar</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(productos) &&
                        productos.map((producto) => (
                            <tr key={producto.idDonacion}>
                                <td>{producto.fecha.substring(0, 10)}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.categoria}</td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            submitRequest(producto.idDonacion)
                                        }
                                    >
                                        Solicitar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {success && (
                <MessageCorrect
                    clase={"contenedor_acept"}
                    mensaje={"La solicitud del producto fue exitosa"}
                    handlePageChange={handlePageChange}
                    page={"Solicitar"}
                    handlesSuccess={handlesSuccess}
                />
            )}
        </div>
    );
};
