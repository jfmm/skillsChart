var courseColors = {
 
  "JavaScript" : "#c25975",
  "CSS" : "#3079AB",
  "Development Tools" : "#637a91",
  "HTML" : "#39ADD1",
  "PHP" : "#7D669E",
  "Android" : "#5cb860",
  "WordPress": "#838CC7",
  "Design": "#e59a13",
  "C#": "#9e4d83",
  "Python": "#F092B3",
  "Databases": "#eb7728",
  "Ruby": "#e15258",
  "Java": "#2c9676",
  "iOS": "#53bbb4",
  "Digital Literacy": "#c38cd4"
  
};



var removeLoader = function () {
  console.log("doc loaded");
  document.getElementById("loader").style.display = "none";
  
};

var skillPointData = "https://teamtreehouse.com/josemorales.json";

// set dimensions

var width = 800,
    barHeight = 30;


// set x scale
var xScale = d3.scaleLinear()
            .range([0, width]);

var chart = d3.select("#chart")
              .attr("width", width);



// get data
d3.json(skillPointData, function(error, data) {
       
  // if we get data we remove the loader image
  if(data) removeLoader();
  
  if(error) throw new Error("data not found");
  
  var totalPoints = data.points.total;
  var dataArray = [];
  var dataLength = Object.keys(data.points).length - 1; // -1 because we don't want to graph the "total" property


  // iterate over API object and create an array for easier mapping later on.
  for ( var property in data.points) {
    
    

    if(property === "total" || property === "Game Development" || property === "Business") continue;
    
    var item = {
        skillName : property,
        points : data.points[property],
        percentage: Math.ceil((data.points[property] / totalPoints) * 100),
        setFill : function(colors) {
      
          return colors[this.skillName];
          
        }
    };
    
    dataArray.push(item);
  }
  
  console.log(dataArray);
  //sort dataArray from highest points to lowest
  dataArray.sort(function (a, b) {
  if (a.points < b.points) {
    return 1;
  }
  if (a.points > b.points) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
  
  
  // set domain  
  xScale.domain([0 , d3.max(dataArray, function(d) { return d.points * 1.5; })]); // 1.5 add buffer in domain so that labels fit.

  
  // Set chart height dynamically
  chart.attr("height", barHeight * dataLength);


  var bar = chart.selectAll("g")
    .data(dataArray)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
  
 
  bar.append("rect")
      .attr("width", function(d) { return xScale(d.points);})
      .attr("height", barHeight - 1)
      .attr("fill", function(d) {return d.setFill(courseColors)});
  
  bar.append("text")
      .attr("x", function(d) { return xScale(d.points) + 2; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("style", "font-size: 11px")
      .text(function(d) { return d.skillName; });
  
  bar.append("text")
      .attr("x", function(d) { return xScale(d.points) - 30; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("style", "font-size: 11px; fill: #fff")
      .text(function(d) { return d.percentage + "%"; });
  
});





