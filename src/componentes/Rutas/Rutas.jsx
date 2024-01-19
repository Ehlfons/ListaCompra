import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../paginas/Inicio.jsx";
import Error from "../../paginas/Error.jsx";
import ListaCompraPage from "../../paginas/ListaCompraPage.jsx";
import CreacionPage from "../../paginas/CreacionPage.jsx";
import EdicionPage from "../../paginas/EdicionPage.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/ListaCompra' element={<ListaCompraPage />} />
        <Route path='/Creacion' element={<CreacionPage />} />
        <Route path='/Edicion' element={<EdicionPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;