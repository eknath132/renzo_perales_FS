import axios from 'axios';
// import { parseCookies } from 'nookies';
// import { useNavigate } from 'react-router-dom';

// Esta funcion se tiene llamar directamente dentro del getServerSideProps

export const getAPIClient = () => {
    const api = axios.create({
        "Content-Type": "application/json",
        "baseURL": 'https://api.spotify.com/v1/'
    })

    return api;
}    