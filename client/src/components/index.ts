import { NavBar } from "./nav-bar";
import { Card } from "./lost-pet-card";
import { List } from "./lost-pet-list";
import { Button } from "./button";
import { ReportedList } from "./reported-pet-list";
import { ReportedPetCard } from "./reported-pet-card";

customElements.define("reported-pet-card", ReportedPetCard);
customElements.define("reported-pet-list", ReportedList);
customElements.define("nav-bar", NavBar);
customElements.define("lost-pet-card", Card);
customElements.define("lost-pet-list", List);
customElements.define("x-btn", Button);
