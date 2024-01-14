import useProductos from "../../../../hooks/useProductos";
import "./Resumen.css";

const Resumen = () => {
  const {
    listadoProductos
  } = useProductos();

  // Calcular el número total de productos.
  const numeroDeProductos = listadoProductos.length;

  // Calcular el precio promedio de los productos.
  const precioPromedio =
    listadoProductos.reduce((total, producto) => total + producto.precio, 0) / numeroDeProductos;

  return (
    <div className="resumen">
      <h3>Resumen</h3>
      <p>Número de productos: {numeroDeProductos}</p>
      <p>Precio promedio: {isNaN(precioPromedio) ? "0€" : `${precioPromedio.toFixed(2)}€`}</p> {/* Ternaria para mostrar un 0 en caso de que no haya productos ya que se muestra "NaN". */}
    </div>
  );
};

export default Resumen;
