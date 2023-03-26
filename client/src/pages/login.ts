class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }
  // container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16
  //container w-screen px-12 h-screen flex flex-col justify-center gap-y-4 py-16 bg-gray-500
  render() {
    this.innerHTML = `
    <nav-bar></nav-bar>
    <div class="container mx-autopx-12 h-screen flex flex-col justify-center gap-y-4 py-16">

      <p class="text-4xl text-center font-bold text-orange-600 subpixel-antialiased my-8">
        Iniciar Sesión
      </p>

      <div class="container mx-auto mt-8 ">
        <div class="max-w-md mx-auto bg-transparent p-8 ">
            <form id="login-form">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-semibold mb-2">E-mail</label>
                    <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-md" autocomplete="email" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-semibold mb-2">Contraseña</label>
                    <input type="password" id="password" name="password" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-md" autocomplete="current-password" required>
                </div>
                <div>
                <p class="text-sm underline bold text-blue-700">
                  <a href="/">Olvide mi contraseña</a>
                </p>
                </div>
                <div class="mt-8">
                  <button type="submit" class="bg-indigo-600 w-full shadow-md hover:bg-blue-800 text-white font-bold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
                    Acceder
                  </button>
                </div>
            </form>
        </div>
    </div>
    </div>
    `;
  }
}

export { LoginPage }