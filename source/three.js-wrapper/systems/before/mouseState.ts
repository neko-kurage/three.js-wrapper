import * as THREE from "three";

import { System } from "../system";

export class MouseState implements System {
  public canvas: HTMLElement;
  public position: THREE.Vector2;
  public isDown: boolean;

  constructor(canvas: HTMLElement) {
    this.canvas = canvas;
    this.position = new THREE.Vector2();
    this.isDown = false;

    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));

    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
  }

  private mouseDown(): void {
    this.isDown = true;
  }

  private mouseUp(): void {
    this.isDown = false;
  }

  private mouseMove(event: MouseEvent): void {
    // canvas要素上のXY座標
    const rect = (<Element>event.target).getBoundingClientRect() ;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // canvas要素の幅・高さ
    const w = this.canvas.offsetWidth;
    const h = this.canvas.offsetHeight;
    // -1〜+1の範囲で現在のマウス座標を登録する
    this.position.x = (x / w) * 2 - 1;
    this.position.y = -(y / h) * 2 + 1;
  }

  public update():void {}
}