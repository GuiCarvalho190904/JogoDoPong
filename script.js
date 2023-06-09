/*************************** Criação das variáveis utilziadas no código ***************************/
var canvas, context,
    barraWidth, barraHeigth,
    jogadorPosX, jogadorPosY,
    teclaCimaPressionada, teclaBaixoPressionada,
    oponentePosX, oponentePosY,
    oponenteParaCima,
    bolaRaio,
    bolaPosX, bolaPosY,
    bolaParaDireita,
    bolaAngulo,
    bolaTempo,
    velocidadeJogador, velocidadeOponente,
    velocidadeBola,
    pontosJogador, pontosOponente;

    var escolha_da_dificuldade=false; 

    while(escolha_da_dificuldade==false){// escolha da dificuldade
       
        var dificuldade = prompt("Coloque a dificuldade do jogo de 1 a 9:")
        dificuldade = Number(dificuldade)

        if(dificuldade>0 && dificuldade<10){
            velocidadeBola =velocidadeBola*dificuldade
            escolha_da_dificuldade=true
        }

        else{
            alert('O valor digitado da dificuldade estÃ¡ fora do intervalo, digite novamente!')
            escolha_da_dificuldade=false
        }
    }

function iniciarJogo() {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    //Configurações de largura, tamanho e posicionamento da barra
    barraWidth = 20;
    barraHeigth = 80;
    jogadorPosX = 0;
    jogadorPosY = (canvas.height - barraHeigth) / 2;
    teclaBaixoPressionada = false;
    teclaCimaPressionada = false;

    oponentePosX = canvas.width - barraWidth;
    oponentePosY = 0;
    oponenteParaCima = false;

    //Configuração da dimensão e posicionamento inicial da bola
    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;

    bolaParaDireita = false;
    bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
    bolaTempo = 0;
    velocidadeJogador = 30;
    velocidadeOponente = 90;
    velocidadeBola = 45;
    pontosJogador = 0;
    pontosOponente = 0;

    //Mantém a tecla como "falso" para não realizar ação
    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);

    setInterval(loopGame, 30);
}

//Verificação - Pressionando as teclas (Consulte as keys)
function keyUp(e) {
    if (e.keyCode == 38) {
        teclaCimaPressionada = false;
    } else if (e.keyCode == 40) {
        teclaBaixoPressionada = false;
    }
}

function keyDown(e) {
    if (e.keyCode == 38) {
        teclaCimaPressionada = true;
    } else if (e.keyCode == 40) {
        teclaBaixoPressionada = true;
    }
}


