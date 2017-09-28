import reducer from "./ponies";
import * as types from "../actions/ponies";

describe("ponies reducer", () => {
  const initState = { items: [], filteredItems: [], filter: {}, showFilter: false };

  it("Должен вернуть первоначальное значение", () => {
    const initState = { items: [], filteredItems: [], filter: {}, showFilter: false };

    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("Должен обработать PONIES_RECEIVE", () => {
    expect(reducer(initState, types.get({
          ponies: [
            {
              name: "Спуди",
              color: "Зеленый",
              kind: "Земная пони",
              price: 436637.39,
              is_new: false,
              id: 0
            },
            {
              name: "Бетман",
              color: "Зеленый",
              kind: "Единорог",
              price: 170603.26,
              is_new: false,
              id: 1
            }
          ]
        }))).toEqual({
      items: [
        {
          name: "Спуди",
          color: "Зеленый",
          kind: "Земная пони",
          price: 436637.39,
          is_new: false,
          id: 0
        },
        {
          name: "Бетман",
          color: "Зеленый",
          kind: "Единорог",
          price: 170603.26,
          is_new: false,
          id: 1
        }
      ],
      filteredItems: [],
      filter: {},
      showFilter: false
    });
  });
});
