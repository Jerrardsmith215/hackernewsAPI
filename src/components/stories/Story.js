import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import './stories.css';

function Story({ details }) {
  const storyId = details.id ? details.id : 'unavailable';
  const title = details.title ? details.title : 'unavailable';
  const score = details.score ? details.score : 'unavailable'
  const author = details.by ? details.by : 'unavailable';
  const written = details.time ? details.time : 'unavailable';
  const text = details.text ? details.text : 'unavailable';
  const link = details.url ? details.url : 'unavailable';

  return (
    <>
      { typeof details === 'object' && details.hasOwnProperty('id') ? 
      <Paper sx={{ p: 2 }} elevation={6}>
        <Typography variant="h5" component="h2"><RouterLink className="router-link" state={{storyId: storyId, score: score, title: title, author: author, written: written, text: text, link: link ,}} to={`/${storyId}`}>{title}</RouterLink></Typography>
        <Typography variant="body2">{storyId}</Typography>
        <Typography variant="body2">{author}</Typography>
        <Typography variant="body2">{written}</Typography>
        <Typography variant="body2">{score}</Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body2"><Link href={`${link}`}>Click Here For Original Story</Link></Typography>
      </Paper>
      : null }
    </>
  )
}

export default Story;