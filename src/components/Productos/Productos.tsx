
import React, { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import { v4 as uuidv4 } from 'uuid'
import './productos.css'
import { useContexto } from "../../context/context"
import { soloAceptarNumerosYPuntos } from "../../utils/numbers-functions"
import { Product } from "../../models/Product"


interface PickProduct extends Pick<Product, "selected" | "m3" | "precioU"> {
  nombre: string;
  unidad: string;
  precio: string;
}


const env = import.meta.env


//rellenar select de volumenes
// const rellenarM3 = () => {
//   let items = [];
//   for (let i = 1; i < 1000; i += 0.1) {
//     items.push(<option key={i} value={i}>{i.toFixed(1)}</option>)
//   }
//   return items
// }


//si mayorOmenor =1 sumar cargo , de lo contrario quitar precio.
//distancia equivale a cuantas veces multiplicar por 0.5%
const calcularDistanciaEntreListas = (linicial: number, lactual: number) => {
  let distancia = 0
  let mayorOmenor = 0
  if (lactual > linicial) {
    distancia = lactual - linicial
    mayorOmenor = 1
  }
  if (lactual < linicial) {
    distancia = linicial - lactual
    mayorOmenor = -1
  }
  if (lactual == linicial) {
    distancia = 0
    mayorOmenor = 0
  }
  return { distancia, mayorOmenor }
}



export const Productos = () => {
  const url = env.VITE_SINGLETON + env.VITE_DOSIFICACIONES
  const { loading, data } = useFetch(url)
  const [listaInicial, setListaInicial] = useState<number>(0)
  const [subiendoBajando, setSubiendoBajando] = useState<number>(0)

  const { productosSeleccionados, setProductosSeleccionados, setTotales, setDescuento, lista, setLista } = useContexto()


  const incrementLista = async () => {
    setLista(prevLista => Number(prevLista) + 1)
    setSubiendoBajando(1)

  }

  const decrementLista = () => {
    setLista(prevLista => Number(prevLista) - 1)
    setSubiendoBajando(-1)
  }

  useEffect(() => {
    // Call the function to calculate prices when the "lista" state changes
    calcularPreciosAlCambiarDeLista()
    setProductosSeleccionados([...productosSeleccionados])
  }, [lista])


  const fetchData = async (): Promise<number> => {
    const url = env.VITE_SINGLETON + env.VITE_ULTIMO_REMITO
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.lista;
    } else {
      return 0
    }
  }


  useEffect(() => {
    //ejecuto una sola vez
    fetchData().then(x => {
      setListaInicial(x)
      setLista(x)
    })
  }, [])





  const calculadoraTotales = () => {
    let neto = 0
    let total = 0
    let iva = 0
    let descuento = 0
    productosSeleccionados.reduce((acc, el) => {
      neto += (el.precioU * el.m3)
      return acc
    }, [])
    iva = Number((neto * 0.21).toFixed(2))
    total = Number((iva + neto).toFixed(2))
    descuento = Number((total * 0.9).toFixed(2))
    neto = Number((neto).toFixed(2))

    return {
      neto,
      total,
      iva,
      descuento
    }
  }







  const handleChangeProducto = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
    const obj = {
      id: id,
      selected: '',
      m3: 0,
      precioU: 0,
      unidad: ''
    }
    if (lista === listaInicial) {
      data.find((d: PickProduct) => d.nombre === e.target.value ? (
        obj.selected = d.nombre,
        obj.precioU = Number(e.target.options[e.target.selectedIndex].getAttribute('data-preciou')),
        obj.unidad = e.target.options[e.target.selectedIndex].getAttribute('data-unidad') || ''
      ) : null)
      if (obj.selected !== '') {
        productosSeleccionados.find(x => x.id === obj.id ? (
          x.selected = obj.selected,
          x.precioU = obj.precioU,
          x.unidad = obj.unidad
        ) : null)
        const t = calculadoraTotales()
        setTotales({ ...t })
        setProductosSeleccionados([...productosSeleccionados])
        console.log(productosSeleccionados)
      }
    } else {
      const { distancia, mayorOmenor } = calcularDistanciaEntreListas(listaInicial, lista)
      if (mayorOmenor == 1) {
        let amultiplicar = Number(e.target.options[e.target.selectedIndex].getAttribute('data-preciou'))
        for (let i = 0; i < distancia; i++) {
          amultiplicar = amultiplicar * 1.05
        }
        data.find((d: PickProduct) => d.nombre === e.target.value ? (
          obj.selected = d.nombre,
          obj.precioU = amultiplicar,
          obj.unidad = e.target.options[e.target.selectedIndex].getAttribute('data-unidad') || ''
        ) : null)
      } else {
        let amultiplicar = Number(e.target.options[e.target.selectedIndex].getAttribute('data-preciou'))
        for (let i = 0; i < distancia; i++) {
          amultiplicar = amultiplicar / 1.05
        }
        data.find((d: PickProduct) => d.nombre === e.target.value ? (
          obj.selected = d.nombre,
          obj.precioU = amultiplicar,
          obj.unidad = e.target.options[e.target.selectedIndex].getAttribute('data-unidad') || ''
        ) : null)
      }
      if (obj.selected !== '') {
        productosSeleccionados.find(x => x.id === obj.id ? (
          x.selected = obj.selected,
          x.precioU = obj.precioU,
          x.unidad = obj.unidad
        ) : null)
        const t = calculadoraTotales()
        setTotales({ ...t })
        setProductosSeleccionados([...productosSeleccionados])
      }
    }
  }




  const calcularPreciosAlCambiarDeLista = () => {
    let amultiplicar: number = 0
    const { distancia, mayorOmenor } = calcularDistanciaEntreListas(listaInicial, lista)
    console.log(distancia)
    console.log(mayorOmenor)
    if (mayorOmenor == 1) {
      if (subiendoBajando == 1) {
        for (let x of productosSeleccionados) {
          amultiplicar = x.precioU
          for (let i = 0; i < distancia; i++) {
            x.precioU = amultiplicar * 1.05
          }
        }
      } else {
        for (let x of productosSeleccionados) {
          amultiplicar = x.precioU
          for (let i = 0; i < distancia; i++) {
            x.precioU = amultiplicar / 1.05
          }
        }
      }
    }
    if (mayorOmenor == -1) {
      if (subiendoBajando == 1) {
        for (let x of productosSeleccionados) {
          amultiplicar = x.precioU
          for (let i = 0; i < distancia; i++) {
            x.precioU = amultiplicar * 1.05
          }
        }
      } else {
        for (let x of productosSeleccionados) {
          amultiplicar = x.precioU
          for (let i = 0; i < distancia; i++) {
            x.precioU = amultiplicar / 1.05
          }
        }
      }
    }
    if (mayorOmenor == 0) {
      if (subiendoBajando == 1) {
        for (let x of productosSeleccionados) {
          amultiplicar = x.precioU
          for (let i = 0; i < distancia + 1; i++) {
            x.precioU = amultiplicar * 1.05
          }
        }
      } else {
        for (let x of productosSeleccionados) {
          amultiplicar = x.precioU
          for (let i = 0; i < distancia + 1; i++) {
            x.precioU = amultiplicar / 1.05
          }
        }
      }
    }
    setProductosSeleccionados([...productosSeleccionados])
    const t = calculadoraTotales()
    setTotales({ ...t })
  }





  const addProducto = (): void => {
    const id = uuidv4()
    const newSelectors = [
      ...productosSeleccionados,
      {
        id: id,
        selected: '',
        m3: 1.0,
        precioU: 0,
        unidad: ''
      }
    ]
    const t = calculadoraTotales()
    setTotales({ ...t })
    setProductosSeleccionados(newSelectors)
  }





  return (
    <div>
      {

        loading ? 'cargando' : (

          productosSeleccionados.map(x => (

            <div className="productos">

              <select
                key={x.id}
                value={x.selected}
                onChange={(e) => handleChangeProducto(e, x.id)}
              >
                <option value={0} data-preciou={0}> {'seleccionar'} </option>
                {data.map((x: PickProduct) => (<option value={x.nombre} data-preciou={x.precio} data-unidad={x.unidad}> {x.nombre} </option>))}
              </select>

              <input
                key={x.id}
               // value={x.m3}
                placeholder="cantidad"
                onChange={(e) => {
                  productosSeleccionados.find((item) => {
                    if (item.id === x.id) {
                      let num = soloAceptarNumerosYPuntos(e.target.value) 
                      item.m3 = num
                    }
                  })
                  setProductosSeleccionados([...productosSeleccionados])
                  const t = calculadoraTotales()
                  setTotales({ ...t })
                  console.log(productosSeleccionados)
                }}
              >
               
              </input>

            </div>

          ))


        )

      }


      <div className="descuento">
        <input className="form-check-input" type="checkbox" name="check-descuento" onChange={(e) => setDescuento(e.target.checked)} />
        <label className="form-check-label">Con descuento 10%</label>
        <p className="mt-4 mb-4">LISTA: <b className="text-warning fs-6"> {lista} </b>
          <button className="p-1 m-1" onClick={decrementLista}>-</button>
          <button className="p-1 m-1" onClick={incrementLista}>+</button>
        </p>
      </div>
      <button onClick={addProducto}>agregar</button>







    </div>

  )



}

