import Handlebars from "handlebars/runtime";
import button from "./button.hbs";

import "./styles.scss";

Handlebars.registerPartial("button", button);

export default button;
