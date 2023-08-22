import * as THREE from "three";

import { System } from "../system";
import { Collision } from "../../components/collision";
import { MouseState } from "../before/mouseState";
import { Camera } from "./camera";

export class CollisionDetector implements System {
  collisions: Collision[];
  raycaster: THREE.Raycaster;
  
  mouseState: MouseState;
  camera: Camera;

  constructor(mouseState: MouseState, camera: Camera) {
    this.collisions = [];
    this.raycaster = new THREE.Raycaster();

    this.mouseState = mouseState;
    this.camera = camera;
  }

  public addCollision(collision: Collision): void {
    this.collisions.push(collision);
  }

  public update(): void {
    this.updateRaycaster();

    /*
    for (const collision of this.collisions) {
      
    }
    */
  }

  private updateRaycaster(): void {
    this.raycaster.setFromCamera(this.mouseState.position, this.camera.mainCamera);
  }
}