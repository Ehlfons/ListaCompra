import useListas from "../../../../hooks/useListas";

const Resumen = () => {
  const { productosLista } = useListas();

  // Calcular el número total de productos.
  const numeroDeProductos = productosLista.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Calcular el precio total de la lista.
  const precioTotal = productosLista.reduce(
    (total, producto) => total + producto.cantidad * producto.productos.precio,
    0
  );

  return (
    <div className="resumen">
      <h3>Resumen</h3>
      <p>Número de productos: {numeroDeProductos}</p>
      <p>Precio promedio: {precioTotal.toFixed(2)}€</p>
    </div>
  );
};

export default Resumen;