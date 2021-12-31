window.onscroll = function () { scrollFunction() };
head = document.getElementById("header");
main = document.getElementById("main");
img = document.getElementsByTagName("img")[0];
p = document.getElementsByTagName("p")[0];
function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        //head
        head.style.position = "fixed";
        head.style.top = "0px";
        head.style.backgroundColor = "#fff";
        head.style.boxShadow = `rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`;
        //main
        main.style.transform = "translateY(10%)";
        //img
        img.style.marginTop = "50px";
        img.style.left = "0%";
        img.style.transform = "translate(0%, -50%) scale(0.5)";
        //p
        p.style.opacity = "1";
        p.style.transitionDelay = "0.2s";

    } else {
        //head
        head.style.position = "absolute";
        head.style.top = "auto";
        head.style.backgroundColor = "transparent";
        head.style.boxShadow = 'none';
        //main
        main.style.transform = "translateY(0%)";
        //img
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%) scale(1)";
        img.style.marginTop = "-70px";
        //p
        p.style.opacity = "0";
        p.style.transitionDelay = "0s";
    }
}