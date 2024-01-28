import { Fragment, useState } from "react";
import "./Producto.css";
import DeleteModal from "../../../../../modales/DeleteModal.jsx";
import DeleteProductoModal from "../../../../../modales/DeleteProductoModal.jsx";

// Estructura de cada Producto.
const Producto = (props) => {
  const { id, nombre, peso, precio, imagen, descripcion } = props.datos; // Datos del producto.

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
      <article className="producto" id={id}>
        <img src={imagen} alt={nombre} />
        <p>
          <strong>{nombre}</strong> - Peso: {peso}kg - Precio: {precio}€ -{" "}
          {descripcion} {props.onLista && `- Cantidad: ${props.cantidad}`}
        </p>
        <img
          src="src/assets/trash.svg"
          alt="trash"
          className="trash"
          onClick={abrirModal} // Al hacer clic en la papelera, se abre el modal.
        />
      </article>

      {/* Modal de confirmación para eliminar el producto. */}
      {props.onLista ? ( // props.onLista es un booleano que indica si el producto está en la lista o no, para cambiar el modal de borrado.
        <DeleteProductoModal
          mostrar={mostrarModal} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
          manejarCerrado={cerrarModal} // Se le pasa la función para cerrar el modal.
          idProducto={id} // Se le pasa el ID del producto.
          idListaActual={props.idListaActual} // Se le pasa el ID de la lista actual para poder eliminar el producto solamente de esa lista.
        />
      ) : (
        <DeleteModal
          mostrar={mostrarModal} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
          manejarCerrado={cerrarModal} // Se le pasa la función para cerrar el modal.
          idProducto={id} // Se le pasa el ID del producto.
        />
      )}
    </Fragment>
  );
};

export default Producto;
