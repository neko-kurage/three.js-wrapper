import * as THREE from "three";

import { Component } from "./component";

export class Mesh extends Component {
  public geometry: THREE.BufferGeometry;
  public material: THREE.Material;
  public mesh: THREE.Mesh;

  public globalPosition: THREE.Vector3;
  public localPosition: THREE.Vector3;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    super("mesh");
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);

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

  public remove(): void {
    if (this.systems == null) throw new Error("systems is null");
    this.systems.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }

  protected override notifySystems(): void {
    if (this.systems == null) throw new Error("systems is null");
    this.systems.scene.add(this.mesh);
  }
}
