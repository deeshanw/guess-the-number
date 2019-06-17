import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
import randInt from './RandInt'
import './App.css'

const styles = (theme => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00bf72',
            dark: '#008d46',
            light: '#5bf3a1',
        },
    },
});

class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            guess: '',
            number: randInt(this.props.upper, this.props.lower),
            result: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.upper !== this.props.upper || prevProps.lower !== this.props.lower) {
            this.setState({
                number: randInt(this.props.lower, this.props.upper),
                result: ''
            });
        };
    };

    checkVal() {
        var result = ""
        if (this.state.guess > this.state.number) {
            result = "Nope. Lower.";
        }
        else if (this.state.guess < this.state.number) {
            result = "Nope. Higher.";
        }
        else if (Number(this.state.guess) === this.state.number) {
            result = "You got it! The number has been reset.";
            this.setState({
                number: randInt(this.props.lower, this.props.upper)
            });
        }
        else {
            result = "Not a number, try again.";
        };
        this.setState({
            result: result
        });
    };

    render() {
        const { classes } = this.props;
        const handleChange = guess => event => {
            this.setState({ ...this.state, [guess]: event.target.value });
        };
        return (
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Typography variant="h6" className={classes.title}>
                            Guess the number between {this.props.lower} and {this.props.upper}!
                        </Typography>
                        <form>
                            <div style={{ marginBottom: 10 }}>
                                <TextField
                                    id="standard-name"
                                    label="Guess"
                                    className={classes.textField}
                                    value={this.state.guess}
                                    onChange={handleChange('guess')}
                                    margin="normal"
                                />
                            </div>
                            <Button style={{ opacity: 0.7 }} variant="contained" color="primary" onClick={() => this.checkVal()}>Make Guess</Button>
                        </form>
                        <div style={{ marginTop: 30 }}>
                            <Typography variant="h5" component="h3">
                                {this.state.result}
                            </Typography>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    lower: state.lower,
    upper: state.upper
});

export default connect(mapStateToProps)(withStyles(styles)(Game))
