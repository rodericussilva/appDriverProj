document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://192.168.25.11:3020/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                // Salvar informações do usuário no localStorage
                localStorage.setItem('userId', data.userId); // Verifique se userId está sendo retornado
                localStorage.setItem('userName', data.userName); // Verifique se userName está sendo retornado
                localStorage.setItem('userRole', data.userRole); // Verifique se userRole está sendo retornado

                // Log para verificação
                //console.log('userId:', data.userId);
                //console.log('userName:', data.userName);
                //console.log('userRole:', data.userRole);

                window.location.href = 'inputOrder.html';
            } else {
                document.getElementById('error-message').innerText = data.message;
            }
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').innerText = errorData.message;
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('error-message').innerText = 'Ocorreu um erro. Tente novamente.';
    }
});