import React, { useEffect, useState } from 'react';
import { child, get } from 'firebase/database';
import { itemRef } from '../../api/references';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

function Story({details}) {
  console.log('story')
  console.log(details)
  const storyId = details.id;
  const author = details.by;
  const link = details.url;
  const title = details.title;

  return (
    <>
      { typeof details === 'object' && details.hasOwnProperty('id') ? 
      <Paper sx={{ p: 2 }} elevation={6}>
        <Typography variant="h5 " component="h2">{title}</Typography>
        <Typography variant="body2"><b>Written by: {author}</b></Typography>
        <Typography variant="h6" component="h2">{storyId}</Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body2"><Link href={`${link}`}>Click Here For Original Story</Link></Typography>
      </Paper> 
      : null }
    </>
  )
}

export default Story;