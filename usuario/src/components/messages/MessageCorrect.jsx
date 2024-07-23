import React from 'react'
import './styles/messageCorrect.css'

export const MessageCorrect = ({ clase, mensaje, handlePageChange, page}) => {
  return (
    <div className={clase}>
      <img src='/src/components/messages/images/check.gif'></img>
      <p>{mensaje}</p>
      <button className='btnAceptar' onClick={() => {handlePageChange(page)}}>Aceptar</button>
    </div>
  )
}
