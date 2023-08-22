import * as THREE from "three";

import { Component } from "./component";

export class Transform extends Component {
  private _position: THREE.Vector3;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super("transform");

    this._position = new THREE.Vector3(x, y, z);
  }

  public get position(): THREE.Vector3 {
    return this._position;
  }

  public setPosition(x: number | THREE.Vector3, y: number = 0, z: number = 0): void {
    if (x instanceof THREE.Vector3) {
      this._position.copy(x);
    } else {
      this._position.set(x, y, z);
    }

    this.reflectPosition();
  }

  public reflectPosition(): void {
    const mesh = this.components?.mesh;
    const collision = this.components?.collision;

    if (mesh != null) {
      mesh.setGlobalPosition(this._position);
    }

    if (collision != null) {
      collision.setGlobalPosition(this._position);
    }
  }
}
