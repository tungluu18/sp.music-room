import React, { Fragment } from 'react';
import { List, Divider, LinearProgress } from '@material-ui/core';
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

function SampleList({ urls, updatePlayURL, removeURL, rearrangeURLs }) {
  const classes = useStyles();
  if (!urls) return <LinearProgress className={classes.progressBar} />
  return (
    <List className={classes.root}>
      {urls.map((url, index) => (
        <Fragment key={index}>
          <Divider variant="inset" component="li" />
          <SampleItem
            url={url}
            updatePlayURL={() => updatePlayURL(url)}
            removeURL={() => removeURL(index)}
            rearrangeURLs={rearrangeURLs(index)} />
        </Fragment>
      ))}
    </List>
  );
}

export default SampleList;
