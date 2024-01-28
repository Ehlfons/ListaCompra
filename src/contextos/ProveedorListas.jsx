import { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const ContextoListas = createContext();

const ProveedorListas = ({ children }) => {
  // Valores iniciales.
  const arrayInicial = [];
  const cadenaInicial = "";
  const valoresInicialesLista = {
    lista_nombre: "",
  };

  // Estados.
  const [listadoListas, setListadoListas] = useState(arrayInicial);
  const [lista, setLista] = useState(valoresInicialesLista);
  const [situacion, setSituacion] = useState(cadenaInicial);
  const [productosLista, setProductosLista] = useState(arrayInicial);

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

  const getProductosLista = async (lista_id) => {
    try {
      const { data, error } = await supabaseConexion
        .from("productos_lista_compra")
        .select(
          `
          cantidad,
          productos (
            id,
            nombre,
            peso,
            precio,
            imagen,
            descripcion
          )`
        )
        .eq("lista_id", lista_id);

      if (error) {
        throw error;
      }

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

  // Función para eliminar una lista.
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
  
        // Borrar el formulario tras la creación de la lista.
        setLista(valoresInicialesLista);
  
        // Actualizar el estado "listadoListas" para que aparezca la nueva lista.
        setListadoListas([...listadoListas, lista]);
  
        // Actualizar el listado de listas con los nuevos cambios.
        obtenerListadoListas();
      } catch (error) {
        setSituacion(`Error al crear la lista: ${error.message}`);
      }
    };

    const insertProductoLista = async (producto_id, lista_id) => {
      try {
        const { error } = await supabaseConexion
          .from("productos_lista_compra")
          .insert({
            producto_id,
            lista_id,
            cantidad: 1
          });
  
        if (error) {
          throw error;
        }
  
        // Actualizar el listado de listas con los nuevos cambios.
        getProductosLista(lista_id);
      } catch (error) {
        setSituacion(`Error al crear la lista: ${error.message}`);
      }
    }

    const createLista = (nuevoValor) => {
      setLista({
        ...lista,
        lista_nombre: nuevoValor,
      });
    }

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
    insertProductoLista,
    createLista
  };

  return (
    <ContextoListas.Provider value={datosAExportar}>
      {children}
    </ContextoListas.Provider>
  );
};

export default ProveedorListas;
export { ContextoListas };
