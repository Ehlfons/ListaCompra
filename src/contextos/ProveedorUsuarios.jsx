import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {

  const navigate = useNavigate();

  // Valores iniciales.
  const sesionInicial = false;
  const usuarioInicial = {};
  const errorUsuarioInicial = "";
  const datosSesionInicial = {
    email: "",
    password: "",
  };

  // Estados del contexto.
  const [infoSesion, setInfoSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);

  // Función para crear una cuenta de usuario.
  const registro = async () => {
    try {
      const { error } = await supabaseConexion.auth.signUp({
        email: infoSesion.email,
        password: infoSesion.password,
      });

      if (error) {
        throw error;
      } else {
        setErrorUsuario(
          "Recibirás un correo para la confirmación del registro."
        );
      }
    } catch (error) {
      setErrorUsuario("Error al crear la cuenta de usuario: " + error.message);
    }
  };

  // Función para cerrar la sesión de usuario.
  const cerrarSesion = async () => {
    try {
      // Se cierra la sesión en el servidor de Supabase.
      await supabaseConexion.auth.signOut();
      // Se redirige la aplicación a la parte pública (<usuario anon>).
      setSesionIniciada(false);
    } catch (error) {
      setErrorUsuario("Error al cerrar sesión:" + error.message);
    }
  };

  // Función para obtener los datos del usuario.
  const obtenerUsuario = async () => {
    try {
      const { data, error } = await supabaseConexion.auth.getUser();

      if (error) {
        throw error;
      }
      setUsuario(data.user);

    } catch (error) {
      setErrorUsuario("Error al obtener el usuario:" + error.message);
    }
  };

  // Función para actualizar los datos de sesión del usuario.
  const actualizarDato = (e) => {
    const { name, value } = e.target;
    setInfoSesion({ ...infoSesion, [name]: value });
  };

  useEffect(() => {
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (e, session) => {
       if (session) {
          navigate("/");
          setSesionIniciada(true);
          // Información del usuario que tiene sesión iniciada.
          obtenerUsuario();
        } else {
          navigate("/");
          setSesionIniciada(false);

        }
      }
    );
  }, []);

  const datosAExportar = {
    sesionIniciada,
    errorUsuario,
    registro,
    cerrarSesion,
    actualizarDato,
  };

  return (
    <ContextoUsuarios.Provider value={datosAExportar}>
      {children}
    </ContextoUsuarios.Provider>
  );
};

export default ProveedorUsuarios;
export { ContextoUsuarios };
