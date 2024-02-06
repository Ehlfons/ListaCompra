import { Fragment, useState } from "react";
import "./InicioSesion.css";
import Login from "./Login.jsx";
import useUsuarios from "../../../hooks/useUsuarios.jsx";

const InicioSesion = () => {
  const { sesionIniciada, cerrarSesion } = useUsuarios();

  const valorInicialModal = false;

  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);

  const mostrarLogin = () => {
    setMostrarModal(true);
  };

  const cerrarLogin = () => {
    setMostrarModal(false);
  };

  return (
    <Fragment>
      <div id="login">
        <a
          onClick={() => {
            sesionIniciada ? cerrarSesion() : mostrarLogin();
          }}
        >
          {sesionIniciada ? "Cerrar Sesión" : "Login / Register"}
        </a>
      </div>

      <Login mostrar={mostrarModal} manejarCerrado={cerrarLogin} />
    </Fragment>
  );
};

export default InicioSesion;
