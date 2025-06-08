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

const useGroupStore = create
