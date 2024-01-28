import { useContext } from "react";
import { ContextoListas } from "../contextos/ProveedorListas.jsx";

// Hook para usar el contexto de Listas.
const useListas = () => {
  const contexto = useContext(ContextoListas);
  return contexto;
};

export default useListas;