$(document).ready(function(){
    $("#informacion").tooltip();
    $('#carros_selec').hide();
    
});

/*----------VALIDAR CAMPO BUSQUEDA-----------*/
$('#busqueda').click(validar_ciudad);
$('#btn_compartir').click(validar_carros);
//$('#btn_compartir').click(validar_tipocarro);

    
function validar_ciudad() {    
    
    var ciudad_1 = $('#start');
    var ciudad_2 = $('#end');
    
    if (ciudad_1.val() === ''||ciudad_2.val() === '') {
        
        swal("Debes seleccionar dos ciudades!", "Intenta de nuevo");
    
    } else {
                     
        $('#carros_selec').show();
        $('#btn_compartir').attr('disabled', false);
        var city_1 = ciudad_1.val();
        var city_2 = ciudad_2.val();
        calcular_distancia(city_1,city_2);  
    }          
}

function calcular_distancia(ciudad_1,ciudad_2) {
    
    var ciudades = get_regiones();
        
    for(var i in ciudades){
        
        if (ciudades[i].name === ciudad_1 ) {
            var distance_1 = ciudades[i].distance;
            console.log(ciudades[i].distance);
            
        } 
        if (ciudades[i].name === ciudad_2) {
            var distance_2 = ciudades[i].distance;
            console.log(ciudades[i].distance);
        }
    } 
    
    var distancia_total = distance_1 + distance_2; 
    
    var bencina = 673;
    
    var moto = new Moto;
    var auto = new Auto;
    var van = new Camioneta;
    var camion =  new Camion;
    var costo_moto = moto.litrosGastados(distancia_total);
    var precio_moto = $('#precio1').html('$'+costo_moto.toFixed());
    var costo_auto = auto.litrosGastados(distancia_total);
    var precio_auto = $('#precio2').html('$'+costo_auto.toFixed());
    var costo_van = van.litrosGastados(distancia_total);
    var precio_van = $('#precio3').html('$'+costo_van.toFixed());
    var costo_camion = camion.litrosGastados(distancia_total);
    var precio_camion = $('#precio4').html('$'+costo_camion.toFixed());
    
}
/*
function validar_pasajeros() {
    swal("No debe sobrepsar el número máximo de pasajeros según cada vehículo", "Intenta de nuevo!")
    
}
function validar_tipocarro() {
    
    if($('input[name=moto]').is(':checked')){
        var vehiculoElegido = ("input[name=moto]:checked".val());
        
    }
}
*/
function validar_carros(){
    
    
    var carros = get_carros();

    for (var i in carros) {

    	if($('input:radio[name=vehi]:checked').val() == carros[i].name){
			var max_numero = carros[i].pasajeros;   
    	}
	}
    
    var selector = $( 'input:radio[name=vehi]:checked' ).val();
    var pasajeros = $("#pas").val();
		
    if(!selector){
			swal("Error", "Por favor seleccione un vehiculo", "error");
    }
    else{
        if(pasajeros > max_numero) {
			var num = "Por favor seleccione un maximo de " + max_numero; 
			swal("Error", num + " personas." , "error");
        } else{
        
        
            if(selector == "motocicleta") {

                var precio = $("#precio1").text();
                var total = precio*pasajeros;
            }

            else if(selector == "auto")
            {
                var precio = $("#precio2").text();
                var total = precio*pasajeros;
            }

            else if(selector == "minivan")
            {
                var precio = $("#precio3").text();
                var total = precio*pasajeros;
            }

            else if(selector == "camion" )
            {
                var precio = $("#precio4").text();
                var total = precio*pasajeros;
            }
        }
    }
    swal({   title: precio,   text: "Costo por persona"
         
    });
}





/*----------------MAPA-------------*/
var map;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.85, lng: -87.65}
  });
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);
}



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {     
    }
  });
}