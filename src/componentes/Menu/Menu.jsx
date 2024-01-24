import React from 'react'
import { Link } from 'react-router-dom'
import SubNavListas from './SubNavListas'
import SubNavProductos from './SubNavProductos'
import useProductos from '../../hooks/useProductos'
import './Menu.css'

const Menu = () => {
  const {toggleMenuProductos, toggleMenuListas, menuListasVisible, menuProductosVisible} = useProductos()
  return (
    <div id='menu'>
      <nav>
      <ul>
        <li onClick={() => {
          menuListasVisible && toggleMenuListas() // Si el menú de listas está visible, lo oculta.
          menuProductosVisible && toggleMenuProductos() // Si el menú de productos está visible, lo oculta.
        }}>
          <Link to="/">Inicio</Link>
        </li>
        <li onClick={() => {
          menuListasVisible && toggleMenuListas() // Si el menú de listas está visible, lo oculta.
          !menuProductosVisible && toggleMenuProductos() // Si el menú de productos no está visible, lo muestra.
        }}>
          <Link to="/ListaCompra">Productos</Link>
        </li>
        <li onClick={() => {
          menuProductosVisible && toggleMenuProductos() // Si el menú de productos está visible, lo oculta.
          !menuListasVisible && toggleMenuListas() // Si el menú de listas no está visible, lo muestra.
        }}>
          <Link to="/Listas">Listas</Link>
        </li>
      </ul>
    </nav>
    <SubNavProductos/>
    <SubNavListas />
    </div>
  )
}

export default Menu
