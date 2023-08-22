import { Component } from "./components/component";
import { ComponentRegistry } from "./componentRegistry";
import { SystemRegistry } from "./systemRegistry";

export class Entity {
  //private components: ComponentRegistry;
  private components: ComponentRegistry;
  private systems: SystemRegistry | null;

  constructor() {
    this.components = new ComponentRegistry();
    this.systems = null;
  }

  public setSystems(systems: SystemRegistry): void {
    this.systems = systems;

    this.components.map.forEach((component) => {
      if (component === null) return;
      component.setSystems(this.systems!);
    });
  }

  public addComponent(component: Component): void {
    component.setComponents(this.components);

    if (this.systems) {
      component.setSystems(this.systems);
    }

    this.components.add(component);
  }

  public overwriteComponent(component: Component): void {
    component.setComponents(this.components);

    if (this.systems) {
      component.setSystems(this.systems);
    }

    this.components.overwrite(component);
  }

  public update(): void {
    this.components.map.forEach((component) => {
      if (component === null) return;
      component.update();
    });
  }
}
