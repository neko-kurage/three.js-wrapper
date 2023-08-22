/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/main.ts":
/*!************************!*\
  !*** ./source/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world */ \"./source/world.ts\");\n/* imports */\n/*\n使用していないライブラリがあるとESlintに怒られるのでコメントアウトしてあります。\n使用する際は外してください。\n*/\n//three.js\n/*\nimport * as THREE from \"three\";\nimport { OrbitControls } from \"three/examples/jsm/controls/OrbitControls\";\nimport { TransformControls } from 'three/examples/jsm/controls/TransformControls';\n*/\n//anime.js\n/*\nimport anime from \"animejs/lib/anime.es.js\";\n*/\n\nlet world;\nwindow.addEventListener(\"DOMContentLoaded\", setup);\nfunction setup() {\n    console.log(\"Hi, this template file is loaded!!\");\n    world = new _world__WEBPACK_IMPORTED_MODULE_0__.World(\"#myCanvas\");\n    world.systems.renderer.setAdjustSizeElement(document.querySelector(\"#canvas_size\"));\n    renderLoop();\n}\nfunction renderLoop() {\n    world.update();\n    console.log(world.systems.mouseState.position);\n    requestAnimationFrame(renderLoop);\n}\n\n\n//# sourceURL=webpack:///./source/main.ts?");

/***/ }),

/***/ "./source/systems.ts":
/*!***************************!*\
  !*** ./source/systems.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Systems: () => (/* binding */ Systems)\n/* harmony export */ });\n/* harmony import */ var _systems_before_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./systems/before/scene */ \"./source/systems/before/scene.ts\");\n/* harmony import */ var _systems_before_mouseState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./systems/before/mouseState */ \"./source/systems/before/mouseState.ts\");\n/* harmony import */ var _systems_after_collisionDetector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systems/after/collisionDetector */ \"./source/systems/after/collisionDetector.ts\");\n/* harmony import */ var _systems_after_camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/after/camera */ \"./source/systems/after/camera.ts\");\n/* harmony import */ var _systems_after_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./systems/after/renderer */ \"./source/systems/after/renderer.ts\");\n\n\n\n\n\nclass Systems {\n    scene;\n    mouseState;\n    collisionDetector;\n    camera;\n    renderer;\n    beforeEntities;\n    afterEntities;\n    constructor(canvas) {\n        this.scene = new _systems_before_scene__WEBPACK_IMPORTED_MODULE_0__.Scene();\n        this.mouseState = new _systems_before_mouseState__WEBPACK_IMPORTED_MODULE_1__.MouseState(canvas);\n        this.camera = new _systems_after_camera__WEBPACK_IMPORTED_MODULE_3__.Camera(canvas);\n        this.collisionDetector = new _systems_after_collisionDetector__WEBPACK_IMPORTED_MODULE_2__.CollisionDetector(this.mouseState, this.camera);\n        this.renderer = new _systems_after_renderer__WEBPACK_IMPORTED_MODULE_4__.Renderer(canvas, this.scene, this.camera);\n        this.beforeEntities = {\n            scene: this.scene,\n            mouseState: this.mouseState,\n        };\n        this.afterEntities = {\n            camera: this.camera,\n            collisionDetector: this.collisionDetector,\n            renderer: this.renderer,\n        };\n    }\n}\n\n\n//# sourceURL=webpack:///./source/systems.ts?");

/***/ }),

/***/ "./source/systems/after/camera.ts":
/*!****************************************!*\
  !*** ./source/systems/after/camera.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Camera: () => (/* binding */ Camera)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass Camera {\n    mainCamera;\n    constructor(canvas) {\n        const width = canvas.clientWidth;\n        const height = canvas.clientHeight;\n        this.mainCamera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(90, width / height);\n    }\n    aspect(width, height) {\n        this.mainCamera.aspect = width / height;\n        this.mainCamera.updateProjectionMatrix();\n    }\n    update() { }\n}\n\n\n//# sourceURL=webpack:///./source/systems/after/camera.ts?");

/***/ }),

/***/ "./source/systems/after/collisionDetector.ts":
/*!***************************************************!*\
  !*** ./source/systems/after/collisionDetector.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CollisionDetector: () => (/* binding */ CollisionDetector)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass CollisionDetector {\n    collisions;\n    raycaster;\n    mouseState;\n    camera;\n    constructor(mouseState, camera) {\n        this.collisions = [];\n        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster();\n        this.mouseState = mouseState;\n        this.camera = camera;\n    }\n    addCollision(collision) {\n        this.collisions.push(collision);\n    }\n    update() {\n        this.updateRaycaster();\n        /*\n        for (const collision of this.collisions) {\n          \n        }\n        */\n    }\n    updateRaycaster() {\n        this.raycaster.setFromCamera(this.mouseState.position, this.camera.mainCamera);\n    }\n}\n\n\n//# sourceURL=webpack:///./source/systems/after/collisionDetector.ts?");

/***/ }),

