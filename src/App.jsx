import { Fragment } from "react";
import Cabecera from "./componentes/Cabecera/Cabecera.jsx";
import Menu from "./componentes/Menu/Menu.jsx";
import Pie from "./componentes/Pie/Pie.jsx";
import Principal from "./componentes/Principal/Principal.jsx";
import ProveedorProductos from "./contextos/ProveedorProductos.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorProductos>
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
        </ProveedorProductos>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;