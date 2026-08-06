let planetas = [

    {
        id:1,
        nome:"Terra",
        setor:"Alpha",
        risco:"Baixo",
        recursos:"Água, Oxigênio",
        descricao:"Planeta sede da Frota Espacial."
    },

    {
        id:2,
        nome:"Marte",
        setor:"Beta",
        risco:"Médio",
        recursos:"Ferro, Titânio",
        descricao:"Principal planeta de mineração."
    },

    {
        id:3,
        nome:"Pandora",
        setor:"Ômega",
        risco:"Alto",
        recursos:"Cristais de Energia",
        descricao:"Habitat de espécies desconhecidas."
    },

    {
        id:4,
        nome:"Europa",
        setor:"Gamma",
        risco:"Baixo",
        recursos:"Água Congelada",
        descricao:"Base científica."
    },

    {
        id:5,
        nome:"Kepler-22B",
        setor:"Delta",
        risco:"Médio",
        recursos:"Vegetação Exótica",
        descricao:"Planeta destinado às pesquisas."
    },

    {
        id:6,
        nome:"Xandar Prime",
        setor:"Ômega",
        risco:"Alto",
        recursos:"Cristais Quânticos, Plasma Azul",
        descricao:"Antiga capital de uma civilização perdida, cercada por tempestades de plasma."
    },

    {
        id:7,
        nome:"Nébula Vermelha IX",
        setor:"Épsilon",
        risco:"Alto",
        recursos:"Gás Ionizado, Minério Escarlate",
        descricao:"Nuvem de gás habitável envolta em radiação vermelha intensa."
    },

    {
        id:8,
        nome:"Cryonis",
        setor:"Zeta",
        risco:"Médio",
        recursos:"Gelo Puro, Energia Geotérmica",
        descricao:"Mundo gelado com oceanos subterrâneos e auroras permanentes."
    },

    {
        id:9,
        nome:"Draknor",
        setor:"Sigma",
        risco:"Alto",
        recursos:"Ligas Metálicas Raras",
        descricao:"Planeta vulcânico habitado por formas de vida extremófilas."
    },

    {
        id:10,
        nome:"Aurora Celestis",
        setor:"Alpha",
        risco:"Baixo",
        recursos:"Flora Bioluminescente",
        descricao:"Santuário natural conhecido pelos céus multicoloridos e clima ameno."
    }

];


let listaMissoes = [

    {

        id:1,

        nome:"Exploração Alpha",

        destino:"Marte",

        status:"Ativa"

    },

    {

        id:2,

        nome:"Pesquisa Pandora",

        destino:"Pandora",

        status:"Em andamento"

    },

    {

        id:3,

        nome:"Resgate Europa",

        destino:"Europa",

        status:"Concluída"

    }

];

let gruposFrota = [

    {

        id:1,

        nome:"Orion",

        capitao:"Lucas",

        integrantes:[

            "João",

            "Maria",

            "Pedro"

        ]

    },

    {

        id:2,

        nome:"Nebula",

        capitao:"Ana",

        integrantes:[

            "Carlos",

            "Fernanda",

            "Bruno"

        ]

    }

];


let tripulantesLivres = [

    {
        id:1,
        nome:"Renata"
    },

    {
        id:2,
        nome:"Diego"
    }

];



// ===============================================
// ELEMENTOS DA PÁGINA
// ===============================================

const contadorPlanetas = document.getElementById("planetas");

const contadorMissoes = document.getElementById("missoesTotal");

const contadorGrupos = document.getElementById("grupos");

const contadorTripulantes = document.getElementById("tripulantes");

const listaPlanetas = document.getElementById("listaPlanetas");

const infoPlaneta = document.getElementById("informacoes");

const tabelaMissoes = document.getElementById("tabelaMissoes");

const listaHistorico = document.getElementById("listaHistorico");

const listaGrupos = document.getElementById("listaGrupos");

const listaTripulantesLivres = document.getElementById("listaTripulantesLivres");

const listaIntegrantesGrupos = document.getElementById("listaIntegrantesGrupos");



// ===============================================
// FUNÇÕES AUXILIARES
// ===============================================

// Conta todos os tripulantes (em grupos + livres)

function contarTripulantes(){

    let total = 0;

    gruposFrota.forEach(grupo=>{

        total += grupo.integrantes.length;

    });

    total += tripulantesLivres.length;

    return total;

}



// Procura um planeta pelo ID

function buscarPlaneta(id){

    return planetas.find(planeta=>planeta.id===id);

}



// Gera um ID automático

function gerarId(lista){

    if(lista.length===0){

        return 1;

    }

    return Math.max(...lista.map(item=>item.id))+1;

}



// Classifica o status de uma missão de forma tolerante
// (evita quebrar cor/gráfico se o texto salvo vier diferente,
// com/sem acento, maiúsculas ou pequenas variações)

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



// Monta os "chips" de responsável para exibição na tabela

