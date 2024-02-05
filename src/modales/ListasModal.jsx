import useListas from "../hooks/useListas";
import "./Modales.css";
import "./ListasModal.css";

function ListasModal({ mostrarListas, manejarCerradoListas, idProducto }) {
  const { listadoListas, insertProductoLista, actualizarIdListaActual, cantidad, actualizarCantidad } =
    useListas(); // Importado desde el contexto a través del hook useProductos.

  return (
    <>
      {mostrarListas && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Listas</h2>
              <span className="cerrar-modal" onClick={manejarCerradoListas}>
                {" "}
                {/* Al hacer clic en la X, se cierra el modal. */}
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>Selecciona la lista a la que quieras añadir el producto.</p>
            </div>
            <div className="modal-footer" id="modal-footer-listas">
              {/* <button
                className="btn btn-cancelar"
                onClick={manejarCerradoListas}
              >
                Cancelar
              </button> */}
              <label htmlFor="cantidad">Cantidad: </label>
              <input
                type="number"
                name="cantidad"
                min={1}
                value={cantidad || ""}
                onChange={(e) => {
                  actualizarCantidad(e.target.value);
                }}
              />
              <div className="listas-modal">
                {listadoListas.map((lista, i) => (
                  <button
                    className="btn btn-confirmar"
                    id={lista.lista_id}
                    key={i}
                    onClick={(e) => {
                      insertProductoLista(idProducto, e.target.id);
                      actualizarIdListaActual(e.target.id); // Se actualiza el ID de la lista actual para cambiar la referencia.
                      manejarCerradoListas();
                    }}
                  >
                    {lista.lista_nombre}
                  </button>
                ))}{" "}
                {/* Se muestran los botones de las listas. */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListasModal;
