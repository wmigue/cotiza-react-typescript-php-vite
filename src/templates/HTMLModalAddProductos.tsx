import { FormEvent, useState } from "react"
import { FloatingLabel, Form, Col, Row, Button } from "react-bootstrap"
import "../components/Productos/productos.css"
import { v4 as uuidv4 } from 'uuid'
import { useContextoOC } from "../context/context-orden-compra"
import { ChangeEvent } from "react"

import { soloAceptarNumerosYPuntos } from "../utils/numbers-functions"
import { Fetch } from "../hooks/useFetchClass"
import { useEffect } from "react"



const env = import.meta.env

export default function HTMLModalAddProductos() {
    // @ts-ignore
    const { loading, runFetch } = Fetch()
    const { productos, setProductos, proveedores, totales, setTotales, desplegables } = useContextoOC()
    const [prodProveedor, setProdProveedor] = useState([])

    const handleAdd = () => setProductos([...productos, { id: uuidv4(), cantidad: 0, descripcion: "", precio: 0, unidad: 'tn', observacion: '', parcial: 0 }])

    const handleDelete = (id: string) => setProductos(productos.filter(x => x.id !== id))

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | FormEvent<HTMLFormElement> | ChangeEvent<any>) => {
        const id = (e.target as HTMLElement)?.getAttribute?.('id')
        const valor = (e.target as HTMLInputElement | HTMLSelectElement)?.value
        const name = (e.target as HTMLInputElement | HTMLSelectElement)?.name
        const p = productos.map(x => {
            if (x.id === id) {
                if (name === "precio" || name === "cantidad") {
                    return { ...x, [`${name}`]: soloAceptarNumerosYPuntos(valor) }
                } else {
                    return { ...x, [`${name}`]: valor }
                }

            } else {
                return x
            }
        })
        setProductos(p)
        console.log(productos)
    }



    const getProductosDeProveedorEspecifico = async () => {
        const url = env.VITE_SINGLETON + env.VITE_GET_PRODUCTOS_DE_PROVEEDOR
        return await runFetch(url, "POST", "", { p: proveedores }, "", false)
    }



    const calcularTotales = () => {
        const total = productos.reduce((acc, x) => {
            acc.subtotal += Number(x.precio * x.cantidad)
            return acc
        }, { subtotal: 0 })
        const iva = total.subtotal * desplegables.iva_tipo
        const tota = total.subtotal + iva
        setTotales({ ...totales, ["neto"]: total.subtotal, ["iva"]: iva, ["total"]: tota })
        console.log(totales)
    }

    useEffect(() => {
        calcularTotales()
    }, [productos])


    useEffect(() => {
        getProductosDeProveedorEspecifico().then((x: any) => setProdProveedor(x.productos))
    }, [])




    return (
        <>
            <Row className="g-2">

                <Row className="text-center">
                    <h5> Productos / Servicios</h5>
                    <p>
                        <Button
                            className="btnAgregar2 btn btn-success w-25 "
                            size="sm"
                            onClick={handleAdd}
                        >

                            <b className="btnAgregar">+</b>
                        </Button>
                    </p>
                </Row>


                {
                    productos.map(x => {
                        return (
                            <>
                                <Row className="d-flex flex-column bd-highlight mb-3">
                                    <Col md>
                                        <FloatingLabel controlId="floatingInputGrid" label="cantidad">
                                            <Form.Control
                                                name="cantidad"
                                                type="number"
                                                id={x.id}
                                                //  controlId={x.id}
                                                defaultValue={x.cantidad}
                                                value={x.cantidad}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FloatingLabel>

                                    </Col>
                                    <Col md>
                                        <FloatingLabel controlId="floatingSelect" label="descripcion">
                                            <Form.Select
                                                size="sm"
                                                name="descripcion"
                                                id={x.id}
                                                //    controlId={x.id}
                                                value={x.descripcion}
                                                onChange={e => handleChange(e)}
                                            >
                                                <option></option>
                                                {
                                                    prodProveedor && prodProveedor.length ? prodProveedor.map((x) => {
                                                        return <option>{x}</option>
                                                    }) : null
                                                }
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel controlId="floatingInputGrid" label="precio">
                                            <Form.Control
                                                type="number"
                                                name="precio"
                                                id={x.id}
                                                //  controlId={x.id}
                                                value={x.precio}
                                                onChange={e => handleChange(e)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel controlId="floatingSelect" label="unidad">
                                            <Form.Select
                                                size="sm"
                                                name="unidad"
                                                id={x.id}
                                                value={x.unidad}
                                                onChange={e => handleChange(e)}
                                            >
                                                <option>unidades</option>
                                                <option>tn</option>
                                                <option>litros</option>
                                                <option>kg</option>
                                                <option>km</option>
                                                <option>otro</option>

                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>

                                    <Col md>
                                        <FloatingLabel controlId="floatingInputGrid" label="observacion">
                                            <Form.Control
                                                name="observacion"
                                                type="text"
                                                id={x.id}
                                                //  controlId={x.id}
                                                defaultValue={x.observacion}
                                                value={x.observacion}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FloatingLabel>

                                    </Col>

                                    <Col>
                                        <Button
                                            className="btnAgregar2 btn btn-danger w-25 "
                                            size="sm"
                                            onClick={() => handleDelete(x.id)}
                                        >
                                            -
                                        </Button>
                                    </Col>
                                </Row >
                            </>
                        )
                    })
                }



            </Row >

        </>
    )
}

