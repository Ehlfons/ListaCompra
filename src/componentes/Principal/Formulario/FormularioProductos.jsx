import { Fragment } from "react";
import useProductos from "../../../hooks/useProductos.jsx";
import "./FormularioProductos.css";
import "./FormularioProductosModal.css";

const FormularioProductos = ({ crear }) => {
  const {
    producto,
    situacion,
    cambiarDatosProducto,
    insertProducto,
    updateProducto,
    validarFormulario,
    erroresFormulario,
    actualizarErroresFormulario,
  } = useProductos();

  // Manejador del evento clic del botón Crear Producto.
  const manejarClick = (e) => {
    const { esValido, errores } = validarFormulario(producto); // Validar el formulario.

    if (esValido) {
      crear ? insertProducto(e) : updateProducto(e);
      
      // Limpiar todos los errores al enviar el formulario.
      actualizarErroresFormulario({
        nombre: undefined,
        precio: undefined,
        peso: undefined,
      });
    } else {
      actualizarErroresFormulario(errores); // Actualizar el estado de los errores.
    }
  };

  return (
    <Fragment>
      <div id={crear ? "detailsformsmodal" : "detailsforms"}>
        {situacion.length > 0 ? (
          situacion
        ) : (
          <div id={crear ? "formulariomodal" : "formulario"}>
            <p>
              <label
                className={crear ? "labelmodal" : "label"}
                htmlFor="nombre"
              >
                Nombre:{" "}
              </label>
              <input
                className={crear ? "inputmodal" : "input"}
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
              {erroresFormulario.nombre ? (
                <small>{erroresFormulario.nombre}</small>
              ) : null}
            </p>
            <p>
              <label
                className={crear ? "labelmodal" : "label"}
                htmlFor="precio"
              >
                Precio:{" "}
              </label>
              <input
                className={crear ? "inputmodal" : "input"}
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
              {erroresFormulario.precio ? (
                <small>{erroresFormulario.precio}</small>
              ) : null}
            </p>
            <p>
              <label className={crear ? "labelmodal" : "label"} htmlFor="peso">
                Peso:{" "}
              </label>
              <input
                className={crear ? "inputmodal" : "input"}
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
              {erroresFormulario.peso ? (
                <small>{erroresFormulario.peso}</small>
              ) : null}
            </p>
            <p>
              <label
                className={crear ? "labelmodal" : "label"}
                htmlFor="descripcion"
              >
                Descripción:{" "}
              </label>
              <input
                className={crear ? "inputmodal" : "input"}
                type="text"
                name="descripcion"
                value={producto.descripcion || ""}
                onChange={(e) => {
                  cambiarDatosProducto(e);
                }}
              />
            </p>
            <p>
              <label
                className={crear ? "labelmodal" : "label"}
                htmlFor="imagen"
              >
                Imagen:
              </label>
              <input
                className={crear ? "inputmodal" : "input"}
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
                className={crear ? "crear-producto-modal" : "crear-producto"}
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
