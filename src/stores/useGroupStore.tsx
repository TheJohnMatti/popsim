import { create } from "zustand";
import type { Position } from "../utils";

interface Rectangle {
    tl: Position;
    br: Position;
}

interface Group {
    color: number;
    renderRegion: Rectangle;
    name?: string;
}

interface GroupStore {
    groups: Group[];
    createGroup: () => void;
}

const useGroupStore = create<GroupStore>((set, get) => ({
    groups: [
        {
            color: 0x00ff00, // Default color is green
            renderRegion: {
                tl: { x: -10, y: -10 },
                br: { x: 10, y: 10 }
            }
        }
    ],

    createGroup: () => {
        set((state) => ({
            ...state, groups: [
                ...state.groups, {
                    color: Math.floor(Math.random()*0xffffffff),
                    renderRegion: {tl: {x: 0, y: 0}, br: {x: 0, y: 0}}
                }
            ]
        }))
    }   





}));

export default useGroupStore;