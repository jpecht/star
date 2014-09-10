
// svg constants; change these to alter drawing
var width = 750,
	height = 500,
	centerCircleRadius = 60,
	numPoints = 16,
	basePointMultiplier = 4, // points divisible by 4 (0, 4, 8, etc.)
	secondaryPointMultiplier = 2.5, // every other point (2, 6, etc.)
	otherPointMultiplier = 2; // all odd points (1, 3, 5, etc.)


var svg = d3.select('#svg-graphic')
	.attr('width', width)
	.attr('height', height);

// work with center as 0, 0
var g = svg.append('g')
	.attr('transform', function() {
		return 'translate(' + width/2 + ',' + height/2 + ')';
	});


/* --- The STAR --- */

// build center circle
var centerCircle = g.append('circle')
	.attr('stroke', 'steelblue')
	.attr('stroke-width', '2px')
	.attr('fill', 'white')
	.attr('r', centerCircleRadius)
	.attr('cx', 0)
	.attr('cy', 0);

// build points encircling center circle
	pointsData = [];
for (var i = 0; i < numPoints; i++) {
	if (i % 4 === 0) var pointRadius = basePointMultiplier * centerCircleRadius;
	else if (i % 4 === 2) var pointRadius = secondaryPointMultiplier * centerCircleRadius;
	else var pointRadius = otherPointMultiplier * centerCircleRadius;
	pointsData.push({
		degree: 2*Math.PI*i/numPoints,
		radius: pointRadius
	});
}

var points = g.selectAll('.point')
	.data(pointsData)
	.enter().append('circle')
		.attr('class', 'point')
		.attr('id', function(d, i) {
			return 'point' + i;
		})
		.attr('stroke', 'steelblue')
		.attr('stroke-width', '2px')
		.attr('fill', 'white')
		.attr('r', 0)
		.attr('cx', function(d, i) {
			return d.radius * Math.cos(d.degree);
		})
		.attr('cy', function(d, i) {
			return d.radius * Math.sin(d.degree);
		});

// draw lines to connect points
var connectData = [];
for (var i = 0; i < numPoints; i++) {
	
	// initiating connections; edit this line to customize
	var connections = [numPoints/2 + i + 1, numPoints/2 + i - 1];
	
	for (var j = 0; j < connections.length; j++) {
		while (connections[j] >= numPoints) connections[j] -= numPoints;
		connectData.push({
			pointStart: i,
			pointEnd: connections[j]
		});
	}	
}

var lines = g.selectAll('.line')
	.data(connectData)
	.enter().append('line')
		.attr('class', 'line')
		.attr('stroke', 'steelblue')
		.attr('stroke-width', '2px')
		.attr('x1', function(d, i) {
			return d3.select('#point' + d.pointStart).attr('cx');
		})
		.attr('y1', function(d, i) {
			return d3.select('#point' + d.pointStart).attr('cy');
		})
		.attr('x2', function(d, i) {
			return d3.select('#point' + d.pointEnd).attr('cx');
		})
		.attr('y2', function(d, i) {
			return d3.select('#point' + d.pointEnd).attr('cy');
		});
