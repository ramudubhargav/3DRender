import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

export default class Test {
  constructor(canvasId) {
    this.camera = undefined;
    this.scene = undefined;
    this.renderer = undefined;
    this.stats = undefined;
    this.light = undefined;
    this.dirLight = undefined;
    this.mesh = undefined;
    this.mixer = undefined;
    this.renderer = undefined;
    this.canvasId = canvasId;
    this.clock = undefined;
    this.controls = undefined;
    this.stats = undefined;
  }
  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.camera.position.set(0, 20, 80);
    this.scene.background = new THREE.Color(0xa0a0a0);
    //this.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
    this.light = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.light.position.set(0, 1, 0);
    this.scene.add(this.light);

    const grid = new THREE.GridHelper(200, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    this.scene.add(grid);
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
    this.scene.rotateY(0.004);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
