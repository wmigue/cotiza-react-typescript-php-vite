import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const tipoImg: string = 'jpeg'

export const exportarDIVaPDF = (
  selectorDivAExoportar: string,
  textoAdicional: string = "",
  nombreFile: string,
  necesitoDuplicado: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const options = {
      scale: 1,
      quality: 4,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
    }

    let imgWidth = 0
    let imgHeight = 0

    const element = document.querySelector('.' + selectorDivAExoportar)
    if (element instanceof HTMLElement) {
      console.log('Espere, generando el PDF...')
      html2canvas(element, options)
        .then(canvas => {
          const imgData = canvas.toDataURL('image/' + tipoImg)
          const pdf = new jsPDF('p', 'mm', 'A4', false)
          if (necesitoDuplicado === true) {
            imgWidth = pdf.internal.pageSize.getWidth()
            imgHeight = pdf.internal.pageSize.getHeight()
          } else {
            imgWidth = 210
            imgHeight = (canvas.height * imgWidth) / canvas.width
          }
          pdf.addImage(imgData, tipoImg, 0, 0, imgWidth, imgHeight)
          pdf.setFontSize(5)
          const maxWidth = 190
          const lines = pdf.splitTextToSize(textoAdicional, maxWidth)
          pdf.text(lines, 10, imgHeight)

          if (necesitoDuplicado === true) {
            // Agregar segunda página al PDF
            // Modificar el contenido antes de capturar para la segunda página
            //en caso de querer un duplicado con la misma informacion, solo cambiando el texto a "duplicado"
            pdf.addPage()
            const elementoItalizar = document.querySelector('.italizar')
            if (elementoItalizar instanceof HTMLElement) {
              elementoItalizar.innerHTML = 'DUPLICADO'
            } else {
              console.error('El elemento con la clase .italizar no fue encontrado.')
            }
            html2canvas(element, options)
              .then(secondPageCanvas => {
                const secondPageImgData = secondPageCanvas.toDataURL('image/' + tipoImg)
                pdf.addImage(secondPageImgData, tipoImg, 0, 0, imgWidth, imgHeight)
                // Restaurar el contenido original después de la generación del PDF
                const elementoItalizar = document.querySelector('.italizar')
                if (elementoItalizar instanceof HTMLElement) {
                  elementoItalizar.innerHTML = 'ORIGINAL'
                } else {
                  console.error('El elemento con la clase .italizar no fue encontrado.')
                }
                pdf.save(nombreFile + '.pdf')
                resolve()
              })
              .catch(secondPageError => {
                console.error('Error al generar la segunda página:', secondPageError)
                reject(secondPageError)
              })
          } else {
            pdf.setFontSize(5)
            const maxWidth = 190
            const lines = pdf.splitTextToSize(textoAdicional, maxWidth)
            pdf.text(lines, 10, imgHeight)
            pdf.save(nombreFile + '.pdf')
            console.log('Se generó el PDF con éxito')
            resolve()
          }
        })
        .catch(error => {
          console.error('Error al generar el PDF:', error)
          console.log('Hubo un error en la generación del PDF')
          reject(error)
        })
    } else {
      const error = new Error('No se encontró el elemento del selector proporcionado.')
      console.error('Error al generar el PDF:', error)
      reject(error)
    }
  })
}
