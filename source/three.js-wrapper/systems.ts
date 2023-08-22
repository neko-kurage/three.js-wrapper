import { Scene } from "./systems/before/scene";
import { MouseState } from "./systems/before/mouseState";
import { CollisionDetector } from "./systems/after/collisionDetector";
import { Camera } from "./systems/after/camera";
import { Renderer } from "./systems/after/renderer";

export class Systems {
  public scene: Scene;
  public mouseState: MouseState;
  public collisionDetector: CollisionDetector;
  public camera: Camera;
  public renderer: Renderer;

  public beforeEntities: {
    scene:  Scene,
    mouseState: MouseState,
  };

  public afterEntities: {
    camera: Camera,
    collisionDetector: CollisionDetector,
    renderer: Renderer,
  };

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene();
    this.mouseState = new MouseState(canvas);
    this.camera = new Camera(canvas);
    this.collisionDetector = new CollisionDetector(this.mouseState, this.camera);
    this.renderer = new Renderer(canvas, this.scene, this.camera);

    this.beforeEntities = {
      scene: this.scene,
      mouseState: this.mouseState,
    };

    this.afterEntities = {
      camera: this.camera,
      collisionDetector: this.collisionDetector,
      renderer: this.renderer,
    };
  }
}