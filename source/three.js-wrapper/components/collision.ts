import * as THREE from "three";

import { Component } from "./component";
import { Mesh } from "./mesh";

export class Collision extends Component {
  public geometry: THREE.BufferGeometry;
  public material: THREE.MeshBasicMaterial;
  public collisionMesh: THREE.Mesh;
  private visibility: boolean;

  //public detectMouseMode: "first" | "all" | "hidden" | "none";

  constructor(geometry: Mesh | THREE.BufferGeometry, visibility: boolean = false) {
    super();
    if (geometry instanceof Mesh) {
      this.geometry = geometry.geometry;
    } else {
      this.geometry = geometry;
    }
    
    this.material = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
    this.collisionMesh = new THREE.Mesh(this.geometry, this.material);
    this.visibility = visibility;

    //this.detectMouseMode = "none";
  }

  protected override notifyRootSystems(): void {
    if (!this.rootSystems) throw new Error("rootSystems is null");
    if (this.visibility) this.rootSystems.scene.add(this.collisionMesh);
    this.rootSystems.collisionDetector.addCollision(this);
  }

  public setVisibility(isVisible: boolean): void {
    if (this.rootSystems && this.visibility != isVisible) {
      if (isVisible) {
        this.rootSystems.scene.add(this.collisionMesh);
      } else {
        this.rootSystems.scene.remove(this.collisionMesh);
      }
    }

    this.visibility = isVisible;
  }

  public override update(): void {
  }
}