import * as THREE from "three";

import { Component } from "./component";

export class Mesh extends Component {
  public geometry: THREE.BufferGeometry;
  public material: THREE.Material;
  public mesh: THREE.Mesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    super();
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  protected notifyRootSystems(): void {
    if (!this.rootSystems) throw new Error("rootSystems is null");
    this.rootSystems.scene.add(this.mesh);
  }
}