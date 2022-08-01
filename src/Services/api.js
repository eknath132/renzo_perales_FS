import axios from 'axios';

export const getAPIClient = () => {
    const api = axios.create({
        "Content-Type": "application/json",
        "baseURL": 'https://api.spotify.com/v1/'
    })

    return api;
}    