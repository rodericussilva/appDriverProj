document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID não encontrado no localStorage');
        return;
    }

    try {
        const response = await fetch(`http://192.168.25.11:3020/api/users/${userId}`);
        if (!response.ok) throw new Error('Erro ao buscar informações do usuário');

        const userData = await response.json();
        document.getElementById('user-name').textContent = userData.name;
        document.getElementById('user-role').textContent = userData.role;
    } catch (error) {
        console.error('Erro ao carregar informações do usuário na navbar:', error);
    }
});