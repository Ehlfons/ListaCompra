import useListas from "../hooks/useListas";
import "./Modales.css";

function DeleteListaModal({ mostrar, manejarCerrado, lista_id }) {
  const { deleteLista, productosLista } = useListas(); // Importado desde el contexto a través del hook useListas.

  // Función para manejar el borrado de la lista.
  const manejarBorrado = () => {
    // Llama a la función deleteLista con el ID de la lista.
    deleteLista(lista_id);

    // Cierra el modal después de eliminar la lista.
    manejarCerrado();
  };

  return (
    <>
      {mostrar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Eliminar</h2>
              <span className="cerrar-modal" onClick={manejarCerrado}>
                {" "}
                {/* Al hacer clic en la X, se cierra el modal. */}
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>¿Seguro qué quieres eliminar la lista?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancelar" onClick={manejarCerrado}>
                {/* Al hacer clic en el botón cancelar, se cierra el modal. */}
                Cancelar
              </button>
              <button
                className="btn btn-confirmar"
                onClick={(e) => {
                  manejarBorrado(e);
                  productosLista.length = 0; { /* Al eliminar la lista, se vacía el array de productos para que no se sigan mostrando. */}
                }}
              >
                {" "}
                {/* Al hacer clic en el botón confirmar, se ejecuta la función manejarBorrado y se elimina el producto. */}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteListaModal;
