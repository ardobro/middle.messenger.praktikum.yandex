import renderDOM from "./utils/RenderDOM";
import Button from "./components/Button";
import ProfilePage from "./components/ProfilePage";
import HTTPTransport from "./utils/request";

new HTTPTransport()
  .get<XMLHttpRequest>("https://jsonplaceholder.typicode.com/posts")
  .then((xhr) => {
    const json = JSON.parse(xhr.response);

    console.log(json);
  });

const button = new Button({
  className: "button",
  child: "Click me!",
  events: {
    click: () => {
      console.log("Clicked!");
    },
  },
});

const profilePage = new ProfilePage({
  title: "Profile page",
  button,
});

renderDOM("#app", profilePage);

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
