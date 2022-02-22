import React from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Fullstory() {
  const { state } = useLocation();
  const storyId = state.storyId;
  const title = state.title;
  const author = state.author;
  const written = state.written;
  const text = state.text;
  const link = state.link;

  return (
    <>
      <Container>
        <Paper sx={{ p: 2 }} elevation={6}>
          <Typography variant="h4" component="h1">{title}</Typography>
          <Typography variant="body2">Story ID: {storyId}</Typography>
          <Typography variant="body2">Written by: {author}</Typography>
          <Typography variant="body2">On: {written}</Typography>
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