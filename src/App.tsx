
import './App.css'
import { Clientes } from './components/Clientes'
import { Layout } from './components/Layout'
import { Productos } from './components/Productos'

function App() {
  return (
    <Layout>
      <Clientes />
      <Productos />
    </Layout>
  )

}

export default App
