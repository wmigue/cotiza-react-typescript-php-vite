
import { useNavigate } from "react-router-dom";
import "./nav.css"

export const Nav = (): JSX.Element => {
    const navigate = useNavigate();

    return (
                <button
                    className="btn  btn-link"
                    onClick={() => navigate('/orden-compra')}> 
                    generar orden compra
                </button>
        
    )
}

export default Nav