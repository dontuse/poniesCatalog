import * as actions from "./ponies";

describe("ponies actions", () => {
  it("Создать действие получения списка пони", () => {
    const ponies = [];
    const expectedAction = { type: actions.PONIES_RECEIVE, payload: { ponies } };

    expect(actions.get({ ponies })).toEqual(expectedAction);
  });

  it("Создать действие фильрации пони", () => {
    const expectedAction = { type: actions.PONIES_FILTER };

    expect(actions.filter()).toEqual(expectedAction);
  });
});
