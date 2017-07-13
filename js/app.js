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
		// console.log("This called the ROD function");
		var IP = document.getElementById('IP').value;

		var bFactor = document.getElementById('bFactor').value;

		var decline = document.getElementById('decline').value;

		var t = this.month();
		
		// for loop that has all the ARPS equations piled on top of one another
		for(var i = t.length-1; i > 0; i--){
			console.log((IP*30.41667)*(1+bFactor*decline*i)^(-1/bFactor));
		};
	},


	[{
		t: "number",
		ROD: "number"
	},

	// table: function(){
		// functon goes here that will map our table?? need it to return 2 columns - a column of t values, 
		// corresponding with a column of ROD values
		// use... d3??? 
	// }
}

// ArpsEquation.draw();