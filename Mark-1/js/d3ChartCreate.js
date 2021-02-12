// import _ from "lodash"

let temp = [50, 70, 20, 20, 80, 50, 25, 23, 45, 15,25, 19, 23, 70];
// var initial = [ {index: 0, val: 11},
//                 {index: 1, val: 29},
//                 {index: 2, val: 25},
//                 {index: 3, val: 23},
//                 {index: 4, val: 78}
//             ];
var initial = [];
for(let i =0; i < temp.length; i++){
    initial.push({index: i, val: temp[i]});
}
//var currentValue = [50, 70, 20, 80, 130, 430, 570, 320, 180, 247, 15, 19, 23];
var currentValue = JSON.parse(JSON.stringify(initial));

var myChart;
var text;
var rect;
var font_size = 15;
var barSpaceRatio = 0.97;
var canvasWidth, height, virtual_height, arr_max, arr_size, componentWidth, barWidth, barOffSet;
canvasWidth = Math.floor(window.innerWidth * 0.85); //1300
height = Math.floor(window.innerHeight * 0.55); //400

function getMaxArrObj(arr){
    let max_val = {index : -1, val: -1};
    for(let i = 0; i < arr.length; i++){
        if(arr[i].val > max_val.val){
            max_val = arr[i]; 
        }
    }
    return JSON.parse(JSON.stringify(max_val));
}

function updateValue() {
    virtual_height = height - font_size;
    arr_max = getMaxArrObj(currentValue).val;
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
            return "rect" + d.index
        })
        .style('fill', 'green')
        .attr('width', barWidth)
        .attr('height', function(d) {
            return Math.floor((d.val * virtual_height) / arr_max);
        })
        .attr('x', function(d, i) {
            return i * (barOffSet + barWidth);
        })
        .attr('y', function(d) {
            return height - Math.floor((d.val * virtual_height) / arr_max);
        });

    text = myChart.selectAll('text')
        .data(currentValue)
        .enter()
        .append('text')
        .style("font", font_size + "px sans-serif")
        .style('font-weight', 'bold')
        .attr('id', function(d, i) {
            return "text" + d.index
        })
        .text(function(d) {
            return d.val;
        })
        .attr('x', function(d, i) {
            return (i + 0.1) * (barOffSet + barWidth);
        })
        .attr('y', function(d) {
            return height - Math.floor((d.val * virtual_height) / arr_max);
        });
}

function setUserInput() {
    if(isContinuous){
        noInterruption = false;
    }
    let userInput = document.getElementById("userInput");
    let userInputValue = "" + userInput.value;
    currentValue = [];
    let isValueAvailable = false;
    let count = 0;
    for (let i = 0; i < userInputValue.length; i++) {
        if (!isNaN(parseInt(userInputValue[i]))) {
            isValueAvailable = true;
            let startIndex = i;
            do {
                i++;
            } while (!isNaN(parseInt(userInputValue[i])));
            let endIndex = i;
            let number = userInputValue.substring(startIndex, endIndex);
            number = parseInt(number);
            currentValue.push({index:count, val: number} );
            count++;
        }
    }
    if(!isValueAvailable){
        $('#alert_placeholder').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong > Invalid Input! </strong> Please give some input. <button type = "button" class = "close" data-dismiss = "alert" aria-label = "Close" > <span aria-hidden = "true"> &times; </span> </button > </div > ')
        currentValue = JSON.parse(JSON.stringify(initial));
        return;
    }
    initial = JSON.parse(JSON.stringify(currentValue));
    updateValue();
    myChart.remove();
    createChart();
}