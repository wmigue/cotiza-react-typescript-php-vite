import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportarDIVaPDF = (selectorDivAExoportar: string, textoAdicional: string, nombreFile: string): Promise<void> => {

  return new Promise((resolve, reject) => {
    
    const options = {
      scale: 1,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 3,
    };

    const element = document.querySelector('.' + selectorDivAExoportar);
    if (element instanceof HTMLElement) {
      // Mostrar el loading aquí
      console.log('espere, generando el pdf...');

      html2canvas(element, options)
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.setFontSize(5);
          const maxWidth = 190;
          const lines = pdf.splitTextToSize(textoAdicional, maxWidth);
          pdf.text(lines, 10, imgHeight);

          pdf.save(nombreFile + '.pdf');

          // Ocultar el loading después de completar la generación del PDF
          console.log('se genero el pdf con exito');

          resolve(); // Resuelve la promesa cuando se completa la generación del PDF
        })
        .catch(error => {
          // Manejar el error aquí
          console.error('Error al generar el PDF:', error);
          // Ocultar el loading en caso de error
          console.log('hubo un error en la generacion del pdf');

          reject(error); // Rechaza la promesa en caso de error
        });
    } else {
      const error = new Error('No se encontró el elemento del selector proporcionado.');
      console.error('Error al generar el PDF:', error);
      reject(error); // Rechaza la promesa si no se encuentra el elemento
    }
  });
};
