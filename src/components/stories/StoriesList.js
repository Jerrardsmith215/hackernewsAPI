import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Story from './Story';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function StoriesList() {
  const [stories, setStories] = useState([])
  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <h1>Hacker News Newest Stories</h1>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>

          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default StoriesList;