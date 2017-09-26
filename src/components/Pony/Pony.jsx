import React, { Component } from "react";
import { Td, Tr } from "../base/Table/Table";

export default class Pony extends Component {
  render() {
    const { pony, index } = this.props;
    return (
      <Tr>
        <Td>{pony.name}</Td>
        <Td>{pony.color}</Td>
        <Td>{pony.kind}</Td>
        <Td>{pony.price}</Td>
        <Td>{pony.is_new ? "Да" : "Нет"}</Td>
        <Td>{index}</Td>
      </Tr>
    );
  }
}
