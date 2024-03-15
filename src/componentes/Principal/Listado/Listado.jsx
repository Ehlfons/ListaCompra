import {Fragment} from 'react'
<<<<<<< HEAD
import Productos from './Productos/Productos.jsx';
import Acciones from './Acciones/Acciones.jsx';
=======
import Acciones from './Acciones/Acciones.jsx';
import ListadoProductos from './ListadoProductos/ListadoProductos.jsx';
import Resumen from './Resumen/Resumen.jsx';
>>>>>>> origin/usuarios
import './Listado.css'

const Listado = () => {
  return (
    <Fragment>
<<<<<<< HEAD
      <section id='listado-productos'>
        <div id='row'>
          <h2 id='listado-productos-h2'>Listado de productos</h2>
          <Acciones/>
        </div>
        <Productos/>
=======
      <section id='contenedor-productos'>
        <div id='row'>
          <h2 id='contenedor-productos-h2'>Productos</h2>
          <Acciones/>
        </div>
        <ListadoProductos/>
        <Resumen/>
>>>>>>> origin/usuarios
      </section>
    </Fragment>
  )
}

export default Listado