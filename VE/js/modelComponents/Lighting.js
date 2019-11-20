// Models and loaders

let lampLoader = new THREE.GLTFLoader(); // Loader for Lamps

let lampSource = 'importedModels/factoryLights/scene.gltf'; // resource url
let onLoad = (gltf, position) => {  const model = gltf.scene.children[ 0 ];  model.position.copy( position );  model.scale.set(0.2,0.15,0.2);  model.rotation.x = Math.PI / 2;  model.rotation.z = Math.PI / 2;  scene.add(model);}; // called to load resource
let loadingBuffer = (timer) => { console.log((timer.loaded / timer.total * 100) + '% loaded') } // called while loading
let loaderError = (error) => { console.log('Error happened') } // When error is found

/* MAIN ROOM */

// Main room lamp positions
let lamp1Position = new THREE.Vector3(0,19,10);
let lamp2Position = new THREE.Vector3(0,19,20);
let lamp3Position = new THREE.Vector3(0,19,30);
let lamp4Position = new THREE.Vector3(0,19,40);
let lamp5Position = new THREE.Vector3(0,19,50);
let lamp6Position = new THREE.Vector3(0,19,-10);
let lamp7Position = new THREE.Vector3(0,19,0);

// Main room lamps
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp1Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp2Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp3Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp4Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp5Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp6Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoad(gltf, lamp7Position), loadingBuffer, loaderError);

/* Storage Room */

let onLoadSecondaryLamps = (gltf, position) => {  const model = gltf.scene.children[ 0 ];  model.position.copy( position );  model.scale.set(0.2,0.15,0.2);  model.rotation.x = Math.PI / 2;  scene.add(model);};

// Storage room lamp positions
let lamp8Position = new THREE.Vector3(-30,-1,40);
let lamp9Position = new THREE.Vector3(30,-1,40);

// Storage room lamps
lampLoader.load(lampSource, gltf => onLoadSecondaryLamps(gltf, lamp8Position), loadingBuffer, loaderError);
lampLoader.load(lampSource, gltf => onLoadSecondaryLamps(gltf, lamp9Position), loadingBuffer, loaderError);

/* LUZ e todas as funções necessárias */

// pointLight main storage
let pointLight = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 1
pointLight.position.set(0,20,0);
let pointLight1 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 2
pointLight1.position.set(0,20,10);
let pointLight2 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 3
pointLight2.position.set(0,20,20);
let pointLight3 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 4
pointLight3.position.set(0,20,30);
let pointLight4 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 5
pointLight4.position.set(0,20,40);
let pointLight5 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 6
pointLight5.position.set(0,20,50);
let pointLight6 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 7
pointLight6.position.set(0,20,-10);

// pointLight secondary storages
let pointLightSecondary = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 1
pointLightSecondary.position.set(-30,0,40);

let pointLightSecondary1 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 1
pointLightSecondary1.position.set(30,0,40);

let luzAcesa = {value: 1} // se luzAcesa for par está acesa se for impar não está

let acenderLuz = () => {
  scene.add(pointLight);
  scene.add(pointLight1);
  scene.add(pointLight2);
  scene.add(pointLight3);
  scene.add(pointLight4);
  scene.add(pointLight5);
  scene.add(pointLight6);

  scene.add(pointLightSecondary);
  scene.add(pointLightSecondary1);

  luzAcesa.value++;
}

let apagarLuz = () => {
  scene.remove(pointLight);
  scene.remove(pointLight1);
  scene.remove(pointLight2);
  scene.remove(pointLight3);
  scene.remove(pointLight4);
  scene.remove(pointLight5);
  scene.remove(pointLight6);

  scene.remove(pointLightSecondary);
  scene.remove(pointLightSecondary1);

  luzAcesa.value++;
}
/* FIM DA LUZ */
