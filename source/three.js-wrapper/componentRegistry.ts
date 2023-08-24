import { Component } from "./components/component";
import { Collision } from "./components/collision";
import { Mesh } from "./components/mesh";
import { Transform } from "./components/transform";

export class ComponentRegistry {
  public transform: Transform | null = null;
  public collision: Collision | null = null;
  public mesh: Mesh | null = null;

  public map = new Map<keyof ComponentRegistry, Component | null>([
    ["transform", null],
    ["collision", null],
    ["mesh", null],
  ]);

  add(component: Component): void {
    if (Reflect.get(this, component.registryKey) !== null) {
      throw new Error(`'${component.registryKey}'コンポーネントはすでに登録済みです`);
    }
    Reflect.set(this, component.registryKey, component);
    this.map.set(component.registryKey, <Component>Reflect.get(this, component.registryKey));
  }

  overwrite(component: Component): void {
    this.map.get(component.registryKey)?.remove();
    Reflect.set(this, component.registryKey, component);
    this.map.set(component.registryKey, <Component>Reflect.get(this, component.registryKey));
  }
}
