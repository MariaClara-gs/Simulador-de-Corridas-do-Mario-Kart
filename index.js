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
    let block = getRandomBlock();

    console.log(`Bloco: ${block}`);

    //rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block() === "RETA") {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;
      await logRollResult(
        character1.name,
        "velocidade",
        diceResult1,
        character1.velocidade,
      );
      await logRollResult(
        character2.name,
        "velocidade",
        diceResult2,
        character2.velocidade,
      );
    } else if (block() === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;
      await logRollResult(
        character1.name,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade,
      );
      await logRollResult(
        character2.name,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade,
      );
    } else if (block() === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;
      await logRollResult(
        character1.name,
        "poder",
        diceResult1,
        character1.poder,
      );
      await logRollResult(
        character2.name,
        "poder",
        diceResult2,
        character2.poder,
      );
    }
  }
}

//funcao principal auto-invocavel
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`,
  );

  await playRaceEngine(player1, player2);
})();
