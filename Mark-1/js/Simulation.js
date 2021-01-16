function resetInput() {
    // console.log("initial", initial);
    noInterruption = false;
    currentValue = [];
    for (let i = 0; i < initial.length; i++) {
        currentValue.push(initial[i]);
    }
    myChart.remove();
    createChart();
    // console.log("currentValue", currentValue);
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