import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import ReactPlayer from 'react-player';

import { database } from '../services/firebase';

class Player extends React.Component {
  state = {
    forcing: false,
  }

  constructor() {
    super()
    this._onSeek = this._onSeek.bind(this);
    this._onPause = this._onPause.bind(this);
    this._forceSeek = this._forceSeek.bind(this);
    this._forcePause = this._forcePause.bind(this);
  }

  componentDidMount() {
    this.database = {
      roomPlaying: database.ref('rooms/0/playing'),
    }
  }

  _forcePause() {
    this.setState({ forcing: true }, () => {
      this.player.getInternalPlayer().pauseVideo();
    })
  }

  _forceSeek(seconds) {
    this.setState({ forcing: true }, () => {
      this.player.seekTo(seconds, 'second');
      this.player.getInternalPlayer().playVideo();
    })
  }

  _onPause() {
    console.log('paused');
    const currentTime = this.player.getCurrentTime();
    console.log(currentTime);

    if (this.state.forcing) {
      this.setState({ forcing: false });
    } else {
      this.props.updatePlayingStatus({ status: 'pause', time: currentTime });
    }
    // this.database.roomLogs.push().set({
    //   type: 'pause',
    //   time: currentTime,
    // });
  }

  _onSeek() {
    console.log('seek');
    const currentTime = this.player.getCurrentTime();
    console.log(currentTime);

    if (this.state.forcing) {
      this.setState({ forcing: false });
    } else {
      this.props.updatePlayingStatus({ status: 'seek', time: currentTime });
    }
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
