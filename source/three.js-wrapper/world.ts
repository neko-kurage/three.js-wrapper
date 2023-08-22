import { SystemRegistry } from "./systemRegistry";

import { Entity } from "./entity";

import { loadCanvas } from "./utils/canvas/loadCanvas";

export class World {
  private canvas: HTMLCanvasElement;
  public systems: SystemRegistry;
  private entities: Entity[];

  constructor(canvas: string | HTMLCanvasElement) {
    this.canvas = loadCanvas(canvas);
    this.systems = new SystemRegistry(this.canvas);
    this.entities = [];
  }

  public addEntity(entity: Entity): void {
    entity.setSystems(this.systems);

    this.entities.push(entity);
  }

  public update(): void {
    for (const [key, system] of Object.entries(this.systems.beforeEntities)) {
      system.update();
      //console.log(key, system);
    }

    for (const entity of this.entities) {
      entity.update();
    }

    for (const [key, system] of Object.entries(this.systems.afterEntities)) {
      system.update();
      //console.log(key, system);
    }
  }
}
