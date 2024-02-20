import "./ordenCompra.css"
import { generarNumeroRemito } from "../../utils/name-generator-functions"
import { exportarDIVaPDF } from "../../utils/pdf-functions"
import { useContextoOC } from "../../context/context-orden-compra"
import Modalizar from "../Modal/Modal"
import { ProductOC } from "../../models/ProductOC"
import { HTMLModalOC } from "../../templates/HTMLModalOC"
import { HTMLModalAddProveedor } from "../../templates/HTMLModalAddProveedor"
import { useRef, useState } from "react"
import { formateoDates2 } from "../../utils/dates"
import { FormatearMoneda1 } from "../../utils/numbers-functions"
import { Table } from "react-bootstrap"
import { HTMLModalProductosProveedores } from "../../templates/HTMLModalProductosProveedores"
import HTMLProcesando from "../../templates/HTMLProcesando"
import { Fetch } from "../../hooks/useFetchClass"

import HTMLGestionProveedoresProductos from "../../templates/HTMLGestionProveedoresProductos"
import { initialValuesDesplegables } from "../../models/Desplegables"
import { initialValuesTotalSinDescuento } from "../../models/Total"
import { initialValuesAutorizadoRetiradoEntregado } from "../../models/AutorizadoRetiradoEntregado"

const env = import.meta.env

