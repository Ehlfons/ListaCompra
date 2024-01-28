import { Fragment, useState } from "react";
import useProductos from "../../hooks/useProductos";
import CrearListas from "../../modales/CrearListas";
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

      <CrearListas mostrar={crearListasVisible} manejarCerrado={cerrarCrearListas} />
    </Fragment>
  );
};

export default SubNavListas;
