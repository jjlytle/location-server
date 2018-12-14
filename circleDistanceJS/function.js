function startSimulation(nodeCount, xsize, ysize, input) {
	console.log("NODEC =\t"+ nodeCount + "\txsz"+ xsize +"\tysz"+ysize+"\tinput="+input)
	var nodes = [];
	var node = null;
	//Create howevermany random nodes
	for (var i = 0; i < nodeCount; i++) {
		node = {
			num: i+1,
			x: Math.random() * xsize,
			y: Math.random() * ysize
		};

		nodes.push(node);

		console.log(nodes[i]);
	}

	var truthPoints = [];
	//Retrieve truth points
	truthPoints = input;
	var output = [];

	for (i = 0; i < truthPoints.length; i++) {
		var truthPoint = truthPoints[i];
		for (var j = 0; j < nodes.length; j++) {
			node = nodes[j];

			output.push({
				num: node.num,
				dist: dist(node.x, truthPoint.x, node.y, truthPoint.y)
			});
		}
	}

	for (i = 0; i < output.length; i++) {
		console.log(output[i]);
	}

	//Store nodes in outputdb

}

function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

const input = [{
	id: 0,
	x: 0.61,
	y: 0.91
},
{
	id: 1,
	x: 0.61,
	y: 4.57
},
{
	id: 2,
	x: 5.79,
	y: 4.57
},
{
	id: 3,
	x: 5.79,
	y: 7.92
},
{
	id: 4,
	x: 0.76,
	y: 7.92
},
{
	id: 5,
	x: 0.76,
	y: 0.91
}];

startSimulation(10, 500, 500, input);
