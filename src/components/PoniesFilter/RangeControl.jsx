import React, { Component } from "react";
import { block } from "../../utils";
const b = block("PoniesFilter");

export default class RangeControl extends Component {
  render() {
    const { props } = this;

    return (
      <div>
        <label htmlFor="">{props.label}</label>
        <input
          ref={props.inputRef}
          onBlur={props.onBlur}
          className={b("range-input")()}
          type="number"
        />
      </div>
    );
  }
}
