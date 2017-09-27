import {
  PONIES_RECEIVE,
  PONIES_FILTER,
  PONIES_SET_FILTER,
  PONIES_RESET_FILTER,
  PONIES_SHOW_FILTER
} from "../actions/ponies";
import { shuffle as _shuffle } from "lodash";

const initState = {
  items: [],
  filteredItems: [],
  filter: {},
  showFilter: false
};

const ponies = (state = initState, action) => {
  switch (action.type) {
    case PONIES_RECEIVE:
      return {
        ...initState,
        items: action.payload.ponies,
        filteredItems: action.payload.ponies
      };

    case PONIES_FILTER: {
      const equalFields = ["color", "kind", "is_new"];
      const rangeFields = ["price"];

      const filterPonies = () => {
        const equalProps = Object.keys(state.items[0]).filter(
          elem => equalFields.includes(elem) && state.filter[elem] !== undefined
        );
        const rangeProps = Object.keys(state.items[0]).filter(
          elem => rangeFields.includes(elem) && state.filter[elem] !== undefined
        );

        return state.items.filter(item => {
          let equalCounter = 0;
          let rangeCounter = 0;

          equalProps.forEach(prop => {
            item[prop] === state.filter[prop] && equalCounter++;
          });

          rangeProps.forEach(prop => {
            const min = state.filter[prop].from || 0;
            const max = state.filter[prop].to || Number.MAX_SAFE_INTEGER;

            item[prop] > min && item[prop] < max && rangeCounter++;
          });

          return equalCounter === equalProps.length && rangeCounter === rangeProps.length;
        });
      };

      return {
        ...state,
        filteredItems: _shuffle(filterPonies()).slice(0, 20)
      };
    }

    case PONIES_SET_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case PONIES_RESET_FILTER:
      return { ...state, filter: initState.filter };

    case PONIES_SHOW_FILTER:
      return { ...state, showFilter: action.payload };

    default:
      return state;
  }
};

export default ponies;