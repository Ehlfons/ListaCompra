import React, { Fragment } from "react";
import useProductos from "../../../../hooks/useProductos.jsx";
import "./Acciones.css";

const Acciones = () => {
  // Importado desde el contexto a través del hook useProductos.
  const {
    filtrarProductosPrecio,
    valorPrecio,
    actualizarValorPrecio,
    filtrarProductosPeso,
    valorPeso,
    actualizarValorPeso,
    filtrarProductosNombre,
    ordenarProductos,
    ordenAscendente,
    actualizarOrden,
    toggleHideClass,
  } = useProductos();

  return (
    <Fragment>
      <div id="acciones">
        <button
          id="acciones-button"
          onClick={() => {
            toggleHideClass("filtros");
            toggleHideClass("inputs");
          }}
        >
          Acciones/Filtros
        </button>
      </div>
      <div id="filtros" className="hide">
        <button
          onClick={() => {
            ordenarProductos(ordenAscendente, "nombre");
            actualizarOrden(!ordenAscendente); // Invertir el orden al hacer click.
          }}
        >
          Ordenar por nombre
        </button>
        <button
          onClick={() => {
            ordenarProductos(ordenAscendente, "precio");
            actualizarOrden(!ordenAscendente);
          }}
        >
          Ordenar por precio
        </button>
        <button
          onClick={() => {
            ordenarProductos(ordenAscendente, "peso");
            actualizarOrden(!ordenAscendente);
          }}
        >
          Ordenar por peso
        </button>
        <input
          type="text"
          placeholder="Nombre del producto"
          id="input-nombre"
          onChange={(e) => {
            filtrarProductosNombre(e.target.value);
          }}
        />
        <button
          onClick={() => {
            filtrarProductosPrecio(valorPrecio);
          }}
        >
          Filtrar por precio
        </button>
        <button
          onClick={() => {
            filtrarProductosPeso(valorPeso);
          }}
        >
          Filtrar por peso
        </button>
      </div>
      <div id="inputs" className="hide">
        <input
          type="number"
          placeholder="Precio del producto"
          id="input-precio"
          onChange={(e) => {
            actualizarValorPrecio(e.target.value);
          }}
          
        />
        <input
          type="number"
          placeholder="Peso del producto"
          id="input-peso"
          onChange={(e) => {
            actualizarValorPeso(e.target.value);
          }}
        />
      </div>
    </Fragment>
  );
};

export default Acciones;