function loopGame() {

   /****************************** DESENHO DA TELA *****************************/  
   context.clearRect(0, 0, canvas.width, canvas.height); // limpar a tela antes de desenhar


   /****************************** JOGADOR & OPONENTE *****************************/  
   context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeigth); // desenha jogador
   context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeigth); // desenha ioponente


   /****************************** BOLA *****************************/  
   context.beginPath(); // modo desenho 
   context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o circulo com coordenadas no centro
   context.closePath(); // finaliza o caminho / não é obrigatório
   //context.fillStyle = "#ffffff";
   context.fill();


    /****************************** JOGADOR *****************************/  
    if (teclaCimaPressionada != teclaBaixoPressionada) { // se o usuário precionar para cima
        if (teclaCimaPressionada) { // se for para cima pressionado
            if (jogadorPosY > 0) { // se a bola não sair da tela
                jogadorPosY -= velocidadeJogador; // muda posição do jogador
            }
        }
        else { // se for para baixo 
            if (jogadorPosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                jogadorPosY += velocidadeJogador; // muda posição
            }
        }
    }

    
    /****************************** OPONENTE *****************************/  
    if (oponenteParaCima) { // caso o oponente estiver indo para cima
        oponentePosY -= velocidadeOponente;
        if (oponentePosY <= 0) // se a bola estiver saindo da tela
        {
            oponenteParaCima = false;
        }
    }
    else { // se o oponente estiver se movendo para baixo
        oponentePosY += velocidadeOponente;
        if (oponentePosY >= canvas.height - barraHeigth) { // caso a bola estiver saindo da tela

            oponenteParaCima = true;
        }
    }


    /****************************** BOLA *****************************/  
    if (bolaTempo <= 0) // caso a bola estiver em jogo, o tempo  e zerado apos marcar ponto, abola ficará invisivel por um tempo
    {
        if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) { // caso o jogador encoste na bola no eixo X
            if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeigth)) { // caso o jogador encoste na bola no eixo Y
                bolaParaDireita = true;
                if (teclaBaixoPressionada) { // se o usuário estiver indo para baixo e tocar na bola
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                }
                else {
                    bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                }
            }
        }
        else {
            if ((bolaPosX + bolaRaio) >= oponentePosX) { // se o oponente encostar na bola no eixo X
                if ((bolaPosY + bolaRaio) > oponentePosY && (bolaPosY - bolaRaio < oponentePosY + barraHeigth)) { // se o oponente encostar na bola no eixo Y

                    bolaParaDireita = false;
                    if (oponenteParaCima) { // caso oponetne estiver indo para cima ao tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                    }
                    else { // caso o oponente estiver indo para baixo quando tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                    }
                }
            }
        }

        if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) { // se a bola estiver indo para cima ou para baixo na tela
            bolaAngulo = bolaAngulo * -1; // multiplicamos por - 1 para inverter a direção da bola no eixo y
        }
        bolaPosY += bolaAngulo; // move bola para cima ou para baixo de acordo com o calculo acima

        if (bolaParaDireita) {
            bolaPosX += velocidadeBola; // move a bola para direita
        }
        else {
            bolaPosX -= velocidadeBola; // move a bola para esquerda
        }
    }

    if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) { // se a bola saiu da tela
        if (bolaTempo >= 50) { // se o tempo de deixar a bola invisível passou 
            if (bolaPosX <= - bolaRaio) { // se bola saiu na esquerda 
                pontosOponente++;
                
            }
            else { // se bola saiu na direita 
                pontosJogador++;
                const som_de_ponto=new Audio('HEHE BOI.mp3');
                som_de_ponto.play();
            }

            bolaPosX = canvas.width / 2; // coloca bola no centro da tela
            bolaPosY = canvas.height / 2; // coloca bola no centro da tela

            bolaParaDireita = false;
            bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
            bolaTempo = 0; // zera o tempo de deixar a bola invisível e coloca novamente em jogo
        }
        else { // caso o tempo de deixar a bola invisível não acabou 
            bolaTempo++;
        }
    }


    /****************************** PLACAR *****************************/  
    var pontosA = pontosJogador; // variéveis temporarias para alterar pontuação
    var pontosB = pontosOponente;

    if (pontosA < 10) { // coloca zero a esquerda se for menor que 10 a pontuação 
        pontosA = "0" + pontosA;
    }
      if (pontosA >= 2) {
          window.alert ("Jogador A ganhou");
          pontosJogador = 0;
          pontosOponente = 0;
      }

    if (pontosB < 10) { // voloca zero a esquerda se for menor que 10 a pontuação 
        pontosB = "0" + pontosB;
    }
    if (pontosB >= 2 ) {
        window.alert("Jogador B ganhou");
        pontosJogador = 0;
        pontosOponente = 0;
    }


    context.font = "38pt Arial"; // tamanho e fonte
    context.fillStyle = "#ffffff"; //Seleciona a cor
    context.fillText(pontosA + "  " + pontosB, (canvas.width / 2) - 70, 50); // escrevendo texto no centro da tela no top


    /****************************** LINHA DIVISÓRIA *****************************/ 
    context.beginPath();
    context.moveTo(canvas.width / 2, 0); // arrumar lápis para fazere a escrita da linha
    context.lineTo(canvas.width / 2, canvas.height);// faz risco na tela no centro
    context.strokeStyle = "#ffffff";
    context.stroke();
    context.closePath();
}


/****************************** FUNÇÃO DO JQUERY *****************************/ 
$(function () {
    iniciarJogo();
});