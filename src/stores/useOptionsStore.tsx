import { create } from "zustand";

type SimMode = 'team' | 'ffa' | 'scarcity';

export interface OptionsStore {
    activeColor: number;
    simMode: SimMode;
}


const useOptionsStore = create<OptionsStore>(() => ({
    activeColor: 0x00ff00, // Default color is green
    simMode: 'team',
}));

export default useOptionsStore;