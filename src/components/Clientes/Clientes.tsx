import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import './clientes.css'
import { useFetch } from "../../hooks/useFetch"
import { Grid, useMediaQuery } from '@mui/material';


interface cliente {
    nombre: string
    cuit: string
    direccion: string
    tipo: string
    email: string
}

const env = import.meta.env



export const Clientes = (): JSX.Element => {
    const url = env.VITE_SINGLETON + env.VITE_CLIENTES
    const { loading, data } = useFetch(url)
    const [cliente, setCliente] = React.useState<string>('')



    const handleChange = (event: SelectChangeEvent) => {
        setCliente(event.target.value)
    }

    const isMobile = useMediaQuery('(max-width: 600px)');


    React.useEffect(() => {
        data.length ? setCliente(data[0].nombre) : null
    }, [data])


    return (

        <Grid container spacing={2} columns={12}>

            <Grid item xs={1}>
                <Box sx={{ marginBottom: '30px', width: '100%' }}>
                    <InputLabel sx={{ color: 'white', minWidth: '100px', textAlign: 'start' }} >Cliente</InputLabel>
                    <Select
                        sx={{ color: 'dark', backgroundColor: 'white', minWidth: isMobile ? '10%' : '10px', }}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={cliente}
                        onChange={handleChange}
                        label="cliente"
                    >
                        {

                            loading ? ('cargando...') :
                                (
                                    data.map((x: cliente) => <MenuItem value={x.nombre}> {x.nombre} </MenuItem>)
                                )

                        }

                    </Select>
                </Box>
            </Grid>

        </Grid>

    )
}

