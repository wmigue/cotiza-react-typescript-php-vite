import { useState } from "react"

interface IFetch {
    loading: boolean
    runFetch: (
        url: string,
        method?: string,
        token?: string | null,
        body?: object | null,
        fd_con_adjunto?: string,
        auth?: boolean
    ) => Promise<object>
}

export function Fetch(): IFetch {

    const [loading, setLoading] = useState(false)
    let response: Response
    let json = {}

    async function runFetch(
        url: string,
        method: string = "GET",
        token: string | null = "",
        body: object | null = null,
        fd_con_adjunto = "",
    ) {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token !== "" ? `Bearer ${token}` : "Bearer"
        }

        try {
            setLoading(true)

            if (method === "POST") {
                if (fd_con_adjunto !== "") { //POST CON ADJUNTOS
                    response = await fetch(url, {
                        method: method,
                        headers: headers,
                        body: fd_con_adjunto
                    })
                } else {
                    response = await fetch(url, { //POST SIN ADJUNTOS
                        method: method,
                        headers: headers,
                        body: JSON.stringify(body)
                    })
                }
            } else {
                response = await fetch(url, { //GET
                    headers: headers
                })
            }


            json = await response.json()
            setLoading(false)
            return json


        } catch (error: unknown) {
            setLoading(false)
            if (error instanceof Error) {
                throw new Error(error.message) //error de red o similar.
            } else {
                throw new Error('desconocido')
            }
        }

    }

    return { loading, runFetch }


}


