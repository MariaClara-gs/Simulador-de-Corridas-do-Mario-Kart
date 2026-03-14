//personagens do jogo
const players = [
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    escolhido: false,
    pontos: 0,
  },
  { nome: "Luigi", velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
  {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    escolhido: false,
    pontos: 0,
  },
  {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    escolhido: false,
    pontos: 0,
  },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    escolhido: false,
    pontos: 0,
  },
  {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    escolhido: false,
    pontos: 0,
  },
];

var player1, player2; //jogadores que serao escolhidos pelo usuario

//funcao para rolar dados
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

//funcao para definir bloco
async function getRandomBlock() {
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
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`,
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    //rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;
      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade,
      );
      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade,
      );
    } else if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;
      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade,
      );
      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade,
      );
    } else if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} confrontou com ${character2.nome}! 🥊`);

      await logRollResult(
        character1.nome,
        "poder",
        diceResult1,
        character1.poder,
      );
      await logRollResult(
        character2.nome,
        "poder",
        diceResult2,
        character2.poder,
      );

      if (powerResult1 > powerResult2 && character2.pontos > 0) {
        console.log(
          `${character1.nome} venceu o confronto! ${character2.nome} perdeu um ponto 🐢`,
        );
        character2.pontos--;
      }

      if (powerResult2 > powerResult1 && character1.pontos > 0) {
        console.log(
          `${character2.nome} venceu o confronto! ${character1.nome} perdeu um ponto 🐢`,
        );
        character1.pontos--;
      }

      console.log(
        powerResult1 === powerResult2
          ? "Confronto empatado! Nenhum ponto foi perdido."
          : "",
      );
    }

    //vencedores
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.nome} marcou 1 ponto`);
      character1.pontos++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.nome} marcou 1 ponto`);
      character2.pontos++;
    }

    console.log("---------------------------------------------");
  }
}

//funcao para declarar o vencedor
async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
  console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

  if (character1.pontos > character2.pontos) {
    console.log(`\n${character1.nome} venceu a corrida! Parabens! 🏆`);
  } else if (character1.pontos < character2.pontos) {
    console.log(`\n${character2.nome} venceu a corrida! Parabens! 🏆`);
  } else {
    console.log(`\nA corrida terminou em empate!`);
  }
}

//funcao para escolher players
async function choosePlayer() {
  //imprimindo personagens
  console.log("🕹 Personagens 🕹");
  for (let i = 0; i < players.length; i++) {
    if (players[i].escolhido == false) {
      console.log(`${i}. ${players[i].nome}`);
    }
  }

  var readLineSync = require("readline-sync"); //para leitura no terminal
  let escolha;

  do {
    //verifica se o que foi escolhido esta disponviel e se existe na lista
    escolha = readLineSync.question("Digite o numero do personagem: ");
  } while (escolha < 0 || escolha > 5 || players[escolha].escolhido == true);

  players[escolha].escolhido = true; //marca como já escolhido

  return players[escolha];
}

//funcao principal auto-invocavel
(async function main() {
  console.log("EScolha o seu jogador player 1:");
  player1 = await choosePlayer();

  console.log("Escolha o seu jogador player 2:");
  player2 = await choosePlayer();

  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`,
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
