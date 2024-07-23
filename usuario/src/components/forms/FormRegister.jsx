import { React, useState } from 'react'
import { FormDinamic } from './FormDinamic'
import { MessageAlert } from '../messages/MessageAlert'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './styles/formRegister.css'

export const FormRegister = ({ handleFormSubmit, handleActiveForm }) => {
  // los datos
  const [nombre, setNombre] = useState('')
  const [apPaterno, setApPaterno] = useState('')
  const [apMaterno, setApMaterno] = useState('')
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [ciNit, setCiNit] = useState("")
  const [genero, setGenero] = useState("")

  const [ocupacion, setOcupacion] = useState("")
  const [disHorario, setDisHorario] = useState("")

  const [habilidades, setHabilidades] = useState("")

  const [necesidades, setNecesidades] = useState("")

  const [contraseña1, setContraseña1] = useState('')
  const [contraseña2, setContraseña2] = useState('')
  const [esDonador, setEsDonador] = useState(false)
  const [esBeneficiario, setEsBeneficiario] = useState(false)
  const [esVoluntario, setEsVoluntario] = useState(false)

  const [idDonante, setIdDonante] = useState(3)
  const [idVoluntario, setIdVoluntario] = useState("2v")
  const [idBeneficiario, setIdBeneficiario] = useState("3b")
  const [idUsuario, setUsuario] = useState("7u")


  // los mensajes
  const [contraseñaSeg, setContraseñaSeg] = useState(true)
  const [contraseñasDist, setContraseñasDist] = useState(false)

  // verificar que tipo de usuario es
  const handleEsDonador = () => {
    setEsDonador(!esDonador)
  }
  const handleEsBeneficiario = () => {
    setEsBeneficiario(!esBeneficiario)
  }
  const handleEsVoluntario = () => {
    setEsVoluntario(!esVoluntario)
  }

  // Validar contraseña
  const validarContraseña = (c1) => {
    let i, tamaño, swM, swm, swN, c
    tamaño = c1.length
    swM = false
    swm = false
    swN = false

    if (tamaño >= 8) {
      for (i = 0; i < tamaño; i++) {
        c = c1[i]
        if (/[A-Z]/.test(c))
          swM = true
        if (/[a-z]/.test(c))
          swm = true
        if (/[0-9]/.test(c))
          swN = true
      }
      if (swM && swm && swN) {
        setContraseñaSeg(true)
      } else {
        setContraseñaSeg(false)
      }
    } else {
      setContraseñaSeg(false)
    }
  }

  // Berificar que las contrseñas sean iguales
  const verificar = (c2) => {
    if (contraseña1 == c2) {
      setContraseñasDist(false)
    } else {
      setContraseñasDist(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fechaActual = new Date();
    const año = String(fechaActual.getFullYear());
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    const formDataUser = {
      tabla: 'Usuario',
      idUsuario: idUsuario,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      apellidoPaterno: apPaterno,
      apellidoMaterno: apMaterno,
      fechaRegistro: `${año}-${mes}-${dia}`,
      contraseña: contraseña1
    };

    let formDataDonador = {}

    if (esDonador) {
      formDataDonador = {
        tabla: "Donante",
        idDonante: idDonante,
        ocupacion: ocupacion,
        ciNit: ciNit,
        genero: genero,
        idUsuario: idUsuario
      }
    }

    let formDataBeneficiario = {}
    if (esBeneficiario) {
      formDataBeneficiario = {
        tabla: "Beneficiario",
        idBenificiario: idBeneficiario,
        ciNit: ciNit,
        necesidades: necesidades,
        cantidad: ""
      }
    }

    let formDataVoluntario = {}
    if (esVoluntario) {
      formDataVoluntario = {
        tabla: "Voluntario",
        idVoluntario: idVoluntario,
        ciNit: ciNit,
        habilidades: habilidades,
        disponibilidadHoraria: disHorario,
        idUsuario: idUsuario,
      }
    }

    handleFormSubmit(formDataUser, formDataDonador, formDataBeneficiario, formDataVoluntario);
  }

  const [showPwd1, setShowPwd1] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)

  return (
    <div className='contenedor_registro'>
      <h3>Bienvenido a NutriRed</h3>
      <p className='frase'>Formulario de registro</p>
      <form className='formulario_registro' onSubmit={handleSubmit}>
        <div className='form_nombre' id='form_nombre'>
          <input
            type="text"
            id="nombre"
            value={nombre}
            placeholder='Nombre'
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          {/*<label htmlFor='nombre'>Nombre</label>*/}
          <input
            type="text"
            id="ApPaterno"
            value={apPaterno}
            placeholder='Apellido Paterno'
            onChange={(e) => setApPaterno(e.target.value)}
          />
          {/*<label htmlFor='ApPaterno'>Apellido Paterno</label>*/}
          <input
            type="text"
            id="ApMaterno"
            value={apMaterno}
            placeholder='Apellido Materno'
            onChange={(e) => setApMaterno(e.target.value)}
          />
          {/*<label htmlFor='ApMaterno'>Apellido Materno</label>*/}
        </div>
        <div className='input-container'>
          {/*<label htmlFor='direccionReg'>Dirección</label>*/}
          <input
            type="text"
            id="direccionReg"
            value={direccion}
            placeholder='Dirección'
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className='input-container'>
          {/*<label htmlFor='telefono'>Teléfono</label>*/}
          <input
            type="tel"
            id="telefono"
            value={telefono}
            placeholder='Teléfono'
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className='input-container'>
          {/*<label htmlFor='email'>Correo</label>*/}
          <input
            type="email"
            id="email"
            autoComplete='email'
            value={correo}
            placeholder='Correo Electrónico'
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className='pwd' id='pwd'>
          <div className="input-container">
            <input
              type={showPwd1 ? 'text' : 'password'}
              id="c1"
              value={contraseña1}
              placeholder="Contraseña"
              className='contraseña'
              onChange={(e) => {
                setContraseña1(e.target.value);
                validarContraseña(e.target.value);
              }}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPwd1(!showPwd1)}
            >
              {showPwd1 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {!contraseñaSeg && (
            <MessageAlert clase={'contenedor_alert pwd_incorrect'} mensaje={'La contraseña no es segura'} />
          )}
          <div className="input-container">
            <input
              type={showPwd2 ? 'text' : 'password'}
              id="c2"
              className='contraseña'
              value={contraseña2}
              placeholder="Repita su Contraseña"
              onChange={(e) => {
                setContraseña2(e.target.value);
                verificar(e.target.value);
              }}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPwd2(!showPwd2)}
            >
              {showPwd2 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {contraseñasDist && (
            <MessageAlert clase={'contenedor_alert pwd_incorrect'} mensaje={'Las contraseñas no coinciden.'} />
          )}
        </div>

        <div className='tipo_usuario' id='type_user'>
          <input type="checkbox" id='donante' checked={esDonador} onChange={handleEsDonador} />Donante
          <input type="checkbox" id='benefiriario' checked={esBeneficiario} onChange={handleEsBeneficiario} />Beneficiario
          <input type="checkbox" id='voluntario' checked={esVoluntario} onChange={handleEsVoluntario} />Voluntario
        </div>
        {esDonador && (
          <FormDinamic
            className='form_dinamico'
            field={[
              { name: 'ciNit', label: 'CI/NIT', type: 'text', id: 'ciNit', value: ciNit, setFieldValue: setCiNit },
              { name: 'genero', label: 'Genero', type: 'text', id: 'genero', value: genero, setFieldValue: setGenero },
              { name: 'ocupacion', label: 'Ocupación', type: 'text', id: 'ocupacion', value: ocupacion, setFieldValue: setOcupacion }
            ]}
          />
        )}
        {esBeneficiario && (
          <FormDinamic
            className='form_dinamico'
            field={[
              { name: 'ciNit', label: 'CI/NIT', type: 'text', value: ciNit, setFieldValue: setCiNit },
              { name: 'Necesidades', label: 'Necesidades', type: 'text', value: necesidades, setFieldValue: setNecesidades }
            ]}
          />
        )}
        {esVoluntario && (
          <FormDinamic
            className='form_dinamico'
            field={[
              { name: 'disHorario', label: 'Disponibilidad de Horario', type: 'text', value: disHorario, setFieldValue: setDisHorario },
              { name: 'habilidades', label: 'habilidades', type: 'text', value: habilidades, setFieldValue: setHabilidades }
            ]}
          />
        )
        }
        <button type='submit'>Crear cuenta</button>
      </form>
      <a href="#" onClick={() => handleActiveForm('login')}>Ir a Ingresar</a>
    </div>
  )
}
