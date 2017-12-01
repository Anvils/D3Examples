var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-200))
  .force("link", d3.forceLink().id(function(d) {
    return d.id;
  }).distance(60))
  .force("x", d3.forceX(width / 2))
  .force("y", d3.forceY(height / 2))
  .on("tick", ticked);

var link = svg.selectAll(".link"),
  node = svg.selectAll(".node");

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.json("pennStateParks.json", function(error, graph) {
  if (error) throw error;

  simulation.nodes(graph.nodes);
  simulation.force("link").links(graph.links)

  link = link
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .on("mouseover", function(d) {
      div.transition().duration(500).style("opacity", .9);
      div.html(d.id).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px")
    })
    .on("mouseleave", function(d) {
    	div.transition().duration(500).style("opacity", 0).delay(500)
    });

  node = node
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", function(d) {
      return d.area / 1000;
    })
    .style("fill", function(d) {
      return d.color
    })
    .on("mouseover", function(d) {
      document.getElementById("appear1").innerHTML = d.id;
      document.getElementById("appear2").innerHTML = d.area + " Acres";
      selectOrb();
    });
});

function ticked() {
  link.attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  node.attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}
