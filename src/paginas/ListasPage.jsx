import {Fragment} from 'react'
import ListarListas from '../componentes/Principal/ListadoListas/ListarListas/ListarListas.jsx'

const ListasPage = () => {
  return (
    <Fragment>
      <h2 id='principal-h2'>Listado de listas</h2>
      <ListarListas />
    </Fragment>
  )
}

export default ListasPage