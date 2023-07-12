
import { exportarDIVaPDF } from '../../utils/pdf-functions'
import { MENSAJE } from './mensaje'
import { useContexto } from '../../context/context'
import './cotizacion.css'
import { useFetch } from '../../hooks/useFetch'
import { generarNumeroRemito, formatoMonedas } from '../../utils/name-generator-functions'
import { formateoArgentina } from '../../utils/dates'



export const Cotizacion = () => {

  const env = import.meta.env

  const { productosSeleccionados, cliente, totales, descuento, lista } = useContexto()

  const handClick = async () => {
    if (confirm('se generará un nuevo número de presupuesto. continuar?')) {
      try {
        await insertarNuevoRemitoDB()
        await exportarDIVaPDF('cotizacion', MENSAJE, String(generarNumeroRemito(1, Number(data.ultimo) + 1)))
        window.location.reload()
      } catch (e: any) {
        console.log(e.message())
      }
    }
  }


  const insertarNuevoRemitoDB = async () => {
    const url = env.VITE_SINGLETON + env.VITE_INSERTAR_NUEVO_REMITO
    const dataToSend = {
      numero: Number(data.ultimo) + 1,
      json: [cliente, productosSeleccionados, totales, descuento]
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    }
    return await fetch(url, options)
  }


  const url = env.VITE_SINGLETON + env.VITE_ULTIMO_REMITO
  // @ts-ignore
  const { loading, data } = useFetch(url)

  data ? console.log(data.ultimo) : null




  return (
    <>

      <button type="button" className="btn btn-primary btn-sm mb-2" onClick={handClick}>exportar a PDF</button>

      <div className="cotizacion">
        <div className='uno'>
          <img src="../../../public/imagenes-cotizacion/1-1.png" alt="" />
        </div>
        <div className='dos'>
          <h2>Cotización - Hormigón Elaborado Formosa</h2>
        </div>
        <div className='tres'>
          {
            cliente ?
              (
                <div>
                  CLIENTE: <b> {cliente} </b>
                </div>
              ) : null
          }
          <div>
            FECHA: <b> {formateoArgentina(String(new Date()))} </b>
          </div>
          <div>
            COTIZACIÓN N°: <b> {data ? generarNumeroRemito(1, Number(data.ultimo) + 1) : 'cargando'} </b>
          </div>
          <div>
            LISTA: <b> {lista} </b>
          </div>
        </div>
        <div className='cuatro'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Precio unitario</th>
                <th scope="col">Unidad</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Parcial</th>
              </tr>
            </thead>
            <tbody>
              {
                productosSeleccionados ?
                  productosSeleccionados.map(x => {
                    return (
                      <tr>
                        <td>{x.selected}</td>
                        <td>{formatoMonedas(x.precioU.toFixed(2))}</td>
                        <td>{x.unidad}</td>
                        <td>{x.m3.toFixed(2)}</td>
                        <td>{formatoMonedas((x.precioU * x.m3).toFixed(2))}</td>
                      </tr>
                    )
                  }) : null
              }
            </tbody>
          </table>
        </div>
        <div className='cinco '>
          <p>Neto:
            <b>$ {formatoMonedas(totales.neto)}</b>
          </p>
          <p>I.V.A.
            <b>$ {formatoMonedas(totales.iva)}</b>
          </p>
          <p>Total
            <b>$ {formatoMonedas(totales.total)}</b>
          </p>
          {
            descuento ? (
              <p className='bg-warning'>Con desc. 10% pago contado anticipado
                <b>$ {formatoMonedas(totales.descuento)}</b>
              </p>
            ) : null

          }
        </div>
        <div className='seis'></div>
        <div className='7'></div>
      </div>



    </>
  )
}
