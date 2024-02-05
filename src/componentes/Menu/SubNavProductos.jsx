import {Fragment, useState} from 'react'
import { Link } from 'react-router-dom';
import useProductos from '../../hooks/useProductos';
import CrearProductoModal from '../../modales/CrearProductoModal.jsx';

const SubNavProductos = () => {
  const {menuProductosVisible, actualizarErroresFormulario} = useProductos()

  const [crearProductosVisible, setCrearProductosVisible] = useState(false);

  const mostrarCrearProductos = () => {
    setCrearProductosVisible(true);

    // Limpiar todos los errores al abrir el formulario.
    actualizarErroresFormulario({
      nombre: undefined,
      precio: undefined,
      peso: undefined,
    });
  };

  const cerrarCrearProductos = () => {
    setCrearProductosVisible(false);
    
    // Limpiar todos los errores al cerrar el formulario.
    actualizarErroresFormulario({
      nombre: undefined,
      precio: undefined,
      peso: undefined,
    });
  };

  return (
    <Fragment>
      <div className={menuProductosVisible ? 'SubNav' : 'SubNav hide'}>
        <nav>
          <ul>
            <li>
              <a onClick={mostrarCrearProductos}>Crear</a>
            </li>
            <li>
              <Link to="/Edicion">Editar</Link>
            </li>
          </ul>
        </nav>
      </div>

      <CrearProductoModal mostrar={crearProductosVisible} manejarCerrado={cerrarCrearProductos} />
    </Fragment>
  )
}

export default SubNavProductos