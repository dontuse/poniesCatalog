import { random as _random } from "lodash";
import { names, colors, kinds, isNew } from "../constants/ponyData";

export default count => {
  const ponies = [];

  for (let i = 0; i < count; i++) {
    let pony = {
      name: names[Math.floor(Math.random() * names.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      kind: kinds[Math.floor(Math.random() * kinds.length)],
      price: +_random(1, 1000000, 2).toFixed(2),
      is_new: isNew[Math.floor(Math.random() * isNew.length)],
      id: i
    };
    ponies.push(pony);
  }

  return ponies;
};
