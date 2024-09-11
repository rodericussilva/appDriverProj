document.addEventListener('DOMContentLoaded', async () => {
    const navbarContainer = document.getElementById('navbar-container');
    const responseNavbar = await fetch('navbar.html');
    navbarContainer.innerHTML = await responseNavbar.text();

    const userId = localStorage.getItem('userId');
    const welcomeUserNameElement = document.getElementById('welcome-user-name');
    const btnContainerRoute = document.querySelector('.btn-container-route');

    if (!userId) {
        console.error('User ID não encontrado no localStorage');
        return;
    }

    try {
        const userResponse = await fetch(`http://192.168.25.11:3020/api/users/${userId}`);
        if (!userResponse.ok) throw new Error('Erro ao buscar informações do usuário');

        const userData = await userResponse.json();
        welcomeUserNameElement.textContent = userData.name;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }

    const nfInput = document.getElementById('nf-input');
    const addNfBtn = document.getElementById('add-nf-btn');
    const deliveryListContainer = document.getElementById('delivery-list-container');

    // Verifica se já há notas fiscais e mostra os botões de rota se houver
    async function checkAndShowRouteButtons() {
        try {
            const response = await fetch(`http://192.168.25.11:3020/api/new-deliveries/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Erro ao buscar entregas.');

            const deliveries = await response.json();
            const hasDeliveries = deliveries.some(delivery => delivery.status === 'pendente');
            if (hasDeliveries) {
                btnContainerRoute.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Erro ao verificar entregas:', error);
        }
    }

    // Adiciona NF ao pressionar Enter
    nfInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addNfBtn.click();
        }
    });

    addNfBtn.addEventListener('click', async () => {
        const nfNumber = nfInput.value.trim();
        if (!nfNumber) {
            alert('Por favor, insira o número da nota fiscal de entrega.');
            return;
        }

        try {
            await fetch(`http://192.168.25.11:3020/api/new-deliveries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ nfNumber, userId })
            });

            alert("Número adicionado!");

            nfInput.value = '';
            loadDeliveries();
            checkAndShowRouteButtons(); // Verifica e mostra os botões de rota
        } catch (error) {
            console.error('Erro ao adicionar nota fiscal:', error);
        }
    });

    function addDeliveryToUI(delivery) {
        const deliveryItem = document.createElement('div');
        deliveryItem.className = 'delivery-item';
        deliveryItem.setAttribute('data-id', delivery.id);
        deliveryItem.innerHTML = `
            <div class="nf-container">
                <span class="nf-number">NF: ${delivery.nfNumber}</span>
                <button class="edit-nf-btn">
                    <i class="fas fa-pencil-alt"></i>
                </button>
            </div>
            <div class="confirmation-container">
                <label>
                    <input type="checkbox" class="confirmation-checkbox">
                    Cliente conferiu a mercadoria
                </label>
            </div>
            <input type="file" class="file-input" accept="image/*" style="display: none;">
            <button class="upload-btn" style="display: none;">Enviar Foto</button>
        `;
    
        const checkbox = deliveryItem.querySelector('.confirmation-checkbox');
        const fileInput = deliveryItem.querySelector('.file-input');
        const uploadBtn = deliveryItem.querySelector('.upload-btn');
        const editBtn = deliveryItem.querySelector('.edit-nf-btn');
        const nfNumberSpan = deliveryItem.querySelector('.nf-number');
    
        // Exibe o input de arquivo e o botão de upload quando o checkbox é marcado
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                fileInput.style.display = 'block';
            } else {
                fileInput.style.display = 'none';
                uploadBtn.style.display = 'none'; // Oculta o botão de enviar foto se o checkbox for desmarcado
            }
        });
    
        // Exibe o botão de enviar foto apenas quando há um arquivo selecionado
        fileInput.addEventListener('change', () => {
            uploadBtn.style.display = fileInput.files.length > 0 ? 'block' : 'none';
        });
    
        // Evento para editar o número da NF
        editBtn.addEventListener('click', () => {
            const currentNF = nfNumberSpan.textContent.replace('NF: ', '');
            const newNF = prompt('Edite o número da nota fiscal:', currentNF);
    
            if (newNF === null || newNF.trim() === '') return;
    
            nfNumberSpan.textContent = `NF: ${newNF}`;
    
            // Atualiza o número da NF no banco de dados
            updateNFInDatabase(delivery.id, newNF.trim());
        });
    
        deliveryListContainer.appendChild(deliveryItem);
    }

    // Função que atualiza o número da NF no banco de dados
    async function updateNFInDatabase(deliveryId, newNFNumber) {
                
        try {
            const response = await fetch(`http://192.168.25.11:3020/api/new-deliveries/${deliveryId}/nf`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ nfNumber: newNFNumber })
            });
    
            if (!response.ok) {
                throw new Error('Erro ao atualizar o número da nota fiscal.');
            }
    
            alert('Número da nota fiscal atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar NF:', error);
            alert('Não foi possível atualizar o número da nota fiscal. Tente novamente.');
        }
    }

    deliveryListContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('upload-btn')) {
            const fileInput = event.target.previousElementSibling;
            const file = fileInput.files[0];
            const deliveryId = event.target.closest('.delivery-item').getAttribute('data-id');
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('userName');

            if (!file) {
                alert('Nenhum arquivo selecionado');
                return;
            }

            const formData = new FormData();
            formData.append('photo', file);
            formData.append('userName', userName);

            try {
                const uploadResponse = await fetch(`http://192.168.25.11:3020/api/new-deliveries/upload/${deliveryId}/${userId}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const result = await uploadResponse.json();
                if (uploadResponse.ok) {
                    alert('Foto enviada com sucesso! Entrega finalizada!');

                    await fetch(`http://192.168.25.11:3020/api/new-deliveries/${deliveryId}/status`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ status: 'realizada' })
                    });

                    event.target.closest('.delivery-item').remove();
                } else {
                    alert(`Erro ao enviar foto: ${result.message}`);
                }
            } catch (error) {
                alert(`Erro ao enviar foto: ${error.message}`);
            }
        }
    });

    async function loadDeliveries() {
        try {
            const response = await fetch(`http://192.168.25.11:3020/api/new-deliveries/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Erro ao buscar entregas.');

            const deliveries = await response.json();
            deliveryListContainer.innerHTML = '';
            deliveries.forEach(delivery => {
                if (delivery.status === 'pendente') {
                    addDeliveryToUI(delivery);
                }
            });

            checkAndShowRouteButtons(); // Verifica e mostra os botões de rota
        } catch (error) {
            console.error('Erro ao carregar entregas:', error);
        }
    }

    loadDeliveries();
});