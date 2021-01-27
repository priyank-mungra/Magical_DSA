var initial = [11, 14, 1, 12, 15, 13, 17, 3, 2, 4, 6, 5, 7, 8, 9, 10, 16, 19, 23, 24, 25, 29];
//var currentValue = [50, 70, 20, 80, 130, 430, 570, 320, 180, 247, 15, 19, 23];
var currentValue = [...initial];

var myChart;
var text;
var rect;
var font_size = 15;
var barSpaceRatio = 0.97;
var canvasWidth, height, virtual_height, arr_max, arr_size, componentWidth, barWidth, barOffSet;
canvasWidth = Math.floor(window.innerWidth * 0.85); //1300
height = Math.floor(window.innerHeight * 0.55); //400

function updateValue() {
    virtual_height = height - font_size;
    arr_max = d3.max(currentValue);
    arr_size = currentValue.length;
    componentWidth = Math.floor(canvasWidth / arr_size);
    barWidth = Math.floor(barSpaceRatio * componentWidth);
    barOffSet = componentWidth - barWidth;
    if (barWidth <= 0) {
        barWidth = 1;
    }
}
updateValue();

function createChart() {
    myChart = d3.select("#chart")
        .append('svg')
        .attr('width', canvasWidth)
        .attr('height', height)
        //.style('background', 'gray')
        //.style('margin-bottom', 380)
        //.style('margin', '5px');

    rect = myChart.selectAll('rect')
        .data(currentValue)
        .enter()
        .append('rect')
        .attr('id', function(d, i) {
            // console.log("rect" + i);
            return "rect" + d
        })
        .style('fill', 'green')
        .attr('width', barWidth)
        .attr('height', function(d) {
            return Math.floor((d * virtual_height) / arr_max);
        })
        .attr('x', function(d, i) {
            return i * (barOffSet + barWidth);
        })
        .attr('y', function(d) {
            return height - Math.floor((d * virtual_height) / arr_max);
        });

    text = myChart.selectAll('text')
        .data(currentValue)
        .enter()
        .append('text')
        .style("font", font_size + "px sans-serif")
        .style('font-weight', 'bold')
        .attr('id', function(d, i) {
            // console.log("text" + i);
            return "text" + d
        })
        .text(function(d) {
            return d;
        })
        .attr('x', function(d, i) {
            return (i + 0.1) * (barOffSet + barWidth);
        })
        .attr('y', function(d) {
            return height - Math.floor((d * virtual_height) / arr_max);
        });
}

function setUserInput() {
    let userInput = document.getElementById("userInput");
    let userInputValue = "" + userInput.value;
    if (!isNaN(userInput.value)) {
        // alert("");
        $('#alert_placeholder').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong > No Input! </strong> Please give some input. <button type = "button" class = "close" data-dismiss = "alert" aria-label = "Close" > <span aria-hidden = "true"> &times; </span> </button > </div > ')
            // $('.alert').alert()
        return;
    }
    initial = [];
    for (let i = 0; i < userInputValue.length; i++) {
        if (!isNaN(parseInt(userInputValue[i]))) {
            let startIndex = i;
            do {
                i++;
            } while (!isNaN(parseInt(userInputValue[i])));
            let endIndex = i;
            let number = userInputValue.substring(startIndex, endIndex);
            number = parseInt(number);
            initial.push(number);
        }
    }
    currentValue = [...initial];
    updateValue();
    myChart.remove();
    createChart();
}