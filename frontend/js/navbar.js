document.addEventListener('DOMContentLoaded', async () => {
    const navbarContainer = document.getElementById('navbar-container');
    const response = await fetch('navbar.html');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;

    loadUserData();
});

async function loadUserData() {
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (!userName || !userRole) {
        console.error('Informações do usuário não encontradas no localStorage');
        return;
    }

    const userNameElement = document.getElementById('user-name');
    const userRoleElement = document.getElementById('user-role');

    if (userNameElement && userRoleElement) {
        userNameElement.textContent = userName;
        userRoleElement.textContent = userRole;
    } else {
        console.log('Elementos de nome e função não encontrados.');
    }
}

function toggleMenu(menuType) {
    const hamburgerMenu = document.getElementById('side-menu');
    const userMenu = document.getElementById('user-menu');
    const hamburgerIcon = document.getElementById('menu-hamburger');
    const userIcon = document.getElementById('user-icon');

    if (menuType === 'hamburger') {
        if (hamburgerMenu.classList.contains('open')) {
            hamburgerMenu.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        } else {
            hamburgerMenu.classList.add('open');
            hamburgerIcon.classList.add('open');
            userMenu.classList.remove('open');
            userIcon.classList.remove('open');
        }
    } else if (menuType === 'user') {
        if (userMenu.classList.contains('open')) {
            userMenu.classList.remove('open');
            userIcon.classList.remove('open');
        } else {
            userMenu.classList.add('open');
            userIcon.classList.add('open');
            hamburgerMenu.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        }
    }
}