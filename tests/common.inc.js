import { default as sinon } from "sinon";

import { Placement } from "../index";

export function mockAdDecision() {
  // Don't actually call the server
  // https://sinonjs.org/releases/v17/stubs/
  let stub = sinon.stub(Placement.prototype, "fetch");
  const response_html = "<div><!-- A real ad would be here normally --></div>";
  const elem_placement = document.createElement("div");
  elem_placement.innerHTML = response_html;
  stub.resolves(elem_placement.firstChild);

  return stub;
}
