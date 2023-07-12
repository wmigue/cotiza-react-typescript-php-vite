import * as React from 'react';
import './clientes.css'
import { useFetch } from "../../hooks/useFetch"
import { useContexto } from '../../context/context';
import { Cliente } from '../../models/Cliente';


const env = import.meta.env


export const Clientes = (): JSX.Element => {
    const url = env.VITE_SINGLETON + env.VITE_CLIENTES
    const { loading, data } = useFetch(url)
    const { cliente, setCliente } = useContexto()


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCliente(event.target.value)
    }


    React.useEffect(() => {
        data.length ? setCliente('') : null
    }, [data])


    return (
        <div className='clientes'>

            <select
                value={cliente}
                onChange={handleChange}
                className=""


            >
                <option value={''} selected> {''} </option>

                {

                    loading ? ('cargando...') :
                        (
                            data.map((x: Cliente) => <option value={x.nombre}> {x.nombre} </option>)
                        )

                }

            </select>

        </div>

    )
}

