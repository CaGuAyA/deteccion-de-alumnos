import { React, useState, useEffect } from "react";
import { AsigVolunReco } from "/src/components/forms/AsigVolunReco";
import "./styles/donacion.css";

export const Donacion = () => {
  const [formAsignar, setFormAsignar] = useState(false);
  const [productos, setProductos] = useState([]);
  const [idDonacion, setIdDonacion] = useState("");

  const handleFormAsignar = () => {
    setFormAsignar(!formAsignar);
  };

  const obtenerProductos = async () => {
    try {
      const queryString =
        "tabla1=Donacion&estadoDonacion=Pendiente&pregunta=estadoDonacion";
      const response = await fetch(
        `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/consulta?${queryString}`,
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

  const submitRequest = (idDonacion) => {
    setIdDonacion(idDonacion);
    setFormAsignar(true);
  };

  return (
    <>
      <div className="contenedor_productos">
        <h2>Productos Listos Para Ser Recogidos</h2>
        <table>
          <thead>
            <tr>
              <td>Id Donacion</td>
              <td>Descripción</td>
              <td>Cantidad</td>
              <td>Categoria</td>
              <td>Estado Donación</td>
              <td>Asignar Volunario</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productos) &&
              productos.map((producto) => (
                <tr key={producto.idDonacion}>
                  <td>{producto.idDonacion}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.categoria}</td>
                  <td className="text_negate">{producto.estadoDonacion}</td>
                  <td className="tabla_boton">
                    <button onClick={() => submitRequest(producto.idDonacion)}>
                      Recoger
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
