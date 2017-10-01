import React, { Component } from "react";
import { connect } from "react-redux";
import { block } from "../../utils";
import { colors, kinds, isNew } from "../../constants/ponyData";
import { setFilter as setFilterForPonies } from "../../actions/ponies";
import RangeControl from "./RangeControl";
import "./PoniesFilter.css";

const b = block("PoniesFilter");

export class PoniesFilter extends Component {
  constructor() {
    super();
    this.rangeControls = {};
  }

  componentWillReceiveProps(nextProps) {
    Object.keys(this.rangeControls).forEach(filterKey => {
      if (!nextProps.selectedFilters[filterKey]) {
        this.rangeControls[filterKey].to.value = "";
        this.rangeControls[filterKey].from.value = "";
      }
    });
  }

  handleChangeFilter = (value, name) => {
    if (value === "true") value = true;
    if (value === "false") value = false;
    if (value === "-") value = undefined;

    this.props.dispatch(setFilterForPonies({ [name]: value }));
  };

  renderFilter = (filters, name, labelText, multiple) => {
    return (
      <div className={b("col")()}>
        <label className={b("label")()} htmlFor={name}>
          {labelText}
        </label>
        <select
          multiple={multiple}
          value={this.props.selectedFilters[name] || "-"}
          id={name}
          onChange={e => {
            let value;

            if (multiple) {
              value = Array.from(e.target.options)
                .filter(o => o.selected)
                .map(o => o.value);
            } else {
              value = e.target.value;
            }

            this.handleChangeFilter(value, name);
          }}
        >
          <option key={undefined} value={"-"}>
            -
          </option>
          {filters.map(filter => (
            <option key={filter.slug} value={filter.slug}>
              {filter.text}
            </option>
          ))}
        </select>
      </div>
    );
  };

  renderRangeFilter = (filter, name, labelText) => {
    let $toNode;
    let $fromNode;
    this.rangeControls[name] = {};

    return (
      <div className={b("range-box").mix(b("col"))()}>
        <label className={b("label")()}>{labelText}</label>
        <RangeControl
          inputRef={node => {
            this.rangeControls[name].from = $fromNode = node;
          }}
          onBlur={e => this.handleChangeFilter({ from: +e.target.value, to: +$toNode.value }, name)}
          label={"От"}
        />
        <RangeControl
          inputRef={node => {
            this.rangeControls[name].to = $toNode = node;
          }}
          onBlur={e =>
            this.handleChangeFilter({ from: +$fromNode.value, to: +e.target.value }, name)}
          label={"До"}
        />
      </div>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className={b.mix(props.mix)()}>
        <section className={b("box")()}>
          {this.renderFilter(props.colors, "color", "Цвет:")}
          {this.renderFilter(props.kinds, "kind", "Вид:", true)}
          {this.renderRangeFilter(props.price, "price", "Цена:")}
          {this.renderFilter(props.isNew, "is_new", "Новинка:")}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colors: colors.map(el => ({ text: el, slug: el })),
  kinds: kinds.map(el => ({ text: el, slug: el })),
  isNew: isNew.map(el => ({ text: el ? "Да" : "Нет", slug: el })),
  selectedFilters: state.ponies.filter
});

export default connect(mapStateToProps)(PoniesFilter);
