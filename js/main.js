$(function() {
  $(".desk__link").on("click", function() {
    const section = $(this).data("section");
    const offset = $(`.${section}`).offset();

    $(".loading").addClass("on");
    $("html").animate({scrollTop: offset.top}, 1000);

    setTimeout(() => {
      $(".loading").removeClass("on");
    }, 2000);
  });
});