var skillPointData = "https://teamtreehouse.com/josemorales.json";

// set dimensions
var width = 500,
    barHeight = 20;

// set x scale
var xScale = d3.scaleLinear()
            .range([0, width]);

var chart = d3.select("#chart")
              .attr("width", width);

// get data
d3.json(skillPointData, function(error, data) {
       
  if(error) throw new Error("data not found");
  
  
  var dataArray = [];

  var dataLength = Object.keys(data.points).length - 1; // -1 because we don't want to graph the "total" property


  // iterate over API object and create an array for easier mapping later on.
  for ( var property in data.points) {

    var item = {
        skillName : property,
        points : data.points[property]
    };
    
    dataArray.push(item);
  }
  
  console.log(dataArray);
  
  
  
  // set domain  
  xScale.domain([0, d3.max(data, function(d) { return d.value; })]);
 
  // Set chart height dynamically
  chart.attr("height", barHeight * dataLength);

  
  //var i = 0;
  var bar = chart.selectAll("g")
    .data(dataArray)
    .enter().append("g")
    // whats this
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
  
  //TODO: ERROR HERE.
  bar.append("rect")
      .attr("width", function(d) { 
    return xScale(d); 
  })
    .attr("height", barHeight - 1);
  
});