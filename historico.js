function classificarStatus(status){

    const texto = (status || "").toLowerCase();

    if(texto.includes("andamento")){

        return "andamento";

    }

    if(texto.includes("conclu")){

        return "concluida";

    }

    return "ativa";

}

// Transforma "Nome1, Nome2" em uma lista de nomes limpos.
// Usado tanto para exibir quanto para contar no ranking
// (cada pessoa conta 1 missão concluída).

function listarResponsaveis(texto){

    return (texto || "")

        .split(",")

        .map(nome=>nome.trim())

        .filter(nome=>nome.length>0);

}

function formatarResponsaveis(texto){

    const nomes = listarResponsaveis(texto);

    if(nomes.length===0){

        return "Não informado";

    }

    return nomes.map(nome=>`<span class="pessoa-tag">${nome}</span>`).join("");

}

// CARREGAR DADOS DO PAINEL

function carregarMissoes(){

    const dados = localStorage.getItem("painel-nave");

    if(!dados) return [];

    try{

        const sistema = JSON.parse(dados);

        return sistema.missoes || [];

    }catch(erro){

        console.error("Erro ao ler dados do painel:", erro);

        return [];

    }

}

const listaMissoes = carregarMissoes();

const missoesConcluidas = listaMissoes.filter(m=>classificarStatus(m.status)==="concluida");

// TABELA DE HISTÓRICO

function desenharTabelaHistorico(){

    const corpo = document.getElementById("tabelaHistoricoCompleto");

    const resumo = document.getElementById("resumoHistorico");

    if(!corpo) return;

    if(resumo){

        resumo.innerHTML = `
            <div class="resumo-card">
                <span class="resumo-numero">${missoesConcluidas.length}</span>
                <span>missões concluídas ao todo</span>
            </div>
        `;

    }

    if(missoesConcluidas.length===0){

        corpo.innerHTML = `<tr><td colspan="6">Nenhuma missão concluída até o momento.</td></tr>`;

        return;

    }

    corpo.innerHTML = "";

    missoesConcluidas.forEach(missao=>{

        corpo.innerHTML += `
        <tr>
            <td>${missao.nome}</td>
            <td>${missao.destino}</td>
            <td>${formatarResponsaveis(missao.responsavel)}</td>
            <td>${formatarResponsaveis(missao.concluidoPor)}</td>
            <td>${missao.prioridade || "-"}</td>
            <td>${missao.data || "-"}</td>
        </tr>
        `;

    });

}


// RANKING DE TRIPULANTES

function calcularRanking(){

    const contagem = {};

    missoesConcluidas.forEach(missao=>{

        const pessoas = listarResponsaveis(missao.concluidoPor);

        if(pessoas.length===0){

            contagem["Não informado"] = (contagem["Não informado"] || 0) + 1;

            return;

        }

        // Cada pessoa listada conta 1 missão concluída,
        // mesmo quando a missão foi feita em equipe.
        pessoas.forEach(nome=>{

            contagem[nome] = (contagem[nome] || 0) + 1;

        });

    });

    return Object.entries(contagem)

        .map(([nome, total])=>({nome, total}))

        .sort((a, b)=>b.total - a.total);

}

function desenharRanking(){

    const container = document.getElementById("listaRanking");

    if(!container) return;

    const ranking = calcularRanking();

    if(ranking.length===0){

        container.innerHTML = "<p>Ainda não há dados suficientes para montar o ranking.</p>";

        return;

    }

    const medalhas = ["🥇", "🥈", "🥉"];

    const maiorTotal = ranking[0].total;

    container.innerHTML = "";

    ranking.forEach((pessoa, indice)=>{

        const posicao = medalhas[indice] || `${indice + 1}º`;

        const porcentagem = Math.round((pessoa.total / maiorTotal) * 100);

        container.innerHTML += `
        <div class="ranking-item">
            <span class="ranking-posicao">${posicao}</span>
            <div class="ranking-info">
                <div class="ranking-nome-linha">
                    <span class="ranking-nome">${pessoa.nome}</span>
                    <span class="ranking-total">${pessoa.total} missão${pessoa.total>1 ? "ões" : ""}</span>
                </div>
                <div class="ranking-barra">
                    <div class="ranking-barra-preenchida" style="width:${porcentagem}%"></div>
                </div>
            </div>
        </div>
        `;

    });

}

// TEMA (mesma lógica do painel principal)

const temaSalvo = localStorage.getItem("tema");

if(temaSalvo==="true"){

    document.body.classList.add("temaClaro");

}

const btnTema = document.getElementById("tema");

if(btnTema){

    btnTema.onclick = ()=>{

        document.body.classList.toggle("temaClaro");

        localStorage.setItem("tema", document.body.classList.contains("temaClaro"));

    };

}

// MENU MOBILE

const botaoMenu = document.getElementById("menuMobile");

const menuNav = document.querySelector("nav");

if(botaoMenu && menuNav){

    botaoMenu.onclick = ()=>{

        menuNav.classList.toggle("ativo");

    };

}

desenharTabelaHistorico();

desenharRanking();