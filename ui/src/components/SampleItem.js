import React from 'react';

import { Avatar, Typography, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MusicVideo } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '0.8rem',
  },
  avatar: {
    margin: 'auto 5px',
    backgroundColor: green[800],
  },
  icon: {
    fontSize: 'inherit',
  },
  text: {
    fontSize: 'inherit',
  }
}));

function SampleItem({ url }) {
  const classes = useStyles();
  return (
    <ListItem className={classes.root}>
      <Avatar className={classes.avatar}>
        <MusicVideo className={classes.icon}/>
      </Avatar>
      <Typography variant="body1" className={classes.text}>
        {url}
      </Typography>
    </ListItem>
  );
}


export default SampleItem;
