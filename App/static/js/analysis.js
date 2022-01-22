//vase course - pom
var height = 500;
function getData(data, key) {
    if (key==1)
        var ls = [["Courses", "Spent Hours"]];
    if (key==2)
        var ls = [['Task', 'Hours per Day']];
    if (key==3)
        var ls = [['Courses', 'This Week','Last Week']];
    for (var member of data) {
        if (key==2 || key==1)
        ls.push([member[0], member[key]]);
        else
        ls.push(member);
    }
    return ls;
}
function barChart(tag,title,info){
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawStuff);
    var ls = getData(info,1);
    function drawStuff() {
        var data = new google.visualization.arrayToDataTable(ls);
        var options = {
          height: window.height,
          chartArea: { width: "80%", height: "80%" },
          legend: { position: "none", alignment: "center" },
          bars: "horizontal",
          axes: {
            x: {
              0: { side: "down", label: "Spent Hours" },
            },
          },
          bar: { groupWidth: "80%" },
        };
        var chart = new google.charts.Bar(document.getElementById(tag));
        chart.draw(data, options);
    };
    };
function pieChart(tag,title,info){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    var ls = getData(info,2);
    function drawChart() {
    var data = google.visualization.arrayToDataTable(ls);
    var options = {
      title: "Earned Coins Per Course",
      titlePosition: "right",
      height: window.height,
      chartArea: { width: "80%", height: "80%" },
      legend: { position: "none", alignment: "center" },
    };
    var chart = new google.visualization.PieChart(document.getElementById(tag));
    chart.draw(data, options);
    };
};
function multiBarChart(tag,title,info) {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawStuff);
    var ls = getData(info, 3);
    function drawStuff() {
        var data = new google.visualization.arrayToDataTable(ls);
        var options = {
          height: window.height,
        chartArea: { width: "70%", height: "80%" },
          bars: "horizontal",
          series: {
            0: { axis: "Courses" },
            1: { axis: "Time" },
          },
        legend: { 'position': 'right' },
          axes: {
            x: {
                  Time: { side: "top", label: "Spent Hours" }
            },
            },
            bar: { groupWidth: "90%" }
        };
        var chart = new google.charts.Bar(document.getElementById(tag));
        chart.draw(data, options);
    };
};