import React from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Settings from './Settings';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bf72',
      dark: '#008d46',
      light: '#5bf3a1',
    },
  },
});

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      settingsVisible: null
    }
  }

  handleSettings() {
    this.props.dispatch({
      type: 'toggleSettings',
      open: true
    })
    this.setState({
      settingsVisible: <Settings />
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            {this.state.settingsVisible}
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Guess The Number
                <Button color="inherit" onClick={() => this.handleSettings()}>Config</Button>
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  lower: state.lower,
  upper: state.upper,
  open: state.open
})

export default connect(mapStateToProps)(withStyles(styles)(ButtonAppBar))

