//personagens pre-determinados para o jogo
const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

//funcao para rolar dados
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    //sortear bloco
    let block = () => {
      let random = Math.random();
      let result;

      switch (true) {
        case random < 0.33:
          result = "RETA";
          break;
        case random < 0.66:
          result = "CURVA";
          break;
        default:
          result = "CONFRONTO";
          break;
      }

      return result;
    };

    console.log(`Bloco: ${block()}`);
  }
}

//funcao principal auto-invocavel
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`,
  );

  await playRaceEngine(player1, player2);
})();
