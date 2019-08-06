import React, { PureComponent } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
import {
  Close as CloseIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  info: InfoIcon,
  error: ErrorIcon,
  success: CheckCircleIcon
}

const styles = ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  info: {
    backgroundColor: blue[300],
  },
  icon: {
    fontSize: 18,
    opacity: 0.9,
    paddingRight: '5px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
})

class CustomSnackBar extends PureComponent {
  state = {
    isActive: false,
    variant: 'info',
    message: 'Oops'
  }

  constructor() {
    super();
    this._close = this._close.bind(this);
    this._open = this._open.bind(this);
  }

  _close() {
    this.setState({
      isActive: false,
    })
  }

  _open({ variant, message }) {
    this.setState({
      isActive: true,
      variant: variant || 'info',
      message: message || 'Oops',
    })
  }

  render() {
    const { classes } = this.props;
    const { message, variant, isActive } = this.state;
    const Icon = variantIcon[variant]

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={1000}
        onClose={this._close}
        open={isActive}
      >
        <SnackbarContent
          className={classes[variant]}
          message={
            <span className={classes.message}>
              <Icon className={classes.icon} />
              {message}
            </span>
          }
          action={[
            <IconButton aria-label="close" key="close" color="inherit" onClick={this._close}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

export default withStyles(styles)(CustomSnackBar);
