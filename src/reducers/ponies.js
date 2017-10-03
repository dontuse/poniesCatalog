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
        items: action.payload.ponies
      };

    case PONIES_FILTER: {
      const equalFields = ["color", "kind", "is_new"];
      const rangeFields = ["price"];

      const filterPonies = () => {
        const { filter } = state;
        const equalProps = Object.keys(filter).filter(
          elem => equalFields.includes(elem) && filter[elem] !== undefined
        );
        const rangeProps = Object.keys(filter).filter(
          elem => rangeFields.includes(elem) && filter[elem] !== undefined
        );

        return state.items.filter(item => {
          let equalCounter = 0;
          let rangeCounter = 0;

          equalProps.forEach(prop => {
            if (Array.isArray(filter[prop])) {
              filter[prop].includes(item[prop]) && equalCounter++;
            } else {
              item[prop] === filter[prop] && equalCounter++;
            }
          });

          rangeProps.forEach(prop => {
            const min = filter[prop].from || Number.MIN_SAFE_INTEGER;
            const max = filter[prop].to || Number.MAX_SAFE_INTEGER;

            item[prop] >= min && item[prop] <= max && rangeCounter++;
          });

          return equalCounter === equalProps.length && rangeCounter === rangeProps.length;
        });
      };

      return {
        ...state,
        filteredItems: _shuffle(filterPonies())
          .slice(0, 20)
          .map(pony => pony.id)
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
