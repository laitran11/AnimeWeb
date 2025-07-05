import React from 'react'
import {Box, Typography } from '@mui/material';
import '@styles/CardImage.css';
export default function CardImage( {srcImg, cardTitle, cardDescription,genres} ) {
  return (
    <Box className="card-image">
        <img
            src={srcImg}
            alt="img"
            style={{
            width: '100%',
            height: '300px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        />
        <Typography variant='h6' className='card-title'>
            {cardTitle}
        </Typography>
        <Typography variant='body2' className='card-description' sx={{overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'}}>
          {genres}
        </Typography>
        <Typography variant='body2' className='card-description'>
          Members: {cardDescription.toLocaleString()}
        </Typography>
    </Box>
  )
}
