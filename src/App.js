import React from 'react';
import AppBar from './AppBar';
import Game from './Game';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import './App.css';

const initialState = {
  lower: 0,
  upper: 10,
  open: true,
};

function reducer(state = initialState, action) {

  if (action.type === 'setBounds') {
    return {
      lower: action.lower,
      upper: action.upper,
      open: state.open
    }
  }
  else if (action.type === 'toggleSettings') {
    return {
      lower: state.lower,
      upper: state.upper,
      open: action.open,
    }
  }
  else {
    return {
      lower: state.lower,
      upper: state.upper,
      open: state.open
    }
  };
};

const store = createStore(reducer);

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppBar position="static" />
          <div style={{ marginTop: 50 }}>
            <Game />
          </div>
        </Provider>
      </div>
    );
  };
};

export default App;
