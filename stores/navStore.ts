import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
}

interface Place {
  location: Location;
  description: string;
}

interface NavStore {
  origin?: Place;
  destination?: Place;
  setOrigin: (location: Location, description: string) => void;
  setDestination: (location: Location, description: string) => void;
}

const useNavStore = create<NavStore>((set) => ({
  origin: undefined,
  destination: undefined,
  setOrigin: (location, description) => set({ origin: { location, description } }),
  setDestination: (location, description) => set({ destination: { location, description } }),
}));

export default useNavStore;
