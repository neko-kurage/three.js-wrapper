import * as THREE from "three";

import { Component } from "./component";

export class Transform extends Component {
  public position: TransformPosition;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super("transform");

    this.position = new TransformPosition(x, y, z, this);
  }

  public reflectPosition(): void {
    const mesh = this.components?.mesh;
    const collision = this.components?.collision;

    if (mesh != null) {
      mesh.setGlobalPosition(this.position);
    }

    if (collision != null) {
      collision.setGlobalPosition(this.position);
    }
  }

  protected override notifyComponents(): void {
    this.reflectPosition();
  }
}

/*FIXME: 各種メソッドを使用して変数を設定する分には問題がないが、x, y, zの値を直接変更した場合、
reflectPosition()が使用されず、mesh,collisionコンポーネントに反映されない。
やはり参照渡しにするべきか...
*/

class TransformPosition extends THREE.Vector3 {
  private transform: Transform;

  constructor(x: number = 0, y: number = 0, z: number = 0, transform: Transform) {
    super(x, y, z);
    this.transform = transform;
  }

  public override set(x: number | THREE.Vector3, y: number = 0, z: number = 0): this {
    if (x instanceof THREE.Vector3) {
      super.copy(x);
    } else {
      super.set(x, y, z);
    }

    this.transform.reflectPosition();
    return this;
  }

  public override setX(x: number): this {
    this.x = x;

    this.transform.reflectPosition();
    return this;
  }

  public override setY(y: number): this {
    this.y = y;

    this.transform.reflectPosition();
    return this;
  }

  public override setZ(z: number): this {
    this.z = z;

    this.transform.reflectPosition();
    return this;
  }
}
