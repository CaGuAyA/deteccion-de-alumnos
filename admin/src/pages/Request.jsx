import { React, useState, useEffect } from "react";
import "./styles/request.css";

export const Request = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  const obtenerSolicitudes = async () => {
    try {
      const queryString = "tabla=Solicita";
      const response = await fetch(
        `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/todos?${queryString}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      setSolicitudes(data.Solicita);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const obtenerDatos = async (tabla, pregunta, idDonacion) => {
    try {
      const queryString = `tabla1=${tabla}&pregunta=${pregunta}&estadoDonacion=${idDonacion}`;
      const response = await fetch(
        `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/consulta?${queryString}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      return data.productos[0];
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  };

  const submitRequest = async (idSolicita, idDonacion, idBeneficiario) => {
    const producto = await obtenerDatos("Donacion", "idDonacion", idDonacion);
    const user = await obtenerDatos(
      "Beneficiario",
      "idBenificiario",
      idBeneficiario,
    );
    const solicitud = await obtenerDatos("Solicita", "idSolicita", idSolicita);

    try {
      const response = await fetch(
        `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/aceptar_solicitud`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tabla: "Usuario",
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            cantidad: producto.cantidad,
            fecha: solicitud.fecha.slice(0, 10),
            hora: solicitud.hora,
            ciNit: user.ciNit,
            correo: "dannycaguaya99@gmail.com",
          }),
        },
      );
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  return (
    <div className="contenedor_productos">
      <h2>Productos Solicitados</h2>
      <table className="table_reques">
        <thead>
          <tr>
            <td>Id Solicitud</td>
            <td>Id Producto</td>
            <td>Id Beneficiario</td>
            <td colSpan={2}>Datos para la recogida</td>
            <td>Asignar Volunario</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solicitudes) &&
            solicitudes.map((solicitud) => (
              <tr key={solicitud.idSolicita}>
                <td>{solicitud.idSolicita}</td>
                <td>{solicitud.idDonacion}</td>
                <td>{solicitud.idBeneficiario}</td>
                <td>Fecha: {solicitud.fecha.slice(0, 10)}</td>
                <td>Hora: {solicitud.hora}</td>
                <td className="tabla_boton">
                  <button
                    onClick={() =>
                      submitRequest(
                        solicitud.idSolicita,
                        solicitud.idDonacion,
                        solicitud.idBeneficiario,
                      )
                    }
                  >
                    Entregar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
