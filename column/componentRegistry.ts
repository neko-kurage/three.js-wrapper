/*
Mapで管理するコンポーネントたち。
*/

import { Component } from "../source/components/component";
import { Collision } from "../source/components/collision";
import { Mesh } from "../source/components/mesh";
import { Transform } from "../source/components/transform";


export class ComponentRegistry {
  public transform: Transform | null = null;
  public collision: Collision | null = null;
  public mesh: Mesh | null = null;

  public map = new Map<string, Component | null>();

  add(component: Component): void {
    const registryKey = component.registryKey;
    if (this.map.has(registryKey)) {
      throw new Error(`${registryKey} コンポーネントはすでに登録済みです`);
    }
    Reflect.set(this, registryKey, component);
    this.map.set(registryKey, component);
  }
}