import { Fragment } from "react";
import FormularioProductos from "../componentes/Principal/Formulario/FormularioProductos.jsx";

const CrearListasModal = ({ mostrar, manejarCerrado }) => {
  return (
    <Fragment>
      {mostrar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Crear Producto</h2>
              <span className="cerrar-modal" onClick={manejarCerrado}>
                &times;
              </span>
            </div>
            <div className="modal-body" id="modal-body">
              <FormularioProductos crear={true} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CrearListasModal;
