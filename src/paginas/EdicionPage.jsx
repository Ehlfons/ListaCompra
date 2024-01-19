import {Fragment} from 'react'
import Listado from '../componentes/Principal/Listado/Listado.jsx'
import DetailsForms from '../componentes/Principal/DetailsForms/DetailsForms.jsx'

const EdicionPage = () => {
  return (
    <Fragment>
      <h2>Edición de Productos</h2>
      <div className='info'>
        <Listado/>
        <DetailsForms/>
      </div>
    </Fragment>
  )
}

export default EdicionPage