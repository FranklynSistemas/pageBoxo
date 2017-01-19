$(function(){

$(window).load(function() {
	
	var preloaderDelay = 350,
		preloaderFadeOutTime = 800;

		function hidePreloader() {
			var loadingAnimation = $('#Preloader'),
				preloader = $('#Cargando');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();
		text();
});

function showbtn(){
	$("#flecha").fadeIn(5);
}

function text(){
	//strings: ["Boxo, una plataforma innovadora de mensajeria", "necesitas pedir o enviar algo Boxo es tu mejor opción !"]
	$(".textIni").typed({
        strings: ["¿ Necesitas enviar o pedir algo ?", "<strong>Boxo</strong> te ayuda fácil y rápido a solucionar tu problema !"],
        typeSpeed: 0,
        contentType: 'html',
        cursorChar: "|",
        callback: function(){ showbtn(); }
 });
};



var w = window.innerWidth;
var h = window.innerHeight;
var num = 1;
/*function init(){
	if($.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))){
    	alert('Hola! Entras desde un dispositivo móvil o tablet!');
	}
} */


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

globoDerecha();
nubes01Derecha();
nubes02Izquierda();
nubes03Derecha();
autoDerecha();
biciIzquierda();
motoDerecha();
personIzquierda();


$('#globo').css("height","80px");
function globoArriba(){
	$('#gifGlobo').css("margin-top","0px").animate({
			marginTop: "20px"
		},
			{
		     easing: 'swing',
		     duration: 2000,
		     complete: function(){
		        globoAbajo();
		    }
		});
}

function globoAbajo(){
	$('#gifGlobo').css("margin-top","20px").animate({
			marginTop: "0px"
		},
			{
		     easing: 'swing',
		     duration: 2000,
		     complete: function(){
		        globoArriba();
		    }
		});
}


function globoDerecha(){
	setTimeout(function(){
		globoArriba();
		$('#globo').animate({
	        width: "110%"
		}, {
		     easing: 'linear',
		     duration: 60000,
		     complete: function(){
		        globoIzquierda();
		    }
		})
	},1000);
} 




function globoIzquierda(){
	setTimeout(function(){
		$('#globo').css("width", "110%").animate({
			width: "0px"
		},{
			easing: 'linear',
		    duration: 60000,
		    complete: function(){
		        globoDerecha();
		    }
		})
	},1000);
}


function nubes01Derecha(){
	setTimeout(function(){
		$('#nube1').animate({
	        width: "110%"
		}, {
		     easing: 'linear',
		     duration: 150000,
		     complete: function(){
		        nubes01Izquierda();
		    }
		})
	},10000);
} 

function nubes01Izquierda(){
	setTimeout(function(){
		$('#nube1').css("width", "110%").animate({
			width: "0px"
		},{
			easing: 'linear',
		    duration: 150000,
		    complete: function(){
		        nubes01Derecha();
		    }
		})
	},10000);
}

function nubes02Derecha(){
	setTimeout(function(){
		$('#nube2').animate({
	        width: "110%"
		}, {
		     easing: 'linear',
		     duration: 120000,
		     complete: function(){
		        nubes02Izquierda();
		    }
		})
	},2000);
} 

$('#nube2').css("top", "130px");
$('#nube3').css("top", "200px");

function nubes02Izquierda(){	
	setTimeout(function(){
		$('#nube2').css("width", "110%").animate({
			width: "0px"
		},{
			easing: 'linear',
		    duration: 120000,
		    complete: function(){
		        nubes02Derecha();
		    }
		})
	},2000);
} 

function nubes03Derecha(){
	setTimeout(function(){
		$('#nube3').animate({
	        width: "110%"
		}, {
		     easing: 'linear',
		     duration: 130000,
		     complete: function(){
		        nubes03Izquierda();
		    }
		})
	},100);
} 

function nubes03Izquierda(){
	setTimeout(function(){
		$('#nube3').css("width", "110%").animate({
			width: "0px"
		},{
			easing: 'linear',
		    duration: 130000,
		    complete: function(){
		        nubes03Derecha();
		    }
		})
	},100);
} 

$('#bici').css("z-index","1");
$('#moto').css("z-index","2");
$('#auto').css("z-index","3");


function autoDerecha(){
	setTimeout(function(){
		$('#auto').css("width", "0px").animate({
	        width: "130%"
		}, {
		     easing: 'linear',
		     duration: 10000,
		     complete: function(){
		        autoDerecha();
		    }
		})
	},1000);
} 


function biciIzquierda(){
	setTimeout(function(){
		$('#bici').css("width", "110%").animate({
			width: "0px"
		},{
			easing: 'linear',
		    duration: 20000,
		    complete: function(){
		        biciIzquierda();
		    }
		})
	},100);
} 


function motoDerecha(){
	setTimeout(function(){
		$('#moto').css("width", "0px").animate({
	        width: "130%"
		}, {
		     easing: 'linear',
		     duration: 7000,
		     complete: function(){
		     	$('#moto').css("width", "0px");
		        motoDerecha();
		    }
		})
	},1000);
} 

function personIzquierda(){
	setTimeout(function(){
		$('#person').css("width", "110%").animate({
			width: "0px"
		},{
			easing: 'linear',
		    duration: 25000,
		    complete: function(){
		        personIzquierda();
		    }
		})
	},4500);
} 

/*
var interval = setInterval(function(){
	     num *= -1;
	     console.log(num);
	     $("#divTest").fadeIn(50);
		 animiation(num);
},4000);

*/



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
