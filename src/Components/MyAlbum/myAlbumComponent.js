import { Grid, useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { serviceMe, serviceRemoveAlbum } from '../../Services/servicesSpotify';
import AlbumCard from '../Album/albumCard';

const MyAlbumComponent = () => {

    const [ albumns, setAlbumns ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const token = localStorage.getItem('token')
    const mobile = useMediaQuery('(max-width:500px)');
    const navigate = useNavigate()

    const getMyAlbum = useCallback(async(token) => {
        const myAlbums = await serviceMe(token) 
    
        if(myAlbums === 401) {
            localStorage.removeItem('token')
            // navigate('/login')
        } 

        if(myAlbums.length === 0) {
            setAlbumns([])
            setLoading(!myAlbums)
        } else {
            setAlbumns(myAlbums)
            setLoading(!myAlbums)
        }
    },[])
    console.log('loading', loading)

    useEffect(( ) => {
        getMyAlbum(token)
    },[getMyAlbum, token])


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
        <Grid item container rowSpacing={4}>
            <Grid item container direction={'column'} alignContent='center' xs={12} className='textTitle'>
                <Grid item sx={{color: '#fff'}}>
                    Mis albumes 
                </Grid>
                <Grid sx={{color:'#D6F379', textAlign:'center'}}>
                    Guardados
                </Grid>
            </Grid>
            <Grid item container direction={'column'} alignContent='center' xs={12} className='textInfo' sx={{color:'#fff', textAlign: mobile ? 'left' : 'center'}}> 
                {mobile 
                    ?   <Grid item>
                            Disfruta de tu música a un solo click y descubre que discos has guardado dentro de "mis álbumes" 
                        </Grid>
                    :   <>
                            <Grid item>
                                Disfruta de tu música a un solo click y descubre que
                            </Grid>
                            <Grid item>
                                discos has guardado dentro de "mis álbumes" 
                            </Grid>
                        </>  
                        
                }
                
            </Grid>

            {albumns?.length > 0 &&
                <Grid item xs={10} container justifyContent={'center'} sx={{margin:'50px auto 0 auto'}} rowSpacing={3}>
                    {albumns?.map((album, i) => {
                        return (
                            <Grid item md={6} lg={3} key={i} className='containerCardArtist'>
                                <AlbumCard images={album.album.images} artist={album.album.name} action published={album.album.release_date} albumID={album.album.id} removeAlbum={removeAlbum} deleteAlbum/>
                            </Grid>
                        )
                    })}
                </Grid>
            }

            {albumns.length === 0 && !loading  && 
                <Grid item xs={10} container justifyContent={'center'} sx={{margin:'50px auto 0 auto'}} rowSpacing={3}>
                    <Grid item mb={2} sx={{color:'#fff'}}>
                        No tienes albumes guardados
                    </Grid>
                </Grid>
            }

        </Grid>
    )
}

export default MyAlbumComponent;