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
import { NumeroALetras } from '../../utils/numeroALetras'


const env = import.meta.env

export const Cotizacion = () => {

  const [numero, setNumero] = useState('por emitir')
  // @ts-ignore
  const [loader, setLoader] = useState(false)

  const { productosSeleccionados, cliente, totales, descuento, lista, localidadTemp, setCliente } = useContexto()


  const handClick = async () => {
    if (confirm('se generará un nuevo número de presupuesto. continuar?')) {
      setLoader(true)
      try {
        const num = await getNumeroCotizacionAAsignar()
        setNumero(String(num))
        await insertarNuevoRemitoDB(num)
        await exportarDIVaPDF('cotizacion', MENSAJE, String(generarNumeroRemito('COTIZACION_', 1, num)))
        //  window.location.reload()
        await reiniciarValoresCotizacion()
        setLoader(false)
      } catch (e: any) {
        alert("ERROR:" + e)
        console.error(e)
      }
    }
  }


  const reiniciarValoresCotizacion = async () => {
    try {
      // setProductosSeleccionados(prev => prev)
      // setTotales(prev => prev)
      setCliente("")
      setNumero("por emitir")
    } catch (e) {
      alert(e)
      return 0
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
    try {
      return await fetch(url, options)
    } catch (e) {
      alert(e)
      return 0
    }
  }



  const getNumeroCotizacionAAsignar = async (): Promise<number> => {
    try {
      const url = env.VITE_SINGLETON + env.VITE_ULTIMO_REMITO
      const data = await fetch(url)
      const res = await data.json()
      const ultimo = Number(await res.ultimo)
      return ultimo + 1
    } catch (e: any) {
      console.log(e)
      alert(e)
      return 0
    }

  }









  return (
    <>

      <button type="button" className="btn btn-primary btn-sm mb-2" onClick={handClick}>exportar a PDF</button>

      <div className="cotizacion">
        <div className='uno'>
          <img src="../../../public/imagenes-cotizacion/1-2.png" alt="" />
        </div>
        <div className='dos'>
          <h4>Cotización - Hormigón Elaborado Formosa</h4>
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
            FECHA:  {formateoArgentina(String(new Date()))}
          </div>
          <div>
            COTIZACIÓN N°: {numero}
          </div>
          <div>
            LISTA: {lista}
          </div>
          <div>
            DESTINO:  {localidadTemp}
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
                        <td>$ {formatoMonedas(x.precioU.toFixed(2))}</td>
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
          <div>
            <img src="../../../public/iso-norma.jpeg" width={150} alt="" />
          </div>

          <div>
            <p>NETO:
              <b> $ {formatoMonedas(totales.neto)}</b>
            </p>
            <p>I.V.A.:
              <b> $ {formatoMonedas(totales.iva)}</b>
            </p>
            <p>TOTAL:
              <b> $ {formatoMonedas(totales.total)}</b>
            </p>
            {
              descuento ? (
                <p className='bg-warning'>

                  <em>Con desc. 10% pago contado anticipado:
                    <b> $ {formatoMonedas(totales.descuento)}</b>
                  </em>

                </p>
              ) : null

            }
            <div>

            </div>
            <div className={
              descuento ? 'aletras margenTextoTotal2' : 'aletras margenTextoTotal1'
            }>
              <b  >SON PESOS: &nbsp;
                {
                  descuento ? NumeroALetras(totales.descuento, false) : NumeroALetras(totales.total, false)
                }.
              </b>
            </div>
          </div>

        </div>
        <div className='seis'></div>
        <div className='7'></div>
      </div >

      {
        < Modalizar show={loader} setShow={setLoader} >
          <Layout>
            <Loader />
            generando cotización
          </Layout>
        </Modalizar >
      }

    </>
  )
}
