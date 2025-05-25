//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let amigos = [];
let amigosOriginais = []; // SEGUNDA VERSÃO - armazena os nomes originais para sabermos se a lista foi esvaziada por sorteio e exibir uma mensagem de conclusão mais clara
let listaFoiUsada = false;  // SEGUNDA VERSÃO - variável para controlar se a lista já teve algum nome
let listaEsvaziadaPorSorteio = false; // SEGUNDA VERSÃO

console.log(amigos);

// Função completa
function adicionarAmigo() {
  const inputAmigo = document.getElementById("amigo");
  const nomeDigitado = inputAmigo.value.trim(); // SEGUNDA VERSÃO - .trim() remove espaços no início e no fim do nome digitado, evitando entradas acidentais como " João " ou "" (só espaços)

  if (nomeDigitado === "") {
    alert("Por favor, digite um nome.");
    return;
  }

    // 🔽 NOVO: converte o nome digitado para letras minúsculas
    const nomeNormalizado = nomeDigitado.toLowerCase(); // SEGUNDA VERSÃO 

    // 🔽 NOVO: cria uma lista com todos os nomes já adicionados também em minúsculas
    const nomesNormalizados = amigos.map(nome => nome.toLowerCase()); // SEGUNDA VERSÃO
  
    // 🔽 NOVO: verifica se o nome normalizado já existe nessa lista / if (nomesNormalizados.includes(nomeNormalizado)): SEGUNDA VERSÃO
    if (nomesNormalizados.includes(nomeNormalizado)) {
    alert("Já existe um amigo com esse nome. Por favor, digite o sobrenome.");
  } else {
    const nomeFormatado = formatarNome(nomeDigitado); // SEGUNDA VERSÃO:  Para exibição bonita
    amigos.push(nomeFormatado); // Adiciona o nome à lista
    amigosOriginais.push(nomeFormatado); // SEGUNDA VERSÃO - armazena o nome na lista original (sem alterações) para controle do jogo e detecção de quando todos foram sorteados
    inputAmigo.value = ""; // Limpa o campo de entrada

    listaFoiUsada = true;  // Marca que já tem pelo menos um amigo adicionado

    exibirListaAmigos(); // Chama a função para exibir a lista atualizada
    listaEsvaziadaPorSorteio = false; // SEGUNDA VERSÃO: essa linha não existia na primeira versão e faz parte da lógica nova para controlar se a lista foi esvaziada por sorteio. 
  }
}

// Função completa - SEGUNDA VERSÃO  
function formatarNome(nome) {
  return nome
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(palavra => palavra !== "")
    .map(palavra => palavra[0].toUpperCase() + palavra.slice(1))
    .join(" ");
}

// Função completa
function exibirListaAmigos() {
  // Obter o elemento da lista
  const listaAmigos = document.getElementById("listaAmigos"); // Ou document.querySelector('#listaAmigos');

  listaAmigos.innerHTML = ""; // Limpar a lista existente

  // Percorrer o array
  for (let i = 0; i < amigos.length; i++) {
    const nomeAmigo = amigos[i];

    // Adicionar elementos à lista
    const itemLista = document.createElement("li"); // Para cada amigo, crie um novo elemento de lista (<li>) usando document.createElement('li').
    itemLista.textContent = nomeAmigo; // Defina o texto do elemento <li> com o nome do amigo usando textContent.

    // Criar o botão de remover - SEGUNDA VERSÃO 
    const botaoRemover = document.createElement("button"); // - SEGUNDA VERSÃO 
    botaoRemover.textContent = "Remover"; // - SEGUNDA VERSÃO 
    botaoRemover.classList.add("button-remove"); // Adiciona uma classe para estilo (opcional) - SEGUNDA VERSÃO 
    botaoRemover.onclick = () => removerAmigo(i); // Ao clicar, chama a função removerAmigo - SEGUNDA VERSÃO 

    // Adicionar o botão ao item da lista
    itemLista.appendChild(botaoRemover); // - SEGUNDA VERSÃO 
 
    listaAmigos.appendChild(itemLista); // Adicione o elemento <li> à lista HTML usando appendChild().
  }
}

