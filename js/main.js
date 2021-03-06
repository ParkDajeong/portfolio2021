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
  let sectionPos = getModalSectionPosition(elm);
  sectionPos = sectionPos + sectionPos / 3;
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

  // Task Menu
  $(".btn-task").on("click", function() {
    $(this).toggleClass("on");
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

  // Modal Side Menu Toggle Button
  $(".modal__btn-toggle-side").on("click", function() {
    $(this).parent().toggleClass("on");
  });

  // Modal Side Menu
  $(window).on("resize load", function() {
    const viewport = $(this).width();
    if(viewport < 1024) {
      $(".modal__side").addClass("on");
    } else {
      $(".modal__side").removeClass("on");
    }
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

  // Modal About - Profile Photo
  const path = "../assets/";
  const imgArr = ["img_avatar2.png", "contacts3.png", "instagram.png"];
  $(".profile__btn-change-img").on("click", function() {
    const currentImg = imgArr[0];
    const changeImg = $(this).data("img");

    imgArr[0] = changeImg;
    if($(this).hasClass("js-btn-change-img01")) {
      imgArr[1] = imgArr[2];
    }
    imgArr[2] = currentImg;
    
    $(".profile__photo img").attr("src", path + imgArr[0]);
    $(".js-btn-change-img01").data("img", imgArr[1]);
    $(".js-btn-change-img01 img").attr("src", path + imgArr[1]);
    $(".js-btn-change-img02").data("img", imgArr[2]);
    $(".js-btn-change-img02 img").attr("src", path + imgArr[2]);
  });

  // Modal About - accordion
  $(".profile__info-title").on("click", function() {
    $(this).toggleClass("on");
  });

  // Modal About - Skill
  $(".modal-about .modal__contents").on("scroll", function() {
    if(checkVisible($(".modal-about .skill"))) {
      $(".skill-bar").each(function(_idx, item) {
        const percent = $(item).data("percent");
        $(item).find(".skill-bar__bar").css("width", percent);
        $(item).find(".skill-bar__percent").text(percent);
      });
    }
  });

  // Modal Project - Top
  $(".modal-project .browser__contents").on("scroll", function() {
    const scrollTop = $(this).scrollTop();

    if(scrollTop > 50) {
      $(".bookmark__current-folder").addClass("fixed");
    } else {
      $(".bookmark__current-folder").removeClass("fixed");
    }
  });

  // Modal Project - bookmark sort
  $(".modal-project .bookmark__btn-sort").on("click", function() {
    $(this).addClass("on");
    $(this).siblings().removeClass("on");

    if($(this).hasClass("bookmark__btn-sort--list")) {
      $(".bookmark").addClass("bookmark--list");
    } else {
      $(".bookmark").removeClass("bookmark--list");
    }
  });

  // Modal Contact - input focus
  $(".email-form__input").on("focus", function() {
    const name = $(this).attr("id");
    $(`label[for=${name}]`).addClass("on");
  });

  $(".email-form__input").on("focusout", function() {
    $(".email-form label").removeClass("on");
  });
});