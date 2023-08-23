import * as THREE from "three";

import { World } from "./three.js-wrapper/world";
import { Entity } from "./three.js-wrapper/entity";
import { Mesh } from "./three.js-wrapper/components/mesh";

let entity: Entity;
let world: World;

window.addEventListener("DOMContentLoaded", setup);

function setup(): void {
  console.log("Hi, this template file is loaded!!");

  world = new World("#myCanvas");
  world.systems.renderer.setAdjustSizeElement(<HTMLElement>document.querySelector("#canvas_size"));

  entity = new Entity();
  const mesh = new Mesh(new THREE.SphereGeometry(30, 6, 6), new THREE.MeshNormalMaterial());
  entity.addComponent(mesh);

  world.addEntity(entity);

  renderLoop();
}

function renderLoop(): void {
  world.update();

  requestAnimationFrame(renderLoop);
}
