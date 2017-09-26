import React, { Component } from "react";
import { connect } from "react-redux";
import makePonies from "./utils/makePonies";
import PoniesList from "./components/PonyList/PonyList";
import Header from "./components/Header/Header";
import PonyFilterModal from "./components/PonyFilterModal/PonyFilterModal";
import { get as getPonies, filter } from "./actions/ponies";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getPonies({ ponies: makePonies(700) }));
    this.props.dispatch(filter());
  }

  render() {
    return (
      <div style={{ fontSize: 13 }} className="App">
        <Header />
        <PoniesList />
        <PonyFilterModal />
      </div>
    );
  }
}

export default connect()(App);
