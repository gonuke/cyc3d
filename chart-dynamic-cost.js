var chartAttrs = {
  "width": '100%',
  "height": '400'
};

var chartMargins = {
  right: 75
};

var yLabel = "Cost (Millions of USD)";
var willShowControls = false;
var yMax = 140000;

// chart 1 function
d3.json('raw-data-run1-cost.json', function (data) {
  nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
                  .margin(chartMargins)
                  .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                  .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .yDomain([0, yMax])
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                  .transitionDuration(500)
                  .showControls(willShowControls)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true);
 
    //Format x-axis labels with custom function.
    chart.xAxis
        .axisLabel('Year')
        .tickFormat(function(d) { 
          return d3.time.format('%Y')(new Date(d)) 
    });
 
    chart.yAxis
        .axisLabel(yLabel)
        .tickFormat(d3.format(',.f'));
 
    d3.select('#chart1 svg')
      .datum(data)
      .attr(chartAttrs)
      .call(chart);
 
    nv.utils.windowResize(chart.update);
 
    return chart;
  });
});

// chart 2 function
d3.json('raw-data-run3-cost.json', function (data) {
  nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
                  .margin(chartMargins)
                  .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                  .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .yDomain([0, yMax])
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                  .transitionDuration(500)
                  .showControls(willShowControls)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true);
 
    //Format x-axis labels with custom function.
    chart.xAxis
        .axisLabel('Year')
        .tickFormat(function(d) { 
          return d3.time.format('%Y')(new Date(d)) 
    });
 
    chart.yAxis
        .axisLabel(yLabel)
        .tickFormat(d3.format(',.f'));
 
    d3.select('#chart2 svg')
      .datum(data)
      .attr(chartAttrs)
      .call(chart);
 
    nv.utils.windowResize(chart.update);
 
    return chart;
  });
});

// chart 3 function
d3.json('raw-data-run5-cost.json', function (data) {
  nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
                  .margin(chartMargins)
                  .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                  .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .yDomain([0, yMax])
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                  .transitionDuration(500)
                  .showControls(willShowControls)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true);
 
    //Format x-axis labels with custom function.
    chart.xAxis
        .axisLabel('Year')
        .tickFormat(function(d) { 
          return d3.time.format('%Y')(new Date(d)) 
    });
 
    chart.yAxis
        .axisLabel(yLabel)
        .tickFormat(d3.format(',.f'));
 
    d3.select('#chart3 svg')
      .datum(data)
      .attr(chartAttrs)
      .call(chart);
 
    nv.utils.windowResize(chart.update);
 
    return chart;
  });
});
