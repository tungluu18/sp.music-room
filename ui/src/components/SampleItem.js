import React from 'react';

import {
  Avatar,
  Typography,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MusicVideo,
  Delete as DeleteIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
  },
  wrapper: {
    fontSize: '0.8rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
  },
  avatar: {
    margin: 'auto 5px',
    backgroundColor: red[800],
  },
  icon: {
    fontSize: 'inherit',
  },
  text: {
    fontSize: 'inherit',
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    padding: '5px',
  }
}));

function SampleItem({ url, updatePlayURL, removeURL }) {
  const classes = useStyles();
  return (
    <ListItem dense button className={classes.root} onClick={updatePlayURL}>
      <div className={classes.wrapper}>
        <IconButton className={classes.btn}>
          <UpIcon />
        </IconButton>
        <IconButton className={classes.btn}>
          <DownIcon />
        </IconButton>
      </div>
      <div className={classes.wrapper} style={{ width: '100%' }}>
        <div className={classes.content}>
          <Avatar className={classes.avatar}>
            <MusicVideo className={classes.icon} />
          </Avatar>
          <Typography variant="body1" className={classes.text}>
            <a href={url} target="_blank">{url}</a>
          </Typography>
        </div>
      </div>
      <ListItemSecondaryAction className={classes.controls}>
        <IconButton aria-label="delete" className={classes.btn} onClick={removeURL}>
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem >
  );
}


export default SampleItem;
