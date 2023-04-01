import { HomePage } from "./home-page"
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { MisDatosPage } from "./mis-datos";
import { MisMascotasReportadasPage } from "./mis-mascotas-reportadas";
import { ReportarMascotaPage } from "./reportar-mascota";
import { HomeMascotas } from "./home-mascotas";
import { MisDatosPersonalesPage } from "./mis-datos-personales";
import { CambiarPassword } from "./cambiar-pass";

customElements.define("home-page", HomePage);
customElements.define("register-page", RegisterPage)
customElements.define("login-page", LoginPage)
customElements.define("mis-datos", MisDatosPage)
customElements.define("mis-mascotas-reportadas", MisMascotasReportadasPage)
customElements.define("reportar-mascota", ReportarMascotaPage)
customElements.define("home-mascotas", HomeMascotas)
customElements.define("mis-datos-personales", MisDatosPersonalesPage)
customElements.define("cambiar-password", CambiarPassword)
