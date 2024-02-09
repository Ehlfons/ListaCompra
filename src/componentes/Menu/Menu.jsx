import { Fragment } from "react";
import { Link } from "react-router-dom";
import SubNavListas from "./SubNavListas";
import SubNavProductos from "./SubNavProductos";
import useProductos from "../../hooks/useProductos";
import "./Menu.css";
import useUsuarios from "../../hooks/useUsuarios";
import useListas from "../../hooks/useListas";

const Menu = () => {
  const {
    toggleMenuProductos,
    toggleMenuListas,
    menuListasVisible,
    menuProductosVisible,
  } = useProductos();
  const { sesionIniciada } = useUsuarios();
  const { actualizarIdListaActual } = useListas();
  return (
    <div id="menu">
      {/* Si el usuario ha iniciado sesión, muestra el menú completo. Si no, solo muestra el menú de inicio. */}
      {sesionIniciada ? (
        <Fragment>
          <nav>
            <ul>
              <li
                onClick={() => {
                  menuListasVisible && toggleMenuListas(); // Si el menú de listas está visible, lo oculta.
                  menuProductosVisible && toggleMenuProductos(); // Si el menú de productos está visible, lo oculta.
                }}
              >
                <Link to="/">Inicio</Link>
              </li>
              <li
                onClick={() => {
                  menuListasVisible && toggleMenuListas(); // Si el menú de listas está visible, lo oculta.
                  !menuProductosVisible && toggleMenuProductos(); // Si el menú de productos no está visible, lo muestra.
                }}
              >
                <Link to="/ListaCompra">Productos</Link>
              </li>
              <li
                onClick={() => {
                  menuProductosVisible && toggleMenuProductos(); // Si el menú de productos está visible, lo oculta.
                  !menuListasVisible && toggleMenuListas(); // Si el menú de listas no está visible, lo muestra.
                  actualizarIdListaActual(""); // Al hacer click en Listas, se resetea el id de la lista actual para que no se muestren los detalles de las listas anteriores.
                }}
              >
                <Link to="/Listas">Listas</Link>
              </li>
            </ul>
          </nav>
          <SubNavProductos />
          <SubNavListas />
        </Fragment>
      ) : (
        <nav>
          <ul>
            <li
              onClick={() => {
                menuListasVisible && toggleMenuListas(); // Si el menú de listas está visible, lo oculta.
                menuProductosVisible && toggleMenuProductos(); // Si el menú de productos está visible, lo oculta.
              }}
            >
              <Link to="/">Inicio</Link>{" "}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Menu;
