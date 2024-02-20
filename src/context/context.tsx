
import { createContext, useContext, useState, ReactNode } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Total } from "../models/Total"
import { Product } from "../models/Product"


interface Props {
    children: ReactNode
}


interface ContextValue {
    productosSeleccionados: Product[]
    setProductosSeleccionados: React.Dispatch<React.SetStateAction<Product[]>>
    cliente: string,
    setCliente: React.Dispatch<React.SetStateAction<string>>
    totales: Total,
    setTotales: React.Dispatch<React.SetStateAction<Total>>
    descuento: boolean,
    setDescuento: React.Dispatch<React.SetStateAction<boolean>>
    lista: number
    setLista: React.Dispatch<React.SetStateAction<number>>
    localidadTemp:string
    setLocalidadTemp: React.Dispatch<React.SetStateAction<string>>
}


const initialValuesProduct = [
    {
        id: uuidv4(),
        selected: "",
        m3: 1,
        precioU: 0,
        unidad: ''
    }
]


const initialValuesTotales = {
    neto: 0,
    total: 0,
    iva: 0,
    descuento: 0
}



export const MiContexto = createContext<ContextValue>(
    {
        productosSeleccionados: [],
        setProductosSeleccionados: () => { },
        cliente: '',
        setCliente: () => { },
        totales: initialValuesTotales,
        setTotales: () => { },
        descuento: false,
        setDescuento: () => { },
        lista: 0,
        setLista: () => { },
        localidadTemp:'',
        setLocalidadTemp:()=>{}

    }
)


export const ContextoProvider = ({ children }: Props) => {
    // const [autenticado, setAutenticado] = useState(0)
    const [productosSeleccionados, setProductosSeleccionados] = useState(initialValuesProduct)
    const [cliente, setCliente] = useState<string>('')
    const [totales, setTotales] = useState(initialValuesTotales)
    const [descuento, setDescuento] = useState<boolean>(false)
    const [lista, setLista] = useState<number>(0)
    const [localidadTemp, setLocalidadTemp] = useState<string>('Formosa')
    return <MiContexto.Provider value={{ productosSeleccionados, setProductosSeleccionados, cliente, setCliente, totales, setTotales, descuento, setDescuento, lista, setLista, localidadTemp, setLocalidadTemp }}>
        {children}
    </MiContexto.Provider>
}

export const useContexto = () => {
    const context = useContext(MiContexto)
    if (context === undefined) {
        throw new Error('Contexto must be used within a Provider')
    }
    return context
}