import React, { useState } from 'react'
import { FormDonate } from '../components/forms/FormDonate'
import './styles/donatePage.css'

export const DonatePage = ({ idUsuario }) => {
    const [numeroDonaciones, setNumeroDonaciones] = useState(0);

    const handleNumeroDonaciones = (e) => {
        setNumeroDonaciones(parseInt(e.target.value));
    };

    console.log(idUsuario)

    return (
        <div className='contenedor_form_donaciones'>
            <h2 className='titleFormDonacion'>Formulario de Donación</h2>
            <div className='cuerpoFormDonar'>
                <div className='cantidadDonaciones'>
                    <label>Cantidad de Donaciones: </label>
                    <input
                        type='number'
                        id='numeroDonaciones'
                        value={numeroDonaciones}
                        onChange={handleNumeroDonaciones}
                    />
                </div>
                <div className='cont_form_donate'>
                    {[...Array(numeroDonaciones)].map((_, index) => (
                        <FormDonate idUsuario={idUsuario} key={index} id={`input_${index}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}
