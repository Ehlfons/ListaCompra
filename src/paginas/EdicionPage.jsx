import {Fragment} from 'react'
import Listado from '../componentes/Principal/Listado/Listado.jsx'
/* import DetailsForms from '../componentes/Principal/DetailsForms/DetailsForms.jsx'
 */
import FormularioProductos from '../componentes/Principal/Creacion/FormularioProductos.jsx'
const EdicionPage = () => {
  return (
    <Fragment>
      <h2>Edición de Productos</h2>
      <div className='info'>
        <Listado/>
        <FormularioProductos crear={false}/>
        {/* <DetailsForms/> */}
      </div>
    </Fragment>
  )
}

export default EdicionPage