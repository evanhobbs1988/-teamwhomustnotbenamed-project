google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

var dataArray = [];

var ArpsEquation = {

	// below code creates a vector t to be used in all the calculations of the ARPS equation

	month: function(){	

		var monthCount = document.getElementById('months').value;

		function range(start, stop, step){
			var a=[start], b=start;
			while(b<stop){b+=step;a.push(b)}
			return a;
		};

		var t = range(1,monthCount,1);

		return t;
	},

	ROD: function(){
		// first clear the old list
		console.clear();

		// console.log("This called the ROD function");
		var IP = document.getElementById('IP').value;

		var bFactor = document.getElementById('bFactor').value;

		var decline = document.getElementById('decline').value;

		var t = this.month();
		
		// for loop that has all the ARPS equations piled on top of one another
		// for(var i = t.length-1; i > 0; i--){
		for(var i = 1; i <= t.length; i++){
			// recalculate the decline to be nominal decline
			var DiH = 1-Math.exp(((1-Math.pow(1-decline, -bFactor))/bFactor));
			var nominalDecline = -Math.log(1-DiH)/12;
			
			// need to check if these are calculating daily or monthly values!!
			var ROD1 = (IP*30.41667)*Math.pow((1+bFactor*nominalDecline*(i-1)),(-1/bFactor));
			var ROD2 = (IP*30.41667)*Math.pow((1+bFactor*nominalDecline*(i)),(-1/bFactor));
			var ED = -(Math.pow(ROD1/(IP*30.41667),bFactor)-1)/(bFactor*i);
			var CUM1 = (IP*30.41667)/((nominalDecline)*(1-bFactor))*(1-Math.pow((ROD1/(IP*30.41667)),(1-bFactor)));
			var CUM2 = (IP*30.41667)/((nominalDecline)*(1-bFactor))*(1-Math.pow((ROD2/(IP*30.41667)),(1-bFactor)));
			var HYPER = CUM2 - CUM1;
			// modified ARPS changes to exponential decline at a terminal decline of .006
			if (ED <= .006 && ED > 0){
				var ARPS = [i, "EXPONENTIAL"];
			} else {
				var ARPS = [i, HYPER];
			}
			dataArray.push(ARPS);	

		};
		console.log(dataArray);
	}


	// [{
		// t: "number",
		// ROD: "number"
	// },

	// table: function(){
		// functon goes here that will map our table?? need it to return 2 columns - a column of t values, 
		// corresponding with a column of ROD values
		// use... d3??? 
	// }
}

function drawChart() {

	var data = google.visualization.arrayToDataTable([
		[{label: 'Month', id: 'month', type: 'number'},
		{label: 'Production', id: 'Production', type: 'number'}], 
		[dataArray]]);

		// [
		// [{label: 'Month', id: 'month'},
		// {label: 'Production', id: 'Production', type: 'number'}],
		// [1, 126390.6972471915],
		// [2, 113830.76384454581],
		// [3, 103726.86200919328],
		// [4, 95407.69858010643],
		// [5, 88428.54775797855],
		// [6, 82482.58082688798],
		// [7, 77350.96151745727],
		// [8, 72873.22942431364],
		// [9, 68928.93555021915],
		// [10, 65425.82667695766],
		// [11, 62291.99966878467],
		// [12, 59470.547865734436],
		// [13, 56915.81994448928],
		// [14, 54590.75013387017],
		// [15, 52464.9171303974],
		// [16, 50513.10909540998],
		// [17, 48714.2467549094],
		// [18, 47050.56419687369],
		// [19, 45506.977965020575],
		// [20, 44070.595664173365],
		// [21, 42730.329254006036],
		// [22, 41476.58782213344],
		// [23, 40301.0313501081]
		// ]);

	var options = {
	    chart: {
	    	title: 'Production Forecast',
	    	subtitle: 'Mcf or b per month'
	    },
	    legend: {
	    	position: 'none'
	    },
	};

	var chart = new google.charts.Line(document.getElementById('line-chart'));

	chart.draw(data, google.charts.Line.convertOptions(options));
}


// ArpsEquation.draw();
