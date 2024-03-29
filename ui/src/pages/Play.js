import React, { createRef } from 'react';
import { Grid } from '@material-ui/core';
import uuid from 'uuid/v4';
import { PlayList, Player } from '../components';
import { database } from '../services/firebase';

const roomRef = 'rooms/0'

class PlayPage extends React.Component {
  state = {
    playing: null,
    continueStateState: null,
    init: false,
  }

  constructor() {
    super();
    this.uuid = uuid();
    this._updatePlayingSource = this._updatePlayingSource.bind(this);
    this._updatePlayingStatus = this._updatePlayingStatus.bind(this);
    this._nextPlay = this._nextPlay.bind(this);
  }

  playerRef = createRef();
  playlistRef = createRef();

  componentDidMount() {
    this.database = {
      roomPlaying: database.ref(`${roomRef}/playing`),
    }

    this.database.roomPlaying.once('value', snapshot => {
      if (!snapshot.exists()) return;
      const playing = snapshot.val();
      if (!!playing.last_update_timestamp) {
        const currentTime = (new Date()).getTime();
        const playedTime = (currentTime - playing.last_update_timestamp) / 1000;
        const currentPlayingTime = playing.time + playedTime;
        this.setState({
          playing,
          init: true,
          continueState: { time: currentPlayingTime, status: playing.status },
        });
      }
    });

    this.database.roomPlaying.on('value', snapshot => {
      if (!snapshot.exists() || !this.state.init) return;
      const playing = snapshot.val();
      this.setState({ playing });
      if (playing.uuid === this.uuid) return;
      switch (playing.status) {
        case 'pause':
          this.playerRef.current._forcePause();
          break;
        case 'play':
          this.playerRef.current._forcePlay(playing.time);
          break;
        case 'ready':
          this.setState({
            continueState: { time: 0, status: 'play' }
          });
          break;
        default:
          break;
      }
    });
  }

  _updatePlayingSource(url) {
    this.database.roomPlaying.update({
      url,
      status: url && 'ready',
      time: 0,
      uuid: null,
      last_update_timestamp: (new Date()).getTime(),
    });
  }

  _nextPlay() {
    this.playlistRef.current._nextPlay();
  }

  _updatePlayingStatus({ status, time }) {
    this.database.roomPlaying.update({
      status, time,
      uuid: this.uuid,
      last_update_timestamp: (new Date()).getTime(),
    });
  }

  render() {
    const { playing, init, continueState } = this.state;
    const url = (playing || {}).url;
    return (
      <Grid container spacing={1} justify='flex-start' style={{ width: '100%', padding: '10px' }}>
        <Grid item xs={12} md={9}>
          <Player
            url={url}
            ref={this.playerRef}
            continueState={init && continueState}
            nextPlay={this._nextPlay}
            updatePlayingStatus={this._updatePlayingStatus} />
        </Grid>
        <Grid item xs={12} md={3}>
          <PlayList
            ref={this.playlistRef}
            playingSource={url}
            updatePlayURL={this._updatePlayingSource} />
        </Grid>
      </Grid>
    );
  }
}

export default PlayPage;
