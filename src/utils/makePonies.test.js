import makePonies from "./makePonies";

describe("Ф-ия для генерации пони", () => {
  it("Должна сгенерировать массив с пони", () => {
    const ponies = makePonies(177);
    expect(ponies).toHaveLength(177);
  });
  it("Схема пони", () => {
    const ponies = makePonies(1);
    const pony = ponies[0];
    expect(pony).toHaveProperty("id");
    expect(pony).toHaveProperty("name");
    expect(pony).toHaveProperty("color");
    expect(pony).toHaveProperty("kind");
    expect(pony).toHaveProperty("price");
    expect(pony).toHaveProperty("is_new");

    expect(typeof pony.id).toBe("number");
    expect(typeof pony.name).toBe("string");
    expect(typeof pony.color).toBe("string");
    expect(typeof pony.kind).toBe("string");
    expect(typeof pony.price).toBe("number");
    expect(typeof pony.is_new).toBe("boolean");
  });
});
