import { ReactNode } from "react"

import './Layout.css'
import { Cotizacion } from "../Cotizacion"


interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => {


    return (
        <div className="mi-grid ">
            <div >
                {children}

            </div>
            <div >
                <Cotizacion />
            </div>
        </div>
    )
}
