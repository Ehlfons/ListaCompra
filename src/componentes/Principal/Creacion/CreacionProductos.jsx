import { Fragment } from "react";
import useProductos from "../../../hooks/useProductos.jsx";
import "./CreacionProductos.css";

const CreacionProductos = (crear) => {
  const { producto, error, cambiarDatosProducto, insertProducto, updateProducto } = useProductos();

  return (
    <Fragment>
      <h2 className="formulario-h2">Información Producto</h2>
      {error.length > 0 ? (
        error
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
              }}
            />
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
              }}
            />
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
              }}
            />
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
                crear ? insertProducto(e) : updateProducto(e);
              }}
            >
              {crear ? "Crear Producto" : "Actualizar Producto"}
            </button>
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default CreacionProductos;
