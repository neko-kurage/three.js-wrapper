import * as THREE from "three";

import { World } from "./three.js-wrapper/world";
import { Entity } from "./three.js-wrapper/entity";
import { Mesh } from "./three.js-wrapper/components/mesh";
import { Collision } from "./three.js-wrapper/components/collision";
import { Transform } from "./three.js-wrapper/components/transform";
import { EventListener } from "./three.js-wrapper/utils/eventListener/eventListener";

let entity: Entity;
let world: World;
let collision: Collision;

window.addEventListener("DOMContentLoaded", setup);

function setup(): void {
  console.log("Hi, this template file is loaded!!");

  world = new World("#myCanvas");
  world.systems.renderer.setAdjustSizeElement(<HTMLElement>document.querySelector("#canvas_size"));

  const mesh = new Mesh(new THREE.SphereGeometry(40, 40, 40), new THREE.MeshNormalMaterial());
  const mesh2 = new Mesh(new THREE.SphereGeometry(60, 40, 40), new THREE.MeshNormalMaterial());
  entity = new Entity();
  entity.addComponent(
    mesh
  );

  entity.addComponent(
    new Transform(50, 0, 0)
  );
  
  collision = new Collision(new THREE.SphereGeometry(50, 16, 16), true);
  collision.localPosition = new THREE.Vector3(60, 0, 0);
  collision.event.add("onMouseOver", () => {
    //entity.overwriteComponent(mesh2);
    console.log("hantei");
  });

  entity.addComponent(collision);

  world.addEntity(entity);

  const eventListener = new EventListener<string>();

  const testFunction = (msg:string): void => {
    console.log(msg);
  };

  eventListener.add("test", testFunction, testFunction);

  eventListener.dispatch("test", "pika");

  renderLoop();
}

const transformA = new Transform(20, 0, 0);
const transformB = new Transform(-50, 0, 0);
let bool: boolean = false;

function renderLoop(): void {
  world.update();

  if (bool) {
    entity.overwriteComponent(transformA);
  } else {
    entity.overwriteComponent(transformB);
  }

  requestAnimationFrame(renderLoop);
}
