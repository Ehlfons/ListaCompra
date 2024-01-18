import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <div id='menu'>
      <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/ListaCompra">Listado</Link>
        </li>
        <li>
          <Link to="/Creacion">Creación</Link>
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default Menu
