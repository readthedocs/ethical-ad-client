import { wait, load, detectedKeywords } from "../index";

test("Wait promise is exported", () => {
  expect(wait).toBeInstanceOf(Promise);
});


test("load() loads the dynamic decision script tag", () => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    '<div data-ea-publisher="foo" data-ea-type="text"></div>',
    'text/html'
  );

  jest
    .spyOn(document, 'querySelectorAll')
    .mockImplementation(selector => dom.querySelectorAll(selector));

  load();

  // Ensure the script tag is added to the head
  expect(document.head.innerHTML).toContain('<script src="https://server.ethicalads.io/api/v1/decision/');
  expect(document.head.innerHTML).toContain('publisher=foo');
});


test.failing("test keyword detection", () => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    '<body><div data-ea-publisher="foo"></div>' +
    '<p role="main">PyTorch is an important module for machine learning.' +
    'PyTorch can use your GPU to crunch numbers faster than a CPU.</p></body>',
    'text/html');

  jest
    .spyOn(document, 'querySelectorAll')
    .mockImplementation(selector => dom.querySelectorAll(selector));

  jest
    .spyOn(document, 'querySelector')
    .mockImplementation(selector => dom.querySelector(selector));

  load();

  expect(detectedKeywords).toContain("pytorch");
});


// TODO In use as a module, wait shouldn't even resolve, and the placement
// detection should not execute.
test.failing("Wait promise resolves to empty placements", () => {
  // Currently, the placemnet logic fires off on module import, and so this
  // promise does actually resolve to `[]`
  expect(wait).not.resolves.toStrictEqual([]);
});
