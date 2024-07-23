import { React, useState } from 'react'
import { Menu } from './components/Menu'
import { PageRender } from './components/PageRender'
import { Map } from './components/maps/Map'

export const AppSisDon = () => {
    const [idUsuario, setIdUsuario] = useState('');
    const [currentPage, setCurrentPage] = useState('inicio');

    const handleIdUsuario = (idUsuario) => {
        setIdUsuario(idUsuario);
    }

    const handlePageChange = (event) => {
        if (typeof event == 'object') {
            setCurrentPage(event.target.value);
        } else if (typeof event == 'string') {
            setCurrentPage(event);
        }
    }

    return (
        <>
            <Menu currentPage={currentPage} handlePageChange={handlePageChange} idUsuario={idUsuario}></Menu>
            <PageRender currentPage={currentPage} idUsuario={idUsuario} handleIdUsuario={handleIdUsuario} handlePageChange={handlePageChange}></PageRender>
        </>
    )
}
