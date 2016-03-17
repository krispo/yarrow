function createChart(el, opt, cb){
  var margin = {top: 10, right: 10, bottom: 20, left: 30},
    width = opt.width - margin.left - margin.right,
    height = opt.height - margin.top - margin.bottom;

  var formatDate = d3.time.format("%d-%b-%y");

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.time.format("%b"))
    .orient("bottom")
    .ticks(12);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  var svg = d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("./data/aapl_stock.tsv", type, function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

    var path = svg.append("path")
      .datum(data);
    path.attr("class", "line")
      .attr("d", line);

    var max = {date: data[0].date, close: data[0].close};
    for (var i=0; i<data.length; i++){
      if (data[i].close>max.close) max = {date: data[i].date, close: data[i].close};
    }

    var circle = svg.selectAll('circle')
      .data([max])
      .enter().append('circle')
      .attr('class', 'max_point')
      .attr('cx', function (d) { return x(d.date); })
      .attr('cy', function (d) { return y(d.close); })
      .attr('r', 6);

    //cb(circle.node());
    cb({
      x: x(max.date) + margin.left,
      y: y(max.close) + margin.top,
      date: d3.time.format('%b %Y')(max.date),
      value: max.close
    })
  });

  function type(d) {
    d.date = formatDate.parse(d.date);
    d.close = +d.close;
    return d;
  }
}