export const OrdenCompra = (): JSX.Element => {

    const { runFetch } = Fetch()

    // const navigate = useNavigate()

    const { ocNumero, setOCNumero, comentario, setComentario, nota_pedido, setNota_Pedido, presupuesto_nro, setPresupuesto_nro, productos, setProductos, totales, setTotales, retirado, setRetirado, setDesplegables, desplegables, setProveedores, proveedores } = useContextoOC()

    const OriginalDuplicado = useRef<HTMLDivElement | null>(null)

    //modalizar functions
    const [showModalOC, setShowModalOC] = useState<boolean>(false)
    const handleShowModalOC = () => setShowModalOC(true)
    const [showModalProv, setShowModalProv] = useState<boolean>(false)
    const handleShowModalProv = () => setShowModalProv(true)
    const [showModalProducts, setShowModalProducts] = useState<boolean>(false)
    const handleShowModalProducts = () => setShowModalProducts(true)
    const [ShowModalProveedoresProductos, setShowModalProveedoresProductos] = useState(false)

    const [loader, setLoader] = useState(false)
    // @ts-ignore
    const [utlimoNum, setUltimoNum] = useState(0)



    //    //    //    //    //    //    //    //    //



    const handClickGeneratePDF = async () => {
        // const duplicar = (texto: string) => OriginalDuplicado.current ? OriginalDuplicado.current.innerText = texto : null
        if (confirm('se generará una nueva OC. continuar?')) {
            setLoader(true)
            try {
                const num = await getNumeroUltimaOC()
                setUltimoNum(num)
                setOCNumero(String(generarNumeroRemito('orden-compra_', 1, num)).replace("orden-compra_", ""))
                const a = await insertarOCaDB(num)
                console.log(a)
                await exportarDIVaPDF('contenedor', "", String(generarNumeroRemito('O.C. N° ', 1, num)) + " - " + proveedores + " - " + formateoDates2(new Date()), true)
                reiniciarOC()
                // window.location.reload()
                setLoader(false)
            } catch (e: any) {
                console.log(e)
            }
        }
    }


    const insertarOCaDB = async (num: number) => {
        const url = env.VITE_SINGLETON + env.VITE_INSERTAR_NUEVO_OC
        const fecha_pedido = formateoDates2(new Date())
        const dataToSend = {
            numero: num,
            json: [
                { presupuesto_nro: presupuesto_nro },
                { nota_pedido: nota_pedido },
                { proveedores: proveedores },
                { fecha_pedido: fecha_pedido },
                desplegables,
                retirado,
                { comentario: comentario },
                { productos: productos }
            ]
        }

        return await runFetch(url, "POST", "", dataToSend, "", false)
    }




    const getNumeroUltimaOC = async (): Promise<number> => {
        const url = env.VITE_SINGLETON + env.VITE_ULTIMO_OC
        const data = await runFetch(url)
        if ('ultimo' in data) {
            return Number(data.ultimo) + 1
        } else {
            return 0
        }
    }


    const reiniciarOC = () => {
        setComentario("")
        setNota_Pedido(0)
        setPresupuesto_nro("")
        setProductos([])
        setTotales(initialValuesTotalSinDescuento)
        setRetirado(initialValuesAutorizadoRetiradoEntregado)
        setDesplegables(initialValuesDesplegables)
        setProveedores("")
        setOCNumero("")
    }






    //    //    //    //    //    //











    //  console.log("ordenCompra")


    return (

        <>

            <Modalizar
                setShow={setShowModalOC}
                show={showModalOC}
            >
                <HTMLModalOC />
            </Modalizar>

            <Modalizar
                setShow={setShowModalProv}
                show={showModalProv}
            >
                <HTMLModalAddProveedor />
            </Modalizar>

            <Modalizar
                setShow={setShowModalProducts}
                show={showModalProducts}
            >
                <HTMLModalProductosProveedores />
            </Modalizar>


            <Modalizar
                setShow={setLoader}
                show={loader}
            >
                <HTMLProcesando />
            </Modalizar>

            <Modalizar
                setShow={setShowModalProveedoresProductos}
                show={ShowModalProveedoresProductos}
            >
                <HTMLGestionProveedoresProductos />
            </Modalizar>

            <div >
                <button className="btn btn-warning  p-2 m-2"
                    onClick={handleShowModalOC}>Editar
                </button>
                <button className="btn btn-primary p-2 m-2"
                    onClick={handClickGeneratePDF}>Generar pdf
                </button>
                <button className="btn btn-secondary btn-sm  m-2"
                    onClick={handleShowModalProv}>agregar proveedor
                </button>
                <button className="btn btn-secondary btn-sm m-2"
                    onClick={handleShowModalProducts}>agregar productos
                </button>
                <button className="btn btn-danger btn-sm  m-2"
                    onClick={() => setShowModalProveedoresProductos(!ShowModalProveedoresProductos)}>ELIMINAR proveedor
                </button>


            </div>



            <div className="contenedor" data-testid="contenedor">


                <div className="content-1">
                    <div className="content-1C">
                        <img width={180} src="../../../public/logo2.jpeg" alt="logo empresa" />
                    </div>
                    <div className="content-1A bolderizar acherizar">
                        <div>REGISTRO</div>
                        <div className="bolderizar acherizar">ORDEN DE COMPRA</div>
                    </div>
                    <div className="content-1B">
                        <div>Código: RE - G - 30</div>
                        <div>Versión: 02</div>
                        <div ref={OriginalDuplicado} className="italizar">ORIGINAL</div>
                    </div>
                </div>

                <div className="content-2">
                    <div className="c2a">Orden de compra N°: <b> {ocNumero}</b></div>
                    <div className="c2b">Nota de pedido Nro:<b> {nota_pedido}</b> </div>
                    <div className="c2c">Proveedor: <b> {proveedores}</b></div>
                    <div className="c2d">Condición de pago: <b> {desplegables.condicion_pago}</b></div>
                    <div className="c2e">Fecha de pedido:<b> {formateoDates2(new Date())} </b> </div>
                    <div className="c2f"> Presupuesto N°:<b> {presupuesto_nro}</b> </div>
                    <div className="c2g">Fecha recepción:
                        {
                            desplegables.fecha_desde ? (
                                <b> {formateoDates2(desplegables.fecha_desde.toString()) + " al " + formateoDates2(desplegables.fecha_hasta)}</b>
                            ) : null
                        }

                    </div>
                </div>

                <div className="content-3">
                    <Table size="sm" >
                        <thead>

                            <tr>
                                <th scope="col">Descripción</th>
                                <th scope="col">Observación</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Unidad</th>
                                <th scope="col">Unitario</th>
                                <th scope="col">Parcial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((x: ProductOC) => {
                                    return (
                                        <>
                                            <tr >
                                                <td>{x.descripcion}</td>
                                                <td>{x.observacion}</td>
                                                <th scope="row">{x.cantidad}</th>
                                                <td>{x.unidad}</td>
                                                <td>{FormatearMoneda1(x.precio)}</td>
                                                <td>{FormatearMoneda1(x.precio * x.cantidad)}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                            <br />
                        </tbody>
                    </Table>

                    <div className="totales" style={{ marginRight: "1px" }}>
                        <td></td>
                        <td style={{
                            textAlign: "right", width: "100%", paddingRight: "10px"
                        }}>

                            <small className="bolderizar">  Subtotal: {FormatearMoneda1(totales.neto)}</small><br />
                            <small className="bolderizar" data-testid="iv">  {
                                desplegables.iva_tipo == 0.105 ?
                                    "IVA 10.5%: " + FormatearMoneda1(totales.iva) :
                                    desplegables.iva_tipo == 0 ? "IVA $0.00" :
                                        "IVA 21%: " + FormatearMoneda1(totales.iva)
                            } </small><br />
                            <small className="bolderizar">  Total: {FormatearMoneda1(totales.total)}</small>

                        </td>
                    </div>



                </div >

                <div className="content-4">
                </div>

                <div className="content-5">
                    <div className={desplegables.autorizado ? "c5a mt-4" : "c5a mt-3"}>Autorizado por: </div>
                    <div className="c5b firma">
                        <div>
                            {
                                desplegables.autorizado === "Kodelja Luis Alberto" ?
                                    <>
                                        <div>
                                            <img src="../../../public/fiirma-kodelja.png" width={200} />
                                        </div>
                                        <div>
                                            ___________________________
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <img
                                                src="../../../public/fiirma-fake.png"
                                                width={desplegables.autorizado !== "" ? 180 : 120}
                                            />
                                        </div>
                                        <div>
                                            ___________________________
                                        </div>
                                    </>
                            }
                        </div>
                        <div>Firma</div>
                    </div>
                    <div className={"c5b firma mt-4"}   >
                        <div>
                            <b>
                                {
                                    desplegables.autorizado ?
                                        <>
                                            {desplegables.autorizado}
                                            <div >
                                                ___________________________
                                            </div>
                                        </>

                                        :
                                        "___________________________"
                                }
                            </b>
                        </div>
                        <div>Aclaración</div>
                    </div>
                    <div className="c5d">

                    </div>
                    <div className="c5e firma ">

                    </div>
                    <div className="c5f firma">

                    </div>
                    <div className={retirado.retirado ? "c5a mt-4" : "c5a mt-3"}>Retirado por: </div>
                    <div className="c5b firma">
                        <div>
                            <>
                                <div>
                                    <img src="../../../public/fiirma-fake.png" width={retirado.retirado !== "" ? 180 : 120} />
                                </div>
                                <div>
                                    ___________________________
                                </div>
                            </>
                        </div>
                        <div>Firma</div>
                    </div>
                    <div className={"c5b firma mt-4"} >
                        <div>
                            <b>
                                {
                                    retirado.retirado ?
                                        <>
                                            {retirado.retirado}
                                            <div >
                                                ___________________________
                                            </div>
                                        </>
                                        :
                                        "___________________________"
                                }
                            </b>
                        </div>
                        <div>Aclaración</div>
                    </div>
                    <div className="c5j"></div>
                    <div className="c5k firma">

                    </div>
                    <div className="c5l firma">

                    </div>
                    <div className={retirado.entregado ? "c5a mt-4" : "c5a mt-3"}>Entregado por:</div>
                    <div className="c5b firma">
                        <div>
                            <>
                                <div>
                                    <img src="../../../public/fiirma-fake.png" width={retirado.retirado !== "" ? 180 : 120} />
                                </div>
                                <div>
                                    ___________________________
                                </div>
                            </>
                        </div>
                        <div>Firma</div>
                    </div>
                    <div className="c5b firma mt-4">
                        <div>
                            <b>
                                {
                                    retirado.entregado ?
                                        <>
                                            {retirado.entregado}
                                            <div >
                                                ___________________________
                                            </div>
                                        </>
                                        :
                                        "___________________________"
                                }
                            </b>
                        </div>
                        <div>Aclaración</div>
                    </div>
                </div>
                <div className="c5p"></div>
                <div className="c5q firma">

                </div>
                <div className="c5r firma">

                </div>

                <div className="content-6">
                    {
                        !comentario ? (
                            <>
                                <>Comentarios:</>
                                <div className="c6a firma mb-2">
                                    <br />__________________________________________________________________________________________________________________________________
                                </div>


                            </>

                        ) : (
                            <>
                                <div className="c6a"> <p>Comentarios:</p>
                                    {comentario}
                                </div>
                            </>
                        )
                    }

                </div>

                <div className="content-7">
                    <div className="c7a bolderizar">Elaborado por:</div>
                    <div className="c7b bolderizar" >Revisado por:</div>
                    <div className="c7c bolderizar" >Aprobado por:</div>

                    <div className="c7d" >Comité de Calidad</div>
                    <div className="c7e">Kodelja Luis A.</div>
                    <div className="c7f" >Canavesio Oscar F.</div>

                    <div className="c7g">fecha: {"12/12/2023"} </div>
                    <div className="c7h">fecha: {"29/12/2023"}</div>
                    <div className="c7i">fecha: {"05/01/2024"}</div>
                    <div className="c7j"> </div>

                </div>




            </div >


        </>


    )
}

export default OrdenCompra