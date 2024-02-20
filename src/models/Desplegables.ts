export interface Desplegables {
    condicion_pago: string,
    autorizado: string,
    fecha_desde: string,
    fecha_hasta: string,
    iva_tipo: number
}

export const initialValuesDesplegables = { condicion_pago: "", autorizado: "", fecha_desde: "", fecha_hasta: "", iva_tipo: 0.21 }