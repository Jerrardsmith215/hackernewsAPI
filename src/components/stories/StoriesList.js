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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function sortByAuthor(a, b) {
  const nameA = a.by.toUpperCase();
  const nameB = b.by.toUpperCase();

  if (nameA < nameB) {
    return -1
  }

  if (nameA > nameB) {
    return 1
  }

  return 0;
}

function sortByTime(a, b) {
  const timeA = a.time;
  const timeB = b.time;

  if (timeA < timeB) {
    return -1
  }

  if (timeA > timeB) {
    return 1
  }

  return 0;
}

function sortByScore(a, b) {
  const scoreA = a.score;
  const scoreB = b.score;

  if (scoreA < scoreB) {
    return -1
  }

  if (scoreA > scoreB) {
    return 1
  }

  return 0;
}

function StoriesList() {
  const [newestStories, setNewestStories] = useState([]);
  const [sortFilter, setSortFilter] = useState(1)
  const [isLoading, setIsLoading] = useState();

  function handleSortChange(sorter) {
  if(sorter === 1) {
    const sorted = newestStories.sort(sortByAuthor);
    setNewestStories(sorted);
  }

  else if(sorter === 2) {
    const sorted = newestStories.sort(sortByTime);
    setNewestStories(sorted);
  }

  else if(sorter === 3) {
    const sorted = newestStories.sort(sortByScore);
    setNewestStories(sorted);
  }
  }

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
        if (sortFilter === 1) {
          temp.sort(sortByAuthor);
        } else if (sortFilter === 2) {
          temp.sort(sortByTime);
        } else if (sortFilter === 3) {
          temp.sort(sortByScore);
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
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" sx={{ paddingY: 3 }}>Hacker News Newest Stories</Typography>
          <Stack sx={{paddingY: 1}} spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleSortChange(1)}>Author</Button>
            <Button variant="outlined" onClick={() => handleSortChange(2)}>Time</Button>
            <Button variant="outlined" onClick={() => handleSortChange(3)}>Score</Button>
          </Stack>
        </Box>
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