
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"
import { v4 as uuidv4 } from 'uuid'
import { ProductOC } from "../models/ProductOC"
import { TotalSinDescuento } from "../models/Total"
import { Desplegables } from "../models/Desplegables"
import { AutorizadoRetiradoEntregado } from "../models/AutorizadoRetiradoEntregado"


interface Props {
    children: ReactNode
}




export interface ContextValueInterface {
    ocNumero: string
    setOCNumero: Dispatch<SetStateAction<string>>
    comentario: string | number
    setComentario: Dispatch<SetStateAction<string | number>>
    nota_pedido: number
    setNota_Pedido: Dispatch<SetStateAction<number>>
    presupuesto_nro: string
    setPresupuesto_nro: Dispatch<SetStateAction<string>>
    productos: ProductOC[]
    setProductos: Dispatch<SetStateAction<ProductOC[]>>
    totales: TotalSinDescuento
    setTotales: Dispatch<SetStateAction<TotalSinDescuento>>
    retirado: AutorizadoRetiradoEntregado,
    setRetirado: Dispatch<SetStateAction<AutorizadoRetiradoEntregado>>
    desplegables: Desplegables
    setDesplegables: Dispatch<SetStateAction<Desplegables>>
    setProveedores: Dispatch<SetStateAction<string>>
    proveedores: string

}

const initialValuesProduct = [{ id: uuidv4(), cantidad: 0, descripcion: "", precio: 0, observacion: "", unidad:"tn", parcial:0 }]
const initialValuesTotales = { neto: 0, total: 0, iva: 0 }
const initialValuesRetirado = { autorizado: "", retirado: "", entregado: "" }
const initialValuesDesplegables = { condicion_pago: "", autorizado: "", fecha_desde: "", fecha_hasta: "", iva_tipo: 0.21 }
const initialValuesProveedores = ""


export const MiContextoOC = createContext<ContextValueInterface>(
    {
        ocNumero: "",
        setOCNumero: () => { },
        comentario: "",
        setComentario: () => { },
        nota_pedido: 0,
        setNota_Pedido: () => { },
        presupuesto_nro: "",
        setPresupuesto_nro: () => { },
        productos: initialValuesProduct,
        setProductos: () => { },
        totales: initialValuesTotales,
        setTotales: () => { },
        retirado: initialValuesRetirado,
        setRetirado: () => { },
        desplegables: initialValuesDesplegables,
        setDesplegables: () => { },
        proveedores: initialValuesProveedores,
        setProveedores: () => { },

    }
)




export const ContextoProviderOC = ({ children }: Props) => {
    const [ocNumero, setOCNumero] = useState("")
    const [comentario, setComentario] = useState<string | number>("")
    const [nota_pedido, setNota_Pedido] = useState(0)
    const [presupuesto_nro, setPresupuesto_nro] = useState("")
    const [productos, setProductos] = useState(initialValuesProduct)
    const [totales, setTotales] = useState(initialValuesTotales)
    const [retirado, setRetirado] = useState(initialValuesRetirado)
    const [desplegables, setDesplegables] = useState(initialValuesDesplegables)
    const [proveedores, setProveedores] = useState(initialValuesProveedores)

    return (
        <MiContextoOC.Provider value={{ comentario, setComentario, nota_pedido, setNota_Pedido, presupuesto_nro, setPresupuesto_nro, productos, setProductos, totales, setTotales, retirado, setRetirado, desplegables, setDesplegables, proveedores, setProveedores, ocNumero, setOCNumero }}>
            {children}
        </MiContextoOC.Provider >
    )
}

export const useContextoOC = () => {
    const context = useContext(MiContextoOC)
    if (context === undefined) {
        throw new Error('Contexto must be used within a Provider')
    }
    return context
}



