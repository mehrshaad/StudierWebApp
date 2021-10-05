// sign up / sign in
function switchSignUp(key) {
    var login = document.getElementById('login-form');
    if (key) {
        login.classList.add("right-panel-active");
    }
    else {
        login.classList.remove("right-panel-active");
    }
}
//scroll navbar
$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $('#header').addClass('add-shadow').addClass('blur-bg');
    } else {
        $('#header').removeClass('add-shadow').removeClass('blur-bg');
    }
});