import * as THREE from "three";

import { Component } from "./component";

export class Camera extends Component {
  public camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera) {
    super("camera");
    this.camera = camera;
  }

  activate(): void {
    if (this.systems == null) throw new Error("systems is null");
    this.systems.camera.mainCamera = this;
  }
}