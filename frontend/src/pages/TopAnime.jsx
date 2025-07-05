import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Container, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import CustomNavbar from '@components/CustomNavbar'
import HorizontalCard from '@components/HorizontalCard'
import '@styles/TopAnime.css';
import { usePostRecommendMutation } from '../api/recommendApi'
import RecommendCard from '@components/RecommendCard'
import BlockLoader from '@components/BlockLoader';
import { Config } from '../Config'
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
export default function TopAnime() {
    const [animeList, setAnimeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const [sortField, setSortField] = useState("Rank");
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
    const [isLoadingAnime, setIsLoadingAnime] = useState(true);

    useEffect(() => {
        setIsLoadingAnime(true);
        fetch(Config.API_URL + 'anime/all')
            .then((res) => res.json())
            .then((data) => {
                setAnimeList(data);
                setIsLoadingAnime(false);
            })
            .catch((err) => {
                console.error("Failed to fetch anime:", err);
                setIsLoadingAnime(false);
            });
    }, []);


    // const sortedList = [...animeList].sort((a,b) =>
    //     a[sortField] > b[sortField] ? 1 : -1
    // );
    const sortedList = [...animeList].sort((a, b) => a[sortField] - b[sortField]);

    const pagedList = sortedList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(animeList.length / itemsPerPage);
    const displayPages = getDisplayPages(currentPage, totalPages);
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
                    <Grid item size={{ xs: 12, md: 12 }}>
                        <Typography variant='h3' className="intro-align intro-margin intro-title">
                            Top Anime Series
                        </Typography>
                        {/* Sort selector */}
                        <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
                            <option value="Rank">Rank</option>
                            <option value="Score">Score</option>
                            <option value="Title">Title</option>
                            {/* add more */}
                        </select>
                        {isLoadingAnime ? (
                             <BlockLoader />
                        ) : (
                            pagedList.map((anime) => (
                                <HorizontalCard
                                    key={anime.id}
                                    cardImg={anime.image_url}
                                    urlpage={anime.url}
                                    rank={anime.rank}
                                    title={anime.title}
                                    score={anime.score}
                                    members={anime.members}
                                    aired={anime.aired}
                                    episodes={anime.episodes}
                                    type={anime.type}
                                    description={anime.description}
                                />
                            ))
                        )}

                        <Box className='pagination-align'>
                            <div className="pagination">
                                <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
                                    Prev
                                </button>

                                {displayPages.map((page, idx) =>
                                    page === "..." ? (
                                        <span key={idx} className="ellipsis">...</span>
                                    ) : (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPage(page)}
                                            className={page === currentPage ? "active" : ""}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        </Box>
                    </Grid>


                </Grid>



            </Container>
        </>
    )
}
