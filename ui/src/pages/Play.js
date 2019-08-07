import React, { createRef } from 'react';
import { Grid } from '@material-ui/core';
import uuid from 'uuid/v4';
import { PlayList, Player } from '../components';
import { database } from '../services/firebase';

class PlayPage extends React.Component {
  state = {
    playing: null,
    init: false,
  }

  constructor() {
    super();
    this.uuid = uuid();
    this._updatePlayingSource = this._updatePlayingSource.bind(this);
    this._updatePlayingStatus = this._updatePlayingStatus.bind(this);
  }

  playerRef = createRef();

  componentDidMount() {
    this.database = {
      roomPlaying: database.ref('rooms/0/playing'),
    }

    this.database.roomPlaying.once('value', snapshot => {
      if (!snapshot.exists()) return;
      const playing = snapshot.val();
      if (!!playing.last_update_timestamp) {
        const currentTime = (new Date()).getTime();
        const playedTime = (currentTime - playing.last_update_timestamp) / 1000;
        const currentPlayingTime = playing.time + playedTime;
        playing.continuePlayTime = currentPlayingTime;
      }
      this.setState({ init: true, playing }, () => {
        // if (playing.status === 'pause') { this.playerRef.current._forcePause(); }
      });
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
        case 'seek':
          this.playerRef.current._forceSeek(playing.time);
          break;
        default:
          break;
      }
    });
  }

  _updatePlayingSource(url) {
    this.database.roomPlaying.update({
      url,
      status: 'seek',
      time: 0,
      uuid: this.uuid,
      last_update_timestamp: (new Date()).getTime(),
    }, () => {
      this.playerRef.current._forceSeek(0);
    });
  }

  _updatePlayingStatus({ status, time }) {
    this.database.roomPlaying.update({
      status, time,
      uuid: this.uuid,
      last_update_timestamp: (new Date()).getTime()
    });
  }

  render() {
    const { playing, init } = this.state;
    const url = (playing || {}).url;
    return (
      <Grid container spacing={1} justify='flex-start' style={{ padding: '10px' }}>
        <Grid item xs={12} md={8}>
          <Player
            url={url}
            ref={this.playerRef}
            continuePlayTime={init && playing.continuePlayTime}
            updatePlayingStatus={this._updatePlayingStatus} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PlayList
            playingSource={url}
            updatePlayURL={this._updatePlayingSource} />
        </Grid>
      </Grid>
    );
  }
}

export default PlayPage;
