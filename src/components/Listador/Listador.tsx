import ListGroup from 'react-bootstrap/ListGroup'

interface Props {
    arr: any[] | undefined,
}

export default function Listador({ arr }: Props) {
    return (
        <ListGroup >
            {
                arr?.map(x => <ListGroup.Item variant="warning" > {x}</ListGroup.Item>)
            }
        </ListGroup>
    )
}

