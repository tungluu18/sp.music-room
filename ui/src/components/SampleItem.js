import React from 'react';

import {
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  CardMedia,
  Card,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
  Link as LinkIcon,
  PlayArrow as PlayIcon,
} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const styles = ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: '0.5rem',
    padding: '5px',
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
});


function SampleItem({ classes, track, updatePlayURL, removeURL, rearrangeURLs, isPlaying }) {
  return (
    <Card dense className={classes.root}>
      <div className={classes.wrapper} style={{ width: '5%', alignItems: 'center' }}>
        <IconButton className={classes.btn} onClick={() => rearrangeURLs('up')}>
          <UpIcon />
        </IconButton>
        <IconButton className={classes.btn} onClick={() => rearrangeURLs('down')}>
          <DownIcon />
        </IconButton>
      </div>
      <CardMedia
        image={track.thumbnail_url}
        style={{ backgroundSize: 'contain', width: '30%' }}
        title="Video Thumbnail" />
      <div className={classes.wrapper} style={{ width: '65%' }}>
        <Typography variant="h6" style={{ fontFamily: 'sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title}
        </Typography>
        <div className={classes.controls}>
          {isPlaying ?
            <Chip
              label="playing......" size="small" color="primary"
              avatar={<Avatar><PlayIcon /></Avatar>} />
            : null}
          <Tooltip title="Chơi nó ngay">
            <IconButton aria-label="play-arrow" onClick={updatePlayURL}>
              <PlayIcon />
            </IconButton>
          </Tooltip>
          <a href={track.url} target="_blank" rel="noopener noreferrer">
            <Tooltip title={track.url}>
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
    </Card>
  );
}

export default withStyles(styles)(SampleItem);

