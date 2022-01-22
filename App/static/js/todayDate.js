function getDate(id = 'date') {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10)
        dd = '0' + dd

    if (mm < 10)
        mm = '0' + mm

    today = yyyy + '-' + mm + '-' + dd;
    element = document.getElementById(id);
    element.value = today;
    element.max = today;
}

function setTime(id = 'time') {
    function checkTime(i) {
        if (i < 10) { i = "0" + i };
        return i;
    }
    var today = new Date();

    let h = today.getHours(), m = checkTime(today.getMinutes()), s = checkTime(today.getSeconds());
    today = `${h} : ${m} : ${s}`
    document.getElementById(id).innerHTML = today;
    setTimeout(setTime, 1000);
}
function setDate(id = 'date', hijri = false) {
    var option = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    if (hijri) {
        var today = new Date().toLocaleDateString('fa-IR', option);
        document.getElementById(id).classList.add('hijri');
    } else
        var today = new Date().toLocaleDateString("en-US", option);
    document.getElementById(id).innerHTML = `${today}`;
    setTimeout(setTime, 1000);
}
