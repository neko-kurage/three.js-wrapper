/* imports */
/*
使用していないライブラリがあるとESlintに怒られるのでコメントアウトしてあります。
使用する際は外してください。
*/

//three.js
/*
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
*/

//anime.js
/*
import anime from "animejs/lib/anime.es.js";
*/

import { World } from "./world";

let world: World;

window.addEventListener("DOMContentLoaded", setup);

function setup(): void {
  console.log("Hi, this template file is loaded!!");

  world = new World("#myCanvas");
  world.systems.renderer.setAdjustSizeElement(
    <HTMLElement>document.querySelector("#canvas_size")
  );

  renderLoop();
}

function renderLoop(): void {
  world.update();

  console.log(world.systems.mouseState.position);
  requestAnimationFrame(renderLoop);
}