import { useEffect } from "react";
import useProductos from "../../../../hooks/useProductos";
import "./Resumen.css";

const Resumen = () => {
  const { listadoProductos } = useProductos();

  // Calcular el número total de productos.
  const numeroDeProductos = listadoProductos.length;

  // Calcular el precio promedio de los productos.
  const precioPromedio =
    numeroDeProductos > 0
      ? listadoProductos.reduce(
          (total, producto) => total + producto.precio,
          0
        ) / numeroDeProductos
      : 0;

  return (
    <div className="resumen">
      <h3>Resumen</h3>
      <p>Número de productos: {numeroDeProductos}</p>
      <p>Precio promedio: {precioPromedio.toFixed(2)}€</p>
    </div>
  );
};

export default Resumen;
