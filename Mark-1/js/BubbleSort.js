let isContinuous = false;
let noInterruption = true;

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
            if (currentValue[i].val > currentValue[i + 1].val) {
                let temp = JSON.parse(JSON.stringify(currentValue[i]) );
                currentValue[i] = currentValue[i + 1];
                currentValue[i + 1] = temp;
                swapped = true;
                await swapAnimation(currentValue[i].index, currentValue[i + 1].index);
            }
            else{
                await compareAnimation(currentValue[i].index, currentValue[i + 1].index);
            }
        }
        j++;
    } while (swapped && noInterruption);
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
            if (currentValue[i].val < currentValue[i + 1].val) {

                let temp = JSON.parse(JSON.stringify(currentValue[i]));
                currentValue[i] = currentValue[i + 1];
                currentValue[i + 1] = temp;
                swapped = true;
                await swapAnimation(currentValue[i].index, currentValue[i + 1].index);
            }
            else{
                await compareAnimation(currentValue[i].index, currentValue[i + 1].index);
            }
        }
        j++;
    } while (swapped && noInterruption);
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