import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import useUsuarios from "../../hooks/useUsuarios.jsx";
import CrearProductoModal from "../../modales/CrearProductoModal.jsx";

const SubNavProductos = () => {
  // Importar el estado de menuProductosVisible desde el contexto a través del hook useProductos.
  const { menuProductosVisible, actualizarErroresFormulario } = useProductos();

  // Importar el estado de usuario desde el contexto a través del hook useUsuarios.
  const { usuario } = useUsuarios();

  // Estado para mostrar u ocultar el modal de crear productos.
  const [crearProductosVisible, setCrearProductosVisible] = useState(false);

  // Mostrar el modal de crear productos.
  const mostrarCrearProductos = () => {
    setCrearProductosVisible(true);

    // Limpiar todos los errores al abrir el formulario.
    actualizarErroresFormulario({
      nombre: undefined,
      precio: undefined,
      peso: undefined,
    });
  };

  // Cerrar el modal de crear productos.
  const cerrarCrearProductos = () => {
    setCrearProductosVisible(false);

    // Limpiar todos los errores al cerrar el formulario.
    actualizarErroresFormulario({
      nombre: undefined,
      precio: undefined,
      peso: undefined,
    });
  };

  return (
    <Fragment>
      {usuario.role === "listas_admin" && (
        <div className={menuProductosVisible ? "SubNav" : "SubNav hide"}>
          <nav>
            <ul>
              <li>
                <a onClick={mostrarCrearProductos}>Crear</a>
              </li>
              <li>
                <Link to="/Edicion">Editar</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <CrearProductoModal
        mostrar={crearProductosVisible}
        manejarCerrado={cerrarCrearProductos}
      />
    </Fragment>
  );
};

export default SubNavProductos;
