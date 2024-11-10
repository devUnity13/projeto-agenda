const form = document.getElementById('myForm');
const nomeCompleto = document.getElementById('nome-contato');
const telefone = document.getElementById('telefone-contato');
const tabela = document.getElementById('table-contato');
const listaDeContatos = []
const totalContatos = document.getElementById('total-contatos');
let nomeValido = false;
let telefoneValido = false;
let tipoContato = "";
let linha = "";

telefone.addEventListener('input', mascaraTelefone);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    defineTipoDoNumero();

    if (!validaCampos()) {
        resetaCampos();
        return;
    }

    //criar regra de popular a tabela
    linha = criaElemento('tr');

    tabela.appendChild(linha);

    criaConteudoDaLinha(nomeCompleto.value);
    criaConteudoDaLinha(telefone.value);

    if (tipoContato === "Telefone Fixo") {
        criaConteudoDaLinha("<img src='./img/telefone.png' alt='Telefone Fixo' title='Fixo'>");
    }
    else if (tipoContato === "Telefone Celular") {
        criaConteudoDaLinha("<img src='./img/celular.png' alt='Celular' title='Celular'>");
    }

    listaDeContatos.push({
        pessoa: nomeCompleto.value,
        telefone: telefone.value,
        tipo: tipoContato
    });

    console.log(totalContatos)
    totalContatos.innerText = listaDeContatos.length

    //aqui eu vou remover as linhas de placeholder
    if (document.querySelector('.placeholder') != null) {
        document.querySelector('.placeholder').remove('tr');
    }

    resetaCampos();
    console.log(listaDeContatos);
})

// Função para aplicar a máscara no telefone
function mascaraTelefone(event) {
    let telefoneFormatado = event.target.value.replace(/\D/g, '');
    if (telefoneFormatado.length <= 2) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})/, '($1');
    } else if (telefoneFormatado.length <= 6) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{4})/, '($1) $2');
    } else if (telefoneFormatado.length <= 10) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{4})(\d{1})/, '($1) $2-$3');
    } else {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    event.target.value = telefoneFormatado;
}

function criaElemento(elemento) {
    return document.createElement(elemento)
}

function criaConteudoDaLinha(conteudo) {
    const conteudoLinha = document.createElement('td');
    conteudoLinha.innerHTML = conteudo;
    linha.appendChild(conteudoLinha);
}

function defineTipoDoNumero() {
    switch (telefone.value.length) {
        case 14:
            tipoContato = "Telefone Fixo";
            break;

        case 15:
            tipoContato = "Telefone Celular";
            break;
        default:
            tipoContato = "Não válido";
            break;
    }
}

function validaCampos() {
    let ehDuplicado = false

    nomeValido = nomeCompleto.value.split(' ').length >= 2;
    telefoneValido = telefone.value.length >= 14 && telefone.value.length <= 15;

    for (let contato of listaDeContatos) {
        if (contato.pessoa === nomeCompleto.value) {
            if (contato.telefone === telefone.value) {
                ehDuplicado = true;
                alert(`Pessoa com nome: ${contato.pessoa} e telefone: ${contato.telefone} já cadastrada! Tente outro numero por favor!`)
            }
        }
    }

    if (!nomeValido) {
        alert("O nome precisa ser completo!");
    }

    else if (!telefoneValido) {
        alert("O telefone é inválido! " + telefone.value);
    }

    return nomeValido && telefoneValido && !ehDuplicado ? true : false;
}

function defineTotalDeContatos() {
    return listaDeContatos.length
}

function resetaCampos() {
    nomeCompleto.value = '';
    telefone.value = '';
}