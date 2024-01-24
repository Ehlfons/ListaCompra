import {Fragment} from 'react'
import { Link } from 'react-router-dom';
import useProductos from '../../hooks/useProductos';

const SubNavProductos = () => {
  const {menuProductosVisible} = useProductos()
  return (
    <Fragment>
      <div className={menuProductosVisible ? 'SubNav' : 'SubNav hide'}>
        <nav>
          <ul>
            <li>
              <Link to="/Creacion">Crear</Link>
            </li>
            <li>
              <Link to="/Edicion">Editar</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  )
}

export default SubNavProductos