import { ChangeEvent, SetStateAction } from "react"

export const HandleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>, despachante: React.Dispatch<SetStateAction<any>>, propiedadDeObj: string = "") => {
    if (propiedadDeObj === "") {
        despachante(e.target.value)
    } else {
        despachante((state: object) => ({ ...state, [propiedadDeObj]: e.target.value }))
    }
}