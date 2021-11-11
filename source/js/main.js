(function () {
  const header = document.querySelector('.header');
  const btnMenu = header.querySelector('.header__nav-btn');
  const menu = header.querySelector('.header__nav');
  const body = document.querySelector('.page__body');
  const navItemsLink = header.querySelectorAll('.header__nav-item-link');

  // собираем все якоря; устанавливаем время анимации и количество кадров
  const anchors = [].slice.call(navItemsLink);
  const animationTime = 1000;
  const framesCount = 20;
  menu.classList.remove('header__nav--no-js');
  btnMenu.classList.remove('header__nav-btn--no-js');

  btnMenu.addEventListener('click', () => {
    if (btnMenu.classList.contains('header__nav-btn--burger')) {
      btnMenu.classList.remove('header__nav-btn--burger');
      btnMenu.classList.add('header__nav-btn--closed');
      menu.classList.add('header__nav--show');
      body.classList.toggle('page__body--hidden');
    } else {
      body.classList.toggle('page__body--hidden');
      btnMenu.classList.remove('header__nav-btn--closed');
      menu.classList.remove('header__nav--show');
      btnMenu.classList.add('header__nav-btn--burger');
    }
  })

  for (let item of navItemsLink) {
    item.addEventListener('click', () => {
      if (menu.classList.contains('header__nav--show')) {
        body.classList.toggle('page__body--hidden');
      }
    })
  }

  anchors.forEach(function(item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function(evt) {
      // убираем стандартное поведение
      evt.preventDefault();
      // Закрываем меню и убираем "крестик"
      btnMenu.classList.remove('header__nav-btn--closed');
      menu.classList.remove('header__nav--show');
      btnMenu.classList.add('header__nav-btn--burger');

      // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
      let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

      // запускаем интервал, в котором
      let scroller = setInterval(function() {
        // считаем на сколько скроллить за 1 такт
        let scrollBy = coordY / framesCount;

        // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто
        if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          // то скроллим на к-во пикселей, которое соответствует одному такту
          window.scrollBy(0, scrollBy);
        } else {
          // иначе добираемся до элемента и выходим из интервала
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
      // время интервала равняется частному от времени анимации и к-ва кадров
      }, animationTime / framesCount);
    });
  });
})();
