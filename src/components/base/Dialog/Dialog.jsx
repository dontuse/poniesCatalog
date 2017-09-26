import React, { Component } from "react";
import RcDialog from "rc-dialog";
import "./Dialog.css";

class Dialog extends React.Component {
  render() {
    return (
      <RcDialog animation="slide-fade" maskAnimation="fade" {...this.props}>
        {this.props.children}
      </RcDialog>
    );
  }
}

export default Dialog;
