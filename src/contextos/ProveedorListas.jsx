import { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const ContextoListas = createContext();

const ProveedorListas = ({ children }) => {
  // Valores iniciales.
  const arrayInicial = [];
  const cadenaInicial = "";
  const valoresInicialesLista = {
    lista_nombre: null,
  };

  // Estados.
  const [listadoListas, setListadoListas] = useState(arrayInicial);
  const [lista, setLista] = useState(valoresInicialesLista); // Estado para guardar los datos de la lista.
  const [idListaActual, setIdListaActual] = useState(cadenaInicial); // Estado para guardar el ID de la lista actual.
  const [situacion, setSituacion] = useState(cadenaInicial);
  const [productosLista, setProductosLista] = useState(arrayInicial); // Estado para guardar los productos de la lista.
  const [erroresLista, setErroresLista] = useState(arrayInicial); // Estado para guardar los errores de la creación de la lista.
  const [cantidad, setCantidad] = useState(cadenaInicial);

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

  // Función para obtener los productos de la lista.
  const getProductosLista = async (lista_id) => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos_lista_compra")
        .select(
          // Se obtienen los productos de la lista con el id indicado, y la cantidad de cada producto.
          `
          cantidad, 
          productos (
            *
          )`
        )
        .eq("lista_id", lista_id);

      if (error) {
        throw error;
      }

      // Se actualiza el estado con los nuevos datos.
      setProductosLista(data);
    } catch (error) {
      setSituacion(`Error al obtener productos de la lista: ${error.message}`);
    }
  };

  // Función para eliminar una lista.
  const deleteLista = async (lista_id) => {
    try {
      const { error } = await supabaseConexion
        .from("lista_compra")
        .delete()
        .eq("lista_id", lista_id); // Se borra la lista con el id indicado.

      if (error) {
        throw error;
      }

      // Se crea un nuevo array sin la lista eliminada.
      const listasFiltradas = listadoListas.filter(
        (lista) => lista.lista_id !== lista_id
      );

      // Se actualiza el estado con los nuevos datos.
      setListadoListas(listasFiltradas);
    } catch (error) {
      setSituacion(`Error al eliminar el producto: ${error.message}`);
    }
  };

  // Función para eliminar un producto de la lista.
  const deleteProductoLista = async (producto_id, lista_id) => {
    try {
      const { error } = await supabaseConexion
        .from("productos_lista_compra")
        .delete()
        .eq("producto_id", producto_id) // Se borra el producto de la lista con el id indicado.
        .eq("lista_id", lista_id);

      if (error) {
        throw error;
      }

      // Se crea un nuevo array sin el producto eliminado.
      const productosListaFiltrados = productosLista.filter(
        (producto) => producto.producto_id !== producto_id
      );

      // Se actualiza el estado con los nuevos datos.
      setProductosLista(productosListaFiltrados);

      // Actualizar los productos de la lista con los nuevos cambios.
      getProductosLista(lista_id);
    } catch (error) {
      setSituacion(`Error al eliminar el producto: ${error.message}`);
    }
  };

  // Función para insertar la nueva lista en la base de datos.
  const insertLista = async () => {
    try {
      const { error } = await supabaseConexion
        .from("lista_compra")
        .insert(lista);

      if (error) {
        throw error;
      }

      // Actualizar el estado "listadoListas" para que aparezca la nueva lista.
      setListadoListas([...listadoListas, lista]);

      // Borrar el formulario tras la creación de la lista.
      setLista(valoresInicialesLista);

      // Borrar el listado de productos de la lista.
      setProductosLista(arrayInicial);

      // Actualizar el listado de listas con los nuevos cambios.
      obtenerListadoListas();
    } catch (error) {
      setSituacion(`Error al crear la lista: ${error.message}`);
    }
  };

  // Función para verificar si el producto ya está en la lista.
  const verificarProductoEnLista = async (producto_id, lista_id) => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos_lista_compra")
        .select()
        .eq("producto_id", producto_id)
        .eq("lista_id", lista_id);

      if (error) {
        throw error;
      }

      // Si hay datos, significa que el producto ya está en la lista.
      if (data && data.length > 0) {
        setSituacion("El producto ya está en la lista.");
      }
    } catch (error) {
      setSituacion(
        `Error al verificar el producto en la lista: ${error.message}`
      );
    }
  };

  // Función para insertar el producto en la lista.
  const insertProductoListaCantidad = async (producto_id, lista_id, cantidad) => {
    try {
      // Insertar el producto en la lista.
      const { data, error } = await supabaseConexion
        .from("productos_lista_compra")
        .select("*")
        .eq("lista_id", lista_id)
        .eq("producto_id", producto_id);

      if (error) {
        throw error;
      } else {
        getProductosLista(lista_id);

        if (data && data.length > 0) {
          const newCantidad = parseFloat(data[0].cantidad) + parseFloat(cantidad);
          await supabaseConexion
            .from("productos_lista_compra")
            .update({ cantidad: newCantidad })
            .match({ lista_id, producto_id });
        } else {
          await supabaseConexion
            .from("productos_lista_compra")
            .insert({ lista_id, producto_id, cantidad });
        }
      }
      // Actualizar los productos de la lista con los nuevos cambios.
      getProductosLista(lista_id);
    } catch (error) {
      setSituacion(`Error al crear la lista: ${error.message}`);
    }
  };

  // Función para validar el formulario.
  const validarFormulario = (lista) => {
    const errores = {}; // Objeto para almacenar los errores.

    // Validar el nombre de la lista.
    if (!lista.lista_nombre || lista.lista_nombre.trim() === "") {
      errores.lista_nombre = "El nombre de la lista es obligatorio.";
    }

    const esValido = Object.keys(errores).length === 0; // Si el objeto "errores" está vacío, es porque no hay errores.

    return { esValido, errores };
  };

  // Función para actualizar el nombre de la lista.
  const createLista = (nuevoValor) => {
    setLista({
      ...lista,
      lista_nombre: nuevoValor, // Se actualiza el nombre de la lista.
    });
  };

  // Función para actualizar el ID de la lista actual.
  const actualizarIdListaActual = (nuevoValor) => {
    setIdListaActual(nuevoValor);
  };

  // Función para actualizar los errores de la lista.
  const actualizarErroresLista = (nuevoValor) => {
    setErroresLista(nuevoValor);
  }

  // Función para actualizar la cantidad de productos de la lista.
  const actualizarCantidad = (nuevoValor) => {
    setCantidad(nuevoValor);
  };

  // Efecto para obtener el listado de Listas.
  useEffect(() => {
    obtenerListadoListas();
  }, []);

  // Datos a exportar al contexto.
  const datosAExportar = {
    listadoListas,
    lista,
    situacion,
    obtenerListadoListas,
    getProductosLista,
    productosLista,
    deleteLista,
    deleteProductoLista,
    insertLista,
    createLista,
    actualizarIdListaActual,
    idListaActual,
    erroresLista,
    actualizarErroresLista,    
    validarFormulario,
    cantidad,
    actualizarCantidad,
    insertProductoListaCantidad,
  };

  return (
    <ContextoListas.Provider value={datosAExportar}>
      {children}
    </ContextoListas.Provider>
  );
};

export default ProveedorListas;
export { ContextoListas };