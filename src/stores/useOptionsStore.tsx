import { create } from "zustand";


const MAX_ZOOM = 3;
const MIN_ZOOM = 0.25;

type SimMode = 'team' | 'ffa';

export interface OptionsStore {
    activeColor: number;
    simMode: SimMode;
    zoom: number;
    handleZoom: (dir: 'inc' | 'dec') => void;
    setZoom: (zoom: number) => void;
}


const useOptionsStore = create<OptionsStore>((set, get) => ({
    activeColor: 0x00ff00, // Default color is green
    simMode: 'team',
    zoom: 1,
    handleZoom: (dir: 'inc' | 'dec') => {
        const zoom = get().zoom;
        if (dir == 'dec') {
            set((state) => ({...state, zoom: Math.min(zoom+Math.max(zoom*0.05, 0.03), MAX_ZOOM)}))
        } else {
            set((state) => ({...state, zoom: Math.max(zoom-Math.max(zoom*0.05, 0.03), MIN_ZOOM)}))
        }
    },
    setZoom: (zoom: number) => {
        set(state => ({...state, zoom}))
    },
    setSimMode: (mode: SimMode) => {
        set((state) => ({...state, simMode: mode}));
    },
}));

export default useOptionsStore;