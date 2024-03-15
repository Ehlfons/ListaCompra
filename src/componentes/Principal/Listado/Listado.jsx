import {Fragment} from 'react'
import Acciones from './Acciones/Acciones.jsx';
import ListadoProductos from './ListadoProductos/ListadoProductos.jsx';
import Resumen from './Resumen/Resumen.jsx';
import './Listado.css'

const Listado = () => {
  return (
    <Fragment>
      <section id='contenedor-productos'>
        <div id='row'>
          <h2 id='contenedor-productos-h2'>Productos</h2>
          <Acciones/>
        </div>
        <ListadoProductos/>
        <Resumen/>
      </section>
    </Fragment>
  )
}

export default Listado