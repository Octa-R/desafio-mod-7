import axios from "axios"
interface State {
  listeners: Array<() => void>;
  data: any
  storage: CustomStorage
  x: any
  init: () => void
  getState: () => any
  setState: (newState: any) => void
  subscribe: (cb: () => any) => void
  signup: (userData: any) => Promise<boolean>
  signin: (userData: any) => Promise<boolean>
  setCurrentPosition: () => void
}

class CustomStorage {
  save(key: string, data: {}) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): { data: {} } {
    const data: string = localStorage.getItem(key) || "undefined";
    if (data != "undefined") {
      return JSON.parse(data);
    }
    return { data: {} };
  }
}

const state: State = {
  data: {
    userToken: "",
    errorMessage: "",
    currentPosition: ""
  },
  listeners: [],
  storage: new CustomStorage(),
  x: null,
  init() {
    const cs = state.getState();
    this.setState({ ...this.data, ...cs });
    this.x = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 2500,
      headers: { 'Content-Type': 'application/json' }
    });
  },
  getState() {
    const data = this.storage.get("app-state");
    return data;
  },
  setState(newState) {
    console.log("soy el state eh cambiado", newState)
    this.data = newState;
    this.storage.save("app-state", this.data);

    for (const cb of this.listeners) {
      cb();
    }
  },
  subscribe(cb: () => any) {
    this.listeners.push(cb)
  },
  async signup(userData) {
    if (userData.password != userData.passwordConfirm) {
      console.log("err");
      return false
    }
    try {
      const res = await this.x.post("/auth/signup", { ...userData })
      console.log(res);

      return true
    } catch (error: any) {
      const msg = error.response.data.message
      console.log(msg);
      const cs = this.getState()
      cs.errorMessage = msg
      this.setState(cs)
      return false
    }
  },
  async signin(userData) {
    try {
      const res = await this.x.post("/auth/signin", { ...userData })
      //se setea el token
      this.x.defaults.headers.common['Authorization'] = res.data.token
      console.log("el usuario se ha autenticado correctamente");
      return true
    } catch (error: any) {
      const msg = error.response.data.message
      console.log(msg);
      const cs = this.getState()
      cs.errorMessage = msg
      this.setState(cs)
      return false
    }
  },
  setCurrentPosition() {
    const success = (pos: any) => {
      const crd = pos.coords;
      const cs = this.getState()
      cs.currentPosition = {
        lat: crd.latitude,
        lng: crd.longitude,
        acc: crd.accuracy
      }
      this.setState(cs)
    }

    const error = (err: any) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator
      .geolocation
      .getCurrentPosition(success, error, options);
  }
}


export { state }