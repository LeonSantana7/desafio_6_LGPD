// classe contato
class contato {
    constructor(nome, sobrenome, email, cpf, telefone, tipoContato) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
    }
}

function Post(form) {
    const response = grecaptcha.getResponse();
    if (!response) {
        alert("Por favor, confirme que você não é um robô.");
        return false;
    }

    const nome = form.elements.namedItem("nome").value.trim();
    const sobrenome = form.elements.namedItem("sobrenome").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const cpf = form.elements.namedItem("cpf").value.trim();
    const telefone = form.elements.namedItem("telefone").value.trim();
    const tipoContato = form.elements.namedItem("contato").value;

    if (tipoContato !== "TELEFONE" && tipoContato !== "E-MAIL") {
        alert("Por favor, selecione como deseja ser contatado.");
        return false;
    }

    const data = new contato(nome, sobrenome, email, cpf, telefone, tipoContato);

    Enviar(data);
    exibirModal(tipoContato, nome);
    grecaptcha.reset();
}

function aplicarMascaraCPF() {
    const inputCPF = document.querySelector("[name='cpf']");
    if (inputCPF) {
        inputCPF.addEventListener("input", () => {
            let cpf = inputCPF.value.replace(/\D/g, "");
            if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
            if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
            if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
            inputCPF.value = cpf;
        });
    }
}

function aplicarMascaraTel() {
    const inputTel = document.querySelector("[name='telefone']");
    if (inputTel) {
        inputTel.addEventListener("input", () => {
            let telefone = inputTel.value.replace(/\D/g, "");
            if (telefone.length > 2) telefone = telefone.replace(/^(\d{2})(\d)/, "($1) $2");
            if (telefone.length > 10) {
                telefone = telefone.replace(/(\d{5})(\d{4})/, "$1-$2");
            } else {
                telefone = telefone.replace(/(\d{4})(\d{4})/, "$1-$2");
            }
            inputTel.value = telefone;
        });
    }
}

function Enviar(data) {
    const nome = document.querySelector("input[name='nome']");
    if (nome && nome.value.trim() !== "") {
        console.table({ "Dados enviados:": data });
        document.querySelector("form").reset();
    } else {
        alert("Por favor, preencha o nome.");
    }
}


function exibirModal(tipoContato, nome) {
    const modal = document.getElementById("modalContato");
    const modalMsg = document.getElementById("modalMensagem");
    let msg = "";

    if (tipoContato === "TELEFONE") {
        msg = `Olá <strong>${nome}</strong>, um de nossos consultores entrará em contato via <strong>telefone</strong> em breve!`;
    } else if (tipoContato === "E-MAIL") {
        msg = `Olá <strong>${nome}</strong>, você receberá um <strong>e-mail</strong> com mais informações em breve!`;
    }

    modalMsg.innerHTML = msg;
    modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarMascaraCPF();
    aplicarMascaraTel();

    const checkbox1 = document.querySelector("[name='termos']");
    const button = document.querySelector(".botaoEnviar button");

    if (checkbox1 && button) {
        button.disabled = !checkbox1.checked;
        checkbox1.addEventListener("change", () => {
            button.disabled = !checkbox1.checked;
        });
    }

    const modal = document.getElementById("modalContato");
    const spanClose = document.querySelector(".closeModal");
    const fecharModalBtn = document.getElementById("fecharModalBtn");

    spanClose.onclick = () => (modal.style.display = "none");
    fecharModalBtn.onclick = () => (modal.style.display = "none");

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });
});
