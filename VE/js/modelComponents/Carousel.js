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
