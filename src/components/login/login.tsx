
import { FormEvent, SetStateAction, Dispatch, useState } from 'react'
import { useRef } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Fetch } from '../../hooks/useFetchClass'
import Alerta, { Status, TipoAlerta } from '../Alert/Alert'

const env = import.meta.env

interface Props {
    setValido: Dispatch<SetStateAction<boolean>>
}

interface Res {
    ok?: boolean
    error?: string
}

export const Login = ({ setValido }: Props): JSX.Element => {
    const [status, setStatus] = useState<Status>({})
    const [AlertaVisible, setAlertaVisible] = useState(false)

    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const { runFetch } = Fetch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = env.VITE_SINGLETON + env.VITE_TOKEN_GENERATOR
        const r: Res = await runFetch(url, "POST", "", { pass: passwordRef.current?.value }, "", false)
        //localStorage.setItem("token", r.ok)
        if (r.ok) {
            setValido(r.ok)
            setStatus({ tipoAlerta: TipoAlerta.Success })
            setAlertaVisible(true)
            navigate("/cotizador")
        } else {
            setStatus({ texto: r.error, tipoAlerta: TipoAlerta.Danger })
            setAlertaVisible(true)
        }
    }

    return (


        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">

                <FloatingLabel controlId="floatingInputGrid" label="Password">
                    <Form.Control
                        ref={passwordRef}
                        name="password"
                        type="password"
                    />
                </FloatingLabel>

            </Form.Group>


            <button className="btn btn-primary " type="submit">
                Entrar
            </button>

            <div>
                <Alerta
                    status={status}
                    visible={AlertaVisible}
                    setVisible={setAlertaVisible}
                />
            </div>



        </Form >


    )
}

