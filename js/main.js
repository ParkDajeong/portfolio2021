$(function() {
  // Loading
  setTimeout(function() {
    $(".login__loading").removeClass("on");
    $(".login__account").addClass("on");
  }, 5000);
  
  // 로그인 이벤트
  $(".account__btn-login").on("click", function() {
    $(".login__loading").addClass("on enter");
    $(".login__account").removeClass("on");
  });
});