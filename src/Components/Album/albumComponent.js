import React, { useEffect, useState } from 'react'

// MATERIAL
import { Grid, useMediaQuery } from '@mui/material';
import SearchHome from './search';
import { SearchAlbumns } from '../../Services/servicesSpotify';
import HomeCard from './albumCard';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

const AlbumComponent = ( ) => {

    const [ inputValue, setInputValue ] = useState('')
    const [ albumns, setAlbumns ] = useState([])
    const [ albumIndex, setAlbumnIndex ] = useState(0)
    const [ showAlbums, setShowAlbumns ] = useState([]) 
    const [ responseNull, setResponseNull ] = useState(false)
    const token = localStorage.getItem('token')
    const mobile = useMediaQuery('(max-width:500px)');

    const navigate = useNavigate()

    useEffect(() => {
        window.location.hash = ''
    },[])

    const getArtist = async() => {
      const albumsData  = await SearchAlbumns(inputValue, token)
        if( albumsData === 401 ) {
            return navigate('/login')
        }

        if(albumsData.length === 0) {
            setResponseNull(true)
            setAlbumns([])

        } else {
                setResponseNull(false)
                setAlbumns(albumsData)
                setShowAlbumns(albumsData.slice(albumIndex, albumIndex + 4))
        }
    }

    const setShowAlbum = (_, value ) => {
        if(value + 4 <= albumns.length){
            setAlbumnIndex(value)
            setShowAlbumns(albumns.slice(value, value + 4))
        }
    }

    return (
        <Grid item container rowSpacing={4}>
            <Grid item container direction={'column'} alignContent='center' xs={12} className='textTitle'>
                <Grid item sx={{color: '#fff'}}>
                    Busca tus 
                </Grid>
                <Grid sx={{color:'#D6F379', textAlign:'center'}}>
                    artistas
                </Grid>
            </Grid>
            <Grid item container direction={'column'} alignContent='center' xs={12} className='textInfo' sx={{color:'#fff', textAlign: mobile ? 'left' : 'center'}}>
                {mobile 
                    ?   <Grid item>
                            Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos 
                        </Grid> 
                    :   <>
                            <Grid item>
                                Encuentra tus artistas favoritos gracias a nuestro
                            </Grid>
                            <Grid item>
                                buscador y guarda tus álbumes favoritos 
                            </Grid>
                        </>  
                }
                
            </Grid>
            <Grid item container justifyContent={'center'} xs={12} className='textInfo' sx={{color:'#fff'}}>
                <SearchHome setInputValue={setInputValue} getArtist={getArtist}/>
            </Grid>

            {albumns.length > 0 && 
                <Grid item xs={10} container justifyContent={'center'} sx={{margin:'50px auto 0 auto'}} rowSpacing={3}>
                    <Grid item container mb={2} sx={{color:'#fff'}}>
                        Mostrando {albumns.length > 4 ? 4 : albumns.length} resultados de {albumns.length}
                    </Grid>
                    {showAlbums.map((album, i) => {
                        return (
                            <Grid item sm={6} lg={3} key={i} className='containerCard' onClick={() => navigate(`/artist/${inputValue}`)}>
                                <HomeCard images={album.images} artist={album.name} published={album.release_date}/>
                            </Grid>
                        )
                    })}
                    <Grid item container>
                        <Pagination count={albumns.length} defaultPage={1} siblingCount={0} onChange={setShowAlbum} sx={{'& .MuiPaginationItem-sizeMedium':{
                            color:'#fff'
                        }}}/> 
                    </Grid>
                </Grid>
            }

            {responseNull  && 
                <Grid item xs={10} container justifyContent={'center'} sx={{margin:'50px auto 0 auto'}} rowSpacing={3}>
                    <Grid item mb={2} sx={{color:'#fff'}}>
                        No hay resultados para esta busqueda
                    </Grid>
                </Grid>
            }

        </Grid>
    )
}

export default AlbumComponent;