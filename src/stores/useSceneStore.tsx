import { create } from 'zustand'
import * as THREE from 'three'

export interface SceneStore {
    scene: THREE.Scene | null;
    setScene: (scene: THREE.Scene) => void;
}

const useSceneStore = create<SceneStore>((set, get)=>({
    scene: null,
    setScene: (scene: THREE.Scene) => {
        set({ scene });
    },
}))

export default useSceneStore;