import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import ReactPlayer from 'react-player';

import { database } from '../services/firebase';

class Player extends React.Component {
  constructor() {
    super()
    this._onSeek = this._onSeek.bind(this);
    this._onPause = this._onPause.bind(this);
    this._forceSeek = this._forceSeek.bind(this);
    this._forcePause = this._forcePause.bind(this);
  }

  componentDidMount() {
    this.database = {
      roomLogs: database.ref('rooms/0/logs'),
    }
  }

  _forcePause() {
    this.player.getInternalPlayer().pauseVideo();
  }

  _forceSeek(seconds) {
    this.player.seekTo(seconds, 'second');
    this.player.getInternalPlayer().playVideo();
  }

  _onPause() {
    console.log('paused');
    const currentTime = this.player.getCurrentTime();
    console.log(currentTime);

    this.database.roomLogs.push().set({
      type: 'pause',
      time: currentTime,
    });
  }

  _onSeek() {
    console.log('seek');
    const currentTime = this.player.getCurrentTime();
    console.log(this.player.getCurrentTime());
    this.database.roomLogs.push().set({
      type: 'seek',
      time: currentTime,
    });
  }

  ref = player => {
    this.player = player;
  }

  render() {
    const { url } = this.props;
    return (
      <Card style={{ height: '30vw' }}>
        <CardContent style={{ padding: 0, height: '100%' }}>
          <ReactPlayer url={url}
            ref={this.ref}
            controls
            playing
            onPlay={this._onSeek}
            onPause={this._onPause}
            style={{ margin: 'auto' }}
            width='100%'
            height='100%'
          />
        </CardContent>
      </Card>
    )
  }
}

export default Player;
