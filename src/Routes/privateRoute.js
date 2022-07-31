import { useContext, useEffect } from 'react';
import Context from '../Context/contextLogin';

import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const { setToken, token } = useContext(Context)
    const hash = window.location.hash

    useEffect(( ) => {
        if(hash) {
            const token = hash.substring(1).split("&")[0].split('=')[1]
            localStorage.setItem('token', token)
            setToken(token)
        }

    }, [hash, setToken])

    return hash || token ? children : <Navigate to={'/login'}/>
}
