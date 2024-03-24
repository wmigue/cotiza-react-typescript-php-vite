
import './cotizador.css'
import { Clientes } from '../Clientes'
import { Layout } from '../Layout'
import { Nav } from '../Nav'
import { Productos } from '../Productos'
import 'bootstrap/dist/css/bootstrap.min.css'



export default function Cotizador() {

  return (
    <>

      <Layout>
        <Clientes />
        <Productos />
      </Layout>
      <Nav />

    </>
  )

}


