
var linhaTemp = [];
var maquinasTemp = [];

var buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", onButtonClick, false);
};

//botao criar linha producao
function onButtonClickLP(event) {
    if (contTapetes <= contTapetesTotal) {
        desenhaLinha();
    } else {
        alert("Não é possivel criar mais linhas de produção!");
    }
}

//botao eliminar linha producao
function onButtonClickApagarLP(event) {
    if (contTapetes > 0) {
        apagarLinha();
    } else {
        alert("Não existe nenhuma linha de produção!");
    }
}

//botao criar maquina
function onButtonClickM(event) {
    if (contTapetesPreenchidos <= contTapetesTotal && contTapetesPreenchidos < contTapetes && contTapetes != 0) {
        desenhaMaquinas();
    } else if (contTapetes == 0) {
        alert("Não existem linhas de produção criadas, logo não é possível acrescentar máquinas. Crie uma linha de produção primeiro!");
    } else {
        alert("Não é possivel criar mais máquinas!");
    }
}

//botao eliminar maquina
function onButtonClickApagarM(event) {
    if (contMaquinasTotal > 0) {
        apagarMaquina();
    } else {
        alert("Não existe nenhuma máquina!");
    }
}

//botao importar
function onButtonClickIMP(event) {
    //método da importação
    alert("Não é possível fazer import!");
}

//botao luminosidade
function onButtonClickLuminosidade(event) {
  if (luzAcesa.value % 2 != 0) acenderLuz(); else apagarLuz();
}

var scene;

scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width,height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);

//axis for help
// var axisHelper = new THREE.AxesHelper(50);
// scene.add(axisHelper);

var COMPRIMENTO_FABRICA = 80;
var LARGURA_FABRICA = 40;

var COMPRIMENTO_ARMAZENS = 20;

//chamar o draw

var draw = function () {

    //fabrica
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, 20, 0, 20, Math.PI / 2, Math.PI / 2, 0x999966); //right wall
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, -20, 0, 20, Math.PI / 2, Math.PI / 2, 0x663300); //left wall
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA / 2, 0, 0, -20, 0, 0, 0x993300); //back wall
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, 0, 20, 20, Math.PI / 2, 0, 0xffffff);//ceiling
    walls(LARGURA_FABRICA, COMPRIMENTO_FABRICA, 0, -20, 20, Math.PI / 2, 0);//floor

    //materias primas
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, LARGURA_FABRICA, -10, LARGURA_FABRICA, Math.PI / 2, Math.PI / 2, 0x999966);//right wall
    walls(COMPRIMENTO_ARMAZENS, 20, 30, -10, 20, 0, 0, 0x993300); //back wall
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, 30, 0, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //ceiling
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, 30, -20, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //floor

    //storage
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, -LARGURA_FABRICA, -10, LARGURA_FABRICA, Math.PI / 2, Math.PI / 2, 0x999966);//right wall
    walls(COMPRIMENTO_ARMAZENS, COMPRIMENTO_ARMAZENS, -30, -10, 20, 0, 0, 0x993300); //back wall
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, -30, 0, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //ceiling
    walls(COMPRIMENTO_ARMAZENS, LARGURA_FABRICA, -30, -20, LARGURA_FABRICA, Math.PI / 2, 0, 0xffffff); //floor

    //balcao
    desenharBalcoes();
}
const loader = new THREE.TextureLoader();

//funções de draw
var walls = function (size_c, size_l, x, y, z, rotx, rotz, color_w) {
    var plane_geometry = new THREE.PlaneGeometry(size_c, size_l);
    plane_geometry.rotateX(rotx);
    plane_geometry.rotateZ(rotz);
    plane_geometry.translate(x, y, z);


    loader.load('https://st2.depositphotos.com/5625700/10333/i/950/depositphotos_103334684-stock-photo-white-wall-granulated-texture-grunge.jpg', (texture) => {
        const material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
        const cube = new THREE.Mesh(plane_geometry, material);
        scene.add(cube);
    });

}

//Desenhar um balcao

