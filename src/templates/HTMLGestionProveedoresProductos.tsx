import React, { useState } from 'react'
import { ProveedoresC } from '../components/Proveedores'
import { Fetch } from '../hooks/useFetchClass'

export default function HTMLGestionProveedoresProductos() {

    const env = import.meta.env

    const [seleccionado, setSeleccionado] = useState<string | null>(null)
    // @ts-ignore
    const { loading, runFetch } = Fetch()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const codigo = e.target.selectedOptions[0].getAttribute("data-codigo")
        console.log(codigo)
        setSeleccionado(codigo)
    }

    const handleDelete = async () => {
        const url = env.VITE_SINGLETON + env.VITE_DELETE_PROVEEDOR
        if (confirm("SEGURO DE ELIMINAR ESTE PROVEEDOR Y SUS PRODUCTOS DE LA BASE DE DATOS ?")) {
            if (confirm("SE VAN A PERDER ESTOS DATOS, SEGURO?")) {
                const r = await runFetch(url, "POST", "", { codigo: seleccionado }, "", false)
                if ("ok" in r) {
                    alert("se elimino correctamente")
                } else {
                    alert("error!!!")
                }
            }
        }
    }

    return (
        <div className='text-center'>
            <h5 className='mb-3' >Eliminar Proveedores y productos</h5>
            <ProveedoresC onChange={(e) => handleChange(e)} />
            <button className='btn btn-danger btn-sm' onClick={handleDelete}>eliminar</button>
        </div>
    )
}

