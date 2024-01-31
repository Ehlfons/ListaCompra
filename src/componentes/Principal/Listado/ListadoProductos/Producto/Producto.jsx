import { Fragment, useState } from "react";
import "./Producto.css";
import DeleteModal from "../../../../../modales/DeleteModal.jsx";
import DeleteProductoModal from "../../../../../modales/DeleteProductoModal.jsx";
import ListasModal from "../../../../../modales/ListasModal.jsx";
import useListas from "../../../../../hooks/useListas.jsx";

// Estructura de cada Producto.
const Producto = (props) => {
  const { id, nombre, peso, precio, imagen, descripcion } = props.datos; // Datos del producto.
  const { idListaActual } = useListas(); // Importado desde el contexto a través del hook useProductos.

  // Valor inicial del modal de confirmación.
  const valorInicialModal = false;

  // Nuevo estado para controlar el modal de confirmación.
  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);
  const [mostrarModalListas, setMostrarModalListas] = useState(valorInicialModal);

  // Función para abrir el modal de confirmación.
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para abrir el modal de confirmación de listas.
  const abrirModalListas = () => {
    setMostrarModalListas(true);
  };

  // Función para cerrar el modal de confirmación.
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  // Función para cerrar el modal de confirmación de listas.
  const cerrarModalListas = () => {
    setMostrarModalListas(false);
  };

  return (
    <Fragment>
      <article className="producto" id={id}>
        <img src={imagen ? imagen : "https://www.drmarket.com.mx/Archivos/Anuncios/sinImagenDefault.jpg"} alt={nombre} />
        <p>
          <strong>{nombre}</strong> - Peso: {peso}kg - Precio: {precio}€ - {" "}
          {descripcion ? descripcion : "Sin descripción"} {props.onLista && `- Cantidad: ${props.cantidad}`}{" "}
          {/* Si el producto está en la lista, se muestra la cantidad. */}
        </p>
        {props.onLista ? null : (
          <img
            src="src/assets/addtocart.png"
            alt="cart"
            className="cart"
            onClick={abrirModalListas} // Al hacer clic en la papelera, se abre el modal.
          />
        )}
        <img
          src="src/assets/trash.svg"
          alt="trash"
          className="trash"
          onClick={abrirModal} // Al hacer clic en la papelera, se abre el modal.
        />
      </article>

      <ListasModal
        mostrarListas={mostrarModalListas} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
        manejarCerradoListas={cerrarModalListas} // Se le pasa la función para cerrar el modal.
        idProducto={id} // Se le pasa el ID del producto que se va a añadir a la lista.
        idListaActual={idListaActual} // Se le pasa el ID de la lista actual para poder añadir el producto solamente a esa lista.
      />
      {/* Modal de confirmación para eliminar el producto. */}
      {props.onLista ? ( // props.onLista es un booleano que indica si el producto está en la lista o no, para cambiar el modal de borrado.
        <DeleteProductoModal
          mostrar={mostrarModal} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
          manejarCerrado={cerrarModal} // Se le pasa la función para cerrar el modal.
          idProducto={id} // Se le pasa el ID del producto.
          idListaActual={idListaActual} // Se le pasa el ID de la lista actual para poder eliminar el producto solamente de esa lista.
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
