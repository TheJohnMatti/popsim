export interface Vector2D {
    x: number;
    y: number;
}
export class Position implements Vector2D {
    x: number;
    y: number;
    constructor(initialPos?: {x: number, y: number}) {
        if (initialPos) {
            this.x = initialPos.x;
            this.y = initialPos.y;
        } else {
            this.x = 0;
            this.y = 0;
        }
    }
}
export class Velocity extends Position{};
export class Acceleration extends Velocity{};


export const FRAMES_PER_SECOND = 60;
export const FRAME_DURATION = 1000 / FRAMES_PER_SECOND;
export const DEFAULT_VELOCITY = 1;


export type EntityAction = 'walking' | 'running' | 'jumping' | 'attacking' | 'idle';
