import { Fragment, useState } from "react";
import useListas from "../../../../hooks/useListas.jsx";
import Lista from "./Lista/Lista.jsx";
import Producto from "../../Listado/ListadoProductos/Producto/Producto.jsx";
import "./ListarListas.css";
import ResumenListas from "../ResumenListas/ResumenListas.jsx";

// Componente para mostrar el listado de Listas y el mensaje de error.
const ListarListas = () => {
  const { listadoListas, situacion, productosLista, getProductosLista, actualizarIdListaActual, idListaActual } = useListas();

  return (
    <Fragment>
      <div
        className="listado-listas"
        onClick={(e) => {
          if (e.target.classList.contains("lista")) {
            getProductosLista(e.target.id); // Al hacer clic en una lista, se obtienen los productos de esa lista.
            actualizarIdListaActual(e.target.id); // Al hacer clic en una lista, se guarda el ID de esa lista para actualizarla.
          }
        }}
      >
        {listadoListas.length
          ? listadoListas.map((lista, i) => <Lista key={i} datos={lista} isSelected={lista.lista_id === idListaActual}/>) // Se muestra el listado de Listas.
          : situacion && <div className="error-message">{situacion}</div>}
      </div>
      {idListaActual && <div className="listado-productos-listas">
        {productosLista.length
          ? productosLista.map((producto, i) => ( // Se muestra el listado de productos de la lista.
              <Producto
                key={i}
                datos={producto.productos} // Datos del producto.
                cantidad={producto.cantidad} // Cantidad de productos de la lista.
                onLista={true} // Para saber si se está mostrando el listado de productos de una lista.
                idListaActual={idListaActual} // ID de la lista actual.
              />
            ))
          : <p className="null">No se han encontrado productos en la lista.</p>} {/* Si no hay productos en la lista, se muestra un mensaje. */}
      <ResumenListas/>
      </div>}
    </Fragment>
  );
};

export default ListarListas;
