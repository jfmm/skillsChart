var courseColors = {
  "Android" : "#5cb860",
  "JavaScript" : "#c25975",
  "CSS" : "#3079AB",
  "Development Tools" : "#637a91",
  "HTML" : "#39ADD1",
  "PHP" : "#7D669E"
};



var skillPointData = "https://teamtreehouse.com/josemorales.json";

// set dimensions
var width = 700,
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

    if(property === "total" || property === "Game Development") continue;
    
    var item = {
        skillName : property,
        points : data.points[property],
        fill : function(colors) {
          //iterate over color object
          // if key in object is equal to this.skillName
            // return the value of the property
            // break from the loop.
          for (var course in colors) {
            console.log(course);
            if(course == this.skillName) {
              return colors.course;
              //break;
            } else {
              return "#c25975";
            }
              
          }
        }
    };
    
    dataArray.push(item);
  }
  
  
  // set domain  
  xScale.domain([0 , d3.max(dataArray, function(d) { return d.points; })]);

  
  // Set chart height dynamically
  chart.attr("height", barHeight * dataLength);


  var bar = chart.selectAll("g")
    .data(dataArray)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
  
 
  bar.append("rect")
      .attr("width", function(d) { return xScale(d.points);})
      .attr("height", barHeight - 1)
      .attr("fill", function(d) { return d.fill(courseColors)}); 
  
  
  bar.append("text")
      .attr("x", function(d) { return xScale(d.points) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.skillName; });
  
});


 

