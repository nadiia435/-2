document.addEventListener('DOMContentLoaded', function() {
  
  // Плавная прокрутка для кнопки scroll down
  const scrollButton = document.querySelector('.scroll-down');
  if (scrollButton) {
    scrollButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Плавная прокрутка с настроенной скоростью
      const targetElement = document.querySelector('.posts');
      const targetPosition = targetElement.offsetTop - 100;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let start = null;
      
      function smoothScroll(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ease = easeInOutCubic(progress / duration);
        
        window.scrollTo(0, startPosition + (distance * ease));
        
        // Проверяем анимацию во время скролла
        checkVisibleItems();
        
        if (progress < duration) {
          requestAnimationFrame(smoothScroll);
        } else {
          // После завершения скролла еще раз проверяем
          setTimeout(checkVisibleItems, 100);
        }
      }
      
      // Функция плавного ускорения/замедления
      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }
      
      requestAnimationFrame(smoothScroll);
    });
  }

  // Элегантное появление постов при скролле
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Добавляем небольшую задержку между постами для плавности
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 150);
      }
    });
  }, {
    threshold: 0.2, // увеличен порог для более стабильного срабатывания
    rootMargin: '0px 0px -80px 0px'
  });

  // Применяем анимацию к каждому посту
  document.querySelectorAll('.posts-item').forEach(item => {
    observer.observe(item);
  });

  // Улучшенная функция проверки видимых элементов
  function checkVisibleItems() {
    document.querySelectorAll('.posts-item').forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;
      
      if (isVisible && !item.classList.contains('fade-in')) {
        // Добавляем задержку только если элемент еще не анимировался
        setTimeout(() => {
          item.classList.add('fade-in');
        }, index * 100);
      }
    });
  }

  // Проверяем при загрузке, скролле и resize
  setTimeout(checkVisibleItems, 100);
  window.addEventListener('scroll', function() {
    // Добавляем throttling для производительности
    clearTimeout(window.scrollTimer);
    window.scrollTimer = setTimeout(checkVisibleItems, 10);
  });
  window.addEventListener('resize', checkVisibleItems);

});