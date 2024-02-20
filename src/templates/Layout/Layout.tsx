import { ReactNode } from "react"
import { Row, Col, Container } from "react-bootstrap"


interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => {
    return (
        <Container className="text-center w-75">
            <Row className="justify-content-center">
                <Col className="text-center">
                    {
                        children && children
                    }
                </Col>
            </Row>

        </Container>
    )
}

