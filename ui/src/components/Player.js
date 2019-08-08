import React from 'react';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import ReactPlayer from 'react-player';

import { database } from '../services/firebase';

class Player extends React.Component {
  /**
   * force actions will not broadcast to other peers: forcePause, forceSeek
   */
  state = {
    forcing: {
      active: false,
      action: null,
      time: null,
    },
  }

  constructor() {
    super()
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onReady = this._onReady.bind(this);
    this._forcePlay = this._forcePlay.bind(this);
    this._forcePause = this._forcePause.bind(this);
  }

  componentDidMount() {
    this.database = {
      roomPlaying: database.ref('rooms/0/playing'),
    }
    window.test = this;
  }

  _forcePause() {
    this.setState({
      forcing: { active: true, action: 'pause' }
    }, () => {
      this.player.getInternalPlayer().pauseVideo();
    })
  }

  _forcePlay(seconds) {
    this.setState({
      forcing: { active: true, action: 'play', time: seconds }
    }, () => {
      this.player.seekTo(seconds, 'second');
      this.player.getInternalPlayer().playVideo();
    });
  }

  _onPause() {
    console.log('paused');
    const currentTime = this.player.getCurrentTime();
    console.log(currentTime);

    const { forcing } = this.state;
    if (forcing.active) {
      if (forcing.action === 'pause') {
        this.setState({ forcing: { active: false } })
      };
    } else {
      this.props.updatePlayingStatus({ status: 'pause', time: currentTime });
    }
  }

  _onPlay() {
    console.log('play');
    const currentTime = this.player.getCurrentTime();
    console.log(currentTime);

    const { forcing } = this.state;
    if (forcing.active) {
      if (forcing.action === 'play' && Math.abs(forcing.time - currentTime) <= 1) {
        this.setState({ forcing: { active: false } });
      }
    } else {
      this.props.updatePlayingStatus({ status: 'play', time: currentTime });
    }
  }

  _onReady() {
    const { continueState } = this.props;
    if (!continueState) { return; }
    if (continueState.status === 'play') { this._forcePlay(continueState.time); }
  }

  ref = player => {
    this.player = player;
  }

  render() {
    const { url } = this.props;
    return (
      <Card style={{ height: '30vw' }}>
        <CardContent style={{ padding: 0, height: '100%' }}>
          {(!!url)
            ? <ReactPlayer url={url}
              controls
              ref={this.ref}
              onReady={this._onReady}
              onPlay={this._onPlay}
              onPause={this._onPause}
              style={{ margin: 'auto' }}
              width='100%'
              height='100%' />
            : <CardMedia
              style={{ height: '100%', width: '100%', backgroundSize: 'contain' }}
              image={require('../assets/images/cat.png')} />
          }
        </CardContent>
      </Card>
    )
  }
}

export default Player;
