import {Fragment} from 'react'
import CreacionProductos from '../Creacion/CreacionProductos.jsx'
import './DetailsForms.css'

const DetailsForms = () => {
  return (
    <Fragment>
      <div id='detailsforms'>
        <h2 id="detailsforms-h2">Detalles y Formularios</h2>
        <CreacionProductos crear='false' />
      </div>
    </Fragment>
  )
}

export default DetailsForms