var pincel = document.querySelector("canvas").getContext('2d');

//DECLARAÇÃO DE VARIAVEIS: ----------------------------------------
//INIMIGOS E PlAYER---------------------------
    var player = new Player(100, 100, 100, 100, "imagem/playeridle.png","imagem/super.png");
    var inimigo1 = new Enemy(0, 360, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo2 = new Enemy(0, 180, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo3 = new Enemy(0, 540, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo4 = new Enemy(800, 180, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo5 = new Enemy(800, 360, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo6 = new Enemy(800, 540, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo7 = new Enemy(450, 0, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo8 = new Enemy(225, 0, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo9 = new Enemy(675, 0, 100, 100, "imagem/inimigoandando/inimiga1.png");
    var inimigo10 = new Enemy(450, 700, 100, 100, "imagem/inimigoandando/inimiga1.png");
//HUD ---------------------------
    var bg = new Bg(0, 0, 900, 720, "imagem/Bg.png");
    var vidas = new HUD(); 
    var pontos = new HUD ();
    var iconepontos = new HUD(100, 30, 50, 50,  "imagem/inimigoandando/inimiga1.png"); 
    var superhud = new HUD(600, 35, 75, 40, "imagem/barrinha.png");  
    var superhudcor = new HUD(602, 40, 0, 30, 'Plum');  
    var iconevidas = new HUD (350, 20, 50, 50, "imagem/playericon.png");
//MENUS---------------------------
    var endgame = new Menus(0,0,900,720,"imagem/GameOver.png");
    var newGame = new Menus(0,0,900,720,"imagem/menu.png")
//KEYS---------------------------------------------
document.addEventListener("keydown", function (evento) { //QUANDO A TECLA É PRESSIONADA...
    //MOVIMENTO
    if (evento.key === 'w') {
        player.diry = -10;//diz que a direcao y do player vai ser -10
        player.animation("andandocima", "andc")//seta animacao do movimento especifico da tecla
    }
    if (evento.key === 's') {
        player.diry = 10;//diz que a direcao y do player vai ser 10
        player.animation("andandobaixo", "andb")//seta animacao do movimento especifico da tecla
    }
    if (evento.key === 'd') {
        player.dir = 10;//diz que a direcao x do player vai ser 10
        player.animation("andandodireita", "andd")//seta animacao do movimento especifico da tecla
    }
    if (evento.key === 'a') {
        player.dir = -10;//diz que a direcao x do player vai ser -10
        player.animation("andandoesquerda", "ande")//seta animacao do movimento especifico da tecla
    }
    //ATAQUE
    if (evento.key === '3') {
        player.animacaoataque("ATAQUEDIREITA", "ataqued");//seta animacao do movimento especifico da tecla
        player.atack(player.x + 70, player.y + (player.sizey / 2), 10, 20);//chama o ataque descrevendo as dimenções do ataque
    }
    if (evento.key == '5') {
        player.animacaoataque("ATAQUECIMA", "ataquec");//seta animacao do movimento especifico da tecla
        player.atack(player.x + 35, player.y + 25, 30, 13);

    }
    if (evento.key === '1') {
        player.animacaoataque("ATAQUEESQUEDA", "ataquee");//seta animacao do movimento especifico da tecla
        player.atack(player.x + 25, player.y + 25, 10, 30);
   
    }
    if (evento.key === '2') {
        player.animacaoataque("ATAQUEBAIXO", "ataqueb");//seta animacao do movimento especifico da tecla
        player.atack(player.x + 25, player.y + 70, 30, 10);
    }
    if (evento.key === ' ') {
        player.Super();
        player.animacaosuper();
    }
    if (evento.key === ' ' && !player.playing && !player.initalmenu && !player.inst) {//Verifica se a tecla espaço foi apertado enquanto o player nao ta jogando,nao ta no menu inicial e nem nas instruções, ou seja, ele ta no game over
        location.reload();//f5
    }
    if (evento.key === 'j' && !player.inst){//verifica se o player apertou j e se ele nao ta nas instruções, vai pro jogo direto
        player.initialmenu = false;//diz que o plauer nao ta mais no menu inicial
    }
    if (evento.key === 'c' && player.instrucoesOn){//se o player apertar c e puder entrar no menu de instruções
        player.inst = true;//a bool que diz que ele ta nas instruções vira true
    }
    if(evento.key === 'Enter' && player.inst){//se o player apertar enter enquanto estiver nas instruções
        player.initialmenu = false;//o menu inicial nao eh mais acessivel
        player.instrucoesOn = false;//ele nao pode mais ir pras instruções
        player.inst = false;//ele nao esta mais nas instruções
    }
})
document.addEventListener("keyup", function (evento) {//QUANDO A TECLA É SOLTA
    //MOVIMENTO-----------------------
        if (evento.key === 'w') {
            player.diry = 0;
            player.animationstop("andandocima", "andc")
        }
        if (evento.key === 's') {
            player.diry = 0;
            player.animationstop("andandobaixo", "andb")
        }
        if (evento.key === 'd') {
            player.dir = 0;
            player.animationstop("andandodireita", "andd")
        }
        if (evento.key === 'a') {
            player.dir = 0;
            player.animationstop("andandoesquerda", "ande")
        }
    //ATAQUE---------------------------
        if (evento.key === '3') {
            player.initialvalues();
        player.animationstop("andandodireita", "andd")
        }
        if (evento.key === '5') {
            player.initialvalues();
        player.animationstop("andandocima", "andc")
        }
        if (evento.key === '2') {
            player.initialvalues();
            player.animationstop("andandobaixo", "andb")
        }
        if (evento.key === '1') {
            player.initialvalues();
            player.animationstop("andandoesquerda", "ande")
        }
    //GAMEOVER---------------------------
    if (evento.key === ' ') {
        player.initialvalues();
    }
})
//COLISAO------------------------------------------
function maincollision() {//COLISOES DE TODOS OS INIMIGOS C O PLAYER E VICE E VERSA
    player.collidecall(player, inimigo1);
    player.collidecall(player, inimigo2);
    player.collidecall(player, inimigo3);
    player.collidecall(player, inimigo4);
    player.collidecall(player, inimigo5);
    player.collidecall(player, inimigo6);
    player.collidecall(player, inimigo7);
    player.collidecall(player, inimigo8);
    player.collidecall(player, inimigo9);
    player.collidecall(player, inimigo10)
    inimigo1.collide(player,player);
    inimigo2.collide(player,player);
    inimigo3.collide(player,player);
    inimigo4.collide(player,player);
    inimigo5.collide(player,player);
    inimigo6.collide(player,player);
    inimigo7.collide(player,player);
    inimigo8.collide(player,player);
    inimigo9.collide(player,player);
    inimigo10.collide(player,player);
}
//FUNCOES------------------------------------------
function draw() {//DESENHO DE TUDO QUE APARECE NA TELA
    bg.draw();
    pontos.escrever(": "  + player.pontos, 145, 50);//MUDOU
    iconevidas.draw()//MUDOU
    pontos.escrever(": " + player.vidas, 400, 50); //MUDOU
    iconepontos.draw()//MUDOU
    superhudcor.super() //MUDOU
    superhud.draw(player)//MUDOU
    player.draw();
    inimigo1.draw();
    inimigo2.draw();
    inimigo3.draw();
    inimigo4.draw();
    inimigo5.draw();
    inimigo6.draw();
    inimigo7.draw();
    inimigo8.draw();
    inimigo9.draw();
    inimigo10.draw();
}
function update() {//ATUALIZACAO DE TUDO 
    player.move();
    inimigo1.followplayer(player.x, player.y, player);
    inimigo2.followplayer(player.x, player.y, player);
    inimigo3.followplayer(player.x, player.y, player);
    inimigo4.followplayer(player.x, player.y, player);
    inimigo5.followplayer(player.x, player.y, player);
    inimigo6.followplayer(player.x, player.y, player);
    inimigo7.followplayer(player.x, player.y, player);
    inimigo8.followplayer(player.x, player.y, player);
    inimigo9.followplayer(player.x, player.y, player);
    inimigo10.followplayer(player.x, player.y, player);
    inimigo1.animacaoinimigo("inimigoandando", "inimiga");
    inimigo2.animacaoinimigo("inimigoandando", "inimiga");
    inimigo3.animacaoinimigo("inimigoandando", "inimiga");
    inimigo4.animacaoinimigo("inimigoandando", "inimiga");
    inimigo5.animacaoinimigo("inimigoandando", "inimiga");
    inimigo6.animacaoinimigo("inimigoandando", "inimiga");
    inimigo7.animacaoinimigo("inimigoandando", "inimiga");
    inimigo8.animacaoinimigo("inimigoandando", "inimiga");
    inimigo9.animacaoinimigo("inimigoandando", "inimiga");
    inimigo10.animacaoinimigo("inimigoandando", "inimiga");
    maincollision();
    player.Invencibility();
}
function main() {
    player.verifygame();//constantemente faz a verificação das bools
    if(player.initialmenu){//se o menu inicial tiver ativo
        newGame.Inicial();//desenha a tela de menu inicial
    }
    if(player.inst){//se as instruções estiverem ativas
        newGame.instructions();//desenha a telad e instruções
    }
    if(player.playing){//se o jogo estiver ativo
        pincel.clearRect(0, 0, 900, 720);//limpa a tela coinstantemetne
        update();//atualiza as coaisas 
        draw();//desenna
    }
    if(!player.playing && !player.initialmenu){//se o player nao estiver nem jogadnoe nem no menu incial(ele ta no gameover)
        endgame.GameOver();//chama ogame over
    }
}
function maintempo() {//so pra deixar o cofigo do meu gosto 
    tempoPrincipal = setInterval(main, 50);
}
newGame.intro.play();//toca a musiquinha da intro
maintempo();