import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1};
    case 'DECREMENT':
      return { count: state.count - 1};
    default:
      return state;
  }
});

class PureClicker extends React.Component {
  render() {
    const { onDecrement, onIncrement, count } = this.props;
    return (
      <div>
        <button onClick={onDecrement}>-</button>
        <span>{count}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  }
}

const Clicker = connect(
  ({ count }) => ({ count }),
  dispatch => ({
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' }),
  }),
)(PureClicker);

ReactDOM.render(
  <Provider store={store}>
      <Clicker />
  </Provider>,
  document.getElementById('root')
);
