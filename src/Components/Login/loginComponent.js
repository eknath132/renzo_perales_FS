import React from 'react';

// MATERIAL
import Grid from '@mui/material/Grid';
import EastIcon from '@mui/icons-material/East';
import { LoginURL } from '../../Services/servicesSpotify';

const LoginComponent = () => {

    const getLogin =  () => {
        window.location.replace(LoginURL)
    }
    
    return (
        <Grid container item direction={'column'}>
            <Grid item className='textTitle' sx={{color:'#fff'}}>
                Disfruta de la
            </Grid>
            <Grid item className='textTitle' sx={{color:'#D6F379'}}>
                mejor música
            </Grid>
            <Grid mt={5} item className='textInfo' sx={{color:'#fff'}}>
                Accede a tu cuenta para guardar tus 
            </Grid>
            <Grid item className='textInfo' sx={{color:'#fff'}}>
                albumes favoritos.
            </Grid>
            <Grid mt={13} item className='button' sx={{color:'#fff'}} onClick={() => getLogin()}>
                Log in con Spotify
                <EastIcon sx={{color:'#fff', marginLeft:'24px', marginTop:'5px'}}/>
            </Grid>
        </Grid>
    )
}

export default LoginComponent;