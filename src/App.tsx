import { useState } from 'react'
import { Login } from './components/login/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { OrdenCompra } from './components/OrdenCompra'
import Cotizador from './components/cotizador/Cotizador'
import { IsAuth } from './components/isAuth.tsx/isAuth'
import { ContextoProvider } from './context/context'
import { ContextoProviderOC } from './context/context-orden-compra'


export default function App() {

    const [valido, setvalido] = useState<boolean>(false)

    return (

        <>

            <BrowserRouter>
                <Routes>
                    <Route index path='/' element={<Login setValido={setvalido} />} />
                    <Route path='/login' element={<Login setValido={setvalido} />} />
                    <Route element={<IsAuth valido={valido} />} >
                        <Route path='/cotizador' element={<ContextoProvider><Cotizador /></ContextoProvider>} />
                        <Route path='/orden-compra' element={<ContextoProviderOC><OrdenCompra /></ContextoProviderOC>} />
                    </Route>
                </Routes >
            </BrowserRouter>


        </>


    )
}

