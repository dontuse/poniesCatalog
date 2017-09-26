import React, { Component } from "react";
import { connect } from "react-redux";
import { showFilter as showPoniesFilter } from "../../actions/ponies";

class PonyFilterLnk extends Component {
  render() {
    return (
      <span onClick={() => this.props.dispatch(showPoniesFilter(true))}>{this.props.children}</span>
    );
  }
}

export default connect()(PonyFilterLnk);
