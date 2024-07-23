import { React, useState } from 'react'
import { LoginPage } from '../pages/LoginPage'
import { MessageAlert } from './messages/MessageAlert'
import { DonatePage } from '../pages/DonatePage'
import { HomePage } from '../pages/HomePage'
import { RequestPage } from '../pages/RequestPage'

export const PageRender = ({ currentPage, idUsuario, handleIdUsuario, handlePageChange }) => {

  switch (currentPage) {
    case ('inicio'):
      return (
        <HomePage />
      )
    case ('Notificaciones'):
      return <div className='cuerpoPagina'>Notificaciones</div>
    case ('Solicitante'):
      return (
        <div className='cuerpoPagina'>
          {/*<SeguimientoYRastreo panel={currentPage}></SeguimientoYRastreo>*/}
        </div>
      )
    case ('Donante'):
      return (
        <div className='cuerpoPagina'>
          {/*<SeguimientoYRastreo panel={currentPage} idUsuario={idUsuario}></SeguimientoYRastreo>*/}
        </div>
      )
    case ('Normatividad'):
      return <div className='cuerpoPagina'>normatividad</div>
    case ('Solicitar'):
      return (
        <>
          {<RequestPage idUsuario={idUsuario} handlePageChange={handlePageChange} />}
          {idUsuario == "" && (
            <MessageAlert clase={"contenedor_alert"} mensaje={"Inicie sesión antes de realizar una solicitud"}></MessageAlert>
          )}
        </>
      )
    case ('Donar'):
      return (
        <>
          {<DonatePage idUsuario={idUsuario}></DonatePage>}
          {idUsuario == "" && (
            <MessageAlert clase={"contenedor_alert"} mensaje={"Inicie sesión antes de realizar una donación"}></MessageAlert>
          )}
        </>
      )
    case ('Ingresar'):
      return (
        <LoginPage
          handleIdUsuario={handleIdUsuario} idUsuario={idUsuario} handlePageChange={handlePageChange}
        />
      )
  }
}
