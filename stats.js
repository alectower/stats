$(function() {
  var addSlope = function(points) {
    $("#avg-slope").remove();
    var yDiff = [];
    var xDiff = [];

    var numerator = $("#slope-calc #numerator")
    var denominator = $("#slope-calc #denominator");
    for (var i = 0; i < points.length; i++) {
      if (points[i + 1] != undefined) {
        var y2 = points[i + 1].y;
        var y1 = points[i].y;
        var dy = y2 - y1;

        yDiff.push(dy);

        var x2 = points[i + 1].x;
        var x1 = points[i].x;
        var dx = x2 - x1;

        xDiff.push(dx);

        var yDisplay = numerator.html();
        var yCalc = "(" + y2 + " - " + y1 + ")";

        var xDisplay = denominator.html();
        var xCalc = "(" + x2 + " - " + x1 + ")";

        if (i == 0) {
          numerator.html(yCalc);
          denominator.html(xCalc);
        } else {
          numerator.html(yDisplay + " + " + yCalc)
          denominator.html(xDisplay + " + " + xCalc);
        }
      }
    }

    var slopeCalcEl = $("#avg-slope-equals");
    slopeCalcEl.html(" = ");

    var diffYSum = d3.sum(yDiff);
    $("#slope-value #numerator").html(diffYSum);

    var diffXSum = d3.sum(xDiff);
    $("#slope-value #denominator").html(diffXSum);

    // dy/dx; change of y / change in x
    var avgSlope = diffYSum / diffXSum;

    // y = mx + b
    // b = y - mx
    var yIntercept = points[0].y - (avgSlope * points[0].x);
    $("#y-intercept").html(
      "point 1: [" + points[0].x + "," + points[0].y + "]" + "</br>" +
      points[0].y + " = " +
      avgSlope + "(" + points[0].x + ") + b" + "<br/>" +
      "b = " + yIntercept
    );

    Graph.drawLine(points, avgSlope, yIntercept);

    return function(x) {
      return avgSlope * x + yIntercept;
    }
  };

  var addDeviation = function(points, yFunc) {
    var numeratorEl = $("#abs-deviation #numerator");
    numeratorEl.html("");

    var deviations = []

    points.each(function(i, p) {
      var deviation = Math.abs(p.y - yFunc(p.x));
      deviations.push(deviation);
      numeratorEl.html(
        numeratorEl.html() +
        "|" + p.y + " - " + yFunc(p.x) + "|"
      );
      if (i != points.length-1) {
        numeratorEl.html(
          numeratorEl.html() + " + "
        );
      }
    });
    $("#abs-deviation #denominator").html(points.length);
    $("#abs-deviation-equals").html(" = " + d3.sum(deviations) / points.length);
  };

  $("#run-calc").click(function() {
    var points = $(".dot").map(function() {
      var el = $(this);
      return {
        x: parseFloat(el.attr("x")),
        y: parseFloat(el.attr("y"))
      }
    }).sort(function(a, b) {
      return a.x - b.x;
    });

    var yFunction = addSlope(points);
    addDeviation(points, yFunction);
  });

  $('#add-point').click(function() {
    var xEl = $('#x-val');
    var yEl = $('#y-val');
    var x = parseFloat(xEl.val());
    var y = parseFloat(yEl.val());
    if (x != undefined && y != undefined) {
      Graph.drawPoint({x: x, y: y});
      xEl.html("");
      yEl.html("");
    }
  });

  var group1 = [
    {x: 1,  y: 1},
    {x: 2,  y: 2},
    {x: 3,  y: 4},
    {x: 4,  y: 8},
    {x: 5,  y: 9},
    {x: 6,  y: 4},
    {x: 7,  y: 5},
    {x: 8,  y: 10},
    {x: 9,  y: 9}
  ];

  var group2 = [
    {x: 1,  y: 2},
    {x: 2,  y: 4},
    {x: 3,  y: 5},
    {x: 4,  y: 3},
    {x: 5,  y: 7},
    {x: 6,  y: 6},
    {x: 7,  y: 9},
    {x: 8,  y: 7},
    {x: 9,  y: 10}
  ];

  var group3 = [
    {x: 1,  y: 2},
    {x: 2,  y: 2},
    {x: 3,  y: 4},
    {x: 4,  y: 5},
    {x: 5,  y: 9},
    {x: 6,  y: 4},
    {x: 7,  y: 8},
    {x: 8,  y: 7},
    {x: 9,  y: 10}
  ];

  var clearValues = function() {
    $(".dot").remove();
    $("#avg-slope").remove();
    $("#slope-calc #numerator,\
      #slope-calc #denominator,\
      #slope-value #numerator,\
      #slope-value #denominator,\
      #y-intercept,\
      #abs-deviation #numerator,\
      #abs-deviation #denominator,\
      #abs-deviation-equals\
    ").html("");
  };

  $("#group-1").click(function() {
    clearValues();
    Graph.drawPoints(group1)
  });

  $("#group-2").click(function() {
    clearValues();
    Graph.drawPoints(group2)
  });

  $("#group-3").click(function() {
    clearValues();
    Graph.drawPoints(group3)
  });
});

