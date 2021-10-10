let sidebar = document.querySelector("#sidebar");
let button = document.querySelector("#btn");
let btn1 = 'bx-menu';
let btn2 = 'bx-x';

button.classList.add(btn1)
button.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        button.classList.replace(btn1, btn2);
    } else {
        button.classList.replace(btn2, btn1);
    }
}