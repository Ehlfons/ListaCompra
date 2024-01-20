import useProductos from "../hooks/useProductos";
import "./DeleteModal.css";

function DeleteModal({ mostrar, manejarCerrado, idProducto }) { 
  const { deleteProducto } = useProductos(); // Importado desde el contexto a través del hook useProductos.

  // Función para manejar el borrado del producto.
  const manejarBorrado = () => {
    // Llama a la función deleteProducto con el ID del producto.
    deleteProducto(idProducto);
    
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
              <p>¿Seguro qué quieres eliminar el producto?</p>
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

export default DeleteModal;