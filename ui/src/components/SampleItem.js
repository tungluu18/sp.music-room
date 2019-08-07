import React from 'react';

import {
  Avatar,
  Typography,
  ListItem,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MusicVideo,
  Delete as DeleteIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
  Link as LinkIcon,
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
    <ListItem dense className={classes.root}>
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
          <Typography variant="h5" className={classes.text}>
            'KATIE –FUTURE LOVE.(SUB ESPAÑOL)'
          </Typography>
        </div>
        <div className={classes.controls}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Tooltip title={url}>
              <IconButton aria-label="link" className={classes.btn}>
                <LinkIcon />
              </IconButton>
            </Tooltip>
          </a>
          <Tooltip title="Bỏ bài nhạc">
            <IconButton aria-label="delete" className={classes.btn} onClick={removeURL}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

    </ListItem >
  );
}


export default SampleItem;
