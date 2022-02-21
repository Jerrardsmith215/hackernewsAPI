import React from 'react';
import Paper from '@mui/material/Paper';

function Story(props) {
  return (
    <>
      <Paper sx={{p: 2}} elevation={6}>
        Hello {props.id}
      </Paper>
    </>
  )
}

export default Story;