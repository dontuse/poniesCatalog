import React, { Component } from "react";
import { connect } from "react-redux";
import { block } from "../../utils";
import { showFilter as showPoniesFilter } from "../../actions/ponies";
import PonyFilterLnk from "../PonyFilterLnk/PonyFilterLnk";
import "./Header.css";

const b = block("Header");

class Header extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.dispatch(showPoniesFilter(true));
  };

  render() {
    return (
      <header className={b()}>
        <section className={b("col")()}>
          <a onClick={this.handleClick} href="">
            Фильтровать пони.
          </a>
        </section>
        <section className={b("col")()}>
          <a onClick={this.handleClick} href="">
            Фильтровать пони 2.
          </a>
        </section>
        <section className={b("col")()}>
          <PonyFilterLnk>
            <b>
              <i>Фильтровать пони 3.</i>
            </b>
          </PonyFilterLnk>
        </section>
      </header>
    );
  }
}

export default connect()(Header);