function formatarResponsaveis(texto){

    const nomes = listarResponsaveis(texto);

    if(nomes.length===0){

        return "-";

    }

    return nomes.map(nome=>`<span class="pessoa-tag">${nome}</span>`).join("");

}



// ===============================================
// LOCAL STORAGE
// ===============================================

function salvarSistema(){

    localStorage.setItem(

        "painel-nave",

        JSON.stringify({

            missoes:listaMissoes,

            grupos:gruposFrota,

            planetas:planetas,

            tripulantesLivres:tripulantesLivres

        })

    );

}



function carregarSistema(){

    const dados = localStorage.getItem("painel-nave");

    if(dados){

        const sistema = JSON.parse(dados);

        listaMissoes = sistema.missoes || listaMissoes;

        gruposFrota = sistema.grupos || gruposFrota;

        planetas = sistema.planetas || planetas;

        tripulantesLivres = sistema.tripulantesLivres || tripulantesLivres;

    }

}



// ===============================================
// INICIALIZAÇÃO
// ===============================================

carregarSistema();

console.log("Sistema iniciado com sucesso.");
// =======================================================
// DASHBOARD
// =======================================================


// Atualiza os números do dashboard

function atualizarDashboard(){

    if(contadorPlanetas){

        contadorPlanetas.textContent = planetas.length;

    }

    if(contadorMissoes){

        contadorMissoes.textContent = listaMissoes.length;

    }

    if(contadorGrupos){

        contadorGrupos.textContent = gruposFrota.length;

    }

    if(contadorTripulantes){

        contadorTripulantes.textContent = contarTripulantes();

    }

}



// =====================================
// CONTADOR ANIMADO
// =====================================

function animarNumero(elemento, valorFinal){

    if(!elemento) return;

    let numero = 0;

    const velocidade = Math.max(1, Math.floor(1500 / (valorFinal || 1)));

    const intervalo = setInterval(()=>{

        numero++;

        elemento.textContent = numero;

        if(numero >= valorFinal){

            clearInterval(intervalo);

        }

    }, velocidade);

}



function iniciarContadores(){

    animarNumero(contadorPlanetas, planetas.length);

    animarNumero(contadorMissoes, listaMissoes.length);

    animarNumero(contadorGrupos, gruposFrota.length);

    animarNumero(contadorTripulantes, contarTripulantes());

}



// =====================================
// RELÓGIO
// =====================================

function atualizarRelogio(){

    const relogio = document.getElementById("relogioDigital");

    if(!relogio) return;

    const agora = new Date();

    relogio.textContent = agora.toLocaleTimeString("pt-BR");

}

setInterval(atualizarRelogio,1000);



// =====================================
// ENERGIA DA NAVE
// =====================================

let energia = 100;

function atualizarEnergia(){

    const barra = document.getElementById("energia");

    const texto = document.getElementById("energiaTexto");

    if(!barra) return;

    energia--;

    if(energia < 0){

        energia = 100;

    }

    barra.style.width = energia + "%";

    if(texto){

        texto.textContent = energia + "%";

    }

}

setInterval(atualizarEnergia,300);



// =====================================
// TEMPERATURA
// =====================================

function atualizarTemperatura(){

    const temp = document.getElementById("temperatura");

    if(!temp) return;

    const temperatura = Math.floor(Math.random()*15)+18;

    temp.textContent = temperatura + "°C";

}

setInterval(atualizarTemperatura,5000);



// =====================================
// COMUNICAÇÃO
// =====================================

function atualizarComunicacao(){

    const status = document.getElementById("comunicacao");

    if(!status) return;

    const estados=[

        "ONLINE",

        "SINCRONIZANDO",

        "TRANSMITINDO"

    ];

    const indice=Math.floor(Math.random()*estados.length);

    status.textContent=estados[indice];

}

setInterval(atualizarComunicacao,4000);



// =====================================
// DATA ATUAL
// =====================================

function mostrarData(){

    const elemento = document.getElementById("dataAtual");

    if(!elemento) return;

    const hoje = new Date();

    elemento.textContent = hoje.toLocaleDateString("pt-BR");

}



// =====================================
// INICIAR DASHBOARD
// =====================================

window.addEventListener("load",()=>{

    atualizarDashboard();

    iniciarContadores();

    atualizarRelogio();

    atualizarTemperatura();

    atualizarComunicacao();

    mostrarData();

}); 
// ====================================================
// MAPA ESTELAR
// ====================================================


// Desenha todos os planetas

// Gera uma "imagem" (esfera com degradê) para cada planeta.
// Se o usuário escolher uma cor (coringa), usa ela; senão,
// gera uma cor consistente a partir do nome do planeta.

const paletaPorCor = {

    "amarelo": ["#f7971e","#ffd200"],

    "verde": ["#11998e","#38ef7d"],

    "vermelho": ["#eb3349","#f45c43"],

    "rosa": ["#f857a6","#ff5858"],

    "roxo": ["#8E2DE2","#4A00E0"],

    "azul-claro": ["#4facfe","#00f2fe"],

    "azul-escuro": ["#1e3c72","#2a5298"]

};

