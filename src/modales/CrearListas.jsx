import { Fragment } from "react";
import useListas from "../hooks/useListas.jsx";
import "./Modales.css";

const CrearListasModal = ({ mostrar, manejarCerrado }) => {
  const { lista, createLista, insertLista } = useListas();
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
                }}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancelar" onClick={manejarCerrado}>
                Cancelar
              </button>
              <button
                className="btn btn-confirmar"
                onClick={() => {
                  insertLista();
                  manejarCerrado();
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
