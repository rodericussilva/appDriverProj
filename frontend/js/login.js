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
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userName', data.userName);
                localStorage.setItem('userRole', data.userRole);
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