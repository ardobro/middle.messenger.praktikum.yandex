import Block from "./Block";

function renderDOM(query: any, block: Block) {
  const root = document.querySelector(query);

  root!.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}

export default renderDOM;
