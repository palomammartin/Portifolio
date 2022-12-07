class mainObj {
    frame = 1;
    timer = 0;
    timer2 = 0;
    playing; // bool que verifica se o player ta na tela de jogo
    initialmenu = true; //bool que verifica se o player ta na tela de menu inicial; Começa true pq quando voce abre o jogo ele tem que mostrar o menu de primeira
    instrucoesOn; // bool que verifica se a tela de instruções PODE OU NAO ser chamada
    inst = false; // bool que verifica se o player ta na tela de instruções

    constructor(x, y, sizex, sizey, sprite, tiro) {//Constructor de todos os objetos
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.sprite = sprite;
        this.tiro = tiro
    }
    Delay(milisegundos) { // Da um delay em milisegundos de modo assincrono aos outros timers
        return new Promise(resolve => {
            setTimeout(resolve, milisegundos);
        });
    }
    draw() { // desenha
        var sprite1 = new Image();
        sprite1.src = this.sprite;
        pincel.drawImage(sprite1, this.x, this.y, this.sizex, this.sizey);
    }
    animation(pasta, numero) { //passando a animação DE ANDAR 
        this.timer++
        if(this.timer>=2){
            this.frame++
            this.timer = 0;
            this.sprite = "imagem/" + pasta + "/" + numero + this.frame + ".png";
            if(this.frame==5){
                this.frame = 1;
            }
        }
    }
    animationstop(pasta, numero) { //para a animação
        this.sprite = "imagem/" + pasta + "/" + numero + 1 + ".png";
    }
    async animacaoataque(paste, name) { // animação do atAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAque
        for (let h = 1; h < 5; h++) {
            await this.Delay(50) // Dela aqui
            this.sprite = "imagem/" + paste + "/" + name + h + ".png";
        }
    }
    async animacaosuper() { // animação do SUPEEEEEER
        var sprite1 = new Image();
        sprite1.src = this.tiro;
        pincel.drawImage(sprite1, Player.superx, Player.supery, Player.superxsize, Player.superysize);
        await this.Delay(500)
    }
}
class Player extends mainObj {
    dir = 0;//direcao do movimento x;
    diry = 0; // direcao do movimento y;
    atkx; //posicaoR x do raio do ataque;
    atky; // posicaoR y do raio do ataque;
    atkxsize; //tamanho da largura do raio do ataque;
    atkysize;//tamanho da altura do raio do ataque;
    superx; // x do super
    supery; // y do super;
    superxsize; // tamanho x do super
    superysize; // tamanho y do super
    poder = 0; // variavel de armazenamento de poder para utilizar o super
    pontos = 0; // Quantia de monstros mortos
    vidas = 3 //vidas do player
    WasHit; // Bool que verifica se o player sofreu dano ou nao 
    SuperIsLoaded; //Bool que verifica se o super está carregado
    dano = new Audio("sounds/hitPlayer.wav"); // audio de quando o player toma dano 
    hitEnemy = new Audio("sounds/hitEnemy.wav"); // audio de quando o inimigo toma dano
    supe = new Audio("sounds/Supe.wav"); // audio de quando o super é usado

