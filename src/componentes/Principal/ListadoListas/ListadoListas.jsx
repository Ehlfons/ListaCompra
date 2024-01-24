import {Fragment} from 'react'
import ListarListas from './ListarListas/ListarListas.jsx'
import ResumenListas from './ResumenListas/ResumenListas.jsx'

const ListadoListas = () => {
  return (
    <Fragment>
      <section id='contenedor-listas'>
        <div id='row'>
          <h2 id='contenedor-listas-h2'>Listas</h2>
        </div>
        <ListarListas/>
        <ResumenListas/>
      </section>
    </Fragment>
  )
}

export default ListadoListas