$(function(){

var w = window.innerWidth;
var h = window.innerHeight;
var num = 1;
$("#divTest").fadeOut(0);

function animiation(type){

var xIni,yIni,xFin,Yfin;

	if(type > 0){
		xIni = w - (w-60);
		yIni = h - 220;
		xFin = w-440;
		Yfin = h - 220;
		angleIni = 291.063;
		lengthIni =  0.420;
		angleFin = 75.172;
        lengthFin = 0.416;
	}else{
		xFin = w - (w-60);
		Yfin = h - 220;
		xIni = w-440;
		yIni = h - 220;
		angleFin = 291.063;
		lengthFin =  0.420;
		angleIni = 75.172;
        lengthIni = 0.416;
	}

	var bezier_params = {
    start: { 
      x: xIni, 
      y: yIni, 
      angle: angleIni,
      length: lengthIni
    },  
    end: { 
      x: xFin,
      y: Yfin, 
      angle: angleFin,
      length: lengthFin
    }
  }	
 
 $("#divTest").animate({path : new $.path.bezier(bezier_params)},3000).fadeOut(50);
 
}

/*var interval = setInterval(function(){
	     num *= -1;
	     $("#divTest").fadeIn(50);
		 animiation(num);
},4000);*/





  var arc_params = {
    center: [w/2 - 200,h/2],  
        radius: 200,    
        start: 2000,
        end: 30,
        dir: -1
  }
  
//$("#divTest").animate({path : new $.path.arc(arc_params)},3000);

var SineWave = function() {
  this.css = function(p) {
    var s = Math.sin(p*20)
    var x = 500 - p * 300 
    var y = s * 50 + 150
    var o = ((s+2)/4+0.1)
    return {top: y + "px", left: x + "px", opacity: o}
  } 
};
  
//$("#divTest").animate({path : new SineWave})

});
