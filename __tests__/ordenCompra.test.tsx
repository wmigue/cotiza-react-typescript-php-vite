
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'


import { OrdenCompra } from "../src/components/OrdenCompra"
import { ContextoProviderOC } from '../src/context/context-orden-compra'

describe('TEST: <OrdenCompra /> integration with <HTMLModalOC/>', () => {

    //luego de ejecutar cada it limpiar pantalla.
    afterEach(cleanup)

    //antes de ccada it hacer este fetch fake
    beforeEach(() => {
        vi.resetAllMocks()


        const fakeFetch = async () => {
            const mockResponse = JSON.stringify(
                [
                    { "id": "175", "codigo": "PRO-01", "nombre": "LOGISTICA YACARE " },
                    { "id": "176", "codigo": "PRO-02", "nombre": "SANCHEZ WALDEMAR" },
                    { "id": "177", "codigo": "PRO-03", "nombre": "HERMEN SRL" }
                ]
            )

            const miResponse = new Response(mockResponse, {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            })

            return await Promise.resolve(miResponse)
        }

        //simula fetch GET sin llamar a la API real (mock del fetch)
        //sin la simulacion el test fallaria porque al cargar uno de los componentes hace una llamada que trae los clientes.
        vi.spyOn(window, "fetch").mockImplementationOnce(fakeFetch)
    })




    it('Debería mostrar "IVA 10.5%: $0.00" en la vista <OrdenCompra/> al cambiar el select IVA TIPO con value="0.105" del <HTMLModalOC/>', async () => {

        render(
            <ContextoProviderOC>
                <OrdenCompra />
            </ContextoProviderOC>
        )

        screen.getByText('Editar').click()

        const ivaSELECT = await waitFor(() => {
            // Encuentra el botón y simula un clic
            return screen.getByTestId('iva_tipo')
        })

        await waitFor(() => {
            // change event, cambio el option del select, cuando el value = 0.105
            fireEvent.change(ivaSELECT, { target: { value: '0.105' } })
        })

        const iva = screen.getByText("IVA 10.5%: $0.00")

        expect(iva).toBeDefined()
        expect(iva.innerText.trim()).toBe("IVA 10.5%: $0.00")
        expect(iva.innerText.trim()).not.toBe("IVA 21%: $0.00")

    })






    it('Debería actializarse el Comentario en <OrdenCompra/> al cambiar el (textarea) en <HTMLModalOC/>', async () => {

        render(

            <ContextoProviderOC>
                <OrdenCompra />
            </ContextoProviderOC>

        )

        screen.getByText('Editar').click()

        const textarea = await waitFor(() => {

            return screen.getByLabelText('comentario')
        })

        await waitFor(() => {
            fireEvent.change(textarea, { target: { value: 'mi comentario' } })
        })


        const comentario = await waitFor(() => {
            return screen.findByText("Comentarios:")
        })

        if (comentario.nextElementSibling instanceof HTMLElement) {
            expect(comentario.innerText + " " + comentario.nextElementSibling.innerText).toBe("Comentarios: mi comentario")
            expect(comentario.innerText + " " + comentario.nextElementSibling.innerText).not.toBe("Comentarios: otra cosa")
        }

    })




    it("Debe renderizar el logo de la empresa canavesio en <OrdenCompra />", () => {
        render(<OrdenCompra />)
        const logo = screen.getByAltText('logo empresa')
        if (logo instanceof HTMLImageElement) {
            console.log(logo.src)
        }
        expect(logo).toBeInstanceOf(HTMLImageElement)
        expect(logo).not.toBeInstanceOf(HTMLSelectElement)
        expect(logo).toBeDefined()
    })



})
