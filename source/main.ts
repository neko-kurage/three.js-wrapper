import * as THREE from "three";

import { World } from "./three.js-wrapper/world";
import { Entity } from "./three.js-wrapper/entity";
import { Mesh } from "./three.js-wrapper/components/mesh";
import { Collision } from "./three.js-wrapper/components/collision";
import { Transform } from "./three.js-wrapper/components/transform";
import { EventListener } from "./three.js-wrapper/utils/eventListener/eventListener";
import { Camera } from "./three.js-wrapper/components/camera";

let entity: Entity;
let world: World;
let collision: Collision;
let cameraEntity1: Entity;
let cameraEntity2: Entity;
let cameraEntity3: Entity;
let cameraComponent1 : Camera;
let cameraComponent2 : Camera;
let cameraComponent3 : Camera;

window.addEventListener("DOMContentLoaded", setup);

window.addEventListener("keydown", (event) => {
  if (event.key == "1") {
    cameraComponent1.activate();
  }
  if (event.key == "2") {
    cameraComponent2.activate();
  }
  if (event.key == "3") {
    cameraComponent3.activate();
  }
});

function setup(): void {
  console.log("Hi, this template file is loaded!!");

  world = new World("#myCanvas");
  world.systems.renderer.setAdjustSizeElement(<HTMLElement>document.querySelector("#canvas_size"));

  const mesh = new Mesh(new THREE.SphereGeometry(40, 40, 40), new THREE.MeshNormalMaterial());
  const mesh2 = new Mesh(new THREE.SphereGeometry(45, 40, 40), new THREE.MeshNormalMaterial());
  entity = new Entity();
  entity.addComponent(
    mesh
  );
  
  collision = new Collision(new THREE.SphereGeometry(50, 16, 16), true);
  collision.localPosition = new THREE.Vector3(0, 0, 0);
  collision.event.add("onMouseEnter", () => {
    entity.overwriteComponent(mesh2);
    console.log("enter");
  });
  collision.event.add("onMouseExit", () => {
    entity.overwriteComponent(mesh);
    console.log("exit");
  });
  collision.event.add("onMouseOver", () => {
    console.log("over");
  });
  collision.event.add("onMouseOff", () => {
    console.log("off");
  });

  entity.addComponent(collision);

  entity.addComponent(
    new Transform(50, 0, 0)
  );

  const entity2 = new Entity();
  entity2.addComponent(new Collision(new THREE.BoxGeometry(150, 10, 10), true));
  world.addEntity(entity2);

  world.addEntity(entity);

  const eventListener = new EventListener<string>();

  const testFunction = (msg:string): void => {
    console.log(msg);
  };

  cameraEntity1 = new Entity();
  cameraComponent1 = new Camera(new THREE.PerspectiveCamera());
  cameraComponent1.camera.position.x = 50;
  cameraComponent1.camera.position.z = 200;
  cameraEntity1.addComponent(cameraComponent1);

  cameraEntity2 = new Entity();
  cameraComponent2 = new Camera(new THREE.PerspectiveCamera());
  cameraComponent2.camera.position.x = -50;
  cameraComponent2.camera.position.z = 200;
  cameraEntity2.addComponent(cameraComponent2);

  cameraEntity3 = new Entity();
  cameraComponent3 = new Camera(new THREE.PerspectiveCamera());
  cameraComponent3.camera.position.x = -50;
  cameraComponent3.camera.position.z = 500;
  cameraEntity3.addComponent(cameraComponent3);

  world.addEntity(cameraEntity1);
  world.addEntity(cameraEntity2);
  world.addEntity(cameraEntity3);

  eventListener.add("test", testFunction, testFunction);

  eventListener.dispatch("test", "pika");

  renderLoop();
}

const transformA = new Transform(0, 0, 0);
const transformB = new Transform(0, 0, 0);
let bool: boolean = false;

function renderLoop(): void {
  world.update();

  if (bool) {
    //entity.overwriteComponent(transformA);
  } else {
    //entity.overwriteComponent(transformB);
  }

  requestAnimationFrame(renderLoop);
}
