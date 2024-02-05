import { useContext } from "react";
import { ContextoUsuarios } from "../contextos/ProveedorUsuarios.jsx";

// Hook para usar el contexto de Listas.
const useUsuarios = () => {
  const contexto = useContext(ContextoUsuarios);
  return contexto;
};

export default useUsuarios;