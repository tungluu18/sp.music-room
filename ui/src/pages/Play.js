import React, { useState, createRef } from 'react';
import { Grid } from '@material-ui/core';
import { PlayList, Player } from '../components';

function PlayPage() {
  const [playingSource, setPlayingSource] = useState(null);

  const playerRef = createRef();

  const _handlePlayer = ({ type, value }) => {
    switch (type) {
      case 'update':
        setPlayingSource(value);
        break;
      case 'pause':
        playerRef.current._forcePause();
        break;
      default:
        break;
    }
  }

  return (
    <Grid container spacing={1} justify='flex-start' style={{ padding: '10px' }}>
      <Grid item xs={12} md={8}>
        <Player ref={playerRef} url={playingSource} />
      </Grid>
      <Grid item xs={12} md={4}>
        <PlayList handlePlayer={_handlePlayer} />
      </Grid>
    </Grid>
  );
}

export default PlayPage;