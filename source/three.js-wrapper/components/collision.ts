import * as THREE from "three";

import { Component } from "./component";
import { Mesh } from "./mesh";
import { EventListener } from "../utils/eventListener/eventListener";

export class Collision extends Component {
  public geometry: THREE.BufferGeometry;
  public material: THREE.MeshBasicMaterial;
  public mesh: THREE.Mesh;
  private visibility: boolean;

  private onMouseState: "off" | "over"| "enter" | "exit";
  public event: EventListener;

  public globalPosition: THREE.Vector3;
  public localPosition: THREE.Vector3;

  constructor(object: Mesh | THREE.BufferGeometry, visibility: boolean = false) {
    super("collision");
    this.geometry = object instanceof Mesh ? object.geometry : object;

    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.visibility = visibility;

    this.onMouseState = "off";
    this.event = new EventListener();
    this.initEventListener();

    this.globalPosition = new THREE.Vector3();
    this.localPosition = new THREE.Vector3();
  }

  public setGlobalPosition(x: number | THREE.Vector3, y: number = 0, z: number = 0): void {
    if (x instanceof THREE.Vector3) {
      this.globalPosition.copy(x);
    } else {
      this.globalPosition.set(x, y, z);
    }

    this.reflectMeshPosition();
  }

  public setLocalPosition(x: number | THREE.Vector3, y: number = 0, z: number = 0): void {
    if (x instanceof THREE.Vector3) {
      this.localPosition.copy(x);
    } else {
      this.localPosition.set(x, y, z);
    }

    this.reflectMeshPosition();
  }

  public reflectMeshPosition(): void {
    const position = new THREE.Vector3();
    position.addVectors(this.globalPosition, this.localPosition);

    this.mesh.position.set(position.x, position.y, position.z);
  }

  protected override notifySystems(): void {
    if (this.systems == null) throw new Error("systems is null");
    if (this.visibility) this.systems.scene.add(this.mesh);
    this.systems.collisionDetector.addCollision(this);
  }

  public setVisibility(isVisible: boolean): void {
    if (this.systems !== null && this.visibility != isVisible) {
      if (isVisible) {
        this.systems.scene.add(this.mesh);
      } else {
        this.systems.scene.remove(this.mesh);
      }
    }

    this.visibility = isVisible;
  }

  private initEventListener(): void {
    this.event.add("onMouseOff", (): void => {
      if (this.onMouseState == "exit") {
        this.onMouseState = "off";
      }
      if (this.onMouseState == "over" || this.onMouseState == "enter") {
        this.onMouseState = "exit";
        this.event.dispatch("onMouseExit");
      }
    });
    this.event.add("onMouseOver", (): void => {
      if (this.onMouseState == "enter") {
        this.onMouseState = "over";
      }
      if (this.onMouseState == "off" || this.onMouseState == "exit") { 
        this.onMouseState = "enter";
        this.event.dispatch("onMouseEnter");
      }
    });
    this.event.add("onMouseEnter");
    this.event.add("onMouseExit");
  }
}
