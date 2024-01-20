import {Fragment} from 'react'
import FormularioProductos from '../componentes/Principal/Creacion/FormularioProductos.jsx'

const CreacionPage = () => {
  return (
    <Fragment>
        <h2 id='principal-h2'>Creación de productos</h2>
        <FormularioProductos crear={true}/>
    </Fragment>
  )
}

export default CreacionPage