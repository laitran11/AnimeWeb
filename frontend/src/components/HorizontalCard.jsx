import React from 'react'
import { Box, Typography, Container, Link } from '@mui/material';
import '@styles/HorizontalCard.css';
import Grid from '@mui/material/Grid';
export default function HorizontalCard({ cardImg, rank, title, score, members, urlpage, aired, episodes, type, description }) {
    return (
        <Box className="horizontal-card">
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 1 }} >
                        <Typography variant='h5' className='horizontal-card-rank'>
                            {rank}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2} className="horizontal-card">
                        <div className="horizontal-card-container">
                            <img
                                src={cardImg}
                                alt="anime"
                                className="horizontal-card-image"
                            />
                            <Box className="horizontal-card-info">
                                <Typography variant="body2" className="horizontal-card-episodes">
                                    Ep {episodes}
                                </Typography>
                                <Typography variant="body2" className="horizontal-card-type">
                                    {type}
                                </Typography>
                            </Box>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 8, md: 6 }}>
                        <Link href={urlpage} underline="none">
                            <Typography variant="h5" className="horizontal-card-title">
                                {title}
                            </Typography>
                        </Link>
                        <Typography variant='body1' className='horizontal-card-score'>
                            Score: {score}
                        </Typography>
                        <Typography variant='body2' className='horizontal-card-members'>
                            Members: {members.toLocaleString()}
                        </Typography>
                        <Typography variant='body2' className='horizontal-card-members'>
                            {aired}
                        </Typography>
                        <Typography variant='body2' className='horizontal-card-description'>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}
