import { ComponentRegistry } from "../componentRegistry";
import { SystemRegistry } from "../systemRegistry";

export abstract class Component {
  public readonly registryKey: keyof ComponentRegistry;
  protected systems: SystemRegistry | null;
  protected components: ComponentRegistry | null;

  constructor(registryKey: keyof ComponentRegistry) {
    this.registryKey = registryKey;
    this.systems = null;
    this.components = null;
  }

  public setSystems(systems: SystemRegistry): void {
    this.systems = systems;
    this.notifySystems();
  }

  protected notifySystems(): void {}

  public setComponents(components: ComponentRegistry): void {
    this.components = components;
  }

  public remove(): void{}

  public update(): void {}
}
