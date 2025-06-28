import { Acceleration, type EntityAction, FRAMES_PER_SECOND, Position, Velocity } from ".";

export class Entity {
    id: string;
    position: Position;
    action: EntityAction;
    velocity: Velocity;
    acceleration: Acceleration;
    color?: number;
    radius?: number; // Optional radius for circle entities

    constructor() {
        this.id = crypto.randomUUID();
        this.action = 'idle';
        this.position = new Position;
        this.velocity = new Velocity;
        this.acceleration = new Acceleration;
    }
}

export const discretePhysics = (entity: Entity) => {

    entity.position = {
        x: entity.position.x + entity.velocity.x/FRAMES_PER_SECOND,
        y: entity.position.y + entity.velocity.y/FRAMES_PER_SECOND,
    } 

    entity.velocity = {
        x: entity.velocity.x + entity.acceleration.x/FRAMES_PER_SECOND,
        y: entity.velocity.y + entity.acceleration.y/FRAMES_PER_SECOND,
    }

    return entity;

}