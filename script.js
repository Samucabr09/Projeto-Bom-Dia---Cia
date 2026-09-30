 /* ========== PARTE 1: ROLETA ========== */

  // Lista dos 6 prêmios (o primeiro, "PLAYSTATION!", é o especial)
  var prizes = ["PLAYSTATION!", "Kit de brinquedos", "Um abraço", "Tente de novo", "Pipoca doce", "Bicicleta!"];

  var w = document.getElementById("wheel");   // pega o círculo da roleta no HTML

  // Para cada prêmio, cria um texto e coloca dentro da roleta
  prizes.forEach(function (p, i) {
    var s = document.createElement("span");                  // cria um <span> novo
    s.textContent = p;                                       // escreve o nome do prêmio
    s.style.transform = "rotate(" + (i * 60 + 30 - 90) + "deg)";  // gira o texto até o meio da sua fatia (60° por fatia)
    w.appendChild(s);                                        // coloca dentro da roleta
  });

  var rot = 0;        // guarda quanto a roleta já girou no total
  var busy = false;   // true enquanto ela está girando (evita clicar de novo)

  // O que acontece ao clicar em GIRAR
  document.getElementById("spin").onclick = function () {
    if (busy) return;                          // se já está girando, ignora o clique
    busy = true;                               // marca que começou a girar

    var idx = Math.floor(Math.random() * 6);  // sorteia um número de 0 a 5 (o prêmio vencedor)

    // Calcula o giro: 5 voltas completas + o ângulo exato para parar no prêmio sorteado
    rot += 360 * 5 + (360 - (idx * 60 + 30)) - (rot % 360);
    w.style.transform = "rotate(" + rot + "deg)";   // gira a roleta (o CSS faz a animação de 4s)

    document.getElementById("res").textContent = "";  // limpa o resultado anterior

    // Espera a animação terminar (4,1 segundos) e mostra o resultado
    setTimeout(function () {
      busy = false;   // libera para girar de novo
      document.getElementById("res").textContent =
        idx === 0
          ? "🎮 PLAYSTATION, PLAYSTATION, PLAYSTATION!"   // mensagem especial se cair o PlayStation
          : "Você ganhou: " + prizes[idx];               // senão, mostra o prêmio
    }, 4100);
  };