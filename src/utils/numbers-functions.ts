export const soloAceptarNumerosYPuntos = (n: string): number => {
    // Eliminar cualquier caracter que no sea un número, un punto o una coma
    let newValue = n.replace(/[^0-9.,]/g, '');
  
    // Reemplazar las comas por puntos
    newValue = newValue.replace(/,/g, '.');
  
    // Asegurarnos de que solo haya un punto decimal
    newValue = newValue.replace(/\.(?=.*\.)/g, '');
  
    return Number(newValue);
  };
  