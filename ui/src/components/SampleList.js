import React, { Fragment } from 'react';
import { List, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SampleItem from './SampleItem';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    overflow: 'auto',
  },
  progressBar: {
    height: '0.1rem',
  }
}))

function SampleList({ tracks, updatePlayURL, removeURL, rearrangeURLs }) {
  const classes = useStyles();
  if (!tracks) return <LinearProgress className={classes.progressBar} />
  return (
    <List className={classes.root}>
      {tracks.map((track, index) => (
        <Fragment key={index}>
          <SampleItem
            track={track}
            updatePlayURL={() => updatePlayURL(track.url)}
            removeURL={() => removeURL(index)}
            rearrangeURLs={rearrangeURLs(index)} />
        </Fragment>
      ))}
    </List>
  );
}

export default SampleList;
