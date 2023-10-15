import renderDOM from "./utils/RenderDOM";
import Button from "./components/Button";

const button = new Button({
  className: "button",
  child: "Click me!",
  events: {
    click: () => {
      console.log("Clicked!");
    },
  },
});

renderDOM("#app", button);

setTimeout(() => {
  button.setProps({
    className: "button",
    child: "Updated!",
    events: {
      click: () => {
        console.log("Clicked after updated props!");
      },
    },
  });
}, 5000);

setTimeout(() => {
  button.setProps({
    className: "button",
    child: "Updated twice!",
    events: {
      click: () => {
        console.log("Clicked after updated props twice!");
      },
    },
  });
}, 10000);
