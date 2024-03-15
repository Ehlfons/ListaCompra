import {Fragment} from 'react'
import FormularioProductos from '../componentes/Principal/Formulario/FormularioProductos.jsx'

const CreacionPage = () => {
  return (
    <Fragment>
        <h2 id='principal-h2'>Creación de productos <em>(Añade un nuevo producto al listado)</em></h2>
        <FormularioProductos crear={true}/> {/* Paramétro para cambiar la funcionalidad del formulario e indicar que el formulario será de creación. */}
    </Fragment>
  )
}

export default CreacionPage