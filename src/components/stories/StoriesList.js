import React, { useEffect, useState } from 'react';
import { onValue } from "firebase/database";
import { Link } from 'react-router-dom';
import { newStoriesRef } from '../../api/references';
import Story from './Story';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function StoriesList() {
  const [newestStories, setNewStories] = useState();
  useEffect(() => {
    const newStories = newStoriesRef;
    // subscribe to the database reference using 'onValue' (check Firebase API for details)
    // combined with react's useEffect, this page will ultimately update whenever Hackernews updates the database 
    onValue(newStories, (snapshot) => {
      const data = snapshot.val(  );
      setNewStories(data);
    });
  }, []
  );
  return (
    <>
      <Container>
        <h1>Hacker News Newest Stories</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {Array.isArray(newestStories) ? newestStories.map(story => 
              <Grid key={story.toString()} item xs={12} lg={6}><Story id={story}/></Grid>
            )
            : null
            }
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default StoriesList;