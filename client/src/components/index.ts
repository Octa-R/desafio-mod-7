import { NavBar } from "./nav-bar";
import { Card } from "./lost-pet-card";
import { List } from "./lost-pet-list";
import { Button } from "./button";

customElements.define("nav-bar", NavBar)
customElements.define("lost-pet-card", Card);
customElements.define("lost-pet-list", List);
customElements.define("x-btn", Button)