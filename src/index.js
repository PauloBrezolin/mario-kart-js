const BLOCK_TYPES = {
  RETA: "RETA",
  CURVA: "CURVA",
  CONFRONTO: "CONFRONTO",
};

const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  const random = Math.random();
  if (random < 0.33) return BLOCK_TYPES.RETA;
  if (random < 0.66) return BLOCK_TYPES.CURVA;
  return BLOCK_TYPES.CONFRONTO;
}

async function logRollResult(name, atributo, valorDado, valorAtributo) {
  console.log(
    `${name} 🎲 rolou dado de ${atributo}: ${valorDado} + ${valorAtributo} = ${
      valorDado + valorAtributo
    }`
  );
}

function calcularTotal(dado, atributo) {
  return dado + atributo;
}

async function testarHabilidade(jogador, tipoBloco, valorDado) {
  let atributoUsado;
  switch (tipoBloco) {
    case BLOCK_TYPES.RETA:
      atributoUsado = jogador.VELOCIDADE;
      break;
    case BLOCK_TYPES.CURVA:
      atributoUsado = jogador.MANOBRABILIDADE;
      break;
    case BLOCK_TYPES.CONFRONTO:
      atributoUsado = jogador.PODER;
      break;
  }

  await logRollResult(
    jogador.NOME,
    tipoBloco.toLowerCase(),
    valorDado,
    atributoUsado
  );
  return calcularTotal(valorDado, atributoUsado);
}

async function resolverConfronto(j1, j2, valor1, valor2) {
  console.log(`${j1.NOME} confrontou com ${j2.NOME}! 🥊`);

  if (valor1 > valor2 && j2.PONTOS > 0) {
    j2.PONTOS--;
    console.log(`${j1.NOME} venceu o confronto! ${j2.NOME} perdeu 1 ponto 🐢`);
  } else if (valor2 > valor1 && j1.PONTOS > 0) {
    j1.PONTOS--;
    console.log(`${j2.NOME} venceu o confronto! ${j1.NOME} perdeu 1 ponto 🐢`);
  } else if (valor1 === valor2) {
    console.log("Confronto empatado! Nenhum ponto foi perdido.");
  }
}

async function playRaceEngine(j1, j2, totalRodadas = 5) {
  for (let rodada = 1; rodada <= totalRodadas; rodada++) {
    console.log(`\n🏁 Rodada ${rodada}`);
    const bloco = await getRandomBlock();
    console.log(`Tipo de bloco: ${bloco}`);

    const dado1 = await rollDice();
    const dado2 = await rollDice();

    const total1 = await testarHabilidade(j1, bloco, dado1);
    const total2 = await testarHabilidade(j2, bloco, dado2);

    if (bloco === BLOCK_TYPES.CONFRONTO) {
      await resolverConfronto(j1, j2, total1, total2);
    } else {
      if (total1 > total2) {
        j1.PONTOS++;
        console.log(`${j1.NOME} marcou 1 ponto!`);
      } else if (total2 > total1) {
        j2.PONTOS++;
        console.log(`${j2.NOME} marcou 1 ponto!`);
      } else {
        console.log("Empate! Nenhum ponto foi marcado.");
      }
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(j1, j2) {
  console.log("\n🎉 Resultado Final:");
  console.log(`${j1.NOME}: ${j1.PONTOS} ponto(s)`);
  console.log(`${j2.NOME}: ${j2.PONTOS} ponto(s)`);

  if (j1.PONTOS > j2.PONTOS) {
    console.log(`\n🏆 ${j1.NOME} venceu a corrida!`);
  } else if (j2.PONTOS > j1.PONTOS) {
    console.log(`\n🏆 ${j2.NOME} venceu a corrida!`);
  } else {
    console.log("🚦 A corrida terminou em empate!");
  }
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
