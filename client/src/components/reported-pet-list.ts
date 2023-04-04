import { state } from "../state";

class ReportedList extends HTMLElement {
  constructor() {
    super()
  }


  connectedCallback() {
    state.getLostPets()
    this.render();
  }

  listeners() {
    this.querySelector(".list")?.addEventListener("report", (e: any) => {
      console.log("click en mascota");
      console.log(e.detail);
      //mostrar modal de reportar mascota como vista
    });
  }

  render() {
    const userPetsList: { id: string, name: string, lat: string, lng: string, pictureUrl: string }[] = state.getState().userPetsList

    this.innerHTML = `
      <div class="list grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 content-normal place-content-center place-items-center">
       ${userPetsList
        .map((pet) => `<reported-pet-card 
          pet-id="${pet.id}"
          name="${pet.name}"
          lat="${pet.lat}"
          lng="${pet.lng}"
          picture-url="${pet.pictureUrl}"
          " ></reported-pet-card>`)
        .join("")}
      </div>
    `;
    this.listeners();
  }
}
export { ReportedList }