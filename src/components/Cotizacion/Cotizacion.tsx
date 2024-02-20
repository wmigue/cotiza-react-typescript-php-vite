import { useState } from 'react'
import { exportarDIVaPDF } from '../../utils/pdf-functions'
import { MENSAJE } from './mensaje'
import { useContexto } from '../../context/context'
import './cotizacion.css'
import { generarNumeroRemito, formatoMonedas } from '../../utils/name-generator-functions'
import { formateoArgentina } from '../../utils/dates'
import Modalizar from '../Modal/Modal'
import Loader from '../Loader.tsx/Loader'
import { Layout } from '../../templates/Layout/Layout'


const env = import.meta.env

export const Cotizacion = () => {

  const [numero, setNumero] = useState('por emitir')
  // @ts-ignore
  const [loader, setLoader] = useState(false)

  const { productosSeleccionados, cliente, totales, descuento, lista, localidadTemp } = useContexto()

  const handClick = async () => {
    if (confirm('se generará un nuevo número de presupuesto. continuar?')) {
      setLoader(true)
      try {
        const num = await getNumeroCotizacionAAsignar()
        setNumero(String(num))
        await insertarNuevoRemitoDB(num)
        await exportarDIVaPDF('cotizacion', MENSAJE, String(generarNumeroRemito('COTIZACION_', 1, num)))
        window.location.reload()
        setLoader(false)
      } catch (e: any) {
        console.log(e)
      }
    }
  }


  const insertarNuevoRemitoDB = async (num: number) => {
    const url = env.VITE_SINGLETON + env.VITE_INSERTAR_NUEVO_REMITO
    const dataToSend = {
      numero: num,
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



  const getNumeroCotizacionAAsignar = async (): Promise<number> => {
    const url = env.VITE_SINGLETON + env.VITE_ULTIMO_REMITO
    const data = await fetch(url)
    const res = await data.json()
    const ultimo = Number(res.ultimo)
    return ultimo + 1
  }









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
            COTIZACIÓN N°: <b> {numero} </b>
          </div>
          <div>
            LISTA: <b> {lista} </b>
          </div>
          <div>
            DESTINO: <b> {localidadTemp} </b>
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
                        <td>$ {formatoMonedas((x.precioU * x.m3).toFixed(2))}</td>
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

      {
        <Modalizar show={loader} setShow={setLoader}>
          <Layout>
            <Loader />
            generando cotización
          </Layout>
        </Modalizar>
      }

    </>
  )
}
