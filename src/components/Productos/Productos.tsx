
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField, Grid, useMediaQuery } from "@mui/material"
import { useFetch } from "../../hooks/useFetch"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

interface producto {
  nombre: string
  unidad: string
  precio: string
}

interface selector {
  id: string,
  selected: string,
  m3: number

}

const env = import.meta.env


const rellenarM3 = () => {
  let items = [];
  for (let i = 1; i < 9; i += 0.1) {
    items.push(<MenuItem key={i} value={i}>{i.toFixed(1)}</MenuItem>)
  }
  return items
}


export const Productos = () => {
  const url = env.VITE_SINGLETON + env.VITE_DOSIFICACIONES
  const { loading, data } = useFetch(url)
  const [selects, setSelects] = useState<Array<selector>>([])


  const addProducto = (): void => {
    const id = uuidv4()
    const newSelectors = [...selects, { id: id, selected: data ? data[0].nombre : '', m3: 1.0 }]
    setSelects(newSelectors)
    console.log(newSelectors)
  }


  const isMobile = useMediaQuery('(max-width: 600px)');


  return (
    <>
      {

        loading ? 'cargando' : (

          selects.map(x => (
          
              <Grid container spacing={2} columns={6}>

                <Grid item xs={3}>
                  <InputLabel sx={{ color: 'white' }} id="demo-simple-select-standard-label">Producto</InputLabel>
                  <Select
                    sx={{ color: 'dark', backgroundColor: 'white', minWidth: isMobile ? '100%' : '400px' }}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    key={x.id}
                    value={x.selected}
                    onChange={(e) => {
                      selects.find((item) => { if (item.id === x.id) item.selected = e.target.value })
                      setSelects([...selects])
                    }}
                    label="producto"
                  >
                    {data.map((x: producto) => (<MenuItem value={x.nombre}> {x.nombre} </MenuItem>))}
                  </Select>

                </Grid>

                <Grid item xs={3}>
                  <InputLabel sx={{ color: 'white' }} id="demo-simple-select-standard-label">cantidad</InputLabel>
                  <Select
                    sx={{ color: 'dark', backgroundColor: 'white', minWidth: isMobile ? '10%' : '100px', }}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    key={x.id}
                    value={x.m3}
                    onChange={(e) => {
                      selects.find((item) => { if (item.id === x.id) item.m3 = Number(e.target.value) })
                      setSelects([...selects])
                    }}
                    label="m3"
                  >
                    {rellenarM3()}
                  </Select>
                </Grid>

              </Grid>



          ))

        )

      }


      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }} >
            <Button sx={{ width: '100px' }} variant="contained" onClick={addProducto}>agregar</Button>
          </FormControl>
        </Grid>
      </Grid>


    </>

  )



}

