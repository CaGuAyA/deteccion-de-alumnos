import React from 'react'
import './styles/navBar.css'

export const NavBar = ({ setPage }) => {
    return (
        <nav>
            <div className='home'>
                <img src='/src//icons/home.png' />
                <h2>Panel de Administración</h2>
            </div>
            <hr></hr>
            <div>
                <h3>Usuarios</h3>
            </div>
            <li>
                <a href="#" onClick={() => setPage("Voluntario")}>
                    <img src="/src/icons/volunter.png" alt="" />
                    Voluntarios
                </a>
                <a href="#" onClick={() => setPage("Donantes")}>
                    <img src="/src/icons/donantes.png" alt="" />
                    Donantes
                </a>
                <a href="#" onClick={() => setPage("Solicitantes")}>
                    <img src="/src/icons/solicitantes.png" alt="" />
                    Solicitantes
                </a>
            </li>

            <hr></hr>
            <h3>Elementos</h3>
            <li>
                <a href="#" onClick={() => setPage("Inventario")}>
                    <img src="/src/icons/inventori.png" alt="" />
                    Inventario
                </a>
                <a href="#" onClick={() => setPage("Donaciones")}>
                    <img src="/src/icons/donate.png" alt="" />
                    Donaciones
                </a>
                <a href="#" onClick={() => setPage("Solicitudes")}>
                    <img src="/src/icons/aplication.png" alt="" />
                    Solicitudes
                </a>
            </li>
        </nav>
    )
}
