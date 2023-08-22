import { Systems } from "../systems";

export abstract class Component {
  protected rootSystems: Systems | null;

  constructor() {
    this.rootSystems = null;
  }

  public setRootSystems(rootSystems: Systems): void {
    this.rootSystems = rootSystems;
    this.notifyRootSystems();
  }

  protected notifyRootSystems(): void {}

  public update(): void {}
}