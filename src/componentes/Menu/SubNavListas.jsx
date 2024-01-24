import {Fragment} from 'react'
import { Link } from 'react-router-dom';
import useProductos from '../../hooks/useProductos';
import './Menu.css'

const SubNavListas = () => {
  const {menuListasVisible} = useProductos()  
  return (
    <Fragment>
      <div className={menuListasVisible ? 'SubNav' : 'SubNav hide'}>
        <nav>
          <ul>
            <li>
              <Link to="/CreacionListas">Crear</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  )
}

export default SubNavListas