import React, { Fragment } from "react";
import Producto from "./Producto/Producto.jsx";
import useProductos from "../../../../hooks/useProductos.jsx";

// Componente para mostrar el listado de Productos y el mensaje de error.
const ListadoProductos = () => {
  const { listadoProductos, situacion } = useProductos();
  return (
    <Fragment>
      <div className="listado-productos">
        {listadoProductos.length
          ? listadoProductos.map((v, i, a) => (
              <Producto key={v.id} datos={v} />
            ))
          : situacion && <div className="error-message">{situacion}</div>}
      </div>
    </Fragment>
  );
};

export default ListadoProductos;
