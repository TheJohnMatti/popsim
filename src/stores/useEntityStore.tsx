import { create } from 'zustand'
import type { EntityAction, Position } from '../utils';

interface Entity {
    id: string;
    position: Position;
    action: EntityAction;
}

export interface EnitityStore {
    entities: Entity[];
    addEntity: (entity: Entity) => void;
    removeEntity: (id: string) => void;
}
export const useEnitityStore = create<EnitityStore>((set)=>({
    entities: [{id: crypto.randomUUID(), position: {x: 0, y: 0}, action: 'idle'}],
    addEntity: (entity: Entity) => {
        set((state) => ({
            entities: [...state.entities, entity],
        }));
    },
    removeEntity: (id: string) => {
        set((state) => ({
            entities: state.entities.filter((entity) => entity.id !== id),
        }));
    },
}))
