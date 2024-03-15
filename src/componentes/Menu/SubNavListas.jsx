import { Fragment, useState } from "react";
import useProductos from "../../hooks/useProductos.jsx";
import CrearListasModal from "../../modales/CrearListasModal.jsx";
import "./Menu.css";

const SubNavListas = () => {
  // Importar el estado de menuListasVisible desde el contexto a través del hook useProductos.
  const { menuListasVisible } = useProductos();

  // Estado para mostrar u ocultar el modal de crear listas.
  const [crearListasVisible, setCrearListasVisible] = useState(false);

  // Mostrar el modal de crear listas.
  const mostrarCrearListas = () => {
    setCrearListasVisible(true);
  };

  // Cerrar el modal de crear listas.
  const cerrarCrearListas = () => {
    setCrearListasVisible(false);
  };

  return (
    <Fragment>
      <div className={menuListasVisible ? "SubNav" : "SubNav hide"}>
        <nav>
          <ul>
            <li>
              <a onClick={mostrarCrearListas}>Crear lista</a>
            </li>
          </ul>
        </nav>
      </div>

      <CrearListasModal mostrar={crearListasVisible} manejarCerrado={cerrarCrearListas} />
    </Fragment>
  );
};

export default SubNavListas;
