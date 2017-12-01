var hockeyd1967 = [9,13,11,10,8,9,11,8,6,4,6,6]
var hockeyd2016 = [49,31,34,42,35,20,31,30,46,29,35,34]
var extra = [9,13,11,10,8,9,11,8,6,4,6,3]
var copyhock = [9,13,11,10,8,9,11,8,6,4,6,6]
var contcol = [10,9,8,7,6,5,6,7,8,9,10,9]
var max2016 = d3.max(hockeyd2016)
var max1967 = d3.max(hockeyd1967)
var changeHeight = 15
var changeData1 = hockeyd2016

var month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
var pal = ["green","blue","red","green","blue","red","green","blue","red","green","blue","red"]
var randomcol = function(d,i) {
	return "#" + Math.floor(((Math.random()) * contcol[i])) + Math.floor(((Math.random()) * contcol[i])) + Math.floor(((Math.random()) * contcol[i])) + Math.floor(((Math.random()) * contcol[i])) + Math.floor(((Math.random()) * contcol[i])) + Math.floor(((Math.random()) * contcol[i])) ;
}

var randomNumGen = Math.floor(((Math.random())*1000000))
var goSingle = "#" + randomNumGen

var singleCol = goSingle

var svgWidth = 800;
var svgHeight = 300;
var barHeights = function(d) {return d*(.2*changeHeight) + "px"};

var mysvg = d3.select(".graphbox")
	.append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
 ;
 
var mybars = mysvg.selectAll("rect")
 	.data(changeData1)
  .enter()
  .append("rect")
  .attr("x", function(d,i) { return i * ((svgWidth/hockeyd1967.length));})
  .attr("y", function(d) { return (svgHeight - (d*(.2*changeHeight)))-100 ;})
  .attr("width", function(d,i) { return ((svgWidth/hockeyd1967.length)-2);})
  .attr("height", barHeights)
  .attr("fill", randomcol)
 ;
 
var xlabs = mysvg.selectAll("foreignObject")
 	.data(month)
  .enter()
  .append("foreignObject")
  .attr("class","label")
  .attr("x", function(d,i) { return i * ((svgWidth/hockeyd1967.length))+((svgWidth/hockeyd1967.length)/2);})
  .attr("y", svgHeight-90)
  .text(function(d) { return d ;})
 ;

var barlabs = mysvg.selectAll("text")
	.data(changeData1)
  .enter()
  .append("text")
  .attr("class","barlab")
  .attr("x", function(d,i) { return i * ((svgWidth/hockeyd1967.length))+((svgWidth/hockeyd1967.length)/2);})
  .attr("y", function(d) { return (svgHeight - (d*(.2*changeHeight)))-90 ;})
  .text(function(d) {return d;})
 ;

var topLab = mysvg.append("text")
	.attr("x",svgWidth/2)
  .attr("y","20px")
	.text("Hockey Deaths in 1967 by Month")
  .attr("class","toplab")
 ;

var xline = mysvg.append("line")
	.attr("x1","5")
  .attr("x2", svgWidth-5)
  .attr("y1", svgHeight-95)
  .attr("y2", svgHeight-95)
  .attr("stroke","black")
  .attr("stroke-width","1px")
  .attr("shape-rendering","crispEdges")
;

var heightchange = function addHeight() {
  mysvg.selectAll("rect")
  .attr("fill","white")
;}

var circ = function bigCirc() {
	d3.select("svg")
  	.selectAll("rect")
    .attr("fill","black")
;

}

var restore = function resCol() {
	d3.select("svg")
  	.selectAll("rect")
    .attr("fill", randomcol)
;

}

var randomSame = function resCol() {
	d3.select("svg")
  	.selectAll("rect")
    .attr("fill", "#" + Math.floor(((Math.random())*1000000)))
;

}

var whiteBg = function whiteGo() {
	d3.select("svg")
	.style("background-color","white")
;
	d3.select(".graphbox")
	.style("background-color","white")
;
	d3.select(".plate")
	.style("background-color","white")
;

}

var noBg = function noneGo() {
	d3.select("svg")
	.style("background-color","")
;
	d3.select(".graphbox")
	.style("background-color","#BBCBCB")
;
	d3.select(".plate")
	.style("background-color","#BBCBCB")
;

}

var updateMyData = function updateData() {
changeHeight = max2016;
changeData1 = hockeyd2016;
document.getElementById("ondisp").innerHTML = changeHeight;
}


document.getElementById("color").onclick = restore;
document.getElementById("printable").onclick = circ;
document.getElementById("singleCol").onclick = randomSame;
document.getElementById("whitebg").onclick = whiteBg;
document.getElementById("nobg").onclick = noBg;