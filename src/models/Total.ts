export interface Total {
    neto: number,
    total: number,
    iva: number,
    descuento: number
}

export type TotalSinDescuento = Omit<Total, 'descuento'>

export const initialValuesTotalSinDescuento = { neto: 0, total: 0, iva: 0 }