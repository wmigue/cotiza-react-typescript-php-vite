
import { ChangeEvent, useState, FormEvent } from "react"

import { Layout } from "../templates/Layout/Layout"

import { Proveedores } from "../models/Proveedores"

import { Fetch } from "../hooks/useFetchClass"
import Alerta, { Status, TipoAlerta } from "../components/Alert/Alert"
import Loader from "../components/Loader.tsx/Loader"

type MiResponse = {
    error?: string
    ok?: string
}

export const HTMLModalAddProveedor = () => {

    const env = import.meta.env

    const initialState = { codigo: "", nombre: "" }
    const [proveedor, setProveedor] = useState<Proveedores>(initialState)
    const [status, setStatus] = useState<Status>({ texto: "", tipoAlerta: TipoAlerta.Undefined })
    const [AlertaVisible, setAlertaVisible] = useState(false)
    const [ocultarbtn, setocultarbtn] = useState(false)

    const { loading, runFetch } = Fetch()



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProveedor({ ...proveedor, [e.target.name]: e.target.value })

    }




    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = env.VITE_SINGLETON + env.VITE_INTERTAR_PROVEEDORES
        try {
            const r: MiResponse = await runFetch(url, "POST", "", proveedor, "", false)
            if (r.error) {
                setStatus({ texto: r.error, tipoAlerta: TipoAlerta.Danger })
                setAlertaVisible(true)
            } else {
                setStatus({ texto: r.ok, tipoAlerta: TipoAlerta.Success })
                setAlertaVisible(true)
                setocultarbtn(true)
            }
        } catch (error: any) {
            setStatus({ texto: error.message, tipoAlerta: TipoAlerta.Danger })
            setAlertaVisible(true)
            setocultarbtn(true)
        }

    }



    return (

        <Layout>
            <h6 className="text-dark">Agregar Proveedor</h6>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className="form-control text-dark m-2" placeholder="codigo"
                        name="codigo"

                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <input
                        className="form-control text-dark m-2" placeholder="nombre proveedor"
                        name="nombre"

                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    {
                        ocultarbtn ? (
                            <></>
                        ) : (
                            <button
                                type='submit'
                                disabled={loading ? true : false}
                            >
                                guardar
                            </button>
                        )


                    }

                    {
                        loading ? (
                            <Loader />
                        ) : null
                    }
                </div>
                <div>
                    {
                        status.tipoAlerta === "danger" ?
                            <Alerta
                                status={status}
                                visible={AlertaVisible}
                                setVisible={setAlertaVisible}
                            /> : null
                    }
                    {
                        status.tipoAlerta === "success" ?
                            <Alerta
                                status={status}
                                visible={AlertaVisible}
                                setVisible={setAlertaVisible}
                            /> : null
                    }
                </div>

            </form>
        </Layout >


    )
}

