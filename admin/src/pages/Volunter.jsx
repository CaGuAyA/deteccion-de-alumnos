import { React, useState, useEffect } from "react";
import { AsigVolunReco } from "/src/components/forms/AsigVolunReco";
import "./styles/donacion.css";
import "./styles/volunter.css";

export const Volunter = () => {
  const [formAsignar, setFormAsignar] = useState(false);
  const [users, setusers] = useState([]);
  const [idUser, setIdUser] = useState("");

  const handleFormAsignar = () => {
    setFormAsignar(!formAsignar);
  };

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
      setusers(data.users);
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
        <h2>Voluntarios</h2>
        <table>
          <thead>
            <tr>
              <td>Id Usuario</td>
              <td>Id Voluntario</td>
              <td>Ci / Nit</td>
              <td>Nombre</td>
              <td>Ap. Paterno</td>
              <td>Ap. Materno</td>
              <td>Telefono</td>
              <td>Correo</td>
              <td>Habilidades</td>
              <td>Horario disponible</td>
              <td>Editar</td>
            </tr>
          </thead>
          <tbody className="table_body_volunter">
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.idUsuario}>
                  <td>{user.idUsuario}</td>
                  <td>{user.idVoluntario}</td>
                  <td>{user.ciNit}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellidoPaterno}</td>
                  <td>{user.apellidoMaterno}</td>
                  <td>{user.telefono}</td>
                  <td>{user.correo}</td>
                  <td>{user.habilidades}</td>
                  <td>{user.disponibilidadHoraria}</td>
                  <td className="tabla_boton">
                    <button onClick={() => submitRequest(user)}>Editar</button>
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