    move() { // movimentação do player
        this.x += this.dir;
        this.y += this.diry;
    }
    atack(atkxp, atkyp, atkxsizep, atkysizep) { //cria uma imagem de ataque com variaveis passadas por parametro
        this.atkx = atkxp;
        this.atkxsize = atkxsizep;
        this.atky = atkyp;
        this.atkysize = atkysizep;
    }
    initialvalues() { // zera os valores das variaveis de ataque e de super
        this.atkx = 0;
        this.atkxsize = 0;
        this.atky = 0;
        this.atkysize = 0;
        this.superx = 0;
        this.supery = 0;
        this.superxsize = 0;
        this.superysize = 0;
    }
    async Super() { // verifica se o player tem poder suficiente, cria uma imagem do super ao redor do player e desconta poder.
        var sprite1 = new Image();
        sprite1.src = this.tiro;
        if (this.poder > 10) {
            this.SuperIsLoaded = true;
            console.log("Super carregado");
            if (this.SuperIsLoaded) {
                this.supe.play();
                this.superx = this.x - (this.sizex / 2);
                this.supery = this.y - (this.sizey / 2);
                this.superxsize = (2 * this.sizex);
                this.superysize = (2 * this.sizey);
                this.poder = 0 ///ISSO
                pincel.drawImage(sprite1, Player.superx, Player.supery, Player.superxsize, Player.superysize);
                await this.Delay(500);
            }
        }
        else {
            this.SuperIsLoaded = false;
            console.log("SUper nao carregado");
        }

    }
    collide(obj) { // verifica a colisao do ataque e do super do player com os inimigos
        if (this.atkx < obj.x + obj.sizex && this.atkx + this.atkxsize > obj.x &&
            this.atky < obj.y + obj.sizey && this.atky + this.atkysize > obj.y) {
            this.hitEnemy.play();
            this.poder++;
            this.pontos++;
            return true;
        }
        if ((obj.x < this.superx + this.superxsize && obj.x + obj.sizex > this.superx) &&
            (obj.y < this.supery + this.superysize && obj.y + obj.sizey > this.supery)) {
            this.pontos++;
            return true;
        }
        else {
            return false;
        }
    }
    collidecall(player, obj) { // OTIMIZACAO DO CODIGO | Chama a função de colisao a partir de um player e de um objeto
        if (player.collide(obj)) {
            obj.randomizer();
        }
    }
    verifygame() {//verifica as bools do jogo. A função serve p verificar quando cada tela do jogo pode e vai aparecer
        if (this.playing) {this.instrucoesOn = false;}//se o player estiver jogando, as instrucoes nao vao poder ser acessadas
        if (this.initialmenu) {this.playing = false; this.instrucoesOn = true;}//se o player estiver no menu inicial,ele nao vai estar jogando e as instrucoes vao poder ser acessadas
        if (this.vidas > 0 && !this.initialmenu) { this.playing = true;}//se o player tiver vidas e nao estiver no menu inicial, ele esta jogando
        else { this.playing = false; }//caso contrario, ele nao esta jogando 
    }
    Invencibility() {//Da invencibilidade ao player por 3 segundos p jogo nao ser impossivel
        if (this.WasHit) {//verifica se o player sofreu dano
            this.timer2 += 1;//acrescenta ao timer

            if (this.timer2 == 60) {//se o timer chegar a 60(rodou 50 milisegundos 60 vezes)
                this.timer2 = 0;//seta o timer p 0(p quando o player tomar dano de novo o timer rodar novamente)
                this.WasHit = false;//a invencibilidade acaba e o dano do player tambem.
            }
        }
    }
}
class Enemy extends mainObj {
    posicaoR;
    velocityX = 4;
    velocityY = 4;
    followplayer(followX, followY, player) {//Função de seguir o player
        if (player.pontos > 100) {//se o player tiver matado + de 100 inimigos, a velocidade deles aumenta
            this.velocityX = 6;
            this.velocityY = 6;
        }
        if (followY > this.y) {
            this.y += this.velocityY;
        }
        if (followY < this.y) {
            this.y -= this.velocityY;
        }
        if (followX > this.x) {
            this.x += this.velocityX;
        }
        if (followX < this.x) {
            this.x -= this.velocityX;
        }
    }
    randomizer() {
        this.posicaoR = Math.random() * (9 - 0);

        if (this.posicaoR > 0 && this.posicaoR < 1) {
            this.x = 0
            this.y = 360
        }
        if (this.posicaoR > 1 && this.posicaoR < 2) {
            this.x = 0
            this.y = 180
        }
        if (this.posicaoR > 2 && this.posicaoR < 3) {
            this.x = 0
            this.y = 540
        }
        if (this.posicaoR > 3 && this.posicaoR < 4) {
            this.x = 800
            this.y = 180
        }
        if (this.posicaoR > 4 && this.posicaoR < 5) {
            this.x = 800
            this.y = 360
        }
        if (this.posicaoR > 5 && this.posicaoR < 6) {
            this.x = 800
            this.y = 540
        }

        if (this.posicaoR > 6 && this.posicaoR < 7) {
            this.x = 450
            this.y = 0

        }
        if (this.posicaoR > 7 && this.posicaoR < 8) {
            this.x = 225
            this.y = 0

        }
        if (this.posicaoR > 8 && this.posicaoR < 9) {
            this.x = 675
            this.y = 0
        }

    }
    animacaoinimigo(paste, name) { //animação continua exclusiva do inimigo
        this.timer += 1;
        if (this.timer > 3) {
            this.timer = 0;
            this.frame += 1;
        }
        if (this.frame > 4) {
            this.frame = 1;
        }
        this.sprite = "imagem/" + paste + "/" + name + this.frame + ".png";
    }
    collide(obj, p) {
        if (!p.WasHit) {//verifica se o player nao tomou dano
            if (this.x < obj.x + (obj.sizex - 50) &&
                this.x + 30 > obj.x &&
                this.y < obj.y + (obj.sizey - 50) &&
                this.y + 50 > obj.y + 30) {//faz a colisao
                p.dano.play();//toca o som do dano
                obj.vidas-- // TIRA VIDA PLAYER
                p.WasHit = true;// diz que o player tomou dano
            }
        }
        else {
            return false;
        }
    }
}
class HUD extends Player {   ///TUDO ISSOISSO
    escrever(texto, x, y) {
        pincel.font = "20px Arial";
        pincel.fillStyle = "Plum";
        pincel.fillText(texto, x, y);
    }
    super() {
        this.sizex = player.poder * 4.5
        if (this.sizex > 70) {
            this.sizex = 70
        }
        if (player.poder < 1) {
            this.sizex = 0
        }
        pincel.fillRect(this.x, this.y, this.sizex, this.sizey);
    }
}
class Bg extends mainObj {
}
class Menus extends mainObj {
    intro = new Audio("sounds/intro.wav");
    GameOver() { //Função game over mostra o sprite de game over
        pincel.clearRect(this.x, this.y, this.sizex, this.sizey);
        var gameoversprite = new Image();
        gameoversprite.src = this.sprite;
        pincel.drawImage(gameoversprite, 0, 0, 900, 720);
    }
    Inicial() { // Mostra o sprite do menu inicial  
            var menusprite = new Image();
            menusprite.src = this.sprite;
            pincel.drawImage(menusprite, 0, 0, 900, 720);
    }
    instructions(){ // troca o sprite que tava pro sprite das instruções
        this.sprite = "imagem/instrucoes.png";
    }
}


