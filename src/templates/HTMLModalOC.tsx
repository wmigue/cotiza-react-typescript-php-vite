import { useContextoOC } from "../context/context-orden-compra"
import { useEffect, useState } from "react"
import { Form, FloatingLabel } from "react-bootstrap"
import { Layout } from "../templates/Layout/Layout"
import { ProveedoresC } from "../components/Proveedores"
import Modalizar from "../components/Modal/Modal"
import HTMLModalAddProductos from "./HTMLModalAddProductos"
import { HandleChange } from "../hooks/HandleChange"



export const HTMLModalOC = () => {

    const { productos, setTotales, totales, comentario, nota_pedido, presupuesto_nro, retirado, desplegables, setComentario, setNota_Pedido, setPresupuesto_nro, setRetirado, setDesplegables } = useContextoOC()


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
    }, [desplegables.iva_tipo])


    //modalizar functions
    const [showModalProdutos, setShowModalProdutos] = useState<boolean>(false)
    const handleShowModalProdutos = () => setShowModalProdutos(true)


    return (

        <Layout>

            <div>
                <FloatingLabel controlId="floatingTextarea2" label="comentario">
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                        className="form-control text-dark m-2" placeholder="comentario"
                        value={comentario}
                        name="comentario"
                        onChange={(e) => HandleChange(e, setComentario)}
                    />
                </FloatingLabel>
            </div>
            <div>
                <input
                    className="form-control text-dark m-2" placeholder="Número nota pedido"
                    name="nota_pedido"
                    value={nota_pedido ? nota_pedido : ""}
                    onChange={(e) => HandleChange(e, setNota_Pedido)}
                />
            </div>
            <div>
                <input
                    className="form-control text-dark m-2" placeholder="Presupuesto Número"
                    name="presupuesto_nro"
                    value={presupuesto_nro}
                    onChange={(e) => HandleChange(e, setPresupuesto_nro)}
                />
            </div>
            <div>
                <input
                    className="form-control text-dark m-2" placeholder="Retirado por"
                    name="retirado por"
                    value={retirado.retirado}
                    onChange={(e) => HandleChange(e, setRetirado, "retirado")}
                />
            </div>
            <div>
                <input
                    className="form-control text-dark m-2" placeholder="entregado por"
                    name="entregado por"
                    value={retirado.entregado}
                    onChange={(e) => HandleChange(e, setRetirado, "entregado")}
                />
            </div>
            <div>
                <ProveedoresC />
            </div>
            <div style={{ margin: "10px" }}>
                <FloatingLabel controlId="floatingSelect" label="Autorizado por">
                    <Form.Select
                        size="sm"
                        name="autorizado"
                        value={desplegables.autorizado}
                        onChange={(e) => HandleChange(e, setDesplegables, "autorizado")}
                    >
                        <option></option>
                        <option>Kodelja Luis Alberto</option>
                        <option>Canavesio Oscar Fernando</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div style={{ margin: "10px" }}>
                <FloatingLabel controlId="floatingSelect" label="Condición pago">
                    <Form.Select
                        size="sm"
                        name="condicion_pago"
                        value={desplegables.condicion_pago}
                        onChange={(e) => HandleChange(e, setDesplegables, "condicion_pago")}
                    >
                        <option></option>
                        <option>EFECTIVO</option>
                        <option>TRANSFERENCIA</option>
                        <option>CTA. CTE.</option>
                        <option>OTRO</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div style={{ margin: "10px" }}>
                <FloatingLabel controlId="floatingSelect" label="IVA TIPO">
                    <Form.Select
                        size="sm"
                        name="iva_tipo"
                        data-testid="iva_tipo"
                        value={desplegables.iva_tipo}
                        onChange={(e) => { HandleChange(e, setDesplegables, "iva_tipo") }}
                    >
                        <option value={0.21}>21 %</option>
                        <option value={0.105}>10.5 %</option>
                        <option value={0}>N/D</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div style={{ margin: "10px" }}>
                <FloatingLabel controlId="floatingSelect" label="fecha recepción desde">
                    <Form.Control
                        type="date"
                        name="fecha_desde"
                        placeholder="DateRange"
                        value={desplegables.fecha_desde}
                        onChange={(e) => HandleChange(e, setDesplegables, "fecha_desde")}
                    />
                </FloatingLabel>
            </div>
            <div style={{ margin: "10px" }}>
                <FloatingLabel controlId="floatingSelect" label="fecha recepción hasta">
                    <Form.Control
                        type="date"
                        name="fecha_hasta"
                        placeholder="DateRange"
                        value={desplegables.fecha_hasta}
                        onChange={(e) => HandleChange(e, setDesplegables, "fecha_hasta")}
                    />
                </FloatingLabel>
            </div>
            <div>
                <button
                    className="btn btn-primary btn-small"
                    onClick={handleShowModalProdutos}
                >
                    agregar productos/servicios
                </button>
            </div>

            <Modalizar
                setShow={setShowModalProdutos}
                show={showModalProdutos}
            >
                <HTMLModalAddProductos />
            </Modalizar>

        </Layout >


    )
}

