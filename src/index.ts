import styles from "./styles.module.scss";

console.log(styles);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="${styles.text}">
    Hello, <span class="${styles.text_red}">world!</span>
  </div>
`;
