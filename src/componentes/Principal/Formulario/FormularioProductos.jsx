import { Fragment } from "react";
import useProductos from "../../../hooks/useProductos.jsx";
import useListas from "../../../hooks/useListas.jsx";
import "./FormularioProductos.css";

const FormularioProductos = ({crear}) => {
  const { producto, situacion, cambiarDatosProducto, insertProducto, updateProducto, validarFormulario, erroresFormulario, actualizarErroresFormulario } = useProductos();
  const { actualizarIdListaActual } = useListas();

  // Manejador del evento clic del botón Crear Producto.
  const manejarClick = (e) => {
    const { esValido, errores } = validarFormulario(producto); // Validar el formulario.

    if (esValido) {
      crear ? insertProducto(e) : updateProducto(e);
      actualizarIdListaActual(""); // Actualizar el ID de la lista actual.
    } else {
      actualizarErroresFormulario(errores); // Actualizar el estado de los errores.
    }
  };

  return (
    <Fragment>
      <div id="detailsforms">
        <h2 className="formulario-h2">Información Producto</h2>
        {situacion.length > 0 ? (
          situacion
        ) : (
          <div id="formulario">
            <p>
              <label htmlFor="nombre">Nombre: </label>
              <input
                type="text"
                name="nombre"
                value={producto.nombre || ""}
                onChange={(e) => {
                  cambiarDatosProducto(e);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresFormulario((prevErrores) => ({
                    ...prevErrores,
                    nombre: undefined,
                  }));
                }}
              />
              {erroresFormulario.nombre ? <small>{erroresFormulario.nombre}</small> : null}
            </p>
            <p>
              <label htmlFor="precio">Precio: </label>
              <input
                type="number"
                name="precio"
                min={0}
                value={producto.precio || ""}
                onChange={(e) => {
                  cambiarDatosProducto(e);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresFormulario((prevErrores) => ({
                    ...prevErrores,
                    precio: undefined,
                  }));
                }}
              />
              {erroresFormulario.precio ? <small>{erroresFormulario.precio}</small> : null}
            </p>
            <p>
              <label htmlFor="peso">Peso: </label>
              <input
                type="number"
                name="peso"
                min={0}
                value={producto.peso || ""}
                onChange={(e) => {
                  cambiarDatosProducto(e);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresFormulario((prevErrores) => ({
                    ...prevErrores,
                    peso: undefined,
                  }));
                }}
              />
              {erroresFormulario.peso ? <small>{erroresFormulario.peso}</small> : null}
            </p>
            <p>
              <label htmlFor="descripcion">Descripción: </label>
              <input
                type="text"
                name="descripcion"
                value={producto.descripcion || ""}
                onChange={(e) => {
                  cambiarDatosProducto(e);
                }}
              />
            </p>
            <p>
              <label htmlFor="imagen">Imagen:</label>
              <input
                type="url"
                name="imagen"
                value={producto.imagen || ""}
                onChange={(e) => {
                  cambiarDatosProducto(e);
                }}
              />
            </p>
            <p>
              <button
                className="crear-producto"
                onClick={(e) => {
                  manejarClick(e);
                }}
              >
                {crear ? "Crear Producto" : "Actualizar Producto"}
              </button>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FormularioProductos;
