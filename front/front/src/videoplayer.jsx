import React, {useState, useEffect} from 'react'
import axios from 'axios';

const url = "http://localhost:9001/"

const Video = () => {
    const [src, setSrc] = useState('');

    useEffect( async () => {
        async function fetchData () {
            const response = await fetch(url)
            const data = await response.json()

            setSrc(data)
        }
        fetchData()
    }, [])

    return(
        <video controls width="500">
            <source src={src}></source>
        </video>
    )
}

export default Video