var ALTURA_BALCAO = 6;
var LARGURA_BALCAO = 2;

var desenharBalcoes = function () {
    desenhaBalcao(COMPRIMENTO_FABRICA, ALTURA_BALCAO, LARGURA_BALCAO, 19, -17, LARGURA_FABRICA / 2, Math.PI / 2); //balcao da direita
    desenhaBalcao(COMPRIMENTO_FABRICA, ALTURA_BALCAO, LARGURA_BALCAO, -19, -17, LARGURA_FABRICA / 2, Math.PI / 2)
}

var desenhaBalcao = function (comprimento, largura, altura, x, y, z, rotX) {
    var geometry_balcao = new THREE.BoxGeometry(comprimento, largura, altura);
    var material = new THREE.MeshLambertMaterial({ color: 0x993300 });
    geometry_balcao.rotateY(Math.PI / 2);
    geometry_balcao.translate(x, y, z);
    var linha = new THREE.Mesh(geometry_balcao, material);
    scene.add(linha);
}

//Desenhar um tapete/linha - widget

var contTapetes = 0;
var contTapetesTotal = 8;

var COMPRIMENTO_TAPETE = 30;
var LARGURA_TAPETE = 3.785;

var desenhaLinha = function () {
    if (contTapetes % 2 == 0) { //nr linhas par
        desenhaLinhaF(COMPRIMENTO_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes, 0); //linha grande
        desenhaLinhaF(LARGURA_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes + 1, 15 - LARGURA_TAPETE / 2);//Linha pequena direita
    } else { //nr linhas impar
        desenhaLinhaF(COMPRIMENTO_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes, 0); //linha grande
        desenhaLinhaF(LARGURA_TAPETE, LARGURA_TAPETE, 1, 2 * contTapetes + 1, - 15 + LARGURA_TAPETE / 2);//Linha pequena esquerda
    }
    contTapetes++;
}

var desenhaLinhaF = function (comprimento, largura, altura, posicaoLinhaZ, posicaoLinhaX) {
    var geometry_linha = new THREE.BoxGeometry(comprimento, largura, altura);
    var material = new THREE.MeshLambertMaterial({ color: '#179ce7' });
    geometry_linha.rotateX(Math.PI / 2);
    var descZ = -20 + (8 + (posicaoLinhaZ * largura) + largura / 2);
    geometry_linha.translate(posicaoLinhaX, -17, descZ);
    var linha = new THREE.Mesh(geometry_linha, material);
    scene.add(linha);
    linhaTemp.push(linha);
}

//Apagar um tapete/linha - widget
var apagarLinha = function () {
    var linhaG = linhaTemp.pop();
    scene.remove(linhaG);
    var linhaP = linhaTemp.pop();
    scene.remove(linhaP);
    contTapetes--;
}


//Desenhar maquina - widget
var contTapetesPreenchidos = 0;
var contMaquinas = 0;
var contMaquinasTotal = 0;

var TAMANHO_MAQUINA = 3;
var SIDEWALLK = 5;
var MACHINE_SPACE = 5.25;

var desenhaMaquina = function (size_m, x, y, z) {
    var geometry_balcao = new THREE.BoxGeometry(size_m, size_m, size_m);
    var material = new THREE.MeshLambertMaterial({ color: '#e70861' });
    geometry_balcao.translate(x, y, z);
    var maquina = new THREE.Mesh(geometry_balcao, material);
    scene.add(maquina);
    maquinasTemp.push(maquina);
}

