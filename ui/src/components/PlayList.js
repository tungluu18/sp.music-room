import React from 'react';
import ReactPlayer from 'react-player';
import {
  Card,
  CardContent,
  TextField,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PlaylistAdd as PlaylistAddIcon } from '@material-ui/icons';

import SampleList from './SampleList';
import Snackbar from './Snackbar';
import { database } from '../services/firebase';

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
    urls: null,
    newURL: '',
  }

  snackbarRef = React.createRef();

  constructor() {
    super();
    this._addURL = this._addURL.bind(this);
    this._removeURL = this._removeURL.bind(this);
    this._onPlaylistAddURLChange = this._onPlaylistAddURLChange.bind(this);
  }

  componentDidMount() {
    this.database = {
      roomURLs: database.ref('rooms/0/urls'),
    }
    this.database.roomURLs.on('value', snapshot => {
      this.setState({ urls: snapshot.val() || [] });
    })
  }

  _onPlaylistAddURLChange(e) {
    this.setState({ newURL: e.target.value });
  }

  _addURL(e) {
    e.preventDefault();
    const canPlay = ReactPlayer.canPlay(this.state.newURL);
    const existed = this.state.urls.find(u => u === this.state.newURL);
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
      this.database.roomURLs.set(
        [...this.state.urls, this.state.newURL] || [],
        (error) => {
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
    if (this.props.playingSource === this.state.urls[index]) {
      this.props.updatePlayURL(null);
    }
    this.database.roomURLs.set(
      this.state.urls.filter((_, i) => index !== i),
      (error) => {
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
    const { urls, newURL } = this.state;
    return (
      <Card>
        <CardContent className={classes.content}>
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
          <SampleList urls={urls} updatePlayURL={updatePlayURL} removeURL={this._removeURL} />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(PlayList);
