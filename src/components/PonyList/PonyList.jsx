import React, { Component } from "react";
import { connect } from "react-redux";
import Pony from "../Pony/Pony";
import { Table, Tr, Th } from "../base/Table/Table";
import { block } from "../../utils";
import "./PonyList.css";

const b = block("PonyList");

export class PoniesList extends Component {
  render() {
    const { ponies } = this.props;
    return (
      <div className={b()}>
        <Table>
          <Tr>
            <Th>Имя</Th>
            <Th>Цвет</Th>
            <Th>Вид</Th>
            <Th>Цена</Th>
            <Th>Новый</Th>
            <Th>#</Th>
          </Tr>
          {ponies.map((pony, index) => <Pony key={index} index={index} pony={pony} />)}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ponies: state.ponies.filteredItems
});

export default connect(mapStateToProps)(PoniesList);
