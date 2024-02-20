export const soloAceptarNumerosYPuntos = (n: string): number => {
  // Eliminar cualquier caracter que no sea un número, un punto o una coma
  let newValue = n.replace(/[^0-9.,]/g, '')

  // Reemplazar las comas por puntos
  newValue = newValue.replace(/,/g, '.')

  // Asegurarnos de que solo haya un punto decimal
  newValue = newValue.replace(/\.(?=.*\.)/g, '')

  return Number(newValue)
}



export const FormatearMoneda1 = (importe: string | number): string => {
  const x = Number(importe)
  // Formatear como moneda en dólares estadounidenses
  const formatoUSD = x.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  // console.log(formatoUSD) // Mostrará "$1,234.56" si estás en la configuración de idioma inglés en tu navegador
  return formatoUSD

}