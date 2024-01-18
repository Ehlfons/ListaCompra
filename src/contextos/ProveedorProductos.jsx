import { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  // Valores iniciales para los estados.
  const arrayInicial = [];
  const cadenaCargando = "Cargando datos...";
  const cadenaInicial = "";
  const valorInicial = 0;
  const valorInicialBooleano = true;
  const valoresInicialesProducto = {
    nombre: "",
    precio: "",
    peso: "",
    descripcion: "",
    imagen: "",
  };

  // Estados.
  const [listadoProductos, setListadoProductos] = useState(arrayInicial);
  const [producto, setProducto] = useState(valoresInicialesProducto);
  const [situacion, setSituacion] = useState(cadenaCargando);
  const [error, setError] = useState(cadenaInicial);
  const [valorPeso, setValorPeso] = useState(valorInicial);
  const [valorPrecio, setValorPrecio] = useState(valorInicial);
  const [ordenAscendente, setOrdenAscendente] = useState(valorInicialBooleano); // Estado para alternar el orden ascendente/descendente de los filtros.

  // Función para obtener el listado de Productos.
  const obtenerListadoSencillo = async () => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*");

      if (error) {
        throw error;
      }
      setListadoProductos(data);
    } catch (error) {
      setSituacion(`Error al obtener el listado: ${error.message}`);
    }
  };

  // Función para filtrar el listado de Productos por nombre.
  const filtrarProductosNombre = async (nombre) => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*")
        .ilike("nombre", `%${nombre}%`); // `%${nombre}%` es para buscar el texto en cualquier parte del campo.

      if (error) {
        throw error;
      }
      setListadoProductos(data);
    } catch (error) {
      setSituacion(`Error al filtrar por nombre: ${error.message}`);
    }
  };

  // Función para filtrar el listado de Productos por precio.
  const filtrarProductosPrecio = async (precio) => {
    try {
      if (!precio || isNaN(precio)) {
        setSituacion(
          "Por favor, ingrese un valor numérico para realizar el filtro por precio."
        );
        // Restablecer el estado después de 3 segundos.
        setTimeout(() => {
          setSituacion(cadenaInicial);
        }, 3000);
      }

      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*")
        .lte("precio", precio)
        .order("precio", { ascending: false });

      if (error) {
        throw error;
      }
      setListadoProductos(data);
    } catch (error) {
      setSituacion(`Error al filtrar por precio: ${error.message}`);
    }
  };

  // Función para filtrar el listado de Productos por peso.
  const filtrarProductosPeso = async (peso) => {
    try {
      // Si el valor del peso no es numérico o está vacío, se muestra un mensaje de error y se restablece el listado.
      if (!peso || isNaN(peso)) {
        setSituacion(
          "Por favor, ingrese un valor numérico para realizar el filtro por peso."
        );
        setTimeout(() => {
          setSituacion(cadenaInicial);
        }, 3000);
      }

      // Si el valor del peso es numérico, se realiza el filtro.
      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*")
        .lte("peso", peso)
        .order("peso", { ascending: false });

      if (error) {
        throw error;
      }
      setListadoProductos(data);
    } catch (error) {
      setSituacion(`Error al filtrar por peso: ${error.message}`);
    }
  };

  /*
   * Función para ordenar el listado de Productos.
   * El parámetro "orden" es para indicar si el orden es ascendente o descendente.
   * El parámetro "type" es para indicar el campo por el que se ordena.
   */
  const ordenarProductos = async (orden, type) => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*")
        .order(type, { ascending: orden });

      if (error) {
        throw error;
      }
      setListadoProductos(data);
    } catch (error) {
      setSituacion(`Error al ordenar los productos: ${error.message}`);
    }
  };

  //Función para obtener los datos de un registro.
  const obtenerProducto = async (id) => {
    setError(cadenaInicial); // Por si se ha producido un error previo.
    try {
      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*")
        .eq("id", id);

      if (error) {
        throw error;
      }
      setProducto(data[0]);
    } catch (error) {
      setSituacion(error.message);
    }
  };

  // Función para actualizar los datos de un formulario al estado producto.
  const actualizarDato = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Función para insertar el estado producto en la base de datos.
  const crearProducto = async () => {
    try {
      const { error } = await supabaseConexion
        .from("productos")
        .insert(producto);
      
      if (error) {
        throw error;  
      }

      setProducto(valoresInicialesProducto); // Borrar el formulario tras la creación del producto. 

      // Actualizar el estado "listadoProductos" para que aparezca el nuevo producto.
      setListadoProductos([...listadoProductos, producto]);
    } catch (error) {
      setSituacion(`Error al crear el producto: ${error.message}`);
    }
  };

  const actualizarProducto = async () => {
    try {
      const { error } = await supabaseConexion
        .from("productos")
        .update(producto)
        .eq("id", producto.id);

      if (error) {
        throw error;
      }

      // Se crea un nuevo array con los cambios del formulario.
      const productosCambiados = listadoProductos.map((productoAntiguo) => {
        return productoAntiguo.id === producto.id ? producto : productoAntiguo;
      });
      // Se actualiza el estado con los nuevos datos.
      setListadoProductos(productosCambiados);
      // Se borra el formulario tras el cambio.
      setProducto(valoresInicialesProducto);
    } catch (error) {
      setError(`Error al actualizar el producto: ${error.message}`);
    }
  };

  // Función para mostrar/ocultar elementos por su id (la añado al contexto por si en un futuro la necesito en otra parte de la aplicación).
  // Sé que no es buena práctica acceder al DOM en React, pero no me sale otra forma de hacerlo y solo es para ocultar el menú de filtros.
  const toggleHideClass = (elementId) => {
    const element = document.getElementById(elementId);
    element.classList.toggle("hide");
  };

  // Funciones para actualizar los estados.
  const actualizarValorPeso = (nuevoValor) => {
    setValorPeso(nuevoValor);
  };

  const actualizarValorPrecio = (nuevoValor) => {
    setValorPrecio(nuevoValor);
  };

  const actualizarOrden = (nuevoValor) => {
    setOrdenAscendente(nuevoValor);
  };

  // Efecto para obtener el listado de Productos.
  useEffect(() => {
    obtenerListadoSencillo();
  }, []);

  // Datos a exportar al contexto.
  const datosAExportar = {
    listadoProductos,
    situacion,
    obtenerListadoSencillo,
    filtrarProductosNombre,
    filtrarProductosPrecio,
    filtrarProductosPeso,
    ordenarProductos,
    valorPeso,
    actualizarValorPeso,
    valorPrecio,
    actualizarValorPrecio,
    ordenAscendente,
    actualizarOrden,
    toggleHideClass,
    obtenerProducto,
    producto,
    actualizarDato,
    crearProducto,
    actualizarProducto,
    error,
  };

  return (
    <ContextoProductos.Provider value={datosAExportar}>
      {children}
    </ContextoProductos.Provider>
  );
};

export default ProveedorProductos;
export { ContextoProductos };
