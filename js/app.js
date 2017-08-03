var dataArray=[];
var ARPSEUR =[];

google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['table']});
   // google.charts.setOnLoadCallback(drawChart);

   function drawChart() {

     var data = new google.visualization.DataTable();
     data.addColumn('number', 'Month');
     data.addColumn('number', 'Production');

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
    
    function drawTable() {

     var data = new google.visualization.DataTable();
     data.addColumn('number', 'Month');
     data.addColumn('number', 'Production');

     console.log("data array inside draw chart",dataArray)

     data.addRows(dataArray);

     var table = new google.visualization.Table(document.getElementById('data-table'));

     table.draw(data, {width: '100%', height: '100%'});
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
		ARPSEUR = [];

		// console.log("This called the ROD function");
		var IP = document.getElementById('IP').value;

		var bFactor = document.getElementById('bFactor').value;

		var decline = document.getElementById('decline').value;

		var t = this.month();
		
		var HYPER;

		var kIncrease = 0;

		var EXP = function(x){
			var k = 1+(Math.log(1-.06/12)/12);
			kIncrease++;
			return x*Math.pow(k,kIncrease);
		};		
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

			// modified ARPS changes to exponential decline at a terminal decline of .06/12
			if (ED <= .06/12 && ED > 0){
				var ARPS = [i,EXP(HYPER)];
			} else {	
				HYPER = CUM2 - CUM1;
				var ARPS = [i, HYPER];
			}
			dataArray.push(ARPS);	

		};
		drawChart();
        drawTable();
        console.log(dataArray);

        HYPER = 0;

		for(var i = 1; i <= 600; i++){
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
			if (ED <= .06/12 && ED > 0){
				var ARPS600 = EXP(HYPER);
			} else {
				var ARPS600 = HYPER;
			}
			ARPSEUR.push(ARPS600);	
		};

		console.log(ARPSEUR);

		function add(a,b) {
			return a + Math.round(b);
		}

		var sum = ARPSEUR.reduce(add,0);

		var sumMillions = Math.round(sum/1000);

		var WellName = document.getElementById('WellName').value;

		document.getElementById('WellNameOutput').innerHTML = WellName;


		function formatEUR(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		var formattedEUR = formatEUR(sumMillions)

		document.getElementById("EUR").innerHTML = formattedEUR;
	}
}
