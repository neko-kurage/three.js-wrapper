import { Component } from "./components/component";
import { Systems } from "./systems";

export class Entity {
  private components: Component[];
  private rootSystems: Systems | null;

  constructor() {
    this.components = [];
    this.rootSystems = null;
  }

  public setRootSystems(rootSystems: Systems): void {
    this.rootSystems = rootSystems;

    for (const component of this.components) {
      component.setRootSystems(this.rootSystems);
    }
  }

  public addComponent(component: Component): void {
    if (this.rootSystems) {
      component.setRootSystems(this.rootSystems);
    }

    this.components.push(component);
  }

  public update(): void {
    for (const component of this.components) {
      component.update();
    }
  }
}