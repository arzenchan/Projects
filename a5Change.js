var hovLineSiz = ["Default", "Num"];
var hovLineCol = ["Default", "Num"];

d3.json("data.json", function(json) {
//Change Colour to default
  d3.select("#noCol").on("click", function() {
	hovLineCol = ["Default", "Num"];
    divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(120," + ((d.ImmigrantNum/12000)*100) + "%,65%)";});
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(190," + ((d.Income/145000)*100) + "%,65%)";});
  });
 //change to Default
  d3.select("#def").on("click", function() {
	hovLineSiz = ["Default", "Num"];
    divImmi.selectAll("div")
       .data(treemapImmi.value(function(d) { return d.ImmigrantNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.ImmigrantNum; }));
	divInc.selectAll("div")
		.data(treemapInc.value(function(d) { return d.Income;}))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" $"+ Math.floor(d.Income); }))
  });
/*/change Colour to Grey
  d3.select("#noCol").on("click", function() {
    divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", "hsl(0, 0%, 60%)");
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", "hsl(0, 0%, 60%)");
  });
*/
	//change to Area
  d3.select("#area").on("click", function() {
	hovLineSiz = ["d.LandAreaSqrKm", "km2"];
    divImmi.selectAll("div")
        .data(treemapImmi.value(function(d) { return d.LandAreaSqrKm;}))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.LandAreaSqrKm + "km2"; }));
	divInc.selectAll("div")
        .data(treemapInc.value(function(d) { return d.LandAreaSqrKm;}))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.LandAreaSqrKm + "km2"; }));
  });

  //change to Population
  d3.select("#pop").on("click", function() {
	  hovLineSiz = ["d.Population", "people"];
    divImmi.selectAll("div")
        .data(treemapImmi.value(function(d) { return d.Population; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.Population; }));
	divInc.selectAll("div")
        .data(treemapInc.value(function(d) { return d.Population; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.Population; }));
		
  });
  //change to Cardholders
  d3.select("#cards").on("click", function() {
	hovLineSiz = ["d.CardholderNum", "cardholders"];
    divImmi.selectAll("div")
        .data(treemapImmi.value(function(d) { return d.CardholderNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.CardholderNum; }));
	divInc.selectAll("div")
        .data(treemapInc.value(function(d) { return d.CardholderNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.CardholderNum; }));
  });
  
  //change Colour to CardholdersColo
  d3.select("#cardsCol").on("click", function() {
	hovLineCol = ["Math.floor(d.CardholderProp*100)", "% cardholders"];
    divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(0," + ((d.CardholderProp*100)) + "%,65%)";});
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(0," + ((d.CardholderProp*100)) + "%,65%)";});
  });
  
  //change to Income
  d3.select("#income").on("click", function() {
    hovLineSiz = ["Math.floor(d.Income)", " dollars"];
	divImmi.selectAll("div")
        .data(treemapImmi.value(function(d) { return d.Income; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" $"+ Math.floor(d.Income); }));
	divInc.selectAll("div")
        .data(treemapInc.value(function(d) { return d.Income; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" $"+ Math.floor(d.Income); }));
  });
  //change Colour to Income
  d3.select("#incomeCol").on("click", function() {
    hovLineCol = ["Math.floor(d.Income)", "dollars"];
	divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(190," + (((d.Income)/145000)*100) + "%,65%)";});
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(190," + (((d.Income)/145000)*100) + "%,65%)";});
  });

  //change to Education
  d3.select("#bach").on("click", function() {
	hovLineSiz = ["d.WithBachlorsNum", "Bach. Degs."];
    divImmi.selectAll("div")
        .data(treemapImmi.value(function(d) { return d.WithBachlorsNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.WithBachlorsNum; }));
	divInc.selectAll("div")
        .data(treemapInc.value(function(d) { return d.WithBachlorsNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.WithBachlorsNum; }));
  });
    //change Colour to Education
  d3.select("#bachCol").on("click", function() {
	hovLineCol = ["Math.floor(d.WithBachProp*100)", "% Bach. Deg."];
    divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(240," + ((d.WithBachProp*100)) + "%,65%)";});
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(240," + ((d.WithBachProp*100)) + "%,65%)";});
  });
  
  //change to Immigrants
  d3.select("#immi").on("click", function() {
	hovLineSiz = ["d.ImmigrantNum", "Immigrants"];
    divImmi.selectAll("div")
        .data(treemapImmi.value(function(d) { return d.ImmigrantNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.ImmigrantNum; }));
	divInc.selectAll("div")
        .data(treemapInc.value(function(d) { return d.ImmigrantNum; }))
      .transition()
        .duration(1500)
        .call(cell)
		.text((function(d) { return d.children ? null : d.name +" "+ d.ImmigrantNum; }));
  });
    //change Colour to Immigrants
  d3.select("#immiCol").on("click", function() {
	hovLineCol = ["d.ImmigrantNum", "Immigrants"];
    divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(120," + ((d.ImmigrantNum/12000)*100) + "%,65%)";});
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(120," + ((d.ImmigrantNum/12000)*100) + "%,65%)";});
  });
  //change Colour to Immigrant %
  d3.select("#immiPrpCol").on("click", function() {
	hovLineCol = ["Math.floor(d.ImmigrantProp*100)", "% Immigrants"];
    divImmi.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(140," + (d.ImmigrantProp*100*5) + "%,65%)";});
	divInc.selectAll("div")
      .transition()
        .duration(1500)
        .style("background-color", function(d) { return d.children ? null : "hsl(140," + (d.ImmigrantProp*100*5) + "%,65%)";});
  });
  
});

function mouseover() {
	div.transition()
	.duration(300)
	.style("opacity", 1);
}
function mousemove(d) {
	//problem is that selecting what's displayed for the hover is global so it won't work for defaul when the two treemaps display different variables
	div
	.style("left", (d3.event.pageX ) + "px")
	.style("top", (d3.event.pageY) + "px");
	//for the hovLine arrays, element 0 holds the d.x to extract and 1 the name to display
	if(hovLineSiz[0]=="Default" && hovLineCol[0]=="Default"){
		div
		.text(d.name+" | Click Buttons for Info");
	}
	else if(hovLineSiz[0]=="Default"){//Can display colour info
		div
		.text(d.name+" | Colour: "+eval(hovLineCol[0])+" "+hovLineCol[1]);
	}
	else if(hovLineCol[0]=="Default"){//Can display size info
		div
		.text(d.name+" | Size: "+eval(hovLineSiz[0])+" "+hovLineSiz[1]);
	}
	else{//can display all info
		div
		.text(d.name+" | Size: "+eval(hovLineSiz[0])+" "+hovLineSiz[1]+" | Colour: "+eval(hovLineCol[0])+" "+hovLineCol[1]);
	}
}

function mouseout() {
	div.transition()
	.duration(300)
	.style("opacity", 0);
}