import React, { Component } from 'react';
import { connect } from 'react-redux'
import { add_Gun, remove_Gun, two_Gun} from './index.redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>现在有机枪{this.props.num}把</h1>

        <button onClick={this.props.add_Gun}>申请武器</button>
        <button onClick={this.props.remove_Gun}>使用武器</button>
        <button onClick={this.props.two_Gun}>两天后使用武器</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {num: state}
}

const actionCreators = {add_Gun, remove_Gun, two_Gun}


App = connect(mapStateToProps, actionCreators)(App)
export default App;
