import React from "react";
import "./Producto.css";

// Estructura de cada Producto.
const Producto = (props) => {
  const { id, nombre, peso, precio, imagen, descripcion } = props.datos;
  return (
    <article className="producto" id={id}>
        <img src={imagen} alt={nombre} />
        <p><strong>{nombre}</strong> - Peso: {peso}kg - Precio: {precio}€ - {descripcion}</p>
        <div className="trash"><img src="src/assets/trash.svg" alt="trash" /></div>
    </article>
  );
};

export default Producto;