/***/ "./source/systems/after/renderer.ts":
/*!******************************************!*\
  !*** ./source/systems/after/renderer.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Renderer: () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass Renderer {\n    canvas;\n    adjustSizeElement;\n    width;\n    height;\n    renderer;\n    scene;\n    camera;\n    constructor(canvas, scene, camera, adjustSizeElement = document.body) {\n        this.canvas = canvas;\n        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({\n            canvas: this.canvas,\n        });\n        this.scene = scene;\n        this.camera = camera;\n        this.adjustSizeElement = adjustSizeElement;\n        this.width = adjustSizeElement.clientWidth;\n        this.height = adjustSizeElement.clientHeight;\n        this.resize();\n        window.addEventListener(\"resize\", this.resize.bind(this));\n    }\n    update() {\n        this.renderer.render(this.scene, this.camera.mainCamera);\n    }\n    setAdjustSizeElement(adjustSizeElement) {\n        this.adjustSizeElement = adjustSizeElement;\n        this.resize();\n    }\n    resize() {\n        this.width = this.adjustSizeElement.clientWidth;\n        this.height = this.adjustSizeElement.clientHeight;\n        this.renderer.setPixelRatio(window.devicePixelRatio);\n        this.renderer.setSize(this.width, this.height);\n        this.camera.aspect(this.width, this.height);\n    }\n}\n\n\n//# sourceURL=webpack:///./source/systems/after/renderer.ts?");

/***/ }),

/***/ "./source/systems/before/mouseState.ts":
/*!*********************************************!*\
  !*** ./source/systems/before/mouseState.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MouseState: () => (/* binding */ MouseState)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass MouseState {\n    canvas;\n    position;\n    isDown;\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();\n        this.isDown = false;\n        window.addEventListener(\"mousedown\", this.mouseDown.bind(this));\n        window.addEventListener(\"mouseup\", this.mouseUp.bind(this));\n        this.canvas.addEventListener(\"mousemove\", this.mouseMove.bind(this));\n    }\n    mouseDown() {\n        this.isDown = true;\n    }\n    mouseUp() {\n        this.isDown = false;\n    }\n    mouseMove(event) {\n        // canvas要素上のXY座標\n        const rect = event.target.getBoundingClientRect();\n        const x = event.clientX - rect.left;\n        const y = event.clientY - rect.top;\n        // canvas要素の幅・高さ\n        const w = this.canvas.offsetWidth;\n        const h = this.canvas.offsetHeight;\n        // -1〜+1の範囲で現在のマウス座標を登録する\n        this.position.x = (x / w) * 2 - 1;\n        this.position.y = -(y / h) * 2 + 1;\n    }\n    update() { }\n}\n\n\n//# sourceURL=webpack:///./source/systems/before/mouseState.ts?");

/***/ }),

/***/ "./source/systems/before/scene.ts":
/*!****************************************!*\
  !*** ./source/systems/before/scene.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Scene: () => (/* binding */ Scene)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass Scene extends three__WEBPACK_IMPORTED_MODULE_0__.Scene {\n    update() { }\n}\n\n\n//# sourceURL=webpack:///./source/systems/before/scene.ts?");

/***/ }),

/***/ "./source/utils/canvas/loadCanvas.ts":
/*!*******************************************!*\
  !*** ./source/utils/canvas/loadCanvas.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadCanvas: () => (/* binding */ loadCanvas)\n/* harmony export */ });\nfunction loadCanvas(canvas) {\n    let canvasElement = null;\n    if (typeof canvas == \"string\") {\n        canvasElement = document.querySelector(canvas);\n    }\n    else if (canvas instanceof HTMLCanvasElement) {\n        canvasElement = canvas;\n    }\n    if (!canvasElement) {\n        throw new Error(\"canvasを取得できませんでした。\");\n    }\n    return canvasElement;\n}\n\n\n//# sourceURL=webpack:///./source/utils/canvas/loadCanvas.ts?");

/***/ }),

/***/ "./source/world.ts":
/*!*************************!*\
  !*** ./source/world.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   World: () => (/* binding */ World)\n/* harmony export */ });\n/* harmony import */ var _systems__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./systems */ \"./source/systems.ts\");\n/* harmony import */ var _utils_canvas_loadCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/canvas/loadCanvas */ \"./source/utils/canvas/loadCanvas.ts\");\n\n\nclass World {\n    canvas;\n    systems;\n    entities;\n    constructor(canvas) {\n        this.canvas = (0,_utils_canvas_loadCanvas__WEBPACK_IMPORTED_MODULE_1__.loadCanvas)(canvas);\n        this.systems = new _systems__WEBPACK_IMPORTED_MODULE_0__.Systems(this.canvas);\n        this.entities = [];\n    }\n    addEntity(entity) {\n        entity.setRootSystems(this.systems);\n        this.entities.push(entity);\n    }\n    update() {\n        for (const [key, system] of Object.entries(this.systems.beforeEntities)) {\n            system.update();\n            console.log(key, system);\n        }\n        for (const entity of this.entities) {\n            entity.update();\n        }\n        for (const [key, system] of Object.entries(this.systems.afterEntities)) {\n            system.update();\n            console.log(key, system);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./source/world.ts?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./source/main.ts");
/******/ 	
/******/ })()
;