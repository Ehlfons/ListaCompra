import { useContext } from "react";
import { ContextoProductos } from "../contextos/ProveedorProductos.jsx";

// Hook para usar el contexto de Productos.
const useProductos = () => {
  const contexto = useContext(ContextoProductos);
  return contexto;
};

export default useProductos;