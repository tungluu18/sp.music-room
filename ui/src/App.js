import React, { Fragment } from 'react';
import { AppBar, Typography, Grid } from '@material-ui/core';
import PlayList from './components/PlayList';

function App() {
  return (
    <Fragment>
      <AppBar position="static">
        <Typography variant="h4">
          Music Room
        </Typography>
      </AppBar>
      <Grid container justify='flex-end' style={{ padding: '10px' }}>
        <Grid item xs={12} md={4} lg={3}>
          <PlayList />
        </Grid>
      </Grid>
    </Fragment>
  );
}


export default App;
