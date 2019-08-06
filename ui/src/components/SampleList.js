import React, { Fragment } from 'react';
import { List, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SampleItem from './SampleItem';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    overflow: 'auto',
  }
}))

function SampleList({ urls, handlePlayer, playingItem }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {urls.map((url, index) => (
        <Fragment key={index}>
          <Divider variant="inset" component="li" />
          <SampleItem
            url={url}
            isPlaying={playingItem === index}
            handlePlay={() => handlePlayer(index)} />
        </Fragment>
      ))}
    </List>
  );
}

export default SampleList;
