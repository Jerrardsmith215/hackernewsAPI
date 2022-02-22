import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';

function Fullstory() {
  const { state } = useLocation();
  const storyId = state.storyId;
  const title = state.title;
  const author = state.author;
  const time = new Date(state.written * 1000);
  const written = Number(state.written) ?`${time.getMonth()} ${time.getDate()} ${time.getFullYear()}` : 'unavailable';
  const text = state.text;
  const link = state.link;
  const score = state.score;

  return (
    <>
      <Container>
        <Paper sx={{ p: 2 }} elevation={6}>
          <RouterLink to="/">
            <IconButton>
              <ArrowBack />
              <Typography variant="body2" sx={{ marginTop: .21 }} >Back to All</Typography>
            </IconButton>
          </RouterLink>
          <Typography variant="h4" component="h1">{title}</Typography>
          <Typography variant="body2">Story ID: {storyId}</Typography>
          <Typography variant="body2">Written by: {author}</Typography>
          <Typography variant="body2">On: {written}</Typography>
          <Typography variant="body2">{score} Points</Typography>
          <Divider sx={{ marginY: 1 }} />
          <Typography variant="h5" component="h2">Summary</Typography>
          <Typography>{text}</Typography>
          <Divider sx={{ marginY: 1 }} />
          <Typography variant="body2"><Link href={`${link}`}>Click Here For Original Story</Link></Typography>
        </Paper>
      </Container>
    </>
  )
}

export default Fullstory;