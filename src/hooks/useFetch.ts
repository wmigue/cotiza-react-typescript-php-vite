import { useEffect, useState } from 'react'

interface Props {
    loading: boolean,
    data: any
}

export const useFetch = (url: string): Props => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<Promise<any>>(Promise.resolve([]))

    const fetchData = () => {
        fetch(url)
            .then((x) => x.json())
            .then((x) => {
                setData(x)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    return { loading, data }
}


