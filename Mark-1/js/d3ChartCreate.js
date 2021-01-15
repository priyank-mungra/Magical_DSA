var duration = 500;
var initial = [11, 14, 1, 12, 15, 13, 17, 3, 2, 4, 6, 5, 7, 8, 9, 10, 16, 19, 23, 24, 25, 29];
//var currentValue = [50, 70, 20, 80, 130, 430, 570, 320, 180, 247, 15, 19, 23];
var currentValue = [];
for (let i = 0; i < initial.length; i++) {
    currentValue.push(initial[i]);
}

var myChart;
var text;
var rect;
var canvasWidth = 1300;
var height = 400
var font_size = 15;
var virtual_height = height - font_size;
var arr_max = d3.max(currentValue);
var arr_size = currentValue.length;
var componentWidth = Math.floor(canvasWidth / arr_size);
var barSpaceRatio = 0.97;
var barWidth = Math.floor(barSpaceRatio * componentWidth);
const barOffSet = componentWidth - barWidth;
if (barWidth <= 0) {
    barWidth = 1;
}
// var componentWidth = Math.floor(canvasWidth / arr_size);

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
        .attr('id', function(d) {
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
        .attr('id', function(d) {
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