import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "../base/Dialog/Dialog";
import Button from "../base/Button/Button";
import { showFilter, filter as filterPonies, resetFilter } from "../../actions/ponies";
import PoniesFilter from "../PoniesFilter/PoniesFilter";

class PonyFilterModal extends Component {
  render() {
    return (
      <Dialog
        visible={this.props.showPonyFilter}
        onClose={() => {
          this.props.dispatch(showFilter(false));
        }}
        title={"Отфильтровать пони."}
        footer={
          <div>
            <Button
              onClick={() => {
                this.props.dispatch(showFilter(false));
              }}
              mix="rc-dialog-button is-cancel is-big-size"
            >
              Закрыть
            </Button>
            <Button
              mix="rc-dialog-button is-big-size"
              onClick={() => {
                this.props.dispatch(resetFilter());
                this.props.dispatch(filterPonies());
                this.props.dispatch(showFilter(false));
              }}
            >
              Сбросить фильры
            </Button>
            <Button
              mix="rc-dialog-button is-big-size is-good"
              onClick={() => {
                this.props.dispatch(filterPonies());
                this.props.dispatch(showFilter(false));
              }}
            >
              Применить фильтры
            </Button>
          </div>
        }
      >
        <PoniesFilter />
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  showPonyFilter: state.ponies.showFilter
});

export default connect(mapStateToProps)(PonyFilterModal);
