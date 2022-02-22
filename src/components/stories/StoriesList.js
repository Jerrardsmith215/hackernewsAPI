import React, { useEffect, useState } from 'react';
import { child, get, onValue } from "firebase/database";
import { itemRef, newStoriesRef } from '../../api/references';
import Story from './Story';
import Loader from '../loader/Loader';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function StoriesList() {
  const [newestStories, setNewestStories] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    const temp = [];

    (async () => onValue(newStoriesRef, async snap => {
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
    }
    )
    )()

  }, [newStoriesRef]);

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
              typeof story === 'object' ? (<Grid key={index} item xs={12} md={6}><Story details={story ? story : ({})} /></Grid>)
                :
                <Typography variant="body2">Error Rendering This Card...</Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default StoriesList; 