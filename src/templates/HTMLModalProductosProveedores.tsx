
import { HandleChange } from "../hooks/HandleChange"
import { useState, useEffect, FormEvent } from "react"
import { FloatingLabel, Form, Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/useFetch"
import { Fetch } from "../hooks/useFetchClass"
import { Proveedores } from "../models/Proveedores"
import Alerta, { Status, TipoAlerta } from "../components/Alert/Alert"
import Loader from "../components/Loader.tsx/Loader"
import Listador from "../components/Listador/Listador"

const env = import.meta.env

type MiResponse = {
    error?: string
    ok?: string
}

type MiResponse2 = MiResponse & {
    productos?: Array<string>
}

export function HTMLModalProductosProveedores() {

    const url = env.VITE_SINGLETON + env.VITE_PROVEEDORES
    const { loading, data } = useFetch(url)
    const [obj, setObj] = useState({ producto: "", proveedor: "" })
    const [status, setStatus] = useState<Status>({ texto: "", tipoAlerta: TipoAlerta.Undefined })
    const [AlertaVisible, setAlertaVisible] = useState(false)
    const [ocultarbtn, setocultarbtn] = useState(false)
    const { loading: loadingF, runFetch } = Fetch()
    const [arrayTyping, setArrayTyping] = useState<string[] | undefined>([])



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = env.VITE_SINGLETON + env.VITE_INSERTAR_PRODUCTO_A_PROVEEDOR
        try {
            const r: MiResponse = await runFetch(url, "POST", "", obj, "", false)
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


    //ya existe ese producto o no.
    const onTypingProduct = async () => {
        setArrayTyping([])
        const url = env.VITE_SINGLETON + env.VITE_GET_PRODUCTOS_DE_PROVEEDOR_ON_TYPING_FILTER
        try {
            const r: MiResponse2 = await runFetch(url, "POST", "", { proveedor_id: obj.proveedor, typing_product: obj.producto }, "", false)
            setArrayTyping(r.productos)
            // console.log(arrayTyping)
        } catch (error: any) {
            console.log(error)
        }

    }



    useEffect(() => {
        //console.log(obj)
        onTypingProduct()
    }, [obj])


    return (
        <>

            <Row className="text-center justify-content-center align-items-center">
                <Col xs={12} md={6}>

                    <Row className="text-center">
                        <h6 className="text-dark">Agregar Producto</h6>
                    </Row>

                    <Form onSubmit={handleSubmit}>
                        <div>
                            <FloatingLabel controlId="floatingSelect" label="producto">
                                <Form.Control
                                    type="text"
                                    name="producto"
                                    onChange={(e) => (
                                        HandleChange(e, setObj, "producto")
                                    )}>
                                </Form.Control>
                            </FloatingLabel>
                        </div>
                        <div style={{ margin: "10px" }}>
                            <FloatingLabel controlId="floatingSelect" label="proveedor">
                                <Form.Select
                                    size="sm"
                                    name="proveedor"
                                    onChange={(e) => (
                                        HandleChange(e, setObj, "proveedor")
                                    )}
                                >
                                    <option></option>
                                    {
                                        loading ? null : data.map((x: Proveedores) => <option value={x.id}>{x.nombre}</option>)
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </div>


                        {
                            ocultarbtn ? (
                                <></>
                            ) : (
                                <button
                                    type='submit'
                                    disabled={loadingF ? true : false}
                                >
                                    guardar
                                </button>
                            )


                        }
                    </Form >

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
                        {
                            loading ? (
                                <Loader />
                            ) : null
                        }
                    </div>

                </Col>

                <Col>
                    <h6 className="text-dark">Productos guardados: </h6>
                    <Listador arr={arrayTyping} />
                </Col>
            </Row >
        </>
    )
}

