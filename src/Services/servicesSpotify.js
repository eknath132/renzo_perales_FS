import { getAPIClient } from "./api"

const endpoint = 'https://accounts.spotify.com/authorize'
const clientID = 'xxxxxxxxxxx'
const redirectUri = 'http://localhost:3000/'
const scopes = [
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-position',
    'user-top-read',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read'
]

export const LoginURL = `${endpoint}?client_id=${clientID}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`


const url = 'https://api.spotify.com/v1/'


// const token = localStorage.getItem('token')

const api = getAPIClient()
// get album
export const SearchAlbumns = async(artist, token) => {
    const artistID = await api.get(`${url}search?q=${artist}&type=artist`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }).then( ({ data }) => data.artists.items[0].id ).catch(({response}) => response.status )

    if(artistID === 401) {
        return artistID
    } 

    const albums = await api.get(`${url}artists/${artistID}/albums/?include_groups=album&market=US&limit=50`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }).then( ({ data }) => data.items ).catch(({response}) => response.status)

    return albums
}

// get artist

export const SearchArtist = async(artist, token) => {
    const artistID = await api.get(`${url}search?q=${artist}&type=artist`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }).then( ({ data }) => data.artists.items[0]).catch(({response}) => response.status)

    return artistID
}

// add album 

export const servicesAddAlbum = async(artist, token) => {
    const addID = await api.put(`${url}me/albums`, {
        ids: artist
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }).then( (data) => data.status ).catch(({response}) => response.status)

    return addID
}

export const serviceMe = async(token) => {
    const myUser = await api.get(`${url}me/albums?limit=50&market=US`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }).then( ({data}) => data.items ).catch(({response}) => response.status)

    return myUser
}

export const serviceRemoveAlbum = async(artist, token) => {
    const addID = await api.delete(`${url}me/albums?ids=${artist}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }).then( (data) => data.status).catch(({response}) => response.status)

    return addID
}