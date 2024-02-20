import { ReactNode, SetStateAction } from 'react'

import Modal from 'react-bootstrap/Modal'
import "./modal.css"


interface ModalProps {
    setShow: React.Dispatch<SetStateAction<boolean>>
    show: boolean
    bgColor?: string
    children: ReactNode
}

export default function Modalizar(props: ModalProps): JSX.Element {

    const { setShow, show, bgColor, children } = props

    const cerrarModal = () => setShow(false)

    return (
        <>
            <div >
                <Modal show={show} onHide={cerrarModal} className='special_modal bg-dark'>
                    {/* <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body className={bgColor}>
                        {children}
                    </Modal.Body>
                    {/* <Modal.Footer> */}
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    {/* <Button variant="primary" onClick={handleClose}>
                            guardar
                        </Button> */}
                    {/* </Modal.Footer> */}
                </Modal>
            </div>
        </>
    )
}