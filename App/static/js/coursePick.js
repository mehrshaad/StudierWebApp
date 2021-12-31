function checkCourse() {
    var x = document.getElementById("counter").value;
    if (x > 15) {
        x = 15;
    }
    if (x < 1) {
        x = 1;
    }
    document.getElementById('course').innerHTML = "";
    for (i = 0; i < x; i++) {
        switch (i + 1) {
            case 1:
                suffix = 'st';
                break;
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
        };
        element = document.getElementById("course");
        element.innerHTML += `
        <div class="row py-3">
                <div class="col-5 d-flex justify-content-around">
                <input class="courseInput" type="text" name="${"course" + (i + 1).toString()}"
                        placeholder="Enter ${(i + 1).toString() + suffix} course name">
                </div>
                <div class="col-7 d-flex justify-content-around">
                    <div class="form-wrapper">
                        <div class="debt-amount-slider">
                            <input type="radio" name="${"priority" + (i + 1).toString()}" id="${(i + 1).toString() + "1"}" value="1" required>
                            <label for="${(i + 1).toString() + "1"}" data-debt-amount="1"></label>
                            <input type="radio" name="${"priority" + (i + 1).toString()}" id="${(i + 1).toString() + "2"}" value="2" required>
                            <label for="${(i + 1).toString() + "2"}" data-debt-amount="2"></label>
                            <input type="radio" name="${"priority" + (i + 1).toString()}" id="${(i + 1).toString() + "3"}" value="3" required>
                            <label for="${(i + 1).toString() + "3"}" data-debt-amount="3"></label>
                            <input type="radio" name="${"priority" + (i + 1).toString()}" id="${(i + 1).toString() + "4"}" value="4" required>
                            <label for="${(i + 1).toString() + "4"}" data-debt-amount="4"></label>
                            <input type="radio" name="${"priority" + (i + 1).toString()}" id="${(i + 1).toString() + "5"}" value="5" required>
                            <label for="${(i + 1).toString() + "5"}" data-debt-amount="5"></label>
                        </div>
                    </div>
                </div>
        </div>`
    }
}

var elem = document.querySelector('input[type="range"]');
var rangeValue = function () {
    var newValue = elem.value;
    var target = document.querySelector('.value');
    target.innerHTML = newValue;
}
elem.addEventListener("input", rangeValue);

//page ready function
$(document).ready(function () {
    document.querySelector('.value').innerHTML = document.querySelector('#counter').value;
    checkCourse();
});