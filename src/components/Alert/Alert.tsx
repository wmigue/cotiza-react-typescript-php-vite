import { useEffect, Dispatch, SetStateAction } from 'react'
import Alert from 'react-bootstrap/Alert'



export enum TipoAlerta {
    Danger = "danger",
    Success = "success",
    Undefined = "sin definir"
}

export interface Status {
    texto?: string
    tipoAlerta?: TipoAlerta
}

interface Props {
    status: Status
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

export default function Alerta({ status, visible, setVisible }: Props) {


    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }, [visible])


    return (
        <>
            {
                visible && (
                    < Alert key={status.tipoAlerta} variant={status.tipoAlerta} className='m-3'>
                        {status.texto}
                    </Alert >
                )}
        </>
    )
}

