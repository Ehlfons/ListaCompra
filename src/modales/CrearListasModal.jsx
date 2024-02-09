import { Fragment } from "react";
import useListas from "../hooks/useListas.jsx";
import "./Modales.css";

const CrearListasModal = ({ mostrar, manejarCerrado }) => {
  // Importar el estado y las funciones del contexto de listas.
  const { lista, createLista, insertLista, actualizarIdListaActual, erroresLista, actualizarErroresLista, validarFormulario } = useListas();
  
  // Función para manejar el clic en el botón de confirmar.
  const manejarClick = (e) => {
    const { esValido, errores } = validarFormulario(lista); // Validar el formulario.

    // Si el formulario es válido, se inserta la lista y se cierra el modal.
    if (esValido) {
      insertLista();
      manejarCerrado();
      actualizarIdListaActual("");
    } else {
      actualizarErroresLista(errores); // Actualizar el estado de los errores.
    }
  };

  return (
    <Fragment>
      {mostrar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Crear Lista</h2>
              <span className="cerrar-modal" onClick={manejarCerrado}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de la lista"
                id="input-nombre-lista"
                value={lista.lista_nombre || ""}
                onChange={(e) => {
                  createLista(e.target.value);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresLista((prevErrores) => ({
                    ...prevErrores,
                    lista_nombre: null,
                  }));
                }}
              />
              {erroresLista.lista_nombre ? <small>{erroresLista.lista_nombre}</small> : null}
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancelar" onClick={manejarCerrado}>
                Cancelar
              </button>
              <button
                className="btn btn-confirmar"
                onClick={(e) => {
                  manejarClick(e);
                }}
              >
                Crear lista
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CrearListasModal;
