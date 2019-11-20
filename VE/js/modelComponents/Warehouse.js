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
scene.background = new THREE.Color( '#cdd1d0' );
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

var set_camera_init = function () {
    camera.position.z = 100;
    camera.position.y = 20;
}

var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

/* MAIN WALLS AND DRAW */

// axis for help
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
};
const loader = new THREE.TextureLoader();
loader.anisotropy = renderer.capabilities.getMaxAnisotropy();

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

/* END OF MAIN WALLS */

var main = function () {
    draw();
    set_camera_init();
    animate();
}

main();
