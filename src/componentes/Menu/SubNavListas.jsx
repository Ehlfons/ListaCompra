import { Fragment, useState } from "react";
import useProductos from "../../hooks/useProductos.jsx";
import CrearListasModal from "../../modales/CrearListasModal.jsx";
import "./Menu.css";

const SubNavListas = () => {
  const { menuListasVisible } = useProductos();

  const [crearListasVisible, setCrearListasVisible] = useState(false);

  const mostrarCrearListas = () => {
    setCrearListasVisible(true);
  };

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
