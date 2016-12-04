Graph = (function() {
  var width = $(window).width() / 3;
  var height = width - 60;

  var x = d3.scale.linear()
    .domain([0, 11])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([0, 11])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)

  var svg = d3.select(".graph")
    .append("svg")
    .attr("width", 450)
    .attr("height", 450)
    .append("g")
    .attr("transform", "translate(20, 5)")

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .attr("fill", "#aaa")
    .call(xAxis)

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .attr("fill", "#aaa")
    .call(yAxis)

  var drawLine = function(points, slope, yIntercept) {
    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d, i) {
        return x(d.x);
      })
      .y(function(d, i) {
        return y(slope * d.x + yIntercept);
      })

    svg.append("path")
      .attr("id", "avg-slope")
      .attr("d", line(points))
      .attr("stroke", "black")
      .attr("stroke-width", "1")
  };

  var drawPoint = function(point) {
    svg.append("circle")
      .attr("class", "dot")
      .attr("x", point.x)
      .attr("y", point.y)
      .attr("cx", x(point.x))
      .attr("cy", y(point.y))
      .attr("r", 3)
      .style("fill", "white")
      .style("stroke", "black");
  };

  var drawPoints = function(points) {
    $.each(points, function(i, p) {
      drawPoint(p);
    })
  };

  return {
    drawPoints: drawPoints,
    drawPoint: drawPoint,
    drawLine: drawLine
  }
})();
