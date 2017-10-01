import Immutable from "seamless-immutable";
import reducer from "./ponies";
import * as types from "../actions/ponies";

describe("ponies reducer", () => {
  const initState = {
    items: [],
    filteredItems: [],
    filter: {},
    showFilter: false
  };

  it("Должен вернуть первоначальное значение", () => {
    const initState = {
      items: [],
      filteredItems: [],
      filter: {},
      showFilter: false
    };

    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("Должен обработать PONIES_RECEIVE", () => {
    expect(
      reducer(
        Immutable(initState),
        types.get({
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
        })
      )
    ).toEqual({
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

  it("Должен обработать PONIES_SHOW_FILTER", () => {
    expect(reducer(Immutable(initState), types.showFilter(true))).toEqual({
      filter: {},
      filteredItems: [],
      items: [],
      showFilter: true
    });
  });

  describe("Установка фильтров PONIES_SET_FILTER", () => {
    it("Должен добавить фильтр", () => {
      expect(reducer(Immutable(initState), types.setFilter({ color: "red" }))).toEqual({
        filter: { color: "red" },
        filteredItems: [],
        items: [],
        showFilter: false
      });
    });

    it("Должен установить несколько фильтров", () => {
      expect(
        reducer(
          Immutable(initState),
          types.setFilter({ color: "red", price: { from: 1, to: 100 } })
        )
      ).toEqual({
        filter: { color: "red", price: { from: 1, to: 100 } },
        filteredItems: [],
        items: [],
        showFilter: false
      });
    });

    it("Должен добавить фильтр к существующему", () => {
      const initState = {
        items: [],
        filteredItems: [],
        filter: { color: "red" },
        showFilter: false
      };

      expect(
        reducer(
          Immutable(initState),
          types.setFilter({
            price: {
              from: 30,
              to: 50
            }
          })
        )
      ).toEqual({
        filter: {
          color: "red",
          price: {
            from: 30,
            to: 50
          }
        },
        filteredItems: [],
        items: [],
        showFilter: false
      });
    });

    it("Установить фильр массив", () => {
      const filter = { kind: ["some-kind-1", "some-kind-2"] };
      const state = { ...initState, filter };
      const result = reducer(Immutable(state), types.setFilter(filter));

      expect(result.filter).toEqual(filter);
    });
  });

  describe("Тестирование фильтров", () => {
    it("Должен обработать PONIES_FILTER c пустыми фильтрами ", () => {
      const initState = {
        items: [
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 170603.26,
            is_new: false,
            id: 1
          },
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 170603.26,
            is_new: false,
            id: 2553
          },
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 170603.26,
            is_new: false,
            id: 255
          }
        ],
        filteredItems: [],
        filter: {},
        showFilter: false
      };

      const result = reducer(Immutable(initState), types.filter());

      expect(result.filteredItems).toEqual(expect.arrayContaining([1, 2553, 255]));
    });

    it("Должен обработать PONIES_FILTER c фильтром цены От - До", () => {
      const filter = { price: { from: 1.33, to: 100 } };
      const initState = {
        items: [
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 2.26,
            is_new: false,
            id: 1
          },
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 100,
            is_new: false,
            id: 2
          },
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 1234,
            is_new: false,
            id: 2
          },
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Лось",
            price: 1.33,
            is_new: false,
            id: 3
          }
        ],
        filteredItems: [],
        filter,
        showFilter: false
      };

      const result = reducer(Immutable(initState), types.filter());
      expect(result.filteredItems).toHaveLength(3);
      expect(result.filteredItems).toEqual(expect.arrayContaining([1, 2, 3]));
    });

    it("Должен обработать PONIES_FILTER c фильтрами цены От без До, цвета", () => {
      const filter = { color: "Зеленый", price: { from: 1 } };
      const initState = {
        items: [
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Единорог",
            price: 2.26,
            is_new: false,
            id: 1
          },
          {
            name: "Бетман",
            color: "rgergergerg",
            kind: "Единорог",
            price: 104340,
            is_new: false,
            id: 2
          },
          {
            name: "Бетман",
            color: "Зеленый",
            kind: "Лось",
            price: 1,
            is_new: false,
            id: 3
          }
        ],
        filteredItems: [],
        filter,
        showFilter: false
      };

      const result = reducer(Immutable(initState), types.filter());

      expect(result.filteredItems).toHaveLength(2);
      expect(result.filteredItems).toEqual(expect.arrayContaining([1, 3]));
    });

    it("Отфильтровать с 2 умя полями типа equal", () => {
      const filter = { kind: "Нужный", color: "Голубой" };
      const initState = {
        items: [
          {
            // ok
            name: "Бетман",
            color: "Голубой",
            kind: "Нужный",
            price: 2.26,
            is_new: false,
            id: 1
          },
          {
            // ok
            name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
            color: "Голубой",
            kind: "Нужный",
            price: 32.26,
            is_new: true,
            id: 3
          },
          {
            name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
            color: "wer",
            kind: "Нужнываываываый",
            price: 32.26,
            is_new: true,
            id: 4
          },
          {
            name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
            color: "Голубой",
            kind: "Лбоййцвлц",
            price: 132.26,
            is_new: true,
            id: 5
          },
          {
            // ok
            name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
            color: "Голубой",
            kind: "Нужный",
            price: 322.26,
            is_new: true,
            id: 6
          }
        ],
        filteredItems: [],
        filter,
        showFilter: false
      };

      const result = reducer(Immutable(initState), types.filter());

      expect(result.filteredItems).toHaveLength(3);
      expect(result.filteredItems).toEqual(expect.arrayContaining([1, 3, 6]));
    });

    it("Отфильтровать - поле equal является массивом", () => {
      const state = {
        ...initState,
        ...{
          filter: { kind: ["Нужный", "Нужный2"], color: "Голубой" },
          items: [
            {
              // ok
              name: "Бетман",
              color: "Голубой",
              kind: "Нужный2",
              price: 2.26,
              is_new: false,
              id: 1
            },
            {
              // ok
              name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
              color: "Голубой",
              kind: "Нужный",
              price: 32.26,
              is_new: true,
              id: 3
            },
            {
              name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
              color: "wer",
              kind: "Нужнываываываый",
              price: 32.26,
              is_new: true,
              id: 4
            },
            {
              name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
              color: "Голубой",
              kind: "Лбоййцвлц",
              price: 132.26,
              is_new: true,
              id: 5
            },
            {
              // ok
              name: "ваь жалхЙЭА ЩАЛщуцлацщалцщалАЖЬау",
              color: "Голубой",
              kind: "Нужный2",
              price: 322.26,
              is_new: true,
              id: 6
            }
          ]
        }
      };

      const result = reducer(Immutable(state), types.filter());

      expect(result.filteredItems).toHaveLength(3);
      expect(result.filteredItems).toEqual(expect.arrayContaining([1, 3, 6]));
    });
  });
});
