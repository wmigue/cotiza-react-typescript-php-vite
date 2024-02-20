

//distancia en dias entre hoy y la fecha pasada por parametro
export const diasRestantes = (fecha: string) => {
    const today = new Date()
    var fechaEspecifica = new Date(fecha) //string
    var diferencia = fechaEspecifica.getTime() - today.getTime()
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
    return dias
}






//en liimite establecemos la distancia requerida para considerar al evento como cercano.
//formato array: ' [{"id":1,"title":"soy admin","start":"2023-04-06T01:30","end":"2023-04-06T01:30"},{"id":2,"title":"soy admin 13","start":"2023-04-13T01:00","end":"2023-04-13T01:00"},{"id":3,"title":"22 tengo un evento","start":"2023-04-22T18:30","end":"2023-04-22T18:30"}] '
//devuelve array con fechas que coinciden.
export const eventosCercanos = (limite: number, arrFechas: Array<any>) => {
    let toAccum: any = ''
    const today = new Date()
    const res = arrFechas.reduce((acc, x) => {
        var fechaEspecifica = new Date(x.start) //string
        var diferencia = fechaEspecifica.getTime() - today.getTime()
        var distancia = Math.floor(diferencia / (1000 * 60 * 60 * 24))
        if (distancia >= 0 && distancia <= limite) {
            //console.log(distancia + ' dias');
            toAccum = [...acc, x]
        }
        return toAccum
    }, [])
    return res
}




// @ts-ignore
// se pasa un string con este param: 2023-04-04, 11, 55
// devuelve: 2023-04-24T01:30
const formateoFechaParaFullCalendar = (dateStr: string, horas: string, minutos: string) => {
    let dia = dateStr + 'T' + horas + ':' + minutos
    return dia
}




//recibe fecha string '2023-04-22T18:30'
//retorna "sábado, 22 de abril de 2023 18:30 GMT-3"
export const formateoArgentina = (fechaString: string) => {
    const fecha = new Date(fechaString)
    const options: object = {
        // weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
        //timeZoneName: 'short'
    }
    const formatter = new Intl.DateTimeFormat('es-AR', options)
    const fechaFormateada = formatter.format(fecha)
    return fechaFormateada
}



// retorna: lunes, 11 de dic de 2023, 21:00
export const formateoDates = (fecha: string) => {
    // Crear una instancia de Date con la fecha proporcionada
    //const fecha = new Date('2023-11-14T20:40:00')
    const f = new Date(fecha)

    // Obtener la representación localizada de la fecha y la hora
    const fechaFormateada = f.toLocaleString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
    })
    return fechaFormateada
}


// retorna: 01/01/1111
export const formateoDates2 = (fecha: string | Date) => {
    let f
    if (fecha instanceof Date) {
        f = fecha
    } else {
        //horaActual se asegura que no me reste ni me sume dias a la fecha, por un tema regional de la computadora.
        const horaActual = "T00:00:00"
        f = new Date(fecha + horaActual)

    }
    // Obtener la representación localizada de la fecha y la hora
    const fechaFormateada = f.toLocaleString('es-AR', {
        day: 'numeric',
        year: 'numeric',
        month: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
    })
    return fechaFormateada
}
