import { Fragment, useState } from "react";
import useListas from "../../../../hooks/useListas.jsx";
import Lista from "./Lista/Lista.jsx";
import Producto from "../../Listado/ListadoProductos/Producto/Producto.jsx";
import "./ListarListas.css";
import ResumenListas from "../ResumenListas/ResumenListas.jsx";

// Componente para mostrar el listado de Listas y el mensaje de error.
const ListarListas = () => {
  const { listadoListas, situacion, productosLista, getProductosLista } = useListas();

  const [idListaActual, setIdListaActual] = useState("");

  return (
    <Fragment>
      <div
        className="listado-listas"
        onClick={(e) => {
          if (e.target.classList.contains("lista")) {
            getProductosLista(e.target.id); // Al hacer clic en una lista, se obtienen los productos de esa lista.
            setIdListaActual(e.target.id); // Al hacer clic en una lista, se guarda el ID de esa lista para actualizarla.
          }
        }}
      >
        {listadoListas.length
          ? listadoListas.map((lista, i) => <Lista key={i} datos={lista} />)
          : situacion && <div className="error-message">{situacion}</div>}
      </div>
      <div className="listado-productos">
        {productosLista.length
          ? productosLista.map((producto, i) => (
              <Producto
                key={i}
                datos={producto.productos} // Datos del producto.
                onLista={true} // Para saber si se está mostrando el listado de productos de una lista.
                idListaActual={idListaActual} // ID de la lista actual.
                cantidad={producto.cantidad} // Cantidad de productos de la lista.
              />
            ))
          : situacion && <div className="error-message">{situacion}</div>}
      </div>
      <ResumenListas/>
    </Fragment>
  );
};

export default ListarListas;
