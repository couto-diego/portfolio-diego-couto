// Seleção dos elementos da página
const hamburger = document.getElementById('hamburger');
const sideNav = document.getElementById('side-nav');
const footer = document.querySelector('footer');
const body = document.querySelector('body');
const typedOutput = document.getElementById('typed-output'); // Elemento onde o texto animado será exibido

// Função para alternar o menu lateral e o estado do hambúrguer
const toggleMenu = () => {
    sideNav.classList.toggle('open');
    hamburger.classList.toggle('open');

    // Mostrar rodapé com animação suave quando o menu abrir
    if (sideNav.classList.contains('open')) {
        footer.classList.add('show');
        body.classList.add('blur'); // Aplica o desfoque no corpo
    } else {
        footer.classList.remove('show');
        body.classList.remove('blur'); // Remove o desfoque
    }
};

// Adiciona o evento de clique no ícone do hambúrguer
hamburger.addEventListener('click', toggleMenu);

// Fecha o menu se o usuário clicar fora dele (melhorando a experiência)
document.addEventListener('click', (event) => {
    if (!sideNav.contains(event.target) && !hamburger.contains(event.target)) {
        sideNav.classList.remove('open');
        hamburger.classList.remove('open');
        footer.classList.remove('show');
        body.classList.remove('blur'); // Remove o desfoque no corpo
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
            typedOutput.textContent = ''; // Limpa o texto anterior
            typeText(texts[i], typedOutput); // Digita o próximo texto
            i++;

            let nextDelay = (texts[i - 1] === '...') ? 2000 : 3000; // Aumentando o tempo de espera para os pontos de reticências e os outros textos
            setTimeout(typeNextText, nextDelay);
        } else {
            // Loop: Reinicia a animação após o fim do ciclo
            setTimeout(() => {
                i = 0; // Reinicia a contagem do índice
                typeNextText(); // Inicia novamente a animação
            }, 2000); // Atraso antes de reiniciar
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
const sections = document.querySelectorAll('section');

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
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    backToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
    });
}

// Navegação suave para links do menu lateral
const menuLinks = document.querySelectorAll('.side-nav ul li a');

menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Evita o comportamento padrão do link
        const targetId = link.getAttribute('href'); // Pega o ID da seção alvo
        const targetSection = document.querySelector(targetId); // Seleciona a seção alvo

        if (targetSection) {
            // Rola suavemente até a seção alvo
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Fecha o menu lateral após clicar em um link
            sideNav.classList.remove('open');
            hamburger.classList.remove('open');
            footer.classList.remove('show');
            body.classList.remove('blur');
        }
    });
});