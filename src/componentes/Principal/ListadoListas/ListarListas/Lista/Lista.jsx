import { Fragment, useState } from "react";
import DeleteModal from "../../../../../modales/DeleteModal.jsx";
import "./Lista.css";

// Estructura de cada Lista.
const Lista = (props) => {
  const { lista_id, lista_nombre, fecha_creacion } = props.datos; // Datos del producto.

  // Valor inicial del modal de confirmación.
  const valorInicialModal = false;
  
  // Nuevo estado para controlar el modal de confirmación.
  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);

  // Función para abrir el modal de confirmación.
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para cerrar el modal de confirmación.
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <Fragment>
      <article className="lista" id={lista_id}>
        <p>
          <strong>{lista_nombre}</strong> - Creada el: {fecha_creacion}
        </p>
        <img
          src="src/assets/trash.svg"
          alt="trash"
          className="trash"
          onClick={abrirModal} // Al hacer clic en la papelera, se abre el modal.
        />
      </article>

      {/* Modal de confirmación para eliminar el producto. */}
      <DeleteModal
        mostrar={mostrarModal} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
        manejarCerrado={cerrarModal} // Se le pasa la función para cerrar el modal.
        idProducto={lista_id} // Se le pasa el ID del producto.
      />
    </Fragment>
  );
};

export default Lista;
