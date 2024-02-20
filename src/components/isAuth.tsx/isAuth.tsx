

import { Navigate, Outlet } from 'react-router-dom'



interface Props {
    valido: boolean
}


export const IsAuth = ({ valido }: Props) => {


    if (valido) {
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />

    }



}