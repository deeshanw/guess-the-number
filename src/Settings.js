import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lower: '',
            upper: '',
            error: '',
        }
    }

    render() {
        const handleClose = (cancel) => {
            if (cancel === true) {
                this.props.dispatch({
                    type: 'toggleSettings',
                    open: false
                })
            }
            if (cancel === false) {
                var lower = Number(this.state.lower)
                var upper = Number(this.state.upper)
                if (isNaN(upper) || isNaN(lower)) {
                    this.setState({
                        error: 'Not a number.'
                    })
                }
                else {
                    this.setState({
                        error: ''
                    })
                    this.props.dispatch({
                        type: 'setBounds',
                        lower: lower,
                        upper: upper,
                    })
                    this.props.dispatch({
                        type: 'toggleSettings',
                        open: false
                    })
                };
            };
        };
        const handleUpperChange = upper => event => {
            this.setState({ ...this.state, [upper]: event.target.value });
        };
        const handleLowerChange = lower => event => {
            this.setState({ ...this.state, [lower]: event.target.value });
        };
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Set new bounds"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Lower Bound"
                                        value={this.state.lower}
                                        onChange={handleLowerChange('lower')}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Upper Bound"
                                        value={this.state.upper}
                                        onChange={handleUpperChange('upper')}
                                        margin="normal"
                                    />
                                </div>
                                <div style={{ color: 'red' }}>
                                    {this.state.error}
                                </div>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(true)} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
                            Ok
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    lower: state.lower,
    upper: state.upper,
    open: state.open
});

export default connect(mapStateToProps)(Settings)