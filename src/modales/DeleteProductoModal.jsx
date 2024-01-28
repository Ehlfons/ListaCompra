import useListas from "../hooks/useListas.jsx";
import "./Modales.css";

function DeleteProductoModal({ mostrar, manejarCerrado, idProducto, idListaActual }) { 
  const { deleteProductoLista } = useListas(); // Importado desde el contexto a través del hook useProductos.

  // Función para manejar el borrado del producto.
  const manejarBorrado = () => {
    // Llama a la función deleteProducto con el ID del producto y el ID de la lista.
    deleteProductoLista(idProducto, idListaActual);
    
    // Cierra el modal después de eliminar el producto.
    manejarCerrado();
  };

  return (
    <>
      {mostrar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Eliminar</h2>
              <span className="cerrar-modal" onClick={manejarCerrado}> {/* Al hacer clic en la X, se cierra el modal. */}
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>¿Quieres eliminar el producto de la lista?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancelar" onClick={manejarCerrado}> {/* Al hacer clic en el botón cancelar, se cierra el modal. */}
                Cancelar
              </button>
              <button className="btn btn-confirmar" onClick={manejarBorrado}> {/* Al hacer clic en el botón confirmar, se ejecuta la función manejarBorrado y se elimina el producto. */}
                Confirmar
              </button>
            </div>
          </div>
        </div>        
      )}
    </>
  );
}

export default DeleteProductoModal;
