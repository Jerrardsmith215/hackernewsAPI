import React, { useEffect, useState } from 'react';
import { onValue } from "firebase/database";
import { newStoriesRef } from '../../api/references';
import Story from './Story';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function StoriesList() {
  const [newestStories, setNewestStories] = useState([]);
  const [storyObjs, setStoryObjs] = useState([]);

  useEffect(() => {
    onValue(newStoriesRef, snap => {
      if (snap.exists()) {
        setNewestStories(snap.val());
      } else setNewestStories([]);
    });

    return () => {
      setNewestStories([]);
    };
  }, [newStoriesRef]);

  return (
    <>
      <Container>
        <h1>Hacker News Newest Stories</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {newestStories.map(story =>
              <Grid key={story} item xs={12}><Story id={story} /></Grid>)
            }
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default StoriesList;