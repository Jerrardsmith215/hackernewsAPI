import React, { useEffect, useState } from 'react';
import { child, get } from 'firebase/database';
import { itemRef } from '../../api/references';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

function Story(props) {
  const storyId = props.id.toString();
  const [details, setDetails] = useState({ title: null, by: null });

  useEffect(() => {
    get(child(itemRef, storyId.toString()))
      .then(snap => {
        if (snap.exists()) {
          setDetails(snap.val())
        }
      });

    return () => {
      setDetails({ title: null, by: null })
    }
  }, []);

  return (
    <>
      <Paper sx={{ p: 2 }} elevation={6}>
        <Typography variant="h5" component="h2">{details.title}</Typography>
        <Typography variant="body2"><b>Written by: {details.by}</b></Typography>
        <Typography variant="h6" component="h2">{details.id}</Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body2"><Link href={`${details.url}`}>Click Here For Original Story</Link></Typography>
      </Paper>
    </>
  )
}

export default Story;