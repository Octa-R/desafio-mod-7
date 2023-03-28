import { HomePage } from "./home-page"
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { MisDatosPage } from "./mis-datos";
import { MisMascotasReportadasPage } from "./mis-mascotas-reportadas";
import { ReportarMascotaPage } from "./reportar-mascota";

customElements.define("home-page", HomePage);
customElements.define("register-page", RegisterPage)
customElements.define("login-page", LoginPage)
customElements.define("mis-datos", MisDatosPage)
customElements.define("mis-mascotas-reportadas", MisMascotasReportadasPage)
customElements.define("reportar-mascota", ReportarMascotaPage)
