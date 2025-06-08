import { create } from "zustand";
import type { Position } from "../utils";

interface Rectangle {
    tl: Position;
    br: Position;
}

interface Group {
    color: number;
    renderRegion: Rectangle;
}

interface GroupStore {
    groups: Group[];
}

const useGroupStore = create<GroupStore>(() => ({
    groups: [
        {
            color: 0x00ff00, // Default color is green
            renderRegion: {
                tl: { x: -10, y: -10 },
                br: { x: 10, y: 10 }
            }
        }
    ]
}));
