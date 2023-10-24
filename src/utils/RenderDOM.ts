import Block from "./Block";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderDOM(query: any, block: Block) {
  const root = document.querySelector(query);

  root!.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}

export default renderDOM;
