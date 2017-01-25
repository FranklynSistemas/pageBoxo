$(function(){

$(window).load(function() {
	
	var preloaderDelay = 350,
		preloaderFadeOutTime = 800;

		function hidePreloader() {
		
		/*var loadingAnimation = $('#Preloader'),
			preloader = $('#Cargando');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}*/

			// will first fade out the loading animation
		    $(".preloader").fadeOut();
		    //then background color will fade out slowly
		    $("#faceoff").delay(preloaderDelay).fadeOut("slow");
		}
		
		hidePreloader();
		text();
		carouser();
});

function carouser(){
	console.log("inicia carrusel");
	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    autoWidth:true,
	    animateOut: 'slideOutDown',
    	animateIn: 'flipInX',
	    responsiveClass:true,
	    stagePadding:30,
    	smartSpeed:450,
    	dots: true,
	    responsive:{
	        0:{
	            items:1,
	            dots:true
	        },
	        600:{
	            items:2,
	        },
	        1000:{
	            items:3,
	            //nav:true,
	            loop:true
	        }
	    }
	});
}

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
var toggle = true;
/*function init(){
	if($.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))){
    	alert('Hola! Entras desde un dispositivo móvil o tablet!');
	}
} */
var searchBoxOne, searchBoxTwo,map;
var directionsService,directionsDisplay;

function initAutocomplete() {  
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(51.219987, 4.396237),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  directionsDisplay.setMap(map);

  var options = {
	  componentRestrictions: {country: "co"}
  };

  // Create the search box and link it to the UI element.
  var inputOne = $("#Origen")[0];
  searchBoxOne = new google.maps.places.Autocomplete(inputOne, options);

  // Create the search box and link it to the UI element.
  var inputTwo = $("#Destino")[0];
  searchBoxTwo = new google.maps.places.Autocomplete(inputTwo, options);

  google.maps.event.trigger(map, 'resize');

  $(window).resize(function() {
        google.maps.event.trigger(map, 'resize');
  });
}



 //google.maps.event.addDomListener(window, 'load', initAutocomplete);
 google.maps.event.addDomListener(window, 'load', initAutocomplete);

 $("#ConsoleSim").fadeOut();

 $("#btnCalcular").click(function(e){
 	e.preventDefault();
 	if ($("#Origen").val() === "" || $("#Destino").val() === "" || $("#ValorPaquete").val() === "" ) {
 		$("#mensajes").css("text-align","center").fadeIn("slow").html("<p style='color: red'>¡Debes llenar todos los campos!</p>");
 		setTimeout(function(){$("#mensajes").fadeOut("slow")},2000);
 	}else{
 		//var distancia = google.maps.geometry.spherical.computeDistanceBetween(searchBoxOne.getPlace().geometry.location, searchBoxTwo.getPlace().geometry.location) + 2000;
	 	paintRoute(searchBoxOne.getPlace().geometry.location, searchBoxTwo.getPlace().geometry.location);
	 	//console.log(Math.floor(distancia/1000));
 	}
 	
 });


 function computeTotalDistance(result) {
      var total = 0;
      var ValorPaquete = parseInt($("#ValorPaquete").val());
      //var price = 1400*Math.floor($rootScope.order.distance * 5) ;
        var myroute = result.routes[0];
        /*for (var i = 0; i < myroute.legs.length; i++) {
        }*/
        total += myroute.legs[0].distance.value;
        var distance = total / 1000;
        var Time = (distance/30)*60;
        var Precio = getPrecio(distance);
        var Impuesto = ValorPaquete*1000 > 200000 ? (ValorPaquete * 1000) * 0.02 : 0;
        var IdaYVuel = toggle ? Precio - 1200 : 0;
        console.log(Precio + " "+ Impuesto +" "+ IdaYVuel);
        var html = "<p style='color: black'>El costo del envío seria de: <b style='color: black'>"+format(eval(parseInt(Precio)+parseInt(Impuesto)+IdaYVuel))+"</b> </p>"+
        			"<p style='color: black'>La distancia a recorrer seria de: <b style='color: black'>"+distance+" km </b></p>"+
        			"<p style='color: black'>El tiempo aproximado del recorrido seria de: <b style='color: black'>"+getTiempo(Time)+" </b></p>"+
        			"<p style='color: black'>El costo por ida y vuelta es de: <b style='color: black'>"+format(IdaYVuel)+" </b></p>"+
        			//"<p style='color: black'>El tiempo aproximado para la recoger su paquete esta entre 30 min y 40 min</p>"+
        			"<p style='color: black'>Seguro del 2% sobre el valor del paquete: <b style='color: black'>"+format(parseInt(Impuesto))+"</b></p>";

        $("#textConsole").css("text-align","left").html(html);
        $("#ConsoleSim").fadeIn("slow");
        google.maps.event.trigger(map, 'resize');

        
  }

 function paintRoute(init, destin) {
        
        
        var request = {
           origin:      init,
           destination: destin,
           travelMode: google.maps.DirectionsTravelMode['DRIVING'],
           unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
           provideRouteAlternatives: false
        };
    
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              computeTotalDistance(directionsDisplay.getDirections());

          }
        });
       
   }

function getPrecio(distance){
	/*
		banderazo = 4500
		km adicional = 700 pesos (hasta 5 km)
		km adicional = 800 pesos (6 km a 15 km)
		km adicional = 900 pesos (16 km a 20 km)
		km adicional = 1000 pesos despues de 20 km
		hasta 10 minutos de espera = 500 Pesos mas
		Ida y vuelta = 1200 menos del precio inicial
		si pasa de 10 minutos y no contesta la persona = Se comunica con la persona y se hace un acuerdo.
	*/ 

	var banderazo = 4500;
	var adicional = 0;
	if(3 >= distance){
		return banderazo;
	}else if(distance > 3 && distance <= 5){
		adicional = Math.floor(distance % 3);
		for (var i = 0; i < adicional; i++) {
			banderazo+=700;
		}
		return banderazo;
	}else if (distance > 5 && distance <= 15) {
		banderazo = 5900;
		adicional = Math.floor(distance - 5);
		banderazo+= adicional*800;
		return banderazo;
	}else if(distance > 15 && distance <= 20) {
		banderazo = 13900;
		adicional = Math.floor(distance - 15);
		banderazo+= adicional*900;
		return banderazo;
	}else{
		banderazo = 18400;
		adicional = Math.floor(distance - 20);
		banderazo+= adicional*1000;
		return banderazo;
	}
}

function getTiempo(time){
  	var hours = Math.floor( time / 60 );  
	var minutes = Math.floor( time % 60 );
	var seconds = time % 60;
	 
	//Anteponiendo un 0 a los minutos si son menos de 10 
	minutes = minutes < 10 ? '0' + minutes : minutes;
	 
	//Anteponiendo un 0 a los segundos si son menos de 10 
	seconds = seconds < 10 ? '0' + seconds : seconds;
	 
	return hours + ":" + minutes;  // 2:41:30
}

$("#toggleIdaV").change(function() {
	if($(this).prop('checked')){
		toggle = true;
	}else{
		toggle = false;
	};
});


$("#ValorPaquete").keyup(function(){
	$(this).val(format($(this).val()));
});


function format(input)
{
    var num = input.toString().replace(/\./g,'');
    if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        return num
    }else{ 
        console.log('Solo se permiten numeros');
        //input.value = input.value.replace(/[^\d\.]*/g,'');
    }
}


var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();



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
