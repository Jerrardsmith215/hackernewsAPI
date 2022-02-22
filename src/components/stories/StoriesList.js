import React, { useEffect, useState } from 'react';
import { child, get, onValue } from "firebase/database";
import { itemRef, newStoriesRef } from '../../api/references';
import Story from './Story';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function StoriesList() {
  const [newestStories, setNewestStories] = useState([]);

  useEffect(() => {
    onValue(newStoriesRef, async snap => {
      const temp = []
      if (snap.exists()) {
        const storyIds = snap.val();
        for(let i = 0, n = storyIds.length; i < n; i++) {
          const id = storyIds[i];
          const story = await get(child(itemRef, `${id}`))
          .then(res => res.val())
          .catch(e => console.log(e));
          temp.push(story);
        }
        console.log(temp)
        setNewestStories(temp);
      }
      else setNewestStories([]);
    });

  }, []);

  return (
    <>
      <Container>
        <h1>Hacker News Newest Stories</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {newestStories.map(story =>
              <Grid key={story.id} item xs={12}><Story details={story} /></Grid>)
            }
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default StoriesList;