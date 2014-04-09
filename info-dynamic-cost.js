var w = screen.width * 0.3,
    h = screen.width * 0.3,
    r = 380,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    p = 15,
    node,
    root;

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

var colorMap = {"Wet Storage": "#1f77b4",
  "Dry Storage": "#aec7e8", 
  "Repository": "#ffbb78",
  "Reprocessed Fuel": "#2ca02c"
  }

function colorPicker(s) {
  var c = "white";
  for (var key in colorMap) {
     if (s.startsWith(key)) {
       c = colorMap[key];
       break;
     };
  };
  return c;
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        lines = text.text().split(/\n/).reverse(),
        line,
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x)
                               .attr("y", y).attr("dy", dy + "em");
    lineNumber = - Math.floor(lines.length / 2);
    while (line = lines.pop()) {
        tspan = text.append("tspan").attr("x", x)
                    .attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(line);
    }
  });
}

var pack = d3.layout.pack()
    .size([r, r])
    .value(function(d) { return d.size;})
    .padding(p);


// 
// Fuel Cycle 1 
//

var fc1 = d3.select("body").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

function load_fc1(fname) {
  d3.json(fname, function(data) {
    node = root = data;
    var nodes = pack.nodes(root);
    fc1.selectAll("circle")
      .remove();
    fc1.selectAll("circle")
      .data(nodes)
      .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d){return colorPicker(d.name)})
      .on("click", function(d) { return zoom1(node == d ? root : d); });

    fc1.selectAll("text")
      .remove();
    fc1.selectAll("text")
      .data(nodes)
      .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; })
      .call(wrap);

    d3.select(window).on("click", function() { zoom1(root); });
  });
}

function zoom1(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = fc1.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

load_fc1("years/info-raw-data-run1-2000-cost.json");

// 
// Fuel Cycle 2 
//

var fc2 = d3.select("body").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

function load_fc2(fname) {
  d3.json(fname, function(data) {
    node = root = data;
    var nodes = pack.nodes(root);
    fc2.selectAll("circle")
      .remove();
    fc2.selectAll("circle")
      .data(nodes)
      .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d){return colorPicker(d.name)})
      .on("click", function(d) { return zoom2(node == d ? root : d); });

    fc2.selectAll("text")
      .remove();
    fc2.selectAll("text")
      .data(nodes)
      .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; })
      .call(wrap);

    d3.select(window).on("click", function() { zoom2(root); });
  });
}

function zoom2(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = fc2.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

load_fc2("years/info-raw-data-run3-2000-cost.json");

// 
// Time step 3
//

var fc3 = d3.select("body").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

function load_fc3(fname) {
  d3.json(fname, function(data) {
    node = root = data;
    var nodes = pack.nodes(root);
    fc3.selectAll("circle")
      .remove();
    fc3.selectAll("circle")
      .data(nodes)
      .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d){return colorPicker(d.name)})
      .on("click", function(d) { return zoom3(node == d ? root : d); });

    fc3.selectAll("text")
      .remove();
    fc3.selectAll("text")
      .data(nodes)
      .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; })
      .call(wrap);

    d3.select(window).on("click", function() { zoom3(root); });
  });
};

function zoom3(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = fc3.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

load_fc3("years/info-raw-data-run5-2000-cost.json");

function load_fcs(year) {
  load_fc1("years/info-raw-data-run1-" + year + "-cost.json");
  load_fc2("years/info-raw-data-run3-" + year + "-cost.json");
  load_fc3("years/info-raw-data-run5-" + year + "-cost.json");
}

function yearUpdate(year) {
  document.querySelector('#yearlabel').value = year;
  load_fcs(year);
}
