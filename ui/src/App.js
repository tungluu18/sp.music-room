import React, { Fragment } from 'react';
import { AppBar, Typography } from '@material-ui/core';

import { Play } from './pages';

function App() {
  return (
    <Fragment>
      <AppBar position="static">
        <Typography variant="h4">
          Music Room
        </Typography>
      </AppBar>
      <Play />
    </Fragment>
  );
}


export default App;