const paletasPlanetas = [

    ["#4facfe","#00f2fe"],

    ["#f83600","#f9d423"],

    ["#8E2DE2","#4A00E0"],

    ["#11998e","#38ef7d"],

    ["#eb3349","#f45c43"],

    ["#c31432","#240b36"],

    ["#f7971e","#ffd200"],

    ["#2193b0","#6dd5ed"],

    ["#ee0979","#ff6a00"],

    ["#00c6ff","#0072ff"]

];

function imagemPlaneta(planeta){

    if(planeta.cor && paletaPorCor[planeta.cor]){

        const [corA, corB] = paletaPorCor[planeta.cor];

        return `radial-gradient(circle at 32% 28%, ${corA}, ${corB} 75%)`;

    }

    let hash = 0;

    for(let i=0;i<planeta.nome.length;i++){

        hash = planeta.nome.charCodeAt(i) + ((hash<<5)-hash);

    }

    const indice = Math.abs(hash) % paletasPlanetas.length;

    const [corA, corB] = paletasPlanetas[indice];

    return `radial-gradient(circle at 32% 28%, ${corA}, ${corB} 75%)`;

}



function desenharPlanetas(lista = planetas){

    if(!listaPlanetas) return;

    listaPlanetas.innerHTML="";

    lista.forEach(planeta=>{

        let cor="#00F5A0";

        if(planeta.risco=="Médio"){

            cor="orange";

        }

        if(planeta.risco=="Alto"){

            cor="red";

        }

        listaPlanetas.innerHTML += `

        <div class="planeta">

            <div class="planeta-imagem ${planeta.risco=="Alto" ? "tem-anel" : ""}" style="background:${imagemPlaneta(planeta)}"></div>

            <h3>${planeta.nome}</h3>

            <p>Setor ${planeta.setor}</p>

            <span style="color:${cor}">

                ${planeta.risco}

            </span>

            <div class="acoes">

                <button class="btn-ver" onclick="abrirPlaneta(${planeta.id})">

                    Ver informações

                </button>

                <button class="btn-icone" onclick="editarPlaneta(${planeta.id})">

                    ✏️

                </button>

                <button class="btn-icone btn-icone-excluir" onclick="removerPlaneta(${planeta.id})">

                    🗑️

                </button>

            </div>

        </div>

        `;

    });

    atualizarDashboard();

    salvarSistema();

}



// =========================================
// ABRIR PLANETA
// =========================================

function abrirPlaneta(id){

    const planeta = buscarPlaneta(id);

    if(!planeta) return;

    infoPlaneta.innerHTML = `

        <div class="planeta-imagem planeta-imagem-grande ${planeta.risco=="Alto" ? "tem-anel" : ""}" style="background:${imagemPlaneta(planeta)}"></div>

        <h2>${planeta.nome}</h2>

        <hr>

        <p><strong>Setor:</strong> ${planeta.setor}</p>

        <p><strong>Risco:</strong> ${planeta.risco}</p>

        <p><strong>Recursos:</strong> ${planeta.recursos}</p>

        <br>

        <p>${planeta.descricao}</p>

    `;

}



// =========================================
// PESQUISA
// =========================================

const pesquisa = document.getElementById("pesquisa");

if(pesquisa){

pesquisa.addEventListener("keyup",()=>{

const texto = pesquisa.value.toLowerCase();

const resultado = planetas.filter(planeta=>{

return planeta.nome.toLowerCase().includes(texto);

});

desenharPlanetas(resultado);

});

}



// =========================================
// NOVO PLANETA
// =========================================

const modalPlaneta = document.getElementById("modalPlaneta");

const btnNovoPlaneta = document.getElementById("btnNovoPlaneta");

let editandoPlaneta = null;

if(btnNovoPlaneta){

btnNovoPlaneta.onclick=function(){

editandoPlaneta = null;

document.getElementById("nomePlaneta").value="";

document.getElementById("setorPlaneta").value="";

document.getElementById("recursosPlaneta").value="";

document.getElementById("riscoPlaneta").value="Baixo";

document.getElementById("corPlaneta").value="";

document.getElementById("descricaoPlaneta").value="";

modalPlaneta.style.display="flex";

}

}



const salvarPlaneta = document.getElementById("salvarPlaneta");


