import { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  // Valores iniciales.
  const arrayInicial = [];
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
  const valoresInicialesLista = {
    lista_nombre: "",
    fecha_creacion: "",
  };

  // Estados.
  const [listadoProductos, setListadoProductos] = useState(arrayInicial);
  const [listadoListas, setListadoListas] = useState(arrayInicial);
  const [producto, setProducto] = useState(valoresInicialesProducto);
  const [lista, setLista] = useState(valoresInicialesLista);
  const [situacion, setSituacion] = useState(cadenaInicial);
  const [error, setError] = useState(cadenaInicial);
  const [valorPeso, setValorPeso] = useState(valorInicial);
  const [valorPrecio, setValorPrecio] = useState(valorInicial);
  const [ordenAscendente, setOrdenAscendente] = useState(valorInicialBooleano); // Estado para alternar el orden ascendente/descendente de los filtros.
  const [elementosVisible, setElementosVisible] = useState(!valorInicialBooleano); // Estado para manejar la visibilidad de los elementos (filtros e inputs por ahora.)
  const [menuProductosVisible, setMenuProductosVisible] = useState(!valorInicialBooleano); // Estado para manejar la visibilidad del SubNav de productos.
  const [menuListasVisible, setMenuListasVisible] = useState(!valorInicialBooleano); // Estado para manejar la visibilidad del SubNav de listas.

  // Función para obtener el listado de Productos.
  const obtenerListadoProductos = async () => {
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

  // Función para obtener el listado de Listas.
  const obtenerListadoListas = async () => {
    try {
      const { data, error } = await supabaseConexion
        .from("lista_compra")
        .select("*");

      if (error) {
        throw error;
      }
      setListadoListas(data);
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
  const getProducto = async (id) => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos")
        .select("*")
        .eq("id", id);

      if (error) {
        throw error;
      }

      setProducto(data[0]); // Se actualiza el estado "producto" con los datos del registro, para que el formulario se rellene con los datos del producto. El data[0] es porque el resultado de la consulta es un array con un único elemento.
    } catch (error) {
      setSituacion(`Error al obtener los datos del producto: ${error.message}`);
    }
  };

  //Función para obtener los datos de una lista.
  const getLista = async (id) => {
    try {
      const { data, error } = await supabaseConexion
        .from("lista_compra")
        .select("*")
        .eq("lista_id", id);

      if (error) {
        throw error;
      }

      setLista(data[0]); // Se actualiza el estado "producto" con los datos del registro, para que el formulario se rellene con los datos del producto. El data[0] es porque el resultado de la consulta es un array con un único elemento.
    } catch (error) {
      setSituacion(`Error al obtener los datos del producto: ${error.message}`);
    }
  };

  // Función para actualizar los datos del formulario al estado producto.
  const cambiarDatosProducto = (e) => {
    const { name, value } = e.target; // Ej: name="nombre", value="PC".
    setProducto({ ...producto, [name]: value });
  };

  // Función para insertar el nuevo producto en la base de datos.
  const insertProducto = async () => {
    try {
      const { error } = await supabaseConexion
        .from("productos")
        .insert(producto);

      if (error) {
        throw error;
      }

      // Borrar el formulario tras la creación del producto.
      setProducto(valoresInicialesProducto);

      // Actualizar el estado "listadoProductos" para que aparezca el nuevo producto.
      setListadoProductos([...listadoProductos, producto]);

      // Actualizar el listado de productos con los nuevos cambios para que el precio promedio del resumen se actualice.
      obtenerListadoProductos();
    } catch (error) {
      setSituacion(`Error al crear el producto: ${error.message}`);
    }
  };

  const updateProducto = async () => {
    try {
      const { error } = await supabaseConexion
        .from("productos")
        .update(producto)
        .eq("id", producto.id);

      if (error) {
        throw error;
      }

      // Se crea un nuevo array con los cambios del formulario.
      const productosCambiados = listadoProductos.map((productoPrev) => {
        return productoPrev.id === producto.id ? producto : productoPrev; // Si el id del producto del listado es igual al id del producto del formulario, se devuelve el producto del formulario, si no, se devuelve el producto del listado.
      });

      // Se actualiza el estado con los nuevos datos.
      setListadoProductos(productosCambiados);

      // Se borra el formulario tras el cambio.
      setProducto(valoresInicialesProducto);

      // Actualizar el listado de productos con los nuevos cambios para que el precio promedio del resumen se actualice.
      obtenerListadoProductos();
    } catch (error) {
      setSituacion(`Error al actualizar el producto: ${error.message}`);
    }
  };

  // Función para eliminar un producto.
  const deleteProducto = async (id) => {
    try {
      const { error } = await supabaseConexion
        .from("productos")
        .delete()
        .eq("id", id); // Se borra el producto con el id indicado.

      if (error) {
        throw error;
      }

      // Se crea un nuevo array sin el producto eliminado.
      const productosFiltrados = listadoProductos.filter(
        (producto) => producto.id !== id
      );

      // Se actualiza el estado con los nuevos datos.
      setListadoProductos(productosFiltrados);
    } catch (error) {
      setSituacion(`Error al eliminar el producto: ${error.message}`);
    }
  };

  // Función para alternar la clase "hide" de los filtros/inputs.
  const toggleElementos = () => {
    setElementosVisible((prevVisible) => !prevVisible); // Invierte el valor del estado.
  };
  // Función para alternar la clase "hide" de los filtros/inputs.
  const toggleMenuProductos = () => {
    setMenuProductosVisible((prevVisible) => !prevVisible); // Invierte el valor del estado.
  };
  // Función para alternar la clase "hide" de los filtros/inputs.
  const toggleMenuListas = () => {
    setMenuListasVisible((prevVisible) => !prevVisible); // Invierte el valor del estado.
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
    obtenerListadoProductos();
    obtenerListadoListas();
  }, []);

  // Datos a exportar al contexto.
  const datosAExportar = {
    listadoProductos,
    listadoListas,
    situacion,
    obtenerListadoProductos,
    obtenerListadoListas,
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
    elementosVisible,
    toggleElementos,
    menuProductosVisible,
    toggleMenuProductos,
    menuListasVisible,
    toggleMenuListas,
    getProducto,
    producto,
    getLista,
    lista,
    cambiarDatosProducto,
    insertProducto,
    updateProducto,
    deleteProducto,
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
