import React from 'react';
import { Box, Grid } from '@mui/material';

const SearchAlbum = ({setInputValue, getArtist}) => {
    return ( 
        <Grid container sx={{width: '600px', background:'#fff', position:'relative'}}>
            <Box component={'input'} px={2} type={'text'} className='button' sx={{color:'#000', height:'50px', borderRadius:'100px', width:'100%', position:'absolute', outline:0}} onChange={(e) => setInputValue(e.target.value)} />
            <Grid item sx={{position: 'absolute', zIndex:'100', right:'0', marginRight:'10px', marginTop:'5px'}}>
                <Grid item className='button' sx={{background:'#D6F379', cursor:'pointer' ,height:'40px', lineHeight:'40px', borderRadius:'10px', width:'150px', textAlign:'center', color:'#000'}} onClick={() => getArtist()}>
                    Search
                </Grid>
            </Grid>
        </Grid>
    )
} 

export default SearchAlbum;