import React, { Component } from "react";
import { connect } from "react-redux";
import { block } from "../../utils";
import { colors, kinds, isNew } from "../../constants/ponyData";
import { setFilter as setFilterForPonies } from "../../actions/ponies";
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

  renderFilter = (filters, name, labelText) => {
    const selected = filters.find(el => el.slug === this.props.selectedFilters[name]);

    return (
      <div className={b("col")()}>
        <label className={b("label")()} htmlFor={name}>
          {labelText}:
        </label>
        <select
          value={selected ? selected.slug : "-"}
          id={name}
          onChange={e => this.handleChangeFilter(e.target.value, name)}
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
    let toNode;
    let fromNode;
    this.rangeControls[name] = {};

    return (
      <div className={b("range-box")()}>
        <label className={b("label")()}>{labelText}</label>
        <div>
          <label htmlFor="">От</label>
          <input
            ref={node => {
              fromNode = node;
              this.rangeControls[name].from = fromNode;
            }}
            onBlur={e =>
              this.handleChangeFilter({ from: +e.target.value, to: +toNode.value }, name)}
            className={b("range-input")()}
            type="number"
          />
        </div>
        <div>
          <label htmlFor="">До</label>
          <input
            ref={node => {
              toNode = node;
              this.rangeControls[name].to = toNode;
            }}
            onBlur={e =>
              this.handleChangeFilter({ to: +e.target.value, from: +fromNode.value }, name)}
            className={b("range-input")()}
            type="number"
          />
        </div>
      </div>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className={b.mix(props.mix)}>
        <section className={b("box")()}>
          {this.renderFilter(props.colors, "color", "Цвет:")}
          {this.renderFilter(props.kinds, "kind", "Вид:")}
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
