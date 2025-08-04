/**
 * scrollEnhancer.js
 * Script para melhorar o comportamento de scroll
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  const singlePage = document.querySelector('.single-page');
  if (!singlePage) return;
  
  // Lista de todas as seções
  const sections = singlePage.querySelectorAll('.hero-section, .sobre-section, .projetos-section, .contato-section');
  const sectionsArray = Array.from(sections);
  
  // Flag para evitar múltiplos scrolls
  let isScrolling = false;
  let scrollTimeout;
  
  // Manipulador de eventos para a roda do mouse
  singlePage.addEventListener('wheel', function(e) {
    // Se já estiver rolando, não faz nada
    if (isScrolling) {
      e.preventDefault();
      return;
    }
    
    // Identifica a direção do scroll
    const direction = e.deltaY > 0 ? 1 : -1;
    
    // Encontra a seção atual com base na posição de scroll
    let currentSectionIndex = -1;
    let closestDistance = Infinity;
    
    sectionsArray.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const distance = Math.abs(sectionTop - singlePage.scrollTop);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        currentSectionIndex = index;
      }
    });
    
    // Define o índice da próxima seção
    const nextSectionIndex = Math.max(0, Math.min(sectionsArray.length - 1, currentSectionIndex + direction));
    
    // Se estamos na mesma seção ou já chegamos no limite, não faz nada
    if (nextSectionIndex === currentSectionIndex) {
      return;
    }
    
    // Define a flag de rolagem
    isScrolling = true;
    
    // Previne o comportamento padrão de scroll
    e.preventDefault();
    
    // Rola para a próxima seção
    const nextSection = sectionsArray[nextSectionIndex];
    singlePage.scrollTo({
      top: nextSection.offsetTop,
      behavior: 'smooth'
    });
    
    // Reseta a flag após a animação
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 800); // Duração da animação
  }, { passive: false });
  
  // Manipulador para teclas de seta
  document.addEventListener('keydown', function(e) {
    if (!isScrolling && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      const direction = e.key === 'ArrowDown' ? 1 : -1;
      
      // Encontra a seção atual e a próxima
      let currentSectionIndex = -1;
      let closestDistance = Infinity;
      
      sectionsArray.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const distance = Math.abs(sectionTop - singlePage.scrollTop);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          currentSectionIndex = index;
        }
      });
      
      const nextSectionIndex = Math.max(0, Math.min(sectionsArray.length - 1, currentSectionIndex + direction));
      
      if (nextSectionIndex !== currentSectionIndex) {
        isScrolling = true;
        e.preventDefault();
        
        const nextSection = sectionsArray[nextSectionIndex];
        singlePage.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth'
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    }
  });
  
  // Manipulador para scroll touch em dispositivos móveis
  let touchStartY = 0;
  let touchEndY = 0;
  
  singlePage.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  singlePage.addEventListener('touchend', function(e) {
    if (isScrolling) return;
    
    touchEndY = e.changedTouches[0].screenY;
    const touchDiff = touchStartY - touchEndY;
    
    // Se o movimento foi significativo
    if (Math.abs(touchDiff) > 50) {
      const direction = touchDiff > 0 ? 1 : -1;
      
      // Encontra a seção atual e a próxima
      let currentSectionIndex = -1;
      let closestDistance = Infinity;
      
      sectionsArray.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const distance = Math.abs(sectionTop - singlePage.scrollTop);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          currentSectionIndex = index;
        }
      });
      
      const nextSectionIndex = Math.max(0, Math.min(sectionsArray.length - 1, currentSectionIndex + direction));
      
      if (nextSectionIndex !== currentSectionIndex) {
        isScrolling = true;
        
        const nextSection = sectionsArray[nextSectionIndex];
        singlePage.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth'
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    }
  }, { passive: true });
});
