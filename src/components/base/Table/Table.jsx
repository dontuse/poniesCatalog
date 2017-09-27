import React, { Component } from "react";
import { block } from "../../../utils";
import Td from "./Td";
import Th from "./Th";
import Tr from "./Tr";
import "./Table.css";

const b = block("Table");

class Table extends Component {
  render() {
    const { mix, ...rest } = this.props;

    return (
      <div className={b.mix(mix)()} {...rest}>
        <table className={b("table")()}>
          <tbody>{rest.children}</tbody>
        </table>
      </div>
    );
  }
}

export { Table, Td, Tr, Th };
