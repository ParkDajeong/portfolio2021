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
  return $(section).position().top + $(".modal__contents").scrollTop();
}

function checkVisible(elm) {
  const modalHeight = $(".modal__contents").height();
  const scrollTop = $(".modal__contents").scrollTop();
  const sectionPos = getModalSectionPosition(elm);
  const sectionHeight = $(elm).height();

  return sectionPos < (modalHeight + scrollTop) && sectionPos > (scrollTop - sectionHeight);
}

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
    $(".modal-about").fadeIn(300);
  });
  
  // Close Modal
  $(".modal .btn-back").on("click", function() {
    $(".modal-about").fadeOut(300);
  });

  // Modal Side Menu Click Event
  $(".modal__side-menu-item").on("click", function() {
    const section = $(this).data("section");
    const position = getModalSectionPosition(section);
    
    $(".modal__contents").animate({scrollTop: position}, 500);
  });

  // Modal Scroll Event
  $(".modal__contents").on("scroll resize", function() {
    $(".modal__content-section").each(function(idx, item) {
      if(checkVisible($(item))) {
        $(".modal__side-menu-item").removeClass("active");
        $(".modal__side-menu-item").eq(idx).addClass("active");
      }
    });
  });
});