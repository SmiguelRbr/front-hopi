document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Verificação de senha
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    // Preparar dados para envio
    const formData = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: password,
        birth_date: document.getElementById('birthDate').value,
        phone: document.getElementById('phone').value
    };
    
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