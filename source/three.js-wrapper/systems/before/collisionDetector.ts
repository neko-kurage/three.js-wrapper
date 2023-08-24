import * as THREE from "three";

import { System } from "../system";
import { Collision } from "../../components/collision";
import { MouseState } from "../before/mouseState";
import { Camera } from "../after/camera";

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
  }

  private updateRaycaster(): void {
    this.raycaster.setFromCamera(this.mouseState.position, this.camera.mainCamera);

    this.collisions.forEach((collision) => {
      if (this.raycaster.intersectObject(collision.mesh).length > 0) {
        collision.event.dispatch("onMouseOver");
      } else {
        collision.event.dispatch("onMouseOff");
      };
    });
  }
}
