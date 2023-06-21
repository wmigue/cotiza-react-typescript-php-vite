import { ReactElement, ReactNode } from "react"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import './Layout.css'
import { Cotizacion } from "../Cotizacion"
import { Grid } from "@mui/material"

interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2} columns={12}>
            <Grid item xs={6} sm={6} order={isMobile ? 2 : 1}>
                {children}
            </Grid>
            <Grid item xs={12} sm={12} order={isMobile ? 2 : 1}>
                <Cotizacion />
            </Grid>
        </Grid>
    )
}
