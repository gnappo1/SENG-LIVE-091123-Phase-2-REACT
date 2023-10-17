import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'
const ErrorComponent = () => {
    const error = useRouteError();
    const navigate = useNavigate()
    return (
        <div className='error'>
            <h1>Ooooopsies</h1>
            <img className="error-image" src={process.env.PUBLIC_URL + "/not-found-page.png"} alt={error.data} />
            <h3>Error code: {error.status}</h3>
            <h3>Error message: {error.data}</h3>
            <aside>
                <button onClick={() => navigate(-1)}>Back</button>
            </aside>
        </div>
    )
}

export default ErrorComponent