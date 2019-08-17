import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import ReactPlayer from 'react-player';

import { database } from '../services/firebase';

const styles = theme => ({
  root: {
    width: '100%',
  },
  playerBox: {
    position: 'relative',
    paddingTop: '56.25%',
    width: '100%',
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  coverBox: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
  }
});

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
    this._onEnded = this._onEnded.bind(this);
  }

  componentDidMount() {
    this.database = {
      roomPlaying: database.ref('rooms/0/playing'),
    }
    window.test = this;
  }

  _onEnded() {
    console.log('this');
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
    const currentTime = this.player.getCurrentTime();

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
    const currentTime = this.player.getCurrentTime();

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
    const { url, classes, nextPlay } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.playerBox}>
        {(!!url)
          ? <ReactPlayer url={url}
            controls
            ref={this.ref}
            onReady={this._onReady}
            onPlay={this._onPlay}
            onPause={this._onPause}
            onEnded={nextPlay}
            className={classes.player}
            width="98%"
            height="100%" />
          : <CardMedia
            className={classes.coverInbox}
            image="https://www.littlestepsasia.com/sites/default/files/imagecache/article_node_image/event/hero/we-bare-bears-singapore.png" />
        }
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Player);
