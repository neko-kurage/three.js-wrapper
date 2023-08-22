import * as THREE from "three";

import { System } from "../system";

export class Camera implements System {
  mainCamera: THREE.PerspectiveCamera;

  constructor(canvas: HTMLCanvasElement) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.mainCamera = new THREE.PerspectiveCamera(
      90,
      width / height
    );
  }

  public aspect(width: number, height: number): void {
    this.mainCamera.aspect = width / height;
    this.mainCamera.updateProjectionMatrix();
  }

  public update(): void {}
}