if(salvarPlaneta){

salvarPlaneta.onclick=function(){

const nome=document.getElementById("nomePlaneta").value;

const setor=document.getElementById("setorPlaneta").value;

const recursos=document.getElementById("recursosPlaneta").value;

const risco=document.getElementById("riscoPlaneta").value;

const cor=document.getElementById("corPlaneta").value;

const descricao=document.getElementById("descricaoPlaneta").value;

if(nome=="" || setor==""){

alert("Preencha todos os campos.");

return;

}

if(editandoPlaneta==null){

planetas.push({

id:gerarId(planetas),

nome,

setor,

risco,

cor,

recursos,

descricao

});

mostrarNotificacao("🌍 Planeta cadastrado.");

}else{

editandoPlaneta.nome=nome;

editandoPlaneta.setor=setor;

editandoPlaneta.risco=risco;

editandoPlaneta.cor=cor;

editandoPlaneta.recursos=recursos;

editandoPlaneta.descricao=descricao;

mostrarNotificacao("✏️ Planeta atualizado.");

}

desenharPlanetas();

salvarSistema();

modalPlaneta.style.display="none";

}

}



// =========================================
// REMOVER
// =========================================

function removerPlaneta(id){

const indice = planetas.findIndex(planeta=>{

return planeta.id==id;

});

if(indice==-1){

return;

}

if(confirm("Deseja remover este planeta?")){

planetas.splice(indice,1);

desenharPlanetas();

mostrarNotificacao("🗑️ Planeta removido.");

}

}



// =========================================
// EDITAR
// =========================================

function editarPlaneta(id){

const planeta = buscarPlaneta(id);

if(!planeta) return;

editandoPlaneta = planeta;

document.getElementById("nomePlaneta").value = planeta.nome;

document.getElementById("setorPlaneta").value = planeta.setor;

document.getElementById("recursosPlaneta").value = planeta.recursos;

document.getElementById("descricaoPlaneta").value = planeta.descricao;

document.getElementById("riscoPlaneta").value = planeta.risco;

document.getElementById("corPlaneta").value = planeta.cor || "";

modalPlaneta.style.display="flex";

}



// =========================================
// FECHAR MODAL
// =========================================

window.addEventListener("click",(e)=>{

if(e.target==modalPlaneta){

modalPlaneta.style.display="none";

}

});



// =========================================
// INICIAR
// =========================================

desenharPlanetas();
// =====================================================
// MISSÕES
// =====================================================

let editandoMissao = null;

const modalMissao = document.getElementById("modalMissao");

// ---------------------------
// DESENHAR TABELA
// ---------------------------

