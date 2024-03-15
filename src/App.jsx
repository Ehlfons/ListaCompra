import { Fragment } from "react";
import Cabecera from "./componentes/Cabecera/Cabecera.jsx";
import Menu from "./componentes/Menu/Menu.jsx";
import Pie from "./componentes/Pie/Pie.jsx";
import Principal from "./componentes/Principal/Principal.jsx";
import ProveedorProductos from "./contextos/ProveedorProductos.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ProveedorListas from "./contextos/ProveedorListas.jsx";
import ProveedorUsuarios from "./contextos/ProveedorUsuarios.jsx";

function App() {
  /* Usuario administrador (con permisos de borrado y edición de productos):
   * email: sergioalfonso.alu@iespacomolla.es
   * contraseña: 123456 
   */

  /* Usuario autenticado:
   * email: sergioalfonso112.sa@gmail.com
   * contraseña: 123456 
   */
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <ProveedorProductos>
            <ProveedorListas>
              <header>
                <Cabecera />
              </header>
              <main>
                <Menu />
                <Principal />
              </main>
              <footer>
                <Pie />
              </footer>
            </ProveedorListas>
          </ProveedorProductos>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
