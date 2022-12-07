var tela = document.querySelector("canvas");
var pincel = tela.getContext('2d');
var palma= new Audio('Palma.mp3');
var bonk= new Audio('Ping.mp3');
const myInterval = setInterval(move, 30);


var bolinha = {
    x: 300,
    y: 200,
    tamanho: 10,
    dir: 8,
    diry: 2,
}

var j1 = {
    x: 10,
    y: 200,
    pontos: 0
}
var j2 = {
    x: 580,
    y: 200,
    pontos: 0

}

function desenhar() {
    pincel.clearRect(0, 0, 600, 400);
    pincel.fillStyle = 'white';
    pincel.beginPath();
    pincel.arc(bolinha.x, bolinha.y, bolinha.tamanho, 0, 2 * 3.14);
    pincel.fill();
    pincel.fillStyle = 'red';
    pincel.fillRect(580, j2.y, 10, 50);
    pincel.fillStyle = 'blue';
    pincel.fillRect(10, j1.y, 10, 50);
    pontos()
    console.log((j1.y))
}

function colisao() {
    if (bolinha.x > 590 || bolinha.x < 10) { //BASE
        bolinha.dir *= -1
    }
    if (bolinha.x + 10 > j2.x && bolinha.y + 10 > j2.y && bolinha.y + 10 < j2.y + 50) { // PLAYER 2
        bolinha.dir *= -1
        bonk.play();
    }
    if (bolinha.x == j1.x + 10 && bolinha.y + 10 > j1.y && bolinha.y < j1.y + 50) { // PLAYER 1  
        bolinha.dir *= -1
        bonk.play();
    }
    if (bolinha.y > 390 || bolinha.y < 10) { //CHAO TETO
        bolinha.diry *= -1
    
    }
}

function colisaoparede() {
    if (bolinha.x > 590) { // colider 1
        j1.pontos += 1
        bolinha.x = 300
        bolinha.y = 200
     
    }
    if (bolinha.x < 10) { // colider 2
        j2.pontos += 1
        bolinha.x = 300
        bolinha.y = 200
        
    }
}

function pontos() {
    pincel.fillStyle = 'blue';
    pincel.font = '60px Arial';
    pincel.fillText(j1.pontos, 100, 80);
    pincel.fillStyle = 'red';
    pincel.font = '60px Arial';
    pincel.fillText(j2.pontos, 450, 80);
}

function gameover() {
    clearInterval(myInterval);
    pincel.clearRect(0, 0, 600, 400);
    palma.play();
    if (j1.pontos == 3 ) {
        pincel.fillStyle = 'white';
        pincel.font = '30px Arial';
        pincel.fillText('O jogador 1 ganhou!', 150, 200);
    }
    if (j2.pontos == 3 ) {
        pincel.fillStyle = 'white';
        pincel.font = '30px Arial';
        pincel.fillText('O jogador 2 ganhou!', 150, 200);
    }
    tela.onmousedown = restart;
   

}

function restart() {
    location.reload();
}
function jmov(evento) {
    if (evento.key == "w") {
        j1.y = j1.y - 25
    }
    if (evento.key == 's') {
        j1.y = j1.y + 25
    }
    if (evento.key == 'ArrowUp') {
        j2.y = j2.y - 25
    }
    if (evento.key == 'ArrowDown') {
        j2.y = j2.y + 25
    }

    if (j2.y > 350) {
        j2.y = 350
    }
    if (j1.y > 350) {
        j1.y = 350
    }
    if (j1.y < 0) {
        j1.y = 0
    }
    if (j2.y < 50) {
        j2.y = 0
    }
}
function move() {
    desenhar()
    bolinha.x += bolinha.dir
    colisao()
    colisaoparede()
    bolinha.y += bolinha.diry
    if (j1.pontos == 3 || j2.pontos == 3) {
        gameover()
    }

}

document.onkeydown = jmov;
