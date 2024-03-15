<<<<<<< HEAD
import React from 'react'
import './Acciones.css'

const Acciones = () => {
  return (
    <div id='acciones'>
        <h2 id="acciones-h2">Acciones sobre listado</h2>
    </div>
  )
}

export default Acciones
=======
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
    elementosVisible,
    toggleElementos,
  } = useProductos();

  return (
    <Fragment>
      <div id="acciones">
        <button
          id="acciones-button"
          onClick={() => {
            toggleElementos() // Mostrar/Ocultar los filtros.
          }}
        >
          Acciones/Filtros
        </button>
      </div>
      <div id="filtros" className={elementosVisible ? "" : "hide"}> {/* Si el valor de elementosVisible es true, se muestra el div, si es false, se oculta. */}
        <button
          onClick={() => {
            ordenarProductos(ordenAscendente, "nombre");
            actualizarOrden(!ordenAscendente); // Invertir el orden al hacer clic.
          }}
        >
          Ordenar por nombre
        </button>
        <button
          onClick={() => {
            ordenarProductos(ordenAscendente, "precio");
            actualizarOrden(!ordenAscendente); // Invertir el orden al hacer clic.
          }}
        >
          Ordenar por precio
        </button>
        <button
          onClick={() => {
            ordenarProductos(ordenAscendente, "peso");
            actualizarOrden(!ordenAscendente); // Invertir el orden al hacer clic.
          }} 
        >
          Ordenar por peso
        </button>
        <input
          type="text"
          placeholder="Nombre del producto"
          id="input-nombre"
          onChange={(e) => {
            filtrarProductosNombre(e.target.value); // Actualizar el valor del input y filtrar por nombre.
          }}
        />
        <button
          onClick={() => {
            filtrarProductosPrecio(valorPrecio); // Filtrar por precio al hacer clic.
          }}
        >
          Filtrar por precio
        </button>
        <button
          onClick={() => {
            filtrarProductosPeso(valorPeso); // Filtrar por peso al hacer clic.
          }}
        >
          Filtrar por peso
        </button>
      </div>
      <div id="inputs" className={elementosVisible ? "" : "hide"}> {/* Si el valor de elementosVisible es true, se muestra el div, si es false, se oculta. */}
        <input
          type="number"
          placeholder="Precio del producto"
          id="input-precio"
          onChange={(e) => {
            actualizarValorPrecio(e.target.value); // Actualizar el valor del input.
          }}
          
        />
        <input
          type="number"
          placeholder="Peso del producto"
          id="input-peso"
          onChange={(e) => {
            actualizarValorPeso(e.target.value);  // Actualizar el valor del input.
          }}
        />
      </div>
    </Fragment>
  );
};

export default Acciones;
>>>>>>> origin/usuarios
