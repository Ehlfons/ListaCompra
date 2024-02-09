import { Fragment, useState, useEffect } from "react";
import "./InicioSesion.css";
import Login from "./Login.jsx";
import useUsuarios from "../../../hooks/useUsuarios.jsx";

const InicioSesion = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { sesionIniciada, cerrarSesion, confirmacionInicioSesion } = useUsuarios();

  // Valor inicial del modal de inicio de sesión.
  const valorInicialModal = false;

  // Estado para mostrar u ocultar el modal de inicio de sesión.
  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);

  // Mostrar el modal de inicio de sesión.
  const mostrarLogin = () => {
    setMostrarModal(true);
  };

  // Cerrar el modal de inicio de sesión.
  const cerrarLogin = () => {
    setMostrarModal(false);
  };

  // Efecto para cerrar el modal de inicio de sesión.
  useEffect(() => {
    // Verifica si se ha confirmado el inicio de sesión y cierra el modal si es así.
    if (confirmacionInicioSesion) {
      cerrarLogin();
    }
  }, [confirmacionInicioSesion]); // Se ejecuta cada vez que confirmacionInicioSesion cambia, es decir, cuando se inicia sesión.

  return (
    <Fragment>
      {confirmacionInicioSesion && <div className="check">&#10003; Se ha iniciado sesión correctamente &#10003;</div>}
      <div id="login">
        <a
          onClick={() => {
            sesionIniciada ? cerrarSesion() : mostrarLogin(); // Si la sesión está iniciada, se cierra. Si no, se muestra el modal.
          }}
        >
          {sesionIniciada ? "Cerrar Sesión" : "Login / Register"} {/* Si la sesión está iniciada, se muestra "Cerrar Sesión". Si no, se muestra "Login / Register". */}
        </a>
      </div>

      <Login mostrar={mostrarModal} manejarCerrado={cerrarLogin} />
    </Fragment>
  );
};

export default InicioSesion;
