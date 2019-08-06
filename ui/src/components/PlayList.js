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

import SamepleList from './SampleList';
import Snackbar from './Snackbar';

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
    urls: [],
    newURL: '',
    playingItem: null,
  }

  snackbarRef = React.createRef();

  constructor() {
    super();
    this._addURL = this._addURL.bind(this);
    this._onPlaylistAddURLChange = this._onPlaylistAddURLChange.bind(this);
    this._handlePlayer = this._handlePlayer.bind(this);
  }

  _handlePlayer(index) {
    if (index === this.state.playingItem) {
      this.props.handlePlayer({
        type: 'pause',
      });
      this.setState({ playingItem: null });
    } else {
      this.props.handlePlayer({
        type: 'update',
        value: this.state.urls[index]
      });
      this.setState({ playingItem: index });
    }
  }

  _onPlaylistAddURLChange(e) {
    this.setState({ newURL: e.target.value });
  }

  _addURL(e) {
    e.preventDefault();
    const canPlay = ReactPlayer.canPlay(this.state.newURL);
    if (canPlay) {
      this.snackbarRef.current._open({
        variant: 'success',
        message: 'Bài nhạc đã được thêm!'
      });
      this.setState({
        newURL: '',
        urls: [...this.state.urls, this.state.newURL]
      });
    } else {
      this.snackbarRef.current._open({
        variant: 'error',
        message: 'Link này không chơi được :<'
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { playingItem, urls, newURL } = this.state;
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
              value={newURL}
            />
            <IconButton aria-label="search" type="submit">
              <PlaylistAddIcon />
            </IconButton>
          </form>
          <SamepleList
            urls={urls}
            handlePlayer={this._handlePlayer}
            playingItem={playingItem} />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(PlayList);
