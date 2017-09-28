import * as actions from "./ponies";

describe("ponies actions", () => {
  it("Создать действие получения списка", () => {
    const ponies = [];
    const expectedAction = { type: actions.PONIES_RECEIVE, payload: { ponies } };

    expect(actions.get({ ponies })).toEqual(expectedAction);
  });

  it("Создать действие фильрации", () => {
    const expectedAction = { type: actions.PONIES_FILTER };

    expect(actions.filter()).toEqual(expectedAction);
  });

  it("Создать действие утановки фильров", () => {
    const expectedAction = { type: actions.PONIES_SET_FILTER, payload: { color: "red" } };

    expect(actions.setFilter({ color: "red" })).toEqual(expectedAction);
  });

  it("Создать действие сброса фильров", () => {
    const expectedAction = { type: actions.PONIES_RESET_FILTER };

    expect(actions.resetFilter()).toEqual(expectedAction);
  });

  it("Создать действие показать/скрыть фильтры", () => {
    const expectedAction = { type: actions.PONIES_SHOW_FILTER, payload: true };

    expect(actions.showFilter(true)).toEqual(expectedAction);
  });
});