// Função para remover um amigo - SEGUNDA VERSÃO 
function removerAmigo(index) {
  const nomeParaRemover = amigos[index]; // Pega o nome do amigo no índice onde foi clicado.

  const confirmar = confirm(`Você tem certeza que deseja remover "${nomeParaRemover}"?`); // É uma função nativa do JavaScript que mostra uma janelinha com "OK" e "Cancelar".

  // Só executa a remoção se a pessoa clicar OK.
  if (confirmar) {
  amigos.splice(index, 1); // Remove o amigo do array
  exibirListaAmigos(); // Atualiza a exibição da lista
  }
} 

// Função completa
function sortearAmigo() {
  if (amigos.length === 0) {
    if (amigosOriginais.length === 0) {
      document.getElementById('resultado').innerHTML = "⚠️ Não há amigos cadastrados para o sorteio.";
    } else {
      document.getElementById('resultado').innerHTML = `
        🎉 Todos os nomes foram sorteados!<br>
        Clique em <strong>'Novo Jogo'</strong> para começar de novo. 🔄
      `;
      document.getElementById('button-new-game').style.display = 'inline-block';

      listaEsvaziadaPorSorteio = true; // - SEGUNDA VERSÃO: essa linha foi explicitamente adicionada na segunda versão para sinalizar que a lista foi esvaziada pelo sorteio
    }
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos.splice(indiceAleatorio, 1)[0];

  const frases = [
    "E quem saiu foi... NOME! 🎯",
    "A sorte escolheu: NOME! 🍀",
    "Olha só quem foi sorteado: NOME! 👀",
    "Temos um nome! É o(a)... NOME! 🎉",
    "Rufem os tambores... NOME foi sorteado! 🥁",
    "Brilhou a estrela de NOME hoje! 💫",
    "Alerta de sorteado! NOME acaba de ser revelado! 🔊",
    "A roleta girou e parou em... NOME! 🎲",
    "Atenção, atenção! O sorteado é NOME! 📢",
    "O escolhido da vez atende por... NOME! 🎈",
    "🔥 *Habemus sorteado!* O nome é: NOME!"
  ]; // SEGUNDA VERSÃO 

  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  const fraseFinal = fraseAleatoria.replace("NOME", amigoSorteado);

  // Se for o último sorteio
  if (amigos.length === 0) {
    document.getElementById('resultado').innerHTML = `
      ${fraseFinal}<br>
      🎉 O último nome foi sorteado!<br>
      Clique em <strong>'Novo Jogo'</strong> para começar de novo. 🔄
    `;
    // Exibe o botão "Novo Jogo"
    document.getElementById('button-new-game').style.display = 'inline-block'; // Exibe o botão
  } else {
    document.getElementById('resultado').innerHTML = fraseFinal;
  }

  exibirListaAmigos(); // Atualiza a exibição
}

// Função para limpar a lista de amigos - SEGUNDA VERSÃO 
document.getElementById('button-clear').addEventListener('click', function () {
  const confirmarLimpeza = confirm("Tem certeza que deseja excluir todos os nomes da lista?");

  if (confirmarLimpeza) {
    amigos = [];
    amigosOriginais = [];
    listaFoiUsada = false;
    listaEsvaziadaPorSorteio = false;

    exibirListaAmigos();
    document.getElementById('resultado').innerHTML = "🔁 Lista de amigos foi limpa com sucesso. Você pode começar de novo!";
    document.getElementById('button-new-game').style.display = 'none';
  }
});

function novoJogo() {
  amigos = [];
  amigosOriginais = [];
  listaFoiUsada = false;         // RESETAR aqui também - SEGUNDA VERSÃO
  listaEsvaziadaPorSorteio = false; // RESETAR aqui também - SEGUNDA VERSÃO

  document.getElementById('listaAmigos').innerHTML = '';
  document.getElementById('resultado').innerHTML = '🎲 Jogo reiniciado! Adicione novos nomes para sortear.';
  document.getElementById('button-new-game').style.display = 'none';
}

