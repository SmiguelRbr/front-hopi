document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Função para validar campos obrigatórios
    function validateFields() {
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'birthDate', 'phone'];
        for (const field of requiredFields) {
            const value = document.getElementById(field).value.trim();
            if (!value) {
                alert(`O campo ${field} é obrigatório.`);
                return false;
            }
        }
        return true;
    }

    // Função para validar senha
    function validatePassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return false;
        }
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return false;
        }
        return true;
    }

    // Validação dos campos
    if (!validateFields()) return;

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!validatePassword(password, confirmPassword)) return;

    // Preparar dados para envio
    const formData = {
        first_name: document.getElementById('firstName').value.trim(),
        last_name: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: password,
        birth_date: document.getElementById('birthDate').value.trim(),
        phone: document.getElementById('phone').value.trim()
    };

    // Enviar dados para o servidor
    try {
        const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../Login/login.html';
        } else {
            alert(`Erro: ${data.message || 'Ocorreu um erro no cadastro'}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
});