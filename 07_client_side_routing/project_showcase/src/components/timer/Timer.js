import { useEffect, useState } from 'react'

const Timer = () => {
    const [timer, setTimer] = useState(0);
    console.log("Component is rendering")

    useEffect(() => {
        console.log("Inside the useEffect")
        // effect
        const id = setInterval(() => {
            console.log("inside the effect")
            setTimer(currentTimer => currentTimer + 1)
        }, 1000)
        // cleanup
        return () => {
            console.log("Inside the cleanup")
            clearInterval(id)
        }
    }, []);

    return (
        <div>{timer}</div>
    )
}

export default Timer