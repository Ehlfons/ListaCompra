import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {
  const navegar = useNavigate(); // Hook para redirigir las rutas de la aplicación.

  // Valores iniciales.
  const sesionInicial = false;
  const usuarioInicial = {};
  const errorUsuarioInicial = "";
  const datosSesionInicial = {
    email: "",
    password: "",
  };

  // Estados del contexto.
  const [datosSesion, setDatosSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);

  // Función para redirigir a la página de inicio de sesión.
  const navegarLogin = () => {
    navegar("/Login");
  };

  // Función para crear una cuenta de usuario.
  const crearCuenta = async () => {
    try {
      const { data, error } = await supabaseConexion.auth.signUp({
        email: datosSesion.email,
        password: datosSesion.password,
      });

      if (error) {
        throw error;
      } else {
        setErrorUsuario(
          "Recibirás un correo para la confirmación de la cuenta."
        );
      }
      // Se revisa el objeto data por consola.
      //console.log(data);
    } catch (error) {
      setErrorUsuario("Error al crear la cuenta de usuario: ". error.message);
    }
  };

  // Función para iniciar sesión con MagicLink.
  const iniciarSesionMagicLink = async () => {
    setErrorUsuario(errorUsuarioInicial);
    // Algo más de información en https://supabase.com/docs/guides/auth/auth-magic-link
    try {
      // Función asíncrona para iniciar sesion con el usuario (MagicLink).
      const { data, error } = await supabaseConexion.auth.signInWithOtp({
        email: datosSesion.email,
        /**
         *  No es necesario especificar la ruta de redirección
         *  ya que se encuentra especificada en el servidor.
         *  Es posible indicar una redirección diferente desde aquí si
         *  el diseño de la aplicación así lo requiere.
         * */
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });
      if (error) {
        throw error;
      }
      // Lo reviso por consola.
      //console.log(data);
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para cerrar la sesión de usuario.
  const cerrarSesion = async () => {
    try {
      // Se cierra la sesión en el servidor de Supabase.
      await supabaseConexion.auth.signOut();
      // Se redirige la aplicación a la parte pública (<Login>).
      navegarLogin();
      setSesionIniciada(false);
    } catch (error) {
      setErrorUsuario(error.message);
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

      /* Imprimir usuarios por consola (data y estado).
      console.log(estado);
      console.log(data.user); */
    } catch (error) {
      setErrorUsuario(error.message);
      navegarLogin();
    }
  };

  // Función para actualizar los datos de sesión del usuario.
  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setDatosSesion({ ...datosSesion, [name]: value });
    console.log(datosSesion);
  };

  useEffect(() => {
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (event, session) => {
        // Se puede utilizar el operador negación para invertir el orden.
        if (session) {
          // Si hay sesión se carga la parte privada de la web.
          navegar("/");
          // Se imprime por consola con fines formativos.
          //console.log(session);
          setSesionIniciada(true);
          // Información del usuario que tiene sesión iniciada.
          obtenerUsuario();
        } else {
          // Si no hay sesión, se redirige a la parte pública de la web.
          navegar("login");
          setSesionIniciada(false);
        }
      }
    );
    // Se revisa el objeto por consola (sólo con fines formativos).
    //console.log(suscripcion);
  }, []);

  // Objeto con la información a exportar.

  const datosAExportar = {
    sesionIniciada,
    errorUsuario,
    crearCuenta,
    iniciarSesionMagicLink,
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
