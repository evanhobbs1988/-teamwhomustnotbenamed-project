var ArpsEquation = {

	// t: document.getElementById('months'); 
	// below code creates a vector t to be used in all the calculations of the ARPS equation

	month: function(){	

		var monthCount = document.getElementById('months').value;

		function range(start, stop, step){
			var a=[start], b=start;
			while(b<stop){b+=step;a.push(b)}
			return a;
		};

		var t = range(1,monthCount,1)
	},

	ROD: function(){
		var IP = document.getElementById('IP').value;

		var bFactor = document.getElementById('bFactor').value;

		var decline = document.getElementById('decline').value;

		var t = month;
		// example of playing with a for loop
		for(var i = 0; i < this.t.length; i++){
			(IP*30.41667)*(1+bFactor*decline*t)^(-1/b)
			// script actually goes in here for ROD equation, will get at work 
		};
	}

	// table: function(){
		// functon goes here that will map our table??
	// }
}

ArpsEquation.draw();