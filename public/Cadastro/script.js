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

    // Função para validar e-mail
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return false;
        }
        return true;
    }

    // Função para validar data de nascimento
    function validateBirthDate(birthDate) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
            alert('A data de nascimento deve estar no formato AAAA-MM-DD.');
            return false;
        }
        const date = new Date(birthDate);
        if (isNaN(date.getTime()) || date > new Date()) {
            alert('Por favor, insira uma data de nascimento válida e no passado.');
            return false;
        }
        return true;
    }

    // Validação dos campos
    if (!validateFields()) return;

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value.trim();
    const birthDate = document.getElementById('birthDate').value.trim();

    if (!validatePassword(password, confirmPassword)) return;
    if (!validateEmail(email)) return;
    if (!validateBirthDate(birthDate)) return;

    // Preparar dados para envio
    const formData = {
        first_name: document.getElementById('firstName').value.trim(),
        last_name: document.getElementById('lastName').value.trim(),
        email: email,
        password: password,
        birth_date: birthDate,
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
            window.location.href = '/public/Login/login.html';
        } else {
            alert(`Erro: ${data.mensagem || 'Ocorreu um erro no cadastro'}`);
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
});