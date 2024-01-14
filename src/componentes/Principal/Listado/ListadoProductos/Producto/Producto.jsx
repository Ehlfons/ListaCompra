import React from "react";
import "./Producto.css";

// Estructura de cada Producto.
const Producto = (props) => {
  const { id, nombre, peso, precio, imagen, descripcion } = props.datos;
  return (
    <article className="producto" id={id}>
      <div className="producto-imagen">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="producto-datos">
        <p><strong>{nombre}</strong> - Peso: {peso}kg - Precio: {precio}€ - {descripcion}</p>
      </div>
    </article>
  );
};

export default Producto;
