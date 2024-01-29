import {Fragment} from 'react';
import Listado from '../componentes/Principal/Listado/Listado.jsx';
import ListarListas from '../componentes/Principal/ListadoListas/ListarListas/ListarListas.jsx';

const ListasPage = () => {
  return (
    <Fragment>
      <h2 id='principal-h2'>Listas</h2>
      <div className='listas-productos'>
        <ListarListas/>
      </div>
        <Listado/>
    </Fragment>
  )
}

export default ListasPage