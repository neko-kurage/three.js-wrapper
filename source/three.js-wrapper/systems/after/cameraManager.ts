import * as THREE from "three";

import { System } from "../system";
import { Camera } from "../../components/camera";

export class CameraManager implements System {
  defaultCamera: Camera;
  mainCamera: Camera;

  constructor(canvas: HTMLCanvasElement) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.defaultCamera = new Camera(new THREE.PerspectiveCamera(90, width / height));
    this.defaultCamera.camera.position.set(0, 0, 100);

    this.mainCamera = this.defaultCamera;
  }

  public aspect(width: number, height: number): void {
    if (this.mainCamera.camera instanceof THREE.PerspectiveCamera) {
      this.mainCamera.camera.aspect = width / height;
      this.mainCamera.camera.updateProjectionMatrix();
    }
  }

  public update(): void {}
}
