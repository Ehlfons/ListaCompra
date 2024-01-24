import { Fragment } from "react";
import useProductos from "../../../../hooks/useProductos.jsx";
import Lista from "./Lista/Lista.jsx";

// Componente para mostrar el listado de Productos y el mensaje de error.
const ListarListas = () => {
  const { listadoListas, situacion } = useProductos();

  return (
    <Fragment>
      <div className="listado-listas">
        {listadoListas.length
          ? listadoListas.map((lista, i) => (
              <Lista key={i} datos={lista} />
            ))
          : situacion && <div className="error-message">{situacion}</div>}
      </div>
    </Fragment>
  );
};

export default ListarListas;
