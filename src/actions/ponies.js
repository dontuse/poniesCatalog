export const PONIES_RECEIVE = "RECEIVE_PONIES";
export const PONIES_FILTER = "PONIES_FILTER";
export const PONIES_SET_FILTER = "PONIES_SET_FILTER";
export const PONIES_SHOW_FILTER = "PONIES_SHOW_FILTER";
export const PONIES_RESET_FILTER = "PONIES_RESET_FILTER";

export const get = data => ({
  type: PONIES_RECEIVE,
  payload: data
});

export const filter = data => ({
  type: PONIES_FILTER,
  payload: data
});

export const setFilter = data => ({
  type: PONIES_SET_FILTER,
  payload: data
});

export const resetFilter = () => ({
  type: PONIES_RESET_FILTER
});

export const showFilter = data => ({
  type: PONIES_SHOW_FILTER,
  payload: data
});
