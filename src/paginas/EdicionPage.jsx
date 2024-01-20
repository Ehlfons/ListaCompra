import { Fragment } from "react";
import Listado from "../componentes/Principal/Listado/Listado.jsx";
import FormularioProductos from "../componentes/Principal/Formulario/FormularioProductos.jsx";
import useProductos from "../hooks/useProductos.jsx";

// Página de edición de productos.
// Contiene el listado de productos y el formulario de edición.
const EdicionPage = () => {
  const { getProducto } = useProductos();
  return (
    <Fragment>
      <h2 id="principal-h2">Edición de Productos <em>(Haz clic sobre un producto para modificar su información)</em></h2>
      <div className="info">
        {/* Evento onClick al div que contiene el Listado, para que solamente en la página de edición el Listado de productos tenga esta funcionalidad. */}
        <div
          onClick={(e) => {
            if (e.target.classList.contains("producto"))
              getProducto(e.target.id);
          }}
        >
          <Listado />
        </div>
        <FormularioProductos crear={false} />{" "}
        {/* Paramétro para cambiar la funcionalidad del formulario */}
      </div>
    </Fragment>
  );
};

export default EdicionPage;
