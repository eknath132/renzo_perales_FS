import React from 'react';

// Components
import LoginComponent from '../../Components/Login/loginComponent';
import Logo from '../../Assets/logo.svg';

// Material
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Login = () => {
    return (
        <Container maxWidth='false' sx={{background:'#000', minHeight:'100vh', alignItems:'center', display:'flex'}}>
            <Grid container item rowSpacing={5} flexGrow={1} sx={{height:'50%', margin:'auto 0'}}>
              <Grid item xs={12} md={6} lg={6} className='containerImg'>
                <img src={Logo} alt={'logo'} className='logo'/>
              </Grid>
              <Grid item xs={12} lg={6} className='container'>
                <LoginComponent/>
              </Grid>
            </Grid>
        </Container>
    )
}

export default Login;