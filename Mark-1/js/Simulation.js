let speedAdjust = document.getElementById("speedAdjust");

function resetInput() {
    noInterruption = false;
    duration = speedAdjust.value;
    currentValue = [...initial];
    myChart.remove();
    createChart();
}

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvasWidth = Math.floor(window.innerWidth * 0.85);
    height = Math.floor(window.innerHeight * 0.55);
    virtual_height = height - font_size;
    arr_max = d3.max(currentValue);
    arr_size = currentValue.length;
    componentWidth = Math.floor(canvasWidth / arr_size);
    barWidth = Math.floor(barSpaceRatio * componentWidth);
    barOffSet = componentWidth - barWidth;
    if (barWidth <= 0) {
        barWidth = 1;
    }

    myChart.remove();
    createChart();
}


function swapAnimation(d, d1) {
    var rect1 = `#rect${d}`,
        rect2 = `#rect${d1}`
    var rect_x_2 = d3.select(rect2).attr("x")
    var rect_x_1 = d3.select(rect1).attr("x")
    var text1 = `#text${d}`,
        text2 = `#text${d1}`
    var text_x_2 = d3.select(text2).attr("x")
    var text_x_1 = d3.select(text1).attr("x")
    return Promise.all([
        d3.select(text1)
        .transition()
        .duration(duration)
        .attr("x", text_x_2)
        .end(),

        d3.select(text2)
        .transition()
        .duration(duration)
        .attr("x", text_x_1)
        .end(),

        d3.select(rect1)
        .transition()
        .duration(duration)
        .style('fill', 'orange')
        .attr("x", rect_x_2)
        .end(),

        d3.select(rect2)
        .transition()
        .duration(duration)
        .style('fill', 'orange')
        .attr("x", rect_x_1)
        .end(),

        d3.selectAll('rect').style('fill', 'green')
    ])
}

function compareAnimation(d, d1) {
    var rect1 = `#rect${d}`,
        rect2 = `#rect${d1}`
    var rect_x_2 = d3.select(rect2).attr("x")
    var rect_x_1 = d3.select(rect1).attr("x")
    return Promise.all([
        d3.select(rect1)
        .transition()
        .duration(duration)
        .style('fill', 'orange')
        .attr("x", rect_x_1)
        .end(),

        d3.select(rect2)
        .transition()
        .duration(duration)
        .style('fill', 'orange')
        .attr("x", rect_x_2)
        .end(),

        d3.selectAll('rect')
        .style('fill', 'green')
    ])
}


speedAdjust.addEventListener("change", function(e) {
    duration = speedAdjust.defaultValue - speedAdjust.value;
    // console.log(duration);
})