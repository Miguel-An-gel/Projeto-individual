// Validação do Formulário de Contato
function validarFormularioContato(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }

    alert('Formulário enviado com sucesso!');
    document.querySelector('form').reset(); // Limpa os campos do formulário
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validação do Formulário de Login
function validarFormularioLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }

    alert('Login realizado com sucesso!');
    // Simulação de redirecionamento após login
    window.location.href = 'home.html';
}

// Animação simples no carregamento
document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('h1');
    titulo.style.opacity = 0;
    titulo.style.transition = 'opacity 2s';
    setTimeout(() => {
        titulo.style.opacity = 1;
    }, 500);
});

// Adicionando ouvintes de evento aos formulários
const formularioContato = document.querySelector('form');
if (formularioContato && formularioContato.id !== 'login') {
    formularioContato.addEventListener('submit', validarFormularioContato);
}

const formularioLogin = document.querySelector('#loginForm');
if (formularioLogin) {
    formularioLogin.addEventListener('submit', validarFormularioLogin);
}
