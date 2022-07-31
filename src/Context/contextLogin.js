import React from 'react';
import { createContext, useState } from "react";
// import { useNavigate } from 'react-router-dom';

const Context = createContext({})

export const InfoContextLogin = ({children}) => {

    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    const [ myAlbums, setMyAlbums ] = useState([]);

    return (
        <Context.Provider 
            value={{
                token,
                setToken,
                myAlbums,
                setMyAlbums
            }}
        >
            {children}
        </Context.Provider>
    )
}
export default Context;
// export default Context;