import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import ReactPlayer from 'react-player';

class Player extends React.Component {
  constructor() {
    super()
    this._onSeek = this._onSeek.bind(this);
    this._onPause = this._onPause.bind(this);
    this._forceSeek = this._forceSeek.bind(this);
    this._forcePause = this._forcePause.bind(this);
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
    console.log(this.player.getCurrentTime());
  }

  _onSeek() {
    console.log('seek');
    console.log(this.player.getCurrentTime());
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