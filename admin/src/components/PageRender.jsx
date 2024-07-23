import React from 'react'
import { Donante } from '../pages/Donante';
import { Inventario } from '../pages/Inventario';
import { Donacion } from '../pages/Donacion';
import { Volunter } from '../pages/Volunter';
import { Request } from '../pages/Request';
import { Solicitantes } from '../pages/Solicitantes';


export const PageRender = ({ page }) => {
  switch (page) {
    case "Donantes":
      return <Donante></Donante>
    case "Solicitantes":
      return <Solicitantes></Solicitantes>
    case "Voluntario":
      return <Volunter></Volunter>
    case "Inventario":
      return <Inventario></Inventario>
    case "Donaciones":
      return <Donacion></Donacion>
    case "Solicitudes":
      return <Request></Request>;
  }
}
