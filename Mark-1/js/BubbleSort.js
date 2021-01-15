var isContinuous = false;
var noInterruption = true;

async function ascendingBubbleSort() {
    if (isContinuous) {
        alert("WAIT: Sorting in process");
        return -1;
    }
    isContinuous = true;

    d3.selectAll('rect')
        .style('fill', 'green');
    let len = currentValue.length;
    let swapped;
    let j = 0;
    do {
        swapped = false;
        for (let i = 0; i+j < len-1 && noInterruption; i++) {
            if (currentValue[i] > currentValue[i + 1]) {

                let temp = currentValue[i];
                currentValue[i] = currentValue[i + 1];
                currentValue[i + 1] = temp;
                swapped = true;
                // call function here for swap animation...
                await swapAnimation(currentValue[i], currentValue[i + 1]);
                // d3.selectAll('rect')
                //     .style('fill', 'green');
                // console.log(currentValue);
            }
            else{
                await compareAnimation(currentValue[i], currentValue[i + 1]);
            }
        }
        j++;
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
        alert("WAIT: Sorting in process");
        return -1;
    }
    isContinuous = true;
    d3.selectAll('rect')
        .style('fill', 'green');
    let len = currentValue.length;
    let swapped;
    let j = 0;
    do {
        swapped = false;
        for (let i = 0; i+j < len-1 && noInterruption; i++) {
            if (currentValue[i] < currentValue[i + 1]) {

                let temp = currentValue[i];
                currentValue[i] = currentValue[i + 1];
                currentValue[i + 1] = temp;
                swapped = true;
                // call function here for swap animation...
                await swapAnimation(currentValue[i], currentValue[i + 1]);
                // d3.selectAll('rect')
                //     .style('fill', 'green');
                // console.log(currentValue);
            }
            else{
                await compareAnimation(currentValue[i], currentValue[i + 1]);
            }
        }
        j++;
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