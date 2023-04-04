import { Router } from "@vaadin/router";
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
  logout: () => Promise<boolean>
  setCurrentPosition: () => Promise<any>
  getDatosPersonales: () => any
  updateDatosPersonales: (props: { fullname: string, localidad: string }) => any
  getLostPets: () => Promise<boolean>
  getUserLostPets: () => Promise<boolean>
  resetState: () => void
}

class CustomStorage {
  save(key: string, data: {}) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): {} {
    const data: string = localStorage.getItem(key) || "undefined";
    if (data != "undefined") {
      return JSON.parse(data);
    }
    return {};
  }
}

interface ImportMeta {
  env: {
    VITE_API_URL: string
  }
}

const state: State = {
  data: {
    jwtToken: "",
    errorMessage: "",
    currentPosition: "",
    userIsLoggedIn: false,
    email: "",
    password: "",
    lostPetsList: [],
    fullname: "",
    localidad: ""
  },
  listeners: [],
  storage: new CustomStorage(),
  x: null,
  init() {
    const cs = state.getState();
    const url = (import.meta as unknown as ImportMeta).env.VITE_API_URL
    this.setState({ ...this.data, ...cs });
    this.x = axios.create({
      baseURL: url,
      timeout: 2500,
      headers: { 'Content-Type': 'application/json' }
    });

    this.x.defaults.headers.common['Authorization'] = "Bearer " + cs.jwtToken
  },
  getState() {
    const data = this.storage.get("app-state");
    return data
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
    try {
      const res = await this.x.post("/auth/signup", { ...userData })
      console.log("signup", res)
      return true
    } catch (error: any) {
      const cs = this.getState()
      cs.errorMessage = error.response.data.message
      this.setState(cs)
      return false
    }
  },
  async signin(userData) {
    const cs = this.getState()
    let response: boolean = false
    try {
      const res = await this.x.post("/auth/signin", { ...userData })
      //se setea el token
      this.x.defaults.headers.common['Authorization'] = "Bearer " + res.data.token

      cs.email = res.data.email
      cs.userIsLoggedIn = true
      cs.errorMessage = ""
      cs.jwtToken = res.data.token
      response = true
    } catch (error: any) {
      cs.errorMessage = error.response.data.message
      response = false
    } finally {
      this.setState(cs)
      return response
    }
  },
  async getDatosPersonales() {
    const cs = this.getState()
    try {
      const res = await this.x.get(`/users`)
      cs.email = res.data.email
      cs.fullname = res.data.fullname
      cs.localidad = res.data.localidad
    } catch (error: any) {
      cs.errorMessage = error.response.data.message
    } finally {
      console.log("se setea el state")
      this.setState(cs)
    }
  },
  async updateDatosPersonales({ fullname, localidad }) {
    const cs = this.getState()
    try {
      const update = await this.x.put(`/users`, {
        fullname, localidad
      })
      console.log(update)
    } catch (error: any) {
      console.log(error)
      cs.errorMessage = error.response.data.message || error.message
      this.setState(cs)
    }
  },
  async setCurrentPosition() {
    const success = (pos: any) => {
      const crd = pos.coords;
      const cs = this.getState()
      cs.currentPosition = {
        lat: crd.latitude,
        lng: crd.longitude,
        acc: crd.accuracy
      }
      this.setState(cs)
      Router.go("/home-mascotas")
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
  },
  async logout() {
    const cs = this.getState()
    this.x.defaults.headers.common['Authorization'] = ""
    cs.userIsLoggedIn = false
    cs.email = ""
    this.setState(cs)
    return true
  },
  async getLostPets() {
    const cs = this.getState()
    let res = false
    try {
      const { data } = await this.x.get("/pets/")
      console.log(data)
      cs.lostPetsList = data.lostPets
      res = true
    } catch (error: any) {
      cs.errorMessage = error.response.data.message
      res = false
    } finally {
      this.setState(cs)
      return res
    }
  },
  async getUserLostPets() {
    const cs = this.getState()
    let res = false
    try {
      const { data } = await this.x.get("/users/pets/")
      console.log("getUserLostPets", data)
      cs.userLostPets = data.userLostPets
      res = true
    } catch (error: any) {
      cs.errorMessage = error.response.data.message
      res = false
    } finally {
      this.setState(cs)
      return res
    }
  },
  resetState() {
    const cs = this.getState()
    cs.email = ""
    cs.userIsLoggedIn = false
    cs.errorMessage = ""
    cs.currentPosition = ""
    cs.password = ""
    cs.lostPetsList = []
    this.setState(cs)
  }
}


export { state }