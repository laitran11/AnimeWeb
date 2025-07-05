import React from 'react'
import {
    Typography, Container,
    Button, Divider, Box
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import '@styles/HomePage.css';
import CardImage from '@components/CardImage';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useGetAnimeListQuery } from '@api/animeApi';
import CustomNavbar from '@components/CustomNavbar';
import { useNavigate } from 'react-router';

export default function HomePage() {
    const { data, error, isLoading } = useGetAnimeListQuery();
    const navigate = useNavigate();
    
    const getRandomItems = (array, count =4) => {
        return [...array]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    };
    const formatGenres = (genresString) => {
        return genresString
            .replace(/\[|\]/g, '')
            .replace(/'/g, '')
            .split(',')
            .map(s => s.trim())
            .join(', ');
    };
    return (
        <>
            <CustomNavbar />
            {/* Main Content */}
            <Grid container spacing={2}>
                <Grid item size={12}>
                    <Typography variant='h3' className="intro-align intro-margin intro-title">
                        Explore The Top of Anime
                    </Typography>
                </Grid>
                <Grid item size={12} className='intro-align intro-content-margin'>
                    <Typography variant='h6' className="intro-content">
                        Welcome to the Anime World. Explore the best anime series, movies, and more. Dive into the captivating stories, stunning visuals, and unforgettable characters that make anime a beloved art form worldwide.
                    </Typography>
                </Grid>
                <Grid item size={12} className='intro-align'>
                    <Button variant='contained' className='button-align' endIcon={<ArrowOutwardIcon />} onClick={() => navigate('/top-anime')}>
                        Explore Now
                    </Button>
                </Grid>

            </Grid>
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                {/* Discover Section */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }} className='discover-align' >
                        <Typography variant='h5'>
                            Discover New Anime
                        </Typography>
                    </Grid>
                  {
                   data && getRandomItems(data.results).slice(0,4).map((anime, index) => (
                        <Grid size={{ xs: 6, md: 3 }} >
                        <CardImage
                         srcImg={anime.image_url} 
                         cardTitle={anime.title} 
                         cardDescription={anime.members}
                         genres={formatGenres(anime.genres)}
                         />
                    </Grid>
                    ))
                  }
                </Grid>
            </Container>
            {/* Footer Section  */}
            <Box className="footer-container" >
                <Container maxWidth="xl" sx={{ flexGrow: 1 }}>

                    <Grid container spacing={2} className='footer-align'>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box display="flex" alignItems="center">
                                <AdbIcon sx={{ mr: 1, color: '#6cc832' }} />
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'flex' },
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    ANIME
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <Typography variant='h6' className='footer-title'>
                                Resource
                            </Typography>
                            <Typography variant='body1'>
                                Help center
                            </Typography>
                            <Typography variant='body1'>
                                Platform status
                            </Typography>
                            <Typography variant='body1'>
                                Partners
                            </Typography>
                            <Typography variant='body1'>
                                Live auctions
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <Typography variant='h6' className='footer-title'>
                                Account
                            </Typography>
                            <Typography variant='body1'>
                                Authors
                            </Typography>
                            <Typography variant='body1'>
                                Collection
                            </Typography>
                            <Typography variant='body1'>
                                Go to profile
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }} className='footer-title'>
                            <Typography variant='h6'>
                                Join the community
                            </Typography>
                            <FacebookIcon />
                            <InstagramIcon sx={{ marginLeft: '10px' }} />
                            <LinkedInIcon sx={{ marginLeft: '10px' }} />

                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Divider sx={{ backgroundColor: '#fff', margin: '20px 0px' }} />
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                © 2025 Anime - Made By LaiTran
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    )
}
