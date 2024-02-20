

export const generarNumeroRemito = (prefijo: string, talonario: number, numero_remito: number) => {
    const inicial = "00000000"
    const resultado = (parseInt(inicial) + numero_remito).toString().padStart(inicial.length, "0")
    // console.log('0'+talonario+'-' + resultado)
    return (prefijo + '0' + talonario + '-' + resultado)
}



export const formatoMonedas = (numero: number | string) => {
    if (typeof numero === 'string') {
        return Number(numero).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }
    return numero.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}





export function getTextoAntesDelGuion(texto: string) {
    const pos = texto.indexOf('-')
    return texto.split('').splice(0, pos - 1).join('')
}

