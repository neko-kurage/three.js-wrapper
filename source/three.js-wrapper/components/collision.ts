import * as THREE from "three";

import { Component } from "./component";
import { Mesh } from "./mesh";

export class Collision extends Component {
  public geometry: THREE.BufferGeometry;
  public material: THREE.MeshBasicMaterial;
  public mesh: THREE.Mesh;
  private visibility: boolean;

  public globalPosition: THREE.Vector3;
  public localPosition: THREE.Vector3;

  constructor(object: Mesh | THREE.BufferGeometry, visibility: boolean = false) {
    super("collision");
    if (object instanceof Mesh) {
      this.geometry = object.geometry;
    } else {
      this.geometry = object;
    }

    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.visibility = visibility;

    this.globalPosition = new THREE.Vector3();
    this.localPosition = new THREE.Vector3();
  }

  public setGlobalPosition(x: number | THREE.Vector3, y: number = 0, z: number = 0): void {
    if (x instanceof THREE.Vector3) {
      this.globalPosition.copy(x);
    } else {
      this.globalPosition.set(x, y, z);
    }

    this.reflectMeshPosition();
  }

  public setLocalPosition(x: number | THREE.Vector3, y: number = 0, z: number = 0): void {
    if (x instanceof THREE.Vector3) {
      this.localPosition.copy(x);
    } else {
      this.localPosition.set(x, y, z);
    }

    this.reflectMeshPosition();
  }

  public reflectMeshPosition(): void {
    const position = new THREE.Vector3();
    position.addVectors(this.globalPosition, this.localPosition);

    this.mesh.position.set(position.x, position.y, position.z);
  }

  protected override notifySystems(): void {
    if (this.systems == null) throw new Error("systems is null");
    if (this.visibility) this.systems.scene.add(this.mesh);
  }

  public setVisibility(isVisible: boolean): void {
    if (this.systems !== null && this.visibility != isVisible) {
      if (isVisible) {
        this.systems.scene.add(this.mesh);
      } else {
        this.systems.scene.remove(this.mesh);
      }
    }

    this.visibility = isVisible;
  }
}
