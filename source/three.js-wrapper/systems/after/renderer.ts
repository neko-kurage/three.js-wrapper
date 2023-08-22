import * as THREE from "three";

import { System } from "../system";
import { Camera } from "./camera";

export class Renderer implements System {
  public canvas: HTMLElement;

  public adjustSizeElement: HTMLElement;
  public width: number;
  public height: number;

  public renderer: THREE.WebGLRenderer;

  public scene: THREE.Scene;

  public camera: Camera;

  constructor(
    canvas: HTMLElement,
    scene: THREE.Scene,
    camera: Camera,
    adjustSizeElement: HTMLElement = document.body
  ) {
    this.canvas = canvas;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.scene = scene;
    this.camera = camera;

    this.adjustSizeElement = adjustSizeElement;
    this.width = adjustSizeElement.clientWidth;
    this.height = adjustSizeElement.clientHeight;

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  public update(): void {
    this.renderer.render(this.scene, this.camera.mainCamera);
  }

  public setAdjustSizeElement(adjustSizeElement: HTMLElement): void {
    this.adjustSizeElement = adjustSizeElement;
    this.resize();
  }

  private resize(): void {
    this.width = this.adjustSizeElement.clientWidth;
    this.height = this.adjustSizeElement.clientHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.camera.aspect(this.width, this.height);
  }
}
