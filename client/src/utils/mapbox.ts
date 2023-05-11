import mapboxgl from "mapbox-gl";
import { ImportMeta } from "./ImportMeta";

mapboxgl.accessToken = (import.meta as unknown as ImportMeta).env.VITE_MAPBOX_TOKEN

export { mapboxgl }