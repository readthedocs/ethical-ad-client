import { wait } from "../index";

test("Wait promise is exported", () => {
  expect(wait).toBeInstanceOf(Promise);
});

// TODO In use as a module, wait shouldn't even resolve, and the placement
// detection should not execute.
test.failing("Wait promise resolves to empty placements", () => {
  // Currently, the placemnet logic fires off on module import, and so this
  // promise does actually resolve to `[]`
  expect(wait).not.resolves.toStrictEqual([]);
});
