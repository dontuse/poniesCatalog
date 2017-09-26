import React, { Component } from "react";
import { block } from "../../../utils";
import "./Table.css";

const b = block("Table");

class Th extends Component {
  render() {
    const { mix, ...rest } = this.props;

    return (
      <td className={b("th").mix(mix)} {...rest}>
        {rest.children}
      </td>
    );
  }
}

export default Th;