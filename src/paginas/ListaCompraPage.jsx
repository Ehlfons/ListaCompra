import {Fragment} from 'react'
import Listado from '../componentes/Principal/Listado/Listado.jsx'   
import DetailsForms from '../componentes/Principal/DetailsForms/DetailsForms.jsx'

const ListaCompraPage = () => {
  return (
    <Fragment>
        <h2 id='principal-h2'>Listado</h2>
        <section id='info'>
          <Listado/>
          <DetailsForms/>
        </section>
    </Fragment>
  )
}

export default ListaCompraPage