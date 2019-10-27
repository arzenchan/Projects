
var mainBodyWidth = document.getElementById('chartIncome').offsetWidth
var windowSize = window.innerHeight

var w = mainBodyWidth-20,
    h = windowSize-200,
    color = d3.scale.category20c();

var treemapInc = d3.layout.treemap()
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.Income; });//Starting Creation Variable!This is the sorting. 

var divInc = d3.select("#chartIncome").append("div")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");

// Define the div for the tooltip
// Add tooltip div
var div = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);
	
d3.json("data.json", function(json) {
//Creating the default data
  divInc.data([json]).selectAll("div")
      .data(treemapInc.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .call(cell)
      .text((function(d) { return d.children ? null : d.name +" $"+ Math.floor(d.Income); }))
	  .style("background-color", function(d) { return d.children ? null : "hsl(190," + (((d.Income)/145000)*100) + "%,65%)";})
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

