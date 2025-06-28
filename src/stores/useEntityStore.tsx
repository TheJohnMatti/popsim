import { create } from 'zustand'
import { Position, Velocity, type EntityAction } from '../utils';
import { Entity } from '../utils/Entity';

export interface EnitityStore {
    entities: Entity[];
    addEntity: (entity: Entity) => void;
    removeEntity: (id: string) => void;
    updateEntity: (id: string, updates?: Partial<Entity>) => void; // Optional update method
}
export const useEnitityStore = create<EnitityStore>((set, get)=>({
    entities: [new Entity()],
    addEntity: (entity: Entity) => {
        const radius = entity.radius ?? 1;
        const start = entity.position;

        // Helper to check overlap
        const isOverlapping = (pos: Position) =>
            get().entities.some(
                (en) =>
                    Math.abs(pos.x - en.position.x) < radius &&
                    Math.abs(pos.y - en.position.y) < radius
            );

        // Each queue entry tracks position and direction taken for x and y
        type QueueEntry = {
            pos: Position,
            xDir: -1 | 0 | 1, // -1: negative, 0: not yet, 1: positive
            yDir: -1 | 0 | 1
        };

        const queue: QueueEntry[] = [{
            pos: start,
            xDir: 0,
            yDir: 0
        }];
        const visited = new Set<string>();

        let foundPosition = start;

        while (queue.length > 0) {
            const { pos, xDir, yDir } = queue.shift()!;
            const key = `${pos.x},${pos.y},${xDir},${yDir}`;
            if (visited.has(key)) continue;
            visited.add(key);

            if (!isOverlapping(pos)) {
                foundPosition = pos;
                break;
            }

            // Expand in 4 directions, but don't reverse direction on an axis
            if (xDir !== -1) {
                queue.push({
                    pos: { x: pos.x + 2 * radius, y: pos.y },
                    xDir: 1,
                    yDir
                });
            }
            if (xDir !== 1) {
                queue.push({
                    pos: { x: pos.x - 2 * radius, y: pos.y },
                    xDir: -1,
                    yDir
                });
            }
            if (yDir !== -1) {
                queue.push({
                    pos: { x: pos.x, y: pos.y + 2 * radius },
                    xDir,
                    yDir: 1
                });
            }
            if (yDir !== 1) {
                queue.push({
                    pos: { x: pos.x, y: pos.y - 2 * radius },
                    xDir,
                    yDir: -1
                });
            }
        }

        set((state) => ({
            entities: [...state.entities, { ...entity, position: foundPosition }],
        }));
    },
    removeEntity: (id: string) => {
        set((state) => ({
            entities: state.entities.filter((entity) => entity.id !== id),
        }));
    },
    updateEntity: (id: string, updates?: Partial<Entity>) => {
        set((state) => {
            const entities = state.entities.map((entity) => {
                if (entity.id === id) {
                    return { ...entity, ...updates };
                }
                return entity;
            });
            return { entities };
        });
    }
}))
