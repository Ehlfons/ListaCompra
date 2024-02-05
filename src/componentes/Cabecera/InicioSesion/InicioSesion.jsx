import { Fragment, useState } from 'react'
import './InicioSesion.css'
import Login from './Login.jsx'

const InicioSesion = () => {
  const valorInicialModal = false;

  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);

  const mostrarLogin = () => {
    setMostrarModal(true);
  }

  const cerrarLogin = () => {
    setMostrarModal(false);
  }

  return (
    <Fragment>
      <div id='login'>
        <a onClick={mostrarLogin}>Login / Register</a>
      </div>

      <Login mostrar={mostrarModal} manejarCerrado={cerrarLogin} />
    </Fragment>
  )
}

export default InicioSesion