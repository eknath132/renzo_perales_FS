import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Context from '../../Context/contextLogin';

const AlbumCard = ({images, artist, published, action, getAlbum, albumID, removeAlbum, deleteAlbum } ) => {

    const { myAlbums } = useContext(Context)

    const getVerifyRepeat = () => {
        const verify = myAlbums.find(album => album.album.id === albumID)
        if(deleteAlbum) {
            return true
        }
        return verify ? true : false
    }

    return (
        <Card sx={{background:'inherit', boxShadow:'0px 0px 0px 0px red', position:'relative', height:'100%'}}>
            <CardMedia
                component="img"
                height="220"
                image={images[0].url}
                alt={images[0].url}
            />
            <CardContent sx={{position:'relative', marginBottom:'45px'}}>
                <Grid mt={1} className='titleCard' sx={{color:'#fff'}}>
                    {artist}
                </Grid>
                <Grid mt={1} className='textInfo' sx={{color:'#fff'}}> 
                    Publicado: {published}
                </Grid>
            </CardContent>
            {action && 
                <CardActions sx={{position:'absolute', bottom: 0}}>
                    {getVerifyRepeat() 
                        ?   <Grid onClick={() => removeAlbum(albumID)} sx={{width:'150px', height:'44px', borderRadius:'100px', background: '#E3513D', justifyContent:'center', display:'flex', lineHeight:'44px', color:'#fff', cursor:'pointer'}}>
                                - Remove album {getVerifyRepeat()}
                            </Grid>
                        :   <Grid onClick={() => getAlbum(albumID)} sx={{width:'150px', height:'44px', borderRadius:'100px', background: '#D6F379', justifyContent:'center', display:'flex', lineHeight:'44px', color:'#000', cursor:'pointer'}}>
                                + Add album {getVerifyRepeat()}
                            </Grid>
                    }
                    
                </CardActions>
            }
            
        </Card>    
    )
}

export default AlbumCard;