import { React, useState } from "react";
import "./styles/formDonate.css";
import { Map } from "../maps/Map";

export const FormDonate = ({ idUsuario }) => {
  const [idDonacion, setIdDonacion] = useState("d9");
  const [descripcion, setDescripcion] = useState("");
  const [valorMonetario, setValorMonetario] = useState(0);
  const [estado, setEstado] = useState("Pendiente");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("Legumbres");
  const [fecha, setFecha] = useState("YYYY-MM-DD");

  const [idDonante, setIdDonante] = useState(0);
  const [direccion, setDireccion] = useState("");
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  const obtenerIdDonante = async () => {
    const datos = {
      tabla: "Donante",
      idUsuario: idUsuario,
    };

    const queryString = Object.keys(datos)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(datos[key])}`,
      )
      .join("&");

    return fetch(
      `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/consultaDonante?${queryString}`,
      {
        method: "GET",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        setIdDonante(data.items.idDonante);
      })
      .catch((error) => {
        console.error("Error al enviar datos al servidor:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await obtenerIdDonante().then(() => {
      const formDataDonacion = {
        tabla: "Donacion",
        idDonacion: idDonacion,
        descripcion: descripcion,
        valorMonetario: valorMonetario,
        estadoDonacion: estado,
        cantidad: cantidad,
        categoria: categoria,
      };

      const dataLlevaACabo = {
        tabla: "lleva_acabo",
        idDonante: idDonante,
        fecha: fecha,
        direccion: direccion,
        idDonacion: idDonacion,
      };

      if (idDonante != 0) {
        fetch(
          "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
          {
            method: "POST",
            body: JSON.stringify(formDataDonacion),
          },
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Respuesta del servidor:", data);

            fetch(
              "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
              {
                method: "POST",
                body: JSON.stringify(dataLlevaACabo),
              },
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("Respuesta del servidor:", data);
              })
              .catch((error) => {
                console.error("Error al enviar datos al servidor:", error);
              });
          })
          .catch((error) => {
            console.error("Error al enviar datos al servidor:", error);
          });
      } else {
        console.log(idUsuario);
        console.error("No se inicio sesión");
      }
    });
  };

  return (
    <form className="formDonacion" onSubmit={handleSubmit}>
      <div className="formDonArriba">
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
        >
          <option value="Legumbres">Legumbres</option>
          <option value="Hortalizas">Hortalizas</option>
          <option value="Cereales">Cereales</option>
          <option value="Lacteos">Lácteos</option>
        </select>
        {/*
        <label>Valor monetario: </label>
        <input
          value={valorMonetario}
          onChange={event => setValorMonetario(+event.target.value)}
          required
        />
        */}
        <label>Cantidad:</label>
        <input
          value={cantidad}
          onChange={(event) => setCantidad(+event.target.value)}
          required
        />
        <label>Fecha para recogida: </label>
        <input
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          type="date"
          required
        />
      </div>
      <label>
        Descripción del producto a donar: (Que es y algunas caracteristicas
        especiales)
      </label>
      <input
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <label>Dirección para la recogida del producto: </label>
      <Map direccion={direccion} setDireccion={setDireccion}></Map>
      <label>Estado de donación:</label>
      <input className="estadoDonacion" type="text" disabled value={estado} />
      <p>
        Los datos de la fecha y dirección son datos para la recogida de la
        donación
      </p>
      <p>
        Alimentando corazones, cosechando sonrisas: ¡Conectando comida con
        quienes más la necesitan!
      </p>
      <button type="submit">Enviar Donación</button>
    </form>
  );
};
