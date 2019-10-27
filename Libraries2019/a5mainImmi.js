
var mainBodyWidth = document.getElementById('chartImmi').offsetWidth
var windowSize = window.innerHeight

var w = mainBodyWidth-20,
    h = windowSize-200,
    color = d3.scale.category20c();

var treemapImmi = d3.layout.treemap()
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.ImmigrantNum; });//Starting Creation Variable!

var divImmi = d3.select("#chartImmi").append("div")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");

d3.json("data.json", function(json) {
//Creating the default data
  divImmi.data([json]).selectAll("div")
      .data(treemapImmi.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .call(cell)
      .text((function(d) { return d.children ? null : d.name +" "+ d.ImmigrantNum; }))
	  .style("background-color", function(d) { return d.children ? null : "hsl(120," + ((d.ImmigrantNum/12000)*100) + "%,65%)";})
	  .on("mouseover", mouseover)
		.on("mousemove", function(d){mousemove(d);})
		.on("mouseout", mouseout);
});

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
	  
}
