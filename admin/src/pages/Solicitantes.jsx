import { React, useState, useEffect } from "react";

export const Solicitantes = () => {
    const [formAsignar, setFormAsignar] = useState(false);
    const [users, setusers] = useState([]);
    const [idUser, setIdUser] = useState("");

    const handleFormAsignar = () => {
        setFormAsignar(!formAsignar);
    };

    const obtenerVoluntarios = async () => {
        try {
            const response = await fetch(
                `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/obtener_beneficiarios`,
                {
                    method: "GET",
                },
            );
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            setusers(data.datos);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        obtenerVoluntarios();
    }, []);

    const submitRequest = (idDonacion) => {
        setIdUser(idDonacion);
        setFormAsignar(true);
    };

    return (
        <>
            <div className="contenedor_productos">
                <h2>Beneficiarios</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Id Usuario</td>
                            <td>Nombre</td>
                            <td>Ap. Paterno</td>
                            <td>Ap. Materno</td>
                            <td>Telefono</td>
                            <td>Correo</td>
                            <td>Editar</td>
                        </tr>
                    </thead>
                    <tbody className="table_body_volunter">
                        {console.log(users)}
                        {Array.isArray(users) &&
                            users.map((user) => (
                                <tr key={user.idUsuario}>
                                    <td>{user.idUsuario}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellidoPaterno}</td>
                                    <td>{user.apellidoMaterno}</td>
                                    <td>{user.telefono}</td>
                                    <td>{user.correo}</td>
                                    <td className="tabla_boton">
                                        <button
                                            onClick={() => submitRequest(user)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {formAsignar && (
                <AsigVolunReco
                    idDonacion={idDonacion}
                    handleFormAsignar={handleFormAsignar}
                ></AsigVolunReco>
            )}
        </>
    );
};
