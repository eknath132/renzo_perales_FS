import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchAlbumns, SearchArtist, serviceMe, serviceRemoveAlbum, servicesAddAlbum } from '../../Services/servicesSpotify';
import AlbumCard from '../Album/albumCard';

// Material
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Context from '../../Context/contextLogin';

const ArtistComponent = ( ) => {
    const { id } = useParams()
    const { setMyAlbums } = useContext(Context)
    const [ artist, setArtist ] = useState()
    const [ albumns, setAlbumns ] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const getMyAlbum = useCallback(async() => {
        const myAlbums = await serviceMe(token)      
        setMyAlbums(myAlbums)
        
    },[setMyAlbums, token])

    useEffect(( ) => {

        const getArtist = async() => {
            const artist  = await SearchArtist(id,token)
            setArtist(artist)
        }
        const getAlbum = async() => {
            const albumsData  = await SearchAlbumns(id, token)
      
            if(albumsData.length === 0) {
              setAlbumns([])
            } else {
                setAlbumns(albumsData)
            }
        }
        
        getAlbum()
        getArtist()
        getMyAlbum()

    },[getMyAlbum, id, setMyAlbums, token])

    const getAlbum = async (albumID) => {
        const verifyStatus =   await servicesAddAlbum([albumID], token)

        if(verifyStatus === 200) {
            getMyAlbum()
        }

        if(verifyStatus === 401) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }

    const removeAlbum = async(albumID) => {
        const verifyStatus = await serviceRemoveAlbum([albumID], token)

        if(verifyStatus === 200) {
            getMyAlbum()
        }

        if(verifyStatus === 401) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }
 
    return (
            <Grid item container sx={{color:'#fff'}}>
                {artist && 
                    <>
                        <Grid item container xs={10} sx={{margin:'50px auto 0 auto'}}>
                            <Grid item sm={4} lg={3}>
                                <Avatar
                                    alt={artist?.images[0]?.url}
                                    src={artist?.images[0]?.url}
                                    sx={{ width: 230, height: 230 }}
                                />
                            </Grid>
                            <Grid item container direction={'column'} sm={7} lg={9} justifyContent={'space-between'}>
                                <Grid item>
                                    <Grid item container alignItems={'center'} mt={2} columnSpacing={2}>
                                        <Grid item>
                                            <CheckCircleRoundedIcon sx={{color:'#619CED'}}/>
                                        </Grid>
                                        <Grid item className='textInfo'>
                                            Artista verificado              
                                        </Grid>
                                    </Grid>
                                    <Grid item mt={2} container className="artistTitle">
                                        {artist.name}
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid item container alignItems={'center'} columnSpacing={2}>
                                        <Grid item className='textInfo'>
                                            Followers: {artist.followers.total}           
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {albumns.length > 0 && 
                            <Grid item xs={10} container justifyContent={'center'} sx={{margin:'50px auto 0 auto'}} rowSpacing={3}>
                                <Grid item container mb={2} ml={3} sx={{color:'#fff'}}>
                                    Guarda tus albumnes favoritos de {artist.name}
                                </Grid>
                                {albumns.map((album, i) => {
                                    return (
                                        <Grid item sm={6} lg={3} key={i} className='containerCardArtist'>
                                            <AlbumCard images={album.images} artist={album.name} published={album.release_date} action getAlbum={getAlbum} albumID={album.id} removeAlbum={removeAlbum}/>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        }
                    </>
                }
            </Grid>
    )
}

export default ArtistComponent;