import React from 'react';

import {
  Avatar,
  Typography,
  ListItem,
  IconButton,
  Tooltip,
  Chip,
  CardMedia,
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

import { extractVideoId, getInfo } from '../services/youtube';

const styles = ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
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

class SampleItem extends React.PureComponent {
  state = {
    videoInfo: null
  }
  componentDidMount() {
    getInfo(extractVideoId(this.props.url)).then(data => {
      this.setState({ videoInfo: data });
    });
  }

  render() {
    const { classes, url, updatePlayURL, removeURL, rearrangeURLs, isPlaying } = this.props;
    const { videoInfo } = this.state;
    const videoId = extractVideoId(url)
    const thumbnailURL = `https://img.youtube.com/vi/${videoId}/default.jpg`
    return (
      <ListItem dense className={classes.root}>
        <div className={classes.wrapper}>
          <IconButton className={classes.btn} onClick={() => rearrangeURLs('up')}>
            <UpIcon />
          </IconButton>
          <IconButton className={classes.btn} onClick={() => rearrangeURLs('down')}>
            <DownIcon />
          </IconButton>
        </div>
        <CardMedia
          image={thumbnailURL}
          style={{ backgroundSize: 'contain', width: '30%', borderRadius: '10px' }}
          title="Video Thumbnail" />
        <div className={classes.wrapper} style={{ width: '100%' }}>
          {/* <div className={classes.content}> */}
          <Typography variant="h5" className={classes.text}>
            {videoInfo ? videoInfo.title : 'loading....'}
          </Typography>
          {/* </div> */}
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
}

export default withStyles(styles)(SampleItem);
