export interface Position {
    x: number;
    y: number;
}

export type EntityAction = 'walking' | 'running' | 'jumping' | 'attacking' | 'idle';
