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