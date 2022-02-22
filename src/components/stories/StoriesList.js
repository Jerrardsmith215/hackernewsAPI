import React, { useEffect, useState } from 'react';
import { child, get, onValue } from "firebase/database";
import { itemRef, newStoriesRef } from '../../api/references';
import Story from './Story';
import Loader from '../loader/Loader';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function StoriesList() {
  const [newestStories, setNewestStories] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    const temp = [];

    onValue(newStoriesRef, async snap => {
      if (snap.exists()) {
        const storyIds = snap.val();

        for (let i = 0, n = storyIds.length; i < n; i++) {
          const id = storyIds[i];
          const story = await get(child(itemRef, `${id}`))
            .then(res => res.val())
            .catch(() => null);
          temp.push(story);
        }

        setNewestStories(temp);
      } else {
        setNewestStories([])
      };

      setIsLoading(false);
    })

    return () => {
      console.log('unmounting...')
    }

  }, []);

  if (isLoading) {
    return (<>
      <Container sx={{ minHeight: '90vh' }}>
        <Loader />
      </Container>
    </>)
  } else return (
    <>
      <Container>
        <Typography variant="h4" component="h1" sx={{}}>Hacker News Newest Stories</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {newestStories.map((story, index) =>
              typeof story === 'object' && story !== null ? (<Grid key={index} item xs={12} md={6}><Story details={story ? story : ({})} /></Grid>)
                :
                <Grid key={index} item xs={12} md={6}>
                  <Paper sx={{ p: 2 }} elevation={6}>
                    <Typography variant="h5" component="h2">Error Rendering This Card...</Typography>
                  </Paper>
                </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default StoriesList; 