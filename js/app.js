var ArpsEquation = function(){
	
	IP: document.getElementById('IP');

	b-factor: document.getElementById('b-factor');

	decline: document.getElementById('decline');

	// t: document.getElementById('months'); 

		var monthCount = document.getElementById('months');

		function range(start, stop, step){
			var a=[start], b=start;
			while(b<stop){b+=step;a.push(b)}
			return a;
		};

		var t = range(1,monthCount,1)

	ROD: function(){
		// example of playing with a for loop
		for(var i = 0; i < this.t.length; i++){
			// script actually goes in here for ROD equation, will get at work 
		};
	}

	// table: function(){
		// functon goes here that will map our table??
	// }
}

ArpsEquation.draw();