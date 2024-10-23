// alert("Hello World");

// Organizador de variáveis, é um objeto nomeado state.
// Dividido em view, values e actions, onde view vai conter variáveis ligadas as imagens, values sendo valores usados na engine, por trás dos panos, e actions valores de ações, ou seja, variáveis que agem (por baixo dos panos) no jogo. 
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),    
        scoreTitle: document.querySelector("#result-title"),
        // buttonStart: document.querySelector("#start"),
    },
    values: {
        timerId: null, 
        // countDownTimerId: null,
        gameVelocity: 1000,//500,//1000,
        hitPosition: 0,
        score: 0,
        currentTime: 60,// PAra testes: 10, 30,
    },    
    actions: {
        //timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),         
    }    
}

// Função para tocar o som no jogo, dinamicamente, quando o usuário acerta o enimigo "enemy" ou quando acaba o tempo de jogo. Para assim criar um retorno auditivo que melhore a experiencia do usuário:
function playSound(audioName) {
    let sound = new Audio(`./src/audios/${audioName}.m4a`);
    sound.volume = 0.18; // volume um pouco maís baixo
    sound.play();
}

// Função de contagem decressiva para o tempo do jogo:
function countDown() {
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime; //Atualizar a contagem de tempo na tela

    if(state.values.currentTime <= 0) {
        state.view.scoreTitle.textContent = `Game Over! O seu resultado foi de ${state.values.score} pontos.`;

        playSound("game-over"); // Toca-se o som de fim de jogo
        
        // alert(`Game Over! O seu resultado foi de ${state.values.score} pontos.`); // Somente para teste

        //Como boa prática limpe esses estados usados no intervalo de tempo da memória:
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
    }

}

// Função random para mostar que o enimigo "enemy" renderiza randomicamente na tela do jogo:
function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove("enemy"); // limpar o enimigo "enemy" antigo
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

// Função para mover o enimigo "enemy", utilizando randomSquare, em um determinado intervalo de tempo (gameVelocity):
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

// Função para iniciar o tempo do jogo:
// function startCountDown() {
//     state.values.countDownTimerId = setInterval(countDown, 1000);
// }

// Uma função de evento de click para cada botão do jogo:
function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener("mousedown", () => {
                // alert("Hit!");
            if(square.id === state.values.hitPosition) { // Se o botão clicado for o mesmo que o hitPosition, o enimigo é acertado:
                state.values.score ++;// O score aumenta +1
                state.view.score.textContent = state.values.score; // Atualiza-se o score na tela
                state.values.hitPosition = null; // E o hitPosition volta a ser nulo

                playSound("hit"); // Toca-se o som de acerto
            }
        });
    });
}
// Obs: Listener = é adicionar um evento e a função listener ficar "ouvindo" uma ação a esse evento associado a ela.


// Função principal para organizar a chamada das outras funções do jogo:
function initialize() {
    // alert("Hello World 2!");
    
    // startCountDown();// Chamada da função para inicar o tempo do jogo:

    moveEnemy(); // Chamada da função para mover o enimigo
    
    addListenerHitBox(); // Chamada da função de evento de click para cada botão do jogo clicado
    
}

initialize(); //Inicializar o jogo

// Iniciando o jogo, utilizando o botão de start:
// state.view.buttonStart.addEventListener("click", () => {    
//     // alert('Hello World 3!');
//     initialize();
// })
// console.log(state.view.buttonStart);


