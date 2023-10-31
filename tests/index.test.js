/**
 * @jest-environment jsdom
 */

import { wait, load_placements, reload, detectedKeywords } from "../index";

test("Wait promise is exported", () => {
  expect(wait).toBeInstanceOf(Promise);
});

test("Load the dynamic decision script tag", () => {
  document.body.innerHTML = '<div data-ea-publisher="foo" data-ea-type="text"></div>';

  load_placements();

  // Ensure the script tag is added to the head
  expect(document.head.innerHTML).toContain(
    '<script src="https://server.ethicalads.io/api/v1/decision/'
  );
  expect(document.head.innerHTML).toContain("publisher=foo");
});

test("Verify keyword detection", () => {
  document.body.innerHTML = '<div data-ea-publisher="foo"></div>' +
      '<p role="main">PyTorch is an important module for machine learning. ' +
      "PyTorch can use your GPU to crunch numbers faster than a CPU.</p>";

  // Reset keyword detection - it will be re-run when the placement is loaded
  reload();

  expect(detectedKeywords).toContain("pytorch");
});

// TODO In use as a module, wait shouldn't even resolve, and the placement
// detection should not execute.
test.failing("Wait promise resolves to empty placements", () => {
  // Currently, the placemnet logic fires off on module import, and so this
  // promise does actually resolve to `[]`
  expect(wait).not.resolves.toStrictEqual([]);
});
