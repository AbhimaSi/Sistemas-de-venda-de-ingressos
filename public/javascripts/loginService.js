const login = async () => {
    console.log('TESTE')
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    const data = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome: nome, senha: senha })
    }

    console.log("adquirido nome e senha");

    const response = await fetch('/oapi/login', data);
    console.log(response);
    return await response.json();
}