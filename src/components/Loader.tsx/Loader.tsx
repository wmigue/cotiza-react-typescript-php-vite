import Spinner from 'react-bootstrap/Spinner'

export default function Loader() {
    return (
        <>
            <p className='p-3'>
                <Spinner animation="grow" />
            </p>

        </>
    )
}

