import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Container, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import CustomNavbar from '@components/CustomNavbar'

import '@styles/TopAnime.css';
import { usePostRecommendMutation } from '../api/recommendApi'
import RecommendCard from '@components/RecommendCard'

function getDisplayPages(currentPage, totalPages) {
    const pages = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (currentPage > 2) pages.push(1);
        if (currentPage > 3) pages.push("...");

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) pages.push(i);
        }

        if (currentPage < totalPages - 2) pages.push("...");
        if (currentPage < totalPages) pages.push(totalPages);
    }

    return pages;
}
const genresData =
    ['Action',
        'Adventure',
        'Avant Garde',
        'Award Winning',
        'Boys Love',
        'Comedy',
        'Drama',
        'Ecchi',
        'Fantasy',
        'Girls Love',
        'Gourmet',
        'Horror',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Slice of Life',
        'Sports',
        'Supernatural',
        'Suspense'
    ]
const typesData = ['TV', 'Movie', 'TV Special', 'OVA', 'ONA', 'Special', 'Unknown']
export default function Recommendations() {
    const [postRecommend, { isLoading: isPosting }] = usePostRecommendMutation();
    const [genres, setGeres] = useState('');
    const [types, setTypes] = useState('');
    const [title, setTitle] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [studios, setStudios] = useState('');
    const [recommendationResult, setRecommendationResult] = useState([]);
    const handleClick = async () => {
        try {
            const result = await postRecommend({
                title: title,
                genres: genres,
                studios: studios,
                types: types,
                descriptions: descriptions
            })
                .unwrap();
            setRecommendationResult(result);
        }
        catch (err) {
            console.error("Failed to fetch recommendation:", err);
        }
    };
    const formatGenres = (genresString) => {
        return genresString
            .replace(/\[|\]/g, '')
            .replace(/'/g, '')
            .split(',')
            .map(s => s.trim())
            .join(', ');
    };
    const isFormEmpty =
        !title.trim() &&
        !genres &&
        !types &&
        !studios.trim() &&
        !descriptions.trim();




    return (
        <>
            <CustomNavbar />
            <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }} className='intro-align intro-margin intro-title' >
                        <Typography variant='h5' className='recommendation-title'>
                            Recommendation System
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}  >

                        <Typography variant='body2' className='recommendation-content'>
                            Create your own anime recommendation system by filling out the form below. Provide details such as title, genres, studios, types, and descriptions to help others discover new anime.
                        </Typography>
                        <Grid container spacing={2} className='recommendation-content'>
                            <Grid size={{ xs: 12 }} className='recommendation-content-select' >
                                <TextField fullWidth label="Title" variant="outlined" className="custom-textfield"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} className='recommendation-content-select' >
                                <FormControl fullWidth className="custom-select">
                                    <InputLabel>Genres</InputLabel>
                                    <Select defaultValue="" values={genres} onChange={(e) => setGeres(e.target.value)}>
                                        {genresData.map((genre, index) => (
                                            <MenuItem key={index} value={genre}>{genre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} className='recommendation-content-select' >
                                <FormControl fullWidth className="custom-select">
                                    <InputLabel>Types</InputLabel>
                                    <Select defaultValue="" values={types} onChange={(e) => setTypes(e.target.value)}>
                                        {typesData.map((type, index) => (
                                            <MenuItem key={index} value={type}>{type}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12 }} className='recommendation-content-select' >
                                <TextField fullWidth label="Studios" variant="outlined" className="custom-textfield"
                                    value={studios}
                                    onChange={(e) => setStudios(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }} className='recommendation-content-select' >
                                <TextField fullWidth label="Descriptions" variant="outlined" multiline rows={3} className="custom-textfield"
                                    value={descriptions}
                                    onChange={(e) => setDescriptions(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }} className='recommendation-content-select' >
                                <button className='recommendation-button' onClick={handleClick} disabled={isPosting || isFormEmpty}>
                                    {isPosting ? 'Loading...' : 'Find Similar Anime'}
                                </button>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}  >
                        <Box className='recommendation-result' >
                            {
                                recommendationResult.length === 0 && (
                                    <Typography variant='body2' className='recommendation-result-text'>
                                        No recommendations found. Please fill out the form and click "Find Similar Anime".
                                    </Typography>
                                )
                            }
                            {recommendationResult.map((anime, idx) => (
                                <RecommendCard
                                    key={idx}
                                    urlPage={anime.url}
                                    srcImg={anime.image_url}
                                    title={anime.title}
                                    genres={formatGenres(anime.genres)}
                                    description={anime.description}
                                />

                            ))}

                        </Box>
                    </Grid>

                </Grid>



            </Container>
        </>
    )
}
