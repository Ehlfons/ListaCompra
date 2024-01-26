import { Fragment } from "react";
import useProductos from "../../../../hooks/useProductos.jsx";
import Lista from "./Lista/Lista.jsx";

// Componente para mostrar el listado de Productos y el mensaje de error.
const ListarListas = () => {
  const { listadoListas, situacion, getLista } = useProductos();

  return (
    <Fragment>
      <div className="listado-listas"
      onClick={(e) => {
        if (e.target.classList.contains("lista")) {
          getLista(e.target.id);
          console.log(getLista(e.target.id));
        }

      }}>
        {listadoListas.length
          ? listadoListas.map((lista, i) => <Lista key={i} datos={lista} />)
          : situacion && <div className="error-message">{situacion}</div>}
      </div>
    </Fragment>
  );
};

export default ListarListas;
