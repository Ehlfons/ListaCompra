import { Fragment } from "react";
import useProductos from "../../../hooks/useProductos.jsx";
import "./CreacionProductos.css";

const CreacionProductos = () => {
  const { producto, error, actualizarDato, crearProducto } = useProductos();

  return (
    <Fragment>
      <h2 className="formulario-h2">Información Producto</h2>
      {error ? (
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
                actualizarDato(e);
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
                actualizarDato(e);
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
                actualizarDato(e);
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
                actualizarDato(e);
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
                actualizarDato(e);
              }}
            />
          </p>
          <p>
            <button
              className="crear-producto"
              onClick={(e) => {
                crearProducto(e);
              }}
            >
              Guardar producto
            </button>
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default CreacionProductos;
