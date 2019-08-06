import React from 'react';
import { Button, TextField, Grid, Card, CardContent } from '@material-ui/core';
import ReactPlayer from 'react-player';

class Player extends React.Component {
  state = {
    url: '',
    _url: ''
  }

  constructor() {
    super()
    this._forceSeek = this._forceSeek.bind(this)
    this._onSeek = this._onSeek.bind(this)
    this._onPause = this._onPause.bind(this)
    this._onURLChange = this._onURLChange.bind(this)
    this._addURL = this._addURL.bind(this)
  }

  _addURL(e) {
    e.preventDefault()
    this.setState({ url: this.state._url })
    console.log(this.state)
  }

  _forceSeek(seconds) {
    this.player.seekTo(seconds, 'second')
    this.player.getInternalPlayer().playVideo()
  }

  _onPause() {
    console.log('paused')
    console.log(this.player.getCurrentTime())
  }

  _onSeek() {
    console.log('seek')
    console.log(this.player.getCurrentTime())
  }

  _onURLChange(e) {
    this.setState({ _url: e.target.value })
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { url } = this.state;
    return (
      <Grid container spacing={2} style={{ margin: '10px' }}>
        <Grid item xs={7} style={{ padding: '5px' }}>
          <Card style={{ minHeight: '200px' }}>
            <CardContent>
              <ReactPlayer url={url || 'https://www.youtube.com/watch?v=xVf4Zk8CBj0'}
                ref={this.ref}
                controls
                onPlay={this._onSeek}
                onPause={this._onPause}
                style={{ textAlign: 'center' }}
                width='100%' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <form onSubmit={this._addURL}>
                <TextField label='+ new video' onChange={this._onURLChange} />
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default Player;