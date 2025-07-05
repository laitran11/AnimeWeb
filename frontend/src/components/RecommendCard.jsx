import React from 'react'
import {Box, Typography } from '@mui/material';
import '@styles/RecommendCard.css';
export default function RecommendCard( {urlPage,srcImg, title, genres,description} ) {
  return (
    <Box className="card-container">
      <a href={urlPage}>
        <img
          src={srcImg}
          alt="img"
          className="card-img"
        />
      </a>
      <Box className="card-info">
        <Typography variant="h6" className="card-title">
          {title}
        </Typography>
        <Typography variant="body2" className="card-description">
          Genres: {genres}
        </Typography>
        <Typography variant="body2" className="card-description" >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
