const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const socialIcons = document.querySelector(".social-icons");

navToggle.addEventListener("click", function() {
    console.log(links.classList);
    links.classList.toggle("show-links");
    socialIcons.classList.toggle("show-icons");
});

//Menu fijo

posicionarMenu();

$(window).scroll(function() {
    posicionarMenu();
});

function posicionarMenu() {
    var altura_del_header = $('.container-logo').outerHeight(true);
    var altura_del_menu = $('.nav-center').outerHeight(true);

    if ($(window).scrollTop() >= altura_del_header) {
        $('.nav-center').addClass('fixed');
        $('.wrapper').css('margin-top', (altura_del_menu) + 'px');
    } else {
        $('.nav-center').removeClass('fixed');
        $('.wrapper').css('margin-top', '0');
    }
}