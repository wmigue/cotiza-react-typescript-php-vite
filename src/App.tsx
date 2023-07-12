
import './App.css'
import { Clientes } from './components/Clientes'
import { Layout } from './components/Layout'
import { Productos } from './components/Productos'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Layout>
      <Clientes />
      <Productos />
    </Layout>
  )

}

export default App
