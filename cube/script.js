// ________________________________________________________________________________
// Cube


import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// Helpers
function Sizes() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    aspect: width / height,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    frustrum: 4.5
  };
}

// Scene Setup
let renderer,
  scene,
  perspectiveCamera,
  orthographicCamera,
  canvas,
  orbitControls;

// Cubes
let dummy = new THREE.Object3D(),
  rows = [],
  amount = 0,
  rubiksCube = new THREE.Group(),
  rubiksCubeTopRow,
  rubiksCubeMiddleRow,
  rubiksCubeBottomRow,
  cubeMaterial;

function setUpScene() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  const sizes = Sizes();
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.CineonToneMapping;
  renderer.toneMappingExposure = 1.75;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setPixelRatio(sizes.pixelRatio);
  renderer.setSize(sizes.width, sizes.height);
  canvas = renderer.domElement;
  document.body.appendChild(canvas);

  scene = new THREE.Scene();
}
function setUpOrbitControls() {
  orbitControls = new OrbitControls(perspectiveCamera, canvas);
  orbitControls.enableDamping = false;
  orbitControls.enableZoom = false;
  orbitControls.enablePan = false;
  orbitControls.maxPolarAngle = Math.PI * 2;
  orbitControls.target.set(0, 0, 0);

  // var controls = new ObjectControls(perspectiveCamera, canvas, rubiksCube);
}
function addLights() {
  RectAreaLightUniformsLib.init();

  const rightLight = new THREE.RectAreaLight("0xfff", 5, 4, 3);
  rightLight.position.set(-5, 5, 0);
  rightLight.lookAt(rubiksCube.position);
  scene.add(rightLight);

  const centerLight = new THREE.RectAreaLight("0xfff", 5, 4, 3);
  centerLight.position.set(0, 0, 5.21);
  centerLight.lookAt(rubiksCube.position);
  scene.add(centerLight);

  const rectLight3 = new THREE.RectAreaLight("0xfff", 5, 1.84, 8);
  rectLight3.position.set(-2, 4, 0);
  rectLight3.lookAt(rubiksCube.position);
  scene.add(rectLight3);
  // -2,4

  const frontLight = new THREE.RectAreaLight("0xfff", 5, 1.84, 8.89);
  frontLight.position.set(-4, 0, -3);
  frontLight.lookAt(rubiksCube.position);
  scene.add(frontLight);

  // const sunLight = new THREE.DirectionalLight(
  //     "#eee",
  //     1
  // );
  // sunLight.castShadow = true;
  // sunLight.shadow.camera.far = 20;
  // sunLight.shadow.mapSize.set(1024, 1024);
  // sunLight.shadow.normalBias = 0.05;

  // sunLight.position.set(
  //     1,
  //     5,
  //     0,
  // );
  // scene.add(sunLight);

  // Helpers
  // scene.add(new RectAreaLightHelper(rightLight));
  // scene.add(new RectAreaLightHelper(centerLight));
  // scene.add(new RectAreaLightHelper(rectLight3));
  // scene.add(new RectAreaLightHelper(frontLight));
  // scene.add(new THREE.DirectionalLightHelper(sunLight, 5));
}
function addObjects() {
  const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
  const matKnot = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0
  });
  const meshKnot = new THREE.Mesh(geoKnot, matKnot);
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);
}
function setUpCameras() {
  const sizes = Sizes();

  perspectiveCamera = new THREE.PerspectiveCamera(45, sizes.aspect, 1, 1000);
  perspectiveCamera.position.set(0, 1, -10);

  scene.add(perspectiveCamera);
}
function renderScene(time) {
  rubiksCube.rotation.y += 0.005 / 2;
  rubiksCube.rotation.x += 0.005;
  rubiksCube.rotation.z += 0.005 / 2;

  renderer.render(scene, perspectiveCamera);
}
function launchAnimationLoop() {
  renderer.setAnimationLoop(renderScene);
}
function animateRow() {
  anime({
    targets: rubiksCube.children[0].rotation,
    z: Math.PI / 2,
    easing: "easeInOutSine",
    delay: 6000,
    duration: 5000,
    direction: "alternate",
    loop: true,
    loopComplete: function (anim) {
      console.log("sa");
    }
  });
  setTimeout(() => {
    anime({
      targets: rubiksCube.children[2].rotation,
      z: -Math.PI,
      easing: "easeInOutSine",
      delay: 6000,
      duration: 5000,
      direction: "alternate",
      loop: true
    });
  }, 1000);
  anime({
    targets: rubiksCube.children[1].rotation,
    z: -Math.PI / 2,
    easing: "linear",
    delay: 10000,
    duration: 6000,
    direction: "alternate",
    loop: true
  });
}
// Cubes
function addCubesToScene() {
  // this.scene.add(this.model);
  rows.forEach((row, idx) => {
    if (idx === 0) rubiksCubeTopRow = row;
    rubiksCube.add(row);
    scene.add(rubiksCube);
  });
  // rubiksCube.position.x = -4;
}
function generateCubeInstances() {
  const cubeGeometry = new RoundedBoxGeometry(1, 1, 1);
  // const cubeMat = new THREE.MeshPhongMaterial({
  //     color: "0x000",
  //     emissive: "0x000",
  //     specular: "0xfff",
  //     shininess: 100,
  // });
  const cubeMat = new THREE.MeshPhysicalMaterial({
    color: "0x000",
    emissive: "0x000",
    specularColor: "0xfff",
    roughness: 0,
    metalness: 1,
    iridescence: 1
  });
  // const cubeMat = new THREE.MeshStandardMaterial({ color: 0x000, roughness: 0, metalness: 1 });

  for (let index = 0; index < 3; index++) {
    const cubeInstance = new THREE.InstancedMesh(cubeGeometry, cubeMat, 9);
    cubeInstance.receiveShadow = true;
    cubeInstance.castShadow = true;
    rows.push(cubeInstance);
  }
}
function arrangeCubes() {
  const offset = (3 - 1) / 2;

  rows.forEach((row, rowIdx) => {
    for (let colIdx = 0; colIdx < 9; colIdx++) {
      const x = (colIdx % 3) * 1.1 - offset;
      const y = Math.floor(colIdx / 3) * 1.1 - offset;
      const z = rowIdx * 1.1;

      dummy.position.set(x, y, z - 1);
      dummy.updateMatrix();
      row.setMatrixAt(colIdx, dummy.matrix);
    }

    row.instanceMatrix.needsUpdate = true;
    row.computeBoundingSphere();
  });

  rubiksCubeTopRow = rubiksCube.children[0];

  // this.rubiksCube.rotateOnAxis(new Vector3(0, 0, 0), 30);
}

setUpScene();
setUpCameras();
// addObjects();
// Add the cubes
generateCubeInstances();
arrangeCubes();
addCubesToScene();
setUpOrbitControls();
addLights();
launchAnimationLoop();
animateRow();


