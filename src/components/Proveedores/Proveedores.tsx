import { FloatingLabel, Form } from "react-bootstrap"
import { useFetch } from "../../hooks/useFetch"
import { useContextoOC } from "../../context/context-orden-compra"
import React from "react"
import { Proveedores } from "../../models/Proveedores"



const env = import.meta.env

interface Props {

    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function ProveedoresC({ onChange }: Props) {
    const url = env.VITE_SINGLETON + env.VITE_PROVEEDORES
    const { loading, data } = useFetch(url)
    const { proveedores, setProveedores } = useContextoOC()


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProveedores(event.target.value)
        onChange ? onChange(event) : null
    }


    return (

        <div>

            <div style={{ margin: "10px" }}>
                <FloatingLabel controlId="floatingSelect" label="Proveedor">
                    <Form.Select
                        size="sm"
                        name="proveedor"
                        onChange={(e) => handleChange(e)}
                        value={proveedores}
                    >
                        <option></option>

                        {


                            loading ? ('cargando...') :
                                (
                                    data.map((x: Proveedores) => <option key={x.codigo} value={x.nombre} data-codigo={x.codigo}>{x.codigo} - {x.nombre} </option>)
                                )

                        }
                    </Form.Select>
                </FloatingLabel>
            </div>


        </div>

    )
}
