import React, { useState } from 'react'
import './styles/app.css'
import { PageRender } from './components/PageRender'
import { NavBar } from './components/NavBar'

export const App = () => {
  const [page, setPage] = useState('Donantes');

  return (
    <div className='contenedor_dash'>
      <NavBar setPage={setPage}></NavBar>
      <PageRender page={page}></PageRender>
    </div>
  )
}
