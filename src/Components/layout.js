import React from 'react';
import { useNavigate } from 'react-router-dom';
// MATERIAL
import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Layout = ( {children, title} ) => {
    const navigate = useNavigate()
    const mobile = useMediaQuery('(max-width:500px)');

    const signOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return ( 
        <Container maxWidth="false" sx={{background:'#000'}}>
            <Box component="header" sx={{width:'100%', height:' 90px', display:'flex', alignItems:'center'}}>
                <Grid container columnSpacing={5} justifyContent={'end'} className='textNav'>
                    <Grid item>
                        <Typography sx={{color: title === 'album' ? '#D6F379' : '#fff', cursor: 'pointer'}} onClick={() => navigate('/')}>
                            Buscar
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography sx={{color: title === 'myAlbum' ? '#D6F379' : '#fff', cursor: 'pointer'}} onClick={() => navigate('/myALbum')}>
                            Mis albumes
                        </Typography>
                    </Grid>
                    <Grid item sx={{color:'#fff'}}>
                        |
                    </Grid>
                    <Grid item>
                        {mobile
                            ?   <Grid onClick={() => signOut()}> 
                                    <LogoutIcon sx={{color:'#fff'}}/>
                                </Grid>
                            :   <Typography sx={{color:'#fff', cursor: 'pointer'}} onClick={() => signOut()}>
                                    Cerrar Sesión
                                </Typography>
                        }
                        
                    </Grid>
                </Grid>
            </Box>

            <Box component="main" sx={{ minHeight: '100vh', flexGrow: 1, width: '100%%', zIndex: 1, scroll:'auto' }}>
                {children}
            </Box>

        </Container>
    )
}

export default Layout