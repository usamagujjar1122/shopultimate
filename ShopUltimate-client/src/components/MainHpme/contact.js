import { Button, Grid, Paper, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contact = () => {
    const matches = useMediaQuery('(min-width:1000px)');
    return ( 
        <>
            <Stack direction={matches ? "row": 'column'} sx={{justifyContent:'center',gap:'30px'}}>
                <Paper sx={{display:'flex',flexDirection:'column',alignItems:'center',padding:'20px'}}>
                    <Stack><img src={"contact.svg"} /></Stack>
                    <Stack sx={{width:'100%',margin:'20px 0px',gap:'10px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Address</Typography>
                        <Typography>My address</Typography>
                    </Stack>
                    <Stack sx={{width:'100%',margin:'20px 0px',gap:'10px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Address</Typography>
                        <Typography>My address</Typography>
                    </Stack>
                    <Stack sx={{width:'100%',margin:'20px 0px',gap:'10px'}}>
                        <Typography sx={{fontWeight:'bold'}}>Follow Us</Typography>
                        <Stack direction={"row"} sx={{gap:'10px','&>svg':{color:'gray'}}}>
                            <FacebookIcon />
                            <TwitterIcon />
                            <InstagramIcon /> 
                        </Stack>
                    </Stack>
                </Paper>
                <Paper sx={{display:'flex',flexDirection:'column',alignItems:'center',padding:'20px',gap:'20px',justifyContent:'center',minWidth:'50%'}}>
                    <Typography sx={{fontWeight:'bold',fontSize:{xs:'1.25rem',md:'1.75rem'}}}>
                    Questions, Comments, Or Concerns?
                    </Typography>
                    <Stack direction="row" sx={{width:'100%',gap:'20px'}}> 
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth/>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth/>
                    </Stack>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth/>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth multiline rows={4}/>
                    <Button  variant="contained" color="success">SUBMIT</Button>
                </Paper>
            </Stack>
        </>
     );
}
 
export default Contact;