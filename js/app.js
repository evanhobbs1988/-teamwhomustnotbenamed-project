var dataArray=[];

 google.charts.load('current', {'packages':['line']});
    // google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Month');
      data.addColumn('number', 'Production');

      console.log("data array inside draw chart",dataArray)

      data.addRows(dataArray);

      var options = {
        chart: {
          title: 'Production Forecast',
          subtitle: 'Mcf or b per month'
        },
        legend: {
        	position: 'none'
        }
      };

      var chart = new google.charts.Line(document.getElementById('line-chart'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }



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

	Forecast: function(){

		dataArray = [];

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
				var ARPS = [i, ED];
			} else {
				var ARPS = [i, HYPER];
			}
			dataArray.push(ARPS);	

		};
		drawChart()
		console.log(dataArray);
	}
}
