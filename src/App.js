import { useEffect } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GUI } from "dat.gui";
import Scene from "./lib/Scene";

function App() {
  useEffect(() => {
    const test = new Scene("myThreeJsCanvas");
    test.initialize();
    test.animate();
    const fbxLoader = new FBXLoader();
    fbxLoader.load("./FBX.fbx", (object) => {
      test.scene.add(object);
    });
    const gui = new GUI();
    const al = new THREE.AmbientLight(0x111, 0.5);
    test.scene.add(al);
    const alFolder = gui.addFolder("ambient light");
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, "visible");
    alFolder.add(al, "intensity", 0, 1, 0.1);
    alFolder
      .addColor(alSettings, "color")
      .onChange((value) => al.color.set(value));
    alFolder.open();
    return () => {
      gui.destroy();
    };
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
