

var skillPointData = "https://teamtreehouse.com/josemorales.json";

var chart = d3.select("#chart-wrapper")
                    .append('svg')
                    .attr('id', 'viz');


     d3.json(skillPointData, function(data) {
       
       console.log(data.points);

     });