import {Fragment} from 'react'
import Productos from './Productos/Productos.jsx';
import Acciones from './Acciones/Acciones.jsx';
import './Listado.css'

const Listado = () => {
  return (
    <Fragment>
      <section id='listado-productos'>
        <div id='row'>
          <h2 id='listado-productos-h2'>Listado de productos</h2>
          <Acciones/>
        </div>
        <Productos/>
      </section>
    </Fragment>
  )
}

export default Listado