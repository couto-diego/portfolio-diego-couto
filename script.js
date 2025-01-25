// Seleção dos elementos da página
const hamburger = document.getElementById('hamburger');
const sideNav = document.getElementById('side-nav');
const footer = document.querySelector('footer');
const body = document.querySelector('body');
const typedOutput = document.getElementById('typed-output');
const backToTopButton = document.getElementById('back-to-top');
const menuLinks = document.querySelectorAll('.side-nav ul li a');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');

// Função para alternar o menu lateral e o estado do hambúrguer
const toggleMenu = () => {
    sideNav.classList.toggle('open');
    hamburger.classList.toggle('open');

    // Mostrar rodapé com animação suave quando o menu abrir
    if (sideNav.classList.contains('open')) {
        footer.classList.add('show');
        body.classList.add('blur');
    } else {
        footer.classList.remove('show');
        body.classList.remove('blur');
    }
};

// Adiciona o evento de clique no ícone do hambúrguer
hamburger.addEventListener('click', toggleMenu);

// Fecha o menu se o usuário clicar fora dele
document.addEventListener('click', (event) => {
    if (!sideNav.contains(event.target) && !hamburger.contains(event.target)) {
        sideNav.classList.remove('open');
        hamburger.classList.remove('open');
        footer.classList.remove('show');
        body.classList.remove('blur');
    }
});

// Função para animar a digitação do texto
const typeText = (text, element, delay = 150) => {
    let index = 0;
    const interval = setInterval(() => {
        element.textContent += text[index];
        index++;

        if (index === text.length) {
            clearInterval(interval);
        }
    }, delay);
};

// Função para adicionar os efeitos de digitação e troca de texto
const animateHeaderText = () => {
    const texts = ['DC Dev Full Stack', '...', 'apaixonado por aprender!'];
    let i = 0;

    const typeNextText = () => {
        if (i < texts.length) {
            typedOutput.textContent = '';
            typeText(texts[i], typedOutput);
            i++;

            let nextDelay = (texts[i - 1] === '...') ? 2000 : 3000;
            setTimeout(typeNextText, nextDelay);
        } else {
            setTimeout(() => {
                i = 0;
                typeNextText();
            }, 2000);
        }
    };

    typeNextText();
};

// Iniciar a animação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (typedOutput) {
        animateHeaderText();
    }
});

// Função para verificar a visibilidade das seções e aplicar efeitos de fade-in
const checkVisibility = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// Verificar visibilidade ao carregar a página
document.addEventListener('DOMContentLoaded', checkVisibility);

// Botão "Voltar ao Topo"
if (backToTopButton) {
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    backToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

// Navegação suave para links do menu lateral
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            sideNav.classList.remove('open');
            hamburger.classList.remove('open');
            footer.classList.remove('show');
            body.classList.remove('blur');
        }
    });
});

// Seleciona todos os links que começam com "#" (links internos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (sideNav.classList.contains('open')) {
                sideNav.classList.remove('open');
                hamburger.classList.remove('open');
                footer.classList.remove('show');
                body.classList.remove('blur');
            }
        }
    });
});

// Função para alternar o modo escuro
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);

        // Troca o ícone entre lua e sol
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Verificar preferência salva
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}