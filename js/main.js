function addZero(num) {
  return (num < 10 ? `0${num}` : num);
}

function getTimeText(hour, min) {
  const h = 12 - hour;
  let str = "";

  if(h < 0) {
    str = `오후 ${-h}:${addZero(min)}`;
  } else if(h > 0) {
    str = `오전 ${h}:${addZero(min)}`;
  } else {
    str = `오후 12시:${addZero(min)}`;
  }

  return str;
}

function getModalSectionPosition(section) {
  return $(section).position().top + $(".modal.on .modal__contents").scrollTop();
}

function checkVisible(elm) {
  const modalHeight = $(".modal.on .modal__contents").height();
  const scrollTop = $(".modal.on .modal__contents").scrollTop();
  const sectionPos = getModalSectionPosition(elm);
  const sectionHeight = $(elm).height();
  
  return sectionPos < (modalHeight + scrollTop) && sectionPos > (scrollTop - sectionHeight);
}

// let lastScrollTop = 0;
// const delta = 50;
// function isScrolledDown() {
//   const scrollTop = $(".modal.on .modal__contents").scrollTop();

//   if(Math.abs(lastScrollTop - scrollTop) <= delta) return null;

//   const isDown = scrollTop > lastScrollTop ? true : false;
//   lastScrollTop = scrollTop;

//   return isDown;
// }

$(function() {
  // Loading
  setTimeout(function() {
    $(".login__loading").removeClass("on");
    $(".login__account").addClass("on");
  }, 3500);
  
  // Login Event
  $(".account__btn-login").on("click", function() {
    $(".login__loading").addClass("on enter");
    $(".login__account").removeClass("on");
    setTimeout(function() {
      $(".login, .login__loading").removeClass("on");
    }, 2300);
  });

  // Clock
  setInterval(function() {
    const today = new Date();
    const hour = today.getHours();
    const min = today.getMinutes();
    
    $(".clock").text(getTimeText(hour, min));
  }, 1000);

  // Open Modal
  $(".desktop-icon").on("click", function() {
    const modal = $(this).data("modal");
    $(`.${modal}`).fadeIn(300);
    $(`.${modal}`).addClass("on");
  });
  
  // Close Modal
  $(".modal .btn-back").on("click", function() {
    $(".modal").fadeOut(300);
    $(".modal").removeClass("on");
  });

  // Modal Side Menu Click Event
  $(".modal__side-menu-item").on("click", function() {
    const section = $(this).data("section");
    const position = getModalSectionPosition(section);

    $(".modal.on .modal__contents").animate({scrollTop: position}, 500);
  });

  // Modal Scroll Event
  $(".modal__contents").on("scroll", function() {
    $(".modal.on .modal__content-section").each(function(idx, item) {
      if(checkVisible($(item))) {
        $(".modal.on .modal__side-menu-item").removeClass("active");
        $(".modal.on .modal__side-menu-item").eq(idx).addClass("active");
      }
    });
  });

// Modal Project - Top
  let lastScrollTop = 0;
  const delta = 50;
  const initialHeight = $(".modal-project__top").height();
  const maxShrink = 100;
  $(".modal-project .modal__contents").on("scroll", function() {
    const scrollTop = $(this).scrollTop();
    const elmHeight = $(".modal-project__top").height();
    
    if(Math.abs(lastScrollTop - scrollTop) <= delta) return;
    
    if(elmHeight < initialHeight && scrollTop < lastScrollTop) { // Scroll Up
      if(scrollTop < 500) {
        $(".modal-project__top").css("max-height", `${elmHeight + 50}px`);
      }
    }else if(elmHeight > maxShrink && scrollTop > lastScrollTop) { // Scroll Down
      $(".modal-project__top").css("max-height", `${elmHeight - 50}px`);
    }
    lastScrollTop = scrollTop;
  });
});