var desenhaMaquinas = function () {
    switch (contMaquinas) {
        case 0:
            desenhaMaquina(TAMANHO_MAQUINA, - LARGURA_FABRICA / 2 + (SIDEWALLK + MACHINE_SPACE + (contMaquinas * (TAMANHO_MAQUINA + MACHINE_SPACE))), -17, - LARGURA_FABRICA / 2 + (8 + (2 * contTapetesPreenchidos * LARGURA_TAPETE) - TAMANHO_MAQUINA / 2)); //primeiras maquinas
            contMaquinas++;
            contMaquinasTotal++;
            break;
        case 1:
            desenhaMaquina(TAMANHO_MAQUINA, - LARGURA_FABRICA / 2 + (SIDEWALLK + MACHINE_SPACE + (contMaquinas * (TAMANHO_MAQUINA + MACHINE_SPACE))), -17, - LARGURA_FABRICA / 2 + (8 + (2 * contTapetesPreenchidos * LARGURA_TAPETE) - TAMANHO_MAQUINA / 2)); //segundas maquinas
            contMaquinas++;
            contMaquinasTotal++;
            break;
        default:
            desenhaMaquina(TAMANHO_MAQUINA, - LARGURA_FABRICA / 2 + (SIDEWALLK + MACHINE_SPACE + (contMaquinas * (TAMANHO_MAQUINA + MACHINE_SPACE))), -17, - LARGURA_FABRICA / 2 + (8 + (2 * contTapetesPreenchidos * LARGURA_TAPETE) - TAMANHO_MAQUINA / 2));// terceiras maquinas
            contTapetesPreenchidos++;
            contMaquinas = 0;
            contMaquinasTotal++;
    }
}

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

let sphereSize = 3.5;
let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
let pointLightHelper1 = new THREE.PointLightHelper(pointLight1, sphereSize);
let pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
let pointLightHelper3 = new THREE.PointLightHelper(pointLight3, sphereSize);
let pointLightHelper4 = new THREE.PointLightHelper(pointLight4, sphereSize);
let pointLightHelper5 = new THREE.PointLightHelper(pointLight5, sphereSize);
let pointLightHelper6 = new THREE.PointLightHelper(pointLight6, sphereSize);

// pointLight secondary storages
let sphereSizeSecondary = 3;

let pointLightSecondary = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 1
pointLightSecondary.position.set(-30,0,40);

let pointLightSecondary1 = new THREE.PointLight(0xffffff, 1, 50); // Candeeiro 1
pointLightSecondary1.position.set(30,0,40);

let pointLightSecondaryHelper = new THREE.PointLightHelper(pointLightSecondary, sphereSizeSecondary);
let pointLightSecondaryHelper1 = new THREE.PointLightHelper(pointLightSecondary1, sphereSizeSecondary);

let luzAcesa = {value: 1} // se luzAcesa for par está acesa se for impar não está

let acenderLuz = () => {
  scene.add(pointLightHelper, pointLight);
  scene.add(pointLightHelper1, pointLight1);
  scene.add(pointLightHelper2, pointLight2);
  scene.add(pointLightHelper3, pointLight3);
  scene.add(pointLightHelper4, pointLight4);
  scene.add(pointLightHelper5, pointLight5);
  scene.add(pointLightHelper6, pointLight6);

  scene.add(pointLightSecondaryHelper, pointLightSecondary);
  scene.add(pointLightSecondaryHelper1, pointLightSecondary1);

  luzAcesa.value++;
}

let apagarLuz = () => {
  scene.remove(pointLightHelper, pointLight);
  scene.remove(pointLightHelper1, pointLight1);
  scene.remove(pointLightHelper2, pointLight2);
  scene.remove(pointLightHelper3, pointLight3);
  scene.remove(pointLightHelper4, pointLight4);
  scene.remove(pointLightHelper5, pointLight5);
  scene.remove(pointLightHelper6, pointLight6);

  scene.remove(pointLightSecondaryHelper, pointLightSecondary);
  scene.remove(pointLightSecondaryHelper1, pointLightSecondary1);

  luzAcesa.value++;
}
/* FIM DA LUZ */
//Apagar uma maquina - widget
var apagarMaquina = function () {
    var mqn = maquinasTemp.pop();
    scene.remove(mqn);
    contMaquinasTotal--;
    if(contMaquinas == 0){
        contMaquinas = 2;
        contTapetesPreenchidos--;
    }else{
        contMaquinas--;
    }
}



var set_camera_init = function () {
    camera.position.z = 100;
    camera.position.y = 20;
}

var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

var main = function () {
    draw();
    set_camera_init();
    animate();
}

main();
