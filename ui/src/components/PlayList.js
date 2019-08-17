import React from 'react';
import ReactPlayer from 'react-player';
import {
  Card,
  TextField,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PlaylistAdd as PlaylistAddIcon } from '@material-ui/icons';

import SampleList from './SampleList';
import Snackbar from './Snackbar';
import { database } from '../services/firebase';
import { getInfo, extractId } from '../services/youtube';

import Cache from '../utils/cache';

const styles = ({
  playlistAddBox: {
    display: 'flex',
    padding: '0px 10px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  playlistAddURL: {
    flexGrow: 2,
  },
  content: {
    padding: 0,
  }
});

class PlayList extends React.Component {
  state = {
    tracks: null,
    newURL: '',
    nextPlayMode: 'auto',
  }

  snackbarRef = React.createRef();

  constructor() {
    super();
    this._addURL = this._addURL.bind(this);
    this._removeURL = this._removeURL.bind(this);
    this._rearrangeURLs = this._rearrangeURLs.bind(this);
    this._onPlaylistAddURLChange = this._onPlaylistAddURLChange.bind(this);
  }

  componentDidMount() {
    this.database = {
      roomURLs: database.ref('rooms/0/urls'),
    };
    this.trackCache = new Cache(_fetchTrackInfo);
    window.playlist = this;

    this.database.roomURLs.on('value', async snapshot => {
      const urls = snapshot.val() || [];
      const tracks = await Promise.all(urls.map(url => this.trackCache.get(url)));
      this.setState({ tracks });
    });
  }

  _onPlaylistAddURLChange(e) {
    this.setState({ newURL: e.target.value });
  }

  _rearrangeURLs(index) {
    return (move) => {
      if (!move) return;
      const urls = this.state.tracks.map(track => track.url);
      if (move === 'up' && index > 0) {
        [urls[index - 1], urls[index]] = [urls[index], urls[index - 1]];
        this.database.roomURLs.set(urls);
      }
      if (move === 'down' && index + 1 < urls.length) {
        [urls[index + 1], urls[index]] = [urls[index], urls[index + 1]];
        this.database.roomURLs.set(urls);
      }
    }
  }

  _nextPlay() {
    const { updatePlayURL, playingSource } = this.props;
    const { nextPlayMode, tracks } = this.state;
    const index = tracks.findIndex(track => track.url === playingSource);
    const nTracks = tracks.length
    if (nextPlayMode === 'auto') {
      const nextTrack = tracks[(index + 1) % nTracks];
      updatePlayURL(nextTrack.url);
    }
  }

  _addURL(e) {
    e.preventDefault();
    const canPlay = ReactPlayer.canPlay(this.state.newURL);
    const existed = this.state.tracks.find(track => track.url === this.state.newURL);
    if (!canPlay) {
      this.snackbarRef.current._open({
        variant: 'error',
        message: 'Link này không chơi được :<'
      });
    } else if (!!existed) {
      this.snackbarRef.current._open({
        variant: 'info',
        message: 'Bài nhạc này đã được thêm rồi mà :)',
        duration: 2000,
      })
    } else {
      const urls = this.state.tracks.map(track => track.url);
      this.database.roomURLs.set([...urls, this.state.newURL] || [], (error) => {
        if (error) {
          this.snackbarRef.current._open({
            variant: 'error',
            message: 'Oops sr, có gì đấy không đúng xảy ra rồi :<',
            duration: 2000,
          });
        } else {
          this.snackbarRef.current._open({
            variant: 'success',
            message: 'Bài nhạc đã được thêm!',
          });
          this.setState({ newURL: '' });
        }
      });
    }
  }

  _removeURL(index) {
    const urls = this.state.tracks.map(track => track.url);
    if (this.props.playingSource === urls[index]) {
      this.props.updatePlayURL(null);
    }
    this.database.roomURLs.set(urls.filter((_, i) => index !== i), (error) => {
      if (error) {
        this.snackbarRef.current._open({
          variant: 'error',
          message: 'Oops, thử lại sau nhé :<',
          duration: 2000,
        });
      }
    });
  }

  render() {
    const { classes, updatePlayURL } = this.props;
    const { tracks, newURL } = this.state;
    return (
      <div>
        <Card className={classes.content}>
          <form className={classes.playlistAddBox} onSubmit={this._addURL}>
            <Snackbar ref={this.snackbarRef} />
            <TextField
              margin="dense"
              placeholder="Thí chủ cho xin link"
              className={classes.playlistAddURL}
              onChange={this._onPlaylistAddURLChange}
              value={newURL} />
            <IconButton aria-label="search" type="submit">
              <PlaylistAddIcon />
            </IconButton>
          </form>
        </Card>
        <SampleList
          tracks={tracks}
          updatePlayURL={updatePlayURL}
          removeURL={this._removeURL}
          rearrangeURLs={this._rearrangeURLs} />
      </div>
    );
  }
}

export default withStyles(styles)(PlayList);

const _fetchTrackInfo = async (url) => {
  const trackId = extractId(url);
  const trackInfo = await getInfo(trackId);
  return { ...trackInfo, url };
}