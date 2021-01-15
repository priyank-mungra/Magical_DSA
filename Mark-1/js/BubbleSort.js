var isContinuous = false;
var noInterruption = true;

async function ascendingBubbleSort() {
    if (isContinuous) {
        alert("WAIT: Descending in process");
        return -1;
    }
    d3.selectAll('rect')
        .style('fill', 'green');
    isContinuous = true;
    let len = currentValue.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len && noInterruption; i++) {
            if (currentValue[i] > currentValue[i + 1]) {

                let temp = currentValue[i];
                currentValue[i] = currentValue[i + 1];
                currentValue[i + 1] = temp;
                swapped = true;
                // call function here for swap animation...
                await swapAnimation(currentValue[i], currentValue[i + 1]);
                d3.selectAll('rect')
                    .style('fill', 'green');
                // console.log(currentValue);
            }
        }
    } while (swapped && noInterruption);
    // return console.log(currentValue);
    if (noInterruption) {
        d3.selectAll('rect')
            .transition()
            .duration(duration)
            .delay(duration)
            .style('fill', '#800000')
    }
    isContinuous = false;
    noInterruption = true;
}

async function descendingBubbleSort() {
    if (isContinuous) {
        alert("WAIT: Ascending in process");
        return -1;
    }
    d3.selectAll('rect')
        .style('fill', 'green');
    isContinuous = true;
    let len = currentValue.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len && noInterruption; i++) {
            if (currentValue[i] < currentValue[i + 1]) {

                let temp = currentValue[i];
                currentValue[i] = currentValue[i + 1];
                currentValue[i + 1] = temp;
                swapped = true;
                // call function here for swap animation...
                await swapAnimation(currentValue[i], currentValue[i + 1]);
                d3.selectAll('rect')
                    .style('fill', 'green');
                // console.log(currentValue);
            }
        }
    } while (swapped && noInterruption);
    // return console.log(currentValue);
    if (noInterruption) {
        d3.selectAll('rect')
            .transition()
            .duration(duration)
            .delay(duration)
            .style('fill', '#800000')
    }
    isContinuous = false;
    noInterruption = true;
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
        .end()
    ])
}