function desenharMissoes(lista = listaMissoes){

    if(!tabelaMissoes) return;

    tabelaMissoes.innerHTML = "";

    lista.forEach(missao=>{

        const classeStatus = classificarStatus(missao.status);

        tabelaMissoes.innerHTML += `

        <tr>

            <td>${missao.nome}</td>

            <td>${missao.destino}</td>

            <td>${formatarResponsaveis(missao.responsavel)}</td>

            <td>${classeStatus==="concluida" ? formatarResponsaveis(missao.concluidoPor) : "-"}</td>

            <td>${missao.prioridade || "-"}</td>

            <td>

                <span class="status ${classeStatus}">${missao.status}</span>

            </td>

            <td>${missao.data || "-"}</td>

            <td>

                ${classeStatus !== "concluida" ? `
                <button class="btn-icone btn-icone-concluir" onclick="abrirConcluirMissao(${missao.id})" title="Concluir missão">
                    ✅
                </button>
                ` : ""}

                <button class="btn-icone" onclick="editarMissao(${missao.id})">

                    ✏️

                </button>

                <button class="btn-icone btn-icone-excluir" onclick="removerMissao(${missao.id})">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

    desenharHistorico();

    atualizarDashboard();

    salvarSistema();

}

// ---------------------------
// HISTÓRICO DE MISSÕES CONCLUÍDAS
// ---------------------------

function desenharHistorico(){

    if(!listaHistorico) return;

    const concluidas = listaMissoes.filter(m=>classificarStatus(m.status)==="concluida");

    if(concluidas.length===0){

        listaHistorico.innerHTML = "<p>Nenhuma missão concluída ainda.</p>";

        return;

    }

    // Mostra apenas a última missão concluída aqui.
    // O histórico completo com todas as missões concluídas
    // e o ranking ficam somente na página historico.html.

    const ultimaConcluida = [...concluidas].sort((a,b)=>{

        return (b.concluidaEm || 0) - (a.concluidaEm || 0);

    })[0];

    listaHistorico.innerHTML = `

    <div class="item-historico">

        <span class="nome-historico">${ultimaConcluida.nome}</span>

        <span>${ultimaConcluida.destino}</span>

        <span><strong>Responsável:</strong> ${formatarResponsaveis(ultimaConcluida.responsavel)}</span>

        <span><strong>Concluída por:</strong> ${formatarResponsaveis(ultimaConcluida.concluidoPor)}</span>

        <span>${ultimaConcluida.data || "-"}</span>

    </div>

    `;

}

// ---------------------------
// NOVA MISSÃO
// ---------------------------

const btnNovaMissao = document.getElementById("btnNovaMissao");

if(btnNovaMissao){

    btnNovaMissao.onclick=function(){

        editandoMissao = null;

        document.getElementById("nomeMissao").value="";

        document.getElementById("destinoMissao").value="";

        document.getElementById("responsavelMissao").value="";

        document.getElementById("dataMissao").value="";

        document.getElementById("prioridadeMissao").value="Baixa";

        document.getElementById("statusMissao").value="Ativa";

        modalMissao.style.display="flex";

    }

}

// ---------------------------
// SALVAR
// ---------------------------

document.getElementById("salvarMissao").onclick=function(){

    const nome=document.getElementById("nomeMissao").value.trim();

    const destino=document.getElementById("destinoMissao").value.trim();

    const responsavel=document.getElementById("responsavelMissao").value.trim();

    const data=document.getElementById("dataMissao").value;

    const prioridade=document.getElementById("prioridadeMissao").value;

    const status=document.getElementById("statusMissao").value;

    if(nome=="" || destino==""){

        alert("Preencha os campos obrigatórios.");

        return;

    }

    if(editandoMissao==null){

        listaMissoes.push({

            id:gerarId(listaMissoes),

            nome,

            destino,

            responsavel,

            prioridade,

            status,

            data

        });

        mostrarNotificacao("🚀 Missão criada.");

    }

    else{

        editandoMissao.nome=nome;

        editandoMissao.destino=destino;

        editandoMissao.responsavel=responsavel;

        editandoMissao.prioridade=prioridade;

        editandoMissao.status=status;

        editandoMissao.data=data;

        mostrarNotificacao("✏️ Missão atualizada.");

    }

    modalMissao.style.display="none";

    desenharMissoes();

};

// ---------------------------
// EDITAR
// ---------------------------

function editarMissao(id){

    editandoMissao = listaMissoes.find(m=>m.id===id);

    if(!editandoMissao) return;

    document.getElementById("nomeMissao").value=editandoMissao.nome;

    document.getElementById("destinoMissao").value=editandoMissao.destino;

    document.getElementById("responsavelMissao").value=editandoMissao.responsavel || "";

    document.getElementById("dataMissao").value=editandoMissao.data || "";

    document.getElementById("prioridadeMissao").value=editandoMissao.prioridade || "Baixa";

    document.getElementById("statusMissao").value=editandoMissao.status;

    modalMissao.style.display="flex";

}

// ---------------------------
// EXCLUIR
// ---------------------------

function removerMissao(id){

    if(!confirm("Deseja excluir esta missão?")) return;

    listaMissoes = listaMissoes.filter(m=>m.id!==id);

    desenharMissoes();

    mostrarNotificacao("🗑️ Missão removida.");

}

// ---------------------------
// CONCLUIR MISSÃO
// ---------------------------

const modalConcluirMissao = document.getElementById("modalConcluirMissao");

let missaoParaConcluir = null;

function abrirConcluirMissao(id){

    missaoParaConcluir = listaMissoes.find(m=>m.id===id);

    if(!missaoParaConcluir || !modalConcluirMissao) return;

    document.getElementById("nomeMissaoConcluir").textContent = missaoParaConcluir.nome;

    document.getElementById("responsavelConcluirMissao").value = missaoParaConcluir.concluidoPor || "";

    modalConcluirMissao.style.display="flex";

}

const btnConfirmarConcluirMissao = document.getElementById("confirmarConcluirMissao");

if(btnConfirmarConcluirMissao){

    btnConfirmarConcluirMissao.onclick = ()=>{

        if(!missaoParaConcluir) return;

        const responsaveis = document.getElementById("responsavelConcluirMissao").value.trim();

        if(responsaveis===""){

            alert("Informe quem concluiu a missão.");

            return;

        }

        missaoParaConcluir.status = "Concluída";

        missaoParaConcluir.concluidoPor = responsaveis;

        missaoParaConcluir.concluidaEm = Date.now();

        desenharMissoes();

        desenharGrafico();

        salvarSistema();

        mostrarNotificacao("✅ Missão concluída com sucesso!");

        modalConcluirMissao.style.display="none";

        missaoParaConcluir = null;

    };

}

// ---------------------------
// PESQUISA
// ---------------------------

const pesquisaMissao = document.getElementById("pesquisaMissao");

if(pesquisaMissao){

    pesquisaMissao.addEventListener("input",()=>{

        const texto = pesquisaMissao.value.toLowerCase();

        const resultado = listaMissoes.filter(m=>{

            return m.nome.toLowerCase().includes(texto) ||

                   m.destino.toLowerCase().includes(texto) ||

                   (m.responsavel || "").toLowerCase().includes(texto);

        });

        desenharMissoes(resultado);

    });

}

// ---------------------------
// FECHAR MODAL
// ---------------------------

window.addEventListener("click",(e)=>{

    if(e.target===modalMissao){

        modalMissao.style.display="none";

    }

});

// ---------------------------
// INICIAR
// ---------------------------

desenharMissoes();
// =====================================================
// FROTA ESPACIAL
// =====================================================

let editandoGrupo = null;

const modalGrupo = document.getElementById("modalGrupo");

// ===========================================
// DESENHAR GRUPOS
// ===========================================

function desenharGrupos(lista = gruposFrota){

    if(!listaGrupos) return;

    listaGrupos.innerHTML="";

    lista.forEach(grupo=>{

        let cor="#00F5A0";

        if(grupo.nivel=="Intermediário"){

            cor="orange";

        }

        if(grupo.nivel=="Elite"){

            cor="gold";

        }

        listaGrupos.innerHTML += `

        <div class="grupo">

            <h3>${grupo.nome}</h3>

            <hr>

            <p><strong>Capitão:</strong> ${grupo.capitao}</p>

            <p><strong>Nível:</strong>

                <span class="nivel-badge" style="color:${cor};border-color:${cor}">

                    ${grupo.nivel || "Iniciante"}

                </span>

            </p>

            <p>

                <strong>Tripulantes:</strong>

                ${grupo.integrantes.length}

            </p>

            <div class="acoes">

                <button class="btn-detalhes" onclick="verDetalhesGrupo(${grupo.id})">

                    👁️ Ver detalhes

                </button>

                <button class="btn-icone" onclick="editarGrupo(${grupo.id})">

                    ✏️

                </button>

                <button class="btn-icone btn-icone-excluir" onclick="removerGrupo(${grupo.id})">

                    🗑️

                </button>

            </div>

        </div>

        `;

    });

    desenharIntegrantesGrupos();

    atualizarStatsTripulantes();

    atualizarDashboard();

    salvarSistema();

}

// ===========================================
// TRIPULANTES FORA DE GRUPO
// ===========================================
// Espaço com quem ainda NÃO está em nenhum grupo,
// puxado da lista de tripulantesLivres.

function desenharIntegrantesGrupos(){

    if(!listaIntegrantesGrupos) return;

    if(tripulantesLivres.length===0){

        listaIntegrantesGrupos.innerHTML = "<p>Nenhum tripulante fora de grupo no momento.</p>";

        return;

    }

    const tags = tripulantesLivres.map(pessoa=>`<span class="pessoa-tag">${pessoa.nome}</span>`).join("");

    listaIntegrantesGrupos.innerHTML = `

    <div class="integrantes-grupo-linha">
        <div class="integrantes-grupo-tags">${tags}</div>
    </div>

    `;

}

// ===========================================
// DETALHES DO GRUPO (MODAL)
// ===========================================

const modalDetalhesGrupo = document.getElementById("modalDetalhesGrupo");

function verDetalhesGrupo(id){

    const grupo = gruposFrota.find(g=>g.id===id);

    if(!grupo || !modalDetalhesGrupo) return;

    let cor="#00F5A0";

    if(grupo.nivel=="Intermediário"){

        cor="orange";

    }

    if(grupo.nivel=="Elite"){

        cor="gold";

    }

    document.getElementById("detalheNomeGrupo").textContent = grupo.nome;

    document.getElementById("detalheCapitaoGrupo").textContent = grupo.capitao;

    document.getElementById("detalheEspecialidadeGrupo").textContent = grupo.especialidade || "Não informada";

    const nivelEl = document.getElementById("detalheNivelGrupo");

    nivelEl.textContent = grupo.nivel || "Iniciante";

    nivelEl.style.color = cor;

    nivelEl.style.borderColor = cor;

    const listaEl = document.getElementById("detalheIntegrantesGrupo");

    if(grupo.integrantes.length===0){

        listaEl.innerHTML = "<p>Nenhum integrante cadastrado.</p>";

    }else{

        listaEl.innerHTML = grupo.integrantes

            .map(i=>`<span class="pessoa-tag">${i}</span>`)

            .join("");

    }

    modalDetalhesGrupo.style.display="flex";

}

// ===========================================
// TRIPULANTES LIVRES
// ===========================================

function desenharTripulantesLivres(){

    if(!listaTripulantesLivres) return;

    listaTripulantesLivres.innerHTML="";

    if(tripulantesLivres.length===0){

        listaTripulantesLivres.innerHTML="<p>Nenhum tripulante livre no momento.</p>";

    }

    tripulantesLivres.forEach(pessoa=>{

        listaTripulantesLivres.innerHTML += `

        <div class="tripulante-livre-card">

            <div class="tripulante-livre-avatar">${pessoa.nome.charAt(0).toUpperCase()}</div>

            <h4>${pessoa.nome}</h4>

            <p class="tripulante-caracteristicas">${pessoa.caracteristicas || "Nenhuma característica cadastrada."}</p>

            <div class="acoes">

                <button class="btn-icone" onclick="editarCaracteristicasTripulante(${pessoa.id})" title="Características">

                    ✏️

                </button>

                <button class="btn-icone btn-icone-excluir" onclick="removerTripulanteLivre(${pessoa.id})" title="Remover">

                    🗑️

                </button>

            </div>

        </div>

        `;

    });

    desenharIntegrantesGrupos();

    atualizarStatsTripulantes();

    atualizarDashboard();

    salvarSistema();

}

function atualizarStatsTripulantes(){

    const statTotal = document.getElementById("statTotalTripulantes");

    const statGrupos = document.getElementById("statTripulantesGrupos");

    const statLivres = document.getElementById("statTripulantesLivres");

    if(!statTotal || !statGrupos || !statLivres) return;

    let emGrupos = 0;

    gruposFrota.forEach(grupo=>{

        emGrupos += grupo.integrantes.length;

    });

    statGrupos.textContent = emGrupos;

    statLivres.textContent = tripulantesLivres.length;

    statTotal.textContent = emGrupos + tripulantesLivres.length;

}

const btnAddTripulanteLivre = document.getElementById("btnAddTripulanteLivre");

if(btnAddTripulanteLivre){

btnAddTripulanteLivre.onclick=function(){

const campoNome = document.getElementById("nomeTripulanteLivre");

const nome = campoNome.value.trim();

if(nome==""){

alert("Digite o nome do tripulante.");

return;

}

tripulantesLivres.push({

id:gerarId(tripulantesLivres),

nome,

caracteristicas:""

});

campoNome.value="";

desenharTripulantesLivres();

mostrarNotificacao("🧑‍🚀 Tripulante livre adicionado.");

}

}

function removerTripulanteLivre(id){

if(!confirm("Deseja remover este tripulante da lista de livres?")) return;

tripulantesLivres = tripulantesLivres.filter(p=>p.id!==id);

desenharTripulantesLivres();

mostrarNotificacao("🗑️ Tripulante removido.");

}

// ---------------------------
// CARACTERÍSTICAS DO TRIPULANTE
// ---------------------------

const modalCaracteristicas = document.getElementById("modalCaracteristicasTripulante");

let editandoCaracteristicasId = null;

function editarCaracteristicasTripulante(id){

    const pessoa = tripulantesLivres.find(p=>p.id===id);

    if(!pessoa || !modalCaracteristicas) return;

    editandoCaracteristicasId = id;

    document.getElementById("nomeTripulanteCaracteristicas").textContent = pessoa.nome;

    document.getElementById("caracteristicasTripulante").value = pessoa.caracteristicas || "";

    modalCaracteristicas.style.display="flex";

}

const btnSalvarCaracteristicas = document.getElementById("salvarCaracteristicasTripulante");

if(btnSalvarCaracteristicas){

    btnSalvarCaracteristicas.onclick = ()=>{

        const pessoa = tripulantesLivres.find(p=>p.id===editandoCaracteristicasId);

        if(pessoa){

            pessoa.caracteristicas = document.getElementById("caracteristicasTripulante").value.trim();

            desenharTripulantesLivres();

            mostrarNotificacao("✏️ Características atualizadas.");

        }

        modalCaracteristicas.style.display="none";

        editandoCaracteristicasId = null;

    };

}


// ===========================================
// NOVO GRUPO
// ===========================================

const btnNovoGrupo=document.getElementById("btnNovoGrupo");

if(btnNovoGrupo){

btnNovoGrupo.onclick=function(){

editandoGrupo=null;

document.getElementById("nomeGrupo").value="";

document.getElementById("capitaoGrupo").value="";

document.getElementById("especialidadeGrupo").value="";

document.getElementById("integrantesGrupo").value="";

document.getElementById("nivelGrupo").value="Iniciante";

modalGrupo.style.display="flex";

}

}

// ===========================================
// SALVAR
// ===========================================

document.getElementById("salvarGrupo").onclick=function(){

const nome=document.getElementById("nomeGrupo").value.trim();

const capitao=document.getElementById("capitaoGrupo").value.trim();

const especialidade=document.getElementById("especialidadeGrupo").value.trim();

const nivel=document.getElementById("nivelGrupo").value;

const integrantes=document.getElementById("integrantesGrupo").value
.split(",")
.map(i=>i.trim())
.filter(i=>i!="");

if(nome=="" || capitao==""){

alert("Preencha os campos obrigatórios.");

return;

}

if(editandoGrupo==null){

gruposFrota.push({

id:gerarId(gruposFrota),

nome,

capitao,

especialidade,

nivel,

integrantes

});

mostrarNotificacao("👨‍🚀 Grupo criado.");

}else{

editandoGrupo.nome=nome;

editandoGrupo.capitao=capitao;

editandoGrupo.especialidade=especialidade;

editandoGrupo.nivel=nivel;

editandoGrupo.integrantes=integrantes;

mostrarNotificacao("✏️ Grupo atualizado.");

}

modalGrupo.style.display="none";

desenharGrupos();

};

// ===========================================
// EDITAR
// ===========================================

function editarGrupo(id){

editandoGrupo=gruposFrota.find(g=>g.id===id);

if(!editandoGrupo) return;

document.getElementById("nomeGrupo").value=editandoGrupo.nome;

document.getElementById("capitaoGrupo").value=editandoGrupo.capitao;

document.getElementById("especialidadeGrupo").value=editandoGrupo.especialidade || "";

document.getElementById("nivelGrupo").value=editandoGrupo.nivel || "Iniciante";

document.getElementById("integrantesGrupo").value=editandoGrupo.integrantes.join(", ");

modalGrupo.style.display="flex";

}

// ===========================================
// REMOVER
// ===========================================

function removerGrupo(id){

if(!confirm("Deseja excluir este grupo?")) return;

gruposFrota=gruposFrota.filter(g=>g.id!==id);

desenharGrupos();

mostrarNotificacao("🗑️ Grupo removido.");

}

// ===========================================
// PESQUISA
// ===========================================

const pesquisaGrupo=document.getElementById("pesquisaGrupo");

if(pesquisaGrupo){

pesquisaGrupo.addEventListener("input",()=>{

const texto=pesquisaGrupo.value.toLowerCase();

const resultado=gruposFrota.filter(grupo=>{

return grupo.nome.toLowerCase().includes(texto)

|| grupo.capitao.toLowerCase().includes(texto)

|| (grupo.especialidade || "").toLowerCase().includes(texto);

});

desenharGrupos(resultado);

});

}

// ===========================================
// FECHAR MODAL
// ===========================================

window.addEventListener("click",(e)=>{

if(e.target===modalGrupo){

modalGrupo.style.display="none";

}

if(e.target===modalDetalhesGrupo){

modalDetalhesGrupo.style.display="none";

}

if(e.target===modalConcluirMissao){

modalConcluirMissao.style.display="none";

}

if(e.target===modalCaracteristicas){

modalCaracteristicas.style.display="none";

}

});

// ===========================================
// ESTATÍSTICAS DA FROTA
// ===========================================

function estatisticasFrota(){

let elite=0;

let intermediario=0;

let iniciante=0;

gruposFrota.forEach(g=>{

switch(g.nivel){

case "Elite":
elite++;
break;

case "Intermediário":
intermediario++;
break;

default:
iniciante++;

}

});

console.log("====== FROTA ======");

console.log("Elite:",elite);

console.log("Intermediário:",intermediario);

console.log("Iniciante:",iniciante);

console.log("Tripulantes:",contarTripulantes());

}

// ===========================================
// INICIAR
// ===========================================

desenharGrupos();

desenharTripulantesLivres();

estatisticasFrota();
function mostrarNotificacao(texto){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.textContent = texto;

    toast.classList.add("mostrar");

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },3000);

}

const btnTema = document.getElementById("tema");

if(btnTema){

    btnTema.onclick=()=>{

        document.body.classList.toggle("temaClaro");

        localStorage.setItem(

            "tema",

            document.body.classList.contains("temaClaro")

        );

        desenharGrafico();

    }

}

const temaSalvo = localStorage.getItem("tema");

if(temaSalvo==="true"){

    document.body.classList.add("temaClaro");

}

const btnIniciarSistema = document.getElementById("btnIniciarSistema");

if(btnIniciarSistema){

    btnIniciarSistema.onclick=()=>{

        const dashboard = document.getElementById("dashboard");

        if(dashboard){

            dashboard.scrollIntoView({behavior:"smooth"});

        }

        iniciarContadores();

        mostrarNotificacao("🚀 Sistema iniciado com sucesso!");

    }

}

window.addEventListener("load",()=>{

setTimeout(()=>{

const tela=document.getElementById("loading");

if(tela){

tela.style.display="none";

}

if(btnTema){

btnTema.classList.add("visivel");

}

},1500);

});

function desenharGrafico(){

const canvas=document.getElementById("grafico");

if(!canvas) return;

const ctx=canvas.getContext("2d");

const ativa=listaMissoes.filter(m=>classificarStatus(m.status)==="ativa").length;

const andamento=listaMissoes.filter(m=>classificarStatus(m.status)==="andamento").length;

const concluida=listaMissoes.filter(m=>classificarStatus(m.status)==="concluida").length;

ctx.clearRect(0,0,500,300);

ctx.fillStyle="#00F5A0";
ctx.fillRect(50,250-(ativa*40),60,ativa*40);

ctx.fillStyle="orange";
ctx.fillRect(180,250-(andamento*40),60,andamento*40);

ctx.fillStyle="red";
ctx.fillRect(310,250-(concluida*40),60,concluida*40);

ctx.fillStyle = document.body.classList.contains("temaClaro") ? "#222" : "white";

ctx.fillText("Ativas",50,270);
ctx.fillText("Andamento",170,270);
ctx.fillText("Concluídas",300,270);

}
desenharGrafico();
const menu=document.querySelector("nav");

const botao=document.getElementById("menuMobile");

if(botao){

botao.onclick=()=>{

menu.classList.toggle("ativo");

}

}