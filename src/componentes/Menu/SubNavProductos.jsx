import {Fragment, useState} from 'react'
import { Link } from 'react-router-dom';
import useProductos from '../../hooks/useProductos';
import CrearProductoModal from '../../modales/CrearProductoModal.jsx';

const SubNavProductos = () => {
  const {menuProductosVisible} = useProductos()

  const [crearProductosVisible, setCrearProductosVisible] = useState(false);

  const mostrarCrearProductos = () => {
    setCrearProductosVisible(true);
  };

  const cerrarCrearProductos = () => {
    setCrearProductosVisible(false);
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