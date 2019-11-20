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
