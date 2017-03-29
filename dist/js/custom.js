$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $('#carros_selec').hide();
    
});

/*----------VALIDAR CAMPO BUSQUEDA-----------*/
$('#busqueda').click(validar_ciudad);
    
function validar_ciudad() {    
    
    var ciudad_1 = $('#start');
    var ciudad_2 = $('#end');
    
    if (ciudad_1.val() === ''||ciudad_2.val() === '') {
        
        swal("Debes seleccionar dos ciudades!", "Intenta de nuevo");
        $('#carros_selec').hide();
    
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
    
    var moto = new Moto;
    var auto = new Auto;
    var van = new Camioneta;
    var camion =  new Camion;
    var costo_moto = moto.litrosGastados(distancia_total);
    var precio_moto = $('#precio1').html(costo_moto.toFixed());
    var costo_auto = auto.litrosGastados(distancia_total);
    var precio_auto = $('#precio2').html(costo_auto.toFixed());
    var costo_van = van.litrosGastados(distancia_total);
    var precio_van = $('#precio3').html(costo_van.toFixed());
    var costo_camion = camion.litrosGastados(distancia_total);
    var precio_camion = $('#precio4').html(costo_camion.toFixed());
    
    $('#btn_compartir').click(validar_carros);
    
}

function validar_carros(){
    var moto = new Moto;
    var auto = new Auto;
    var van = new Camioneta;
    var camion =  new Camion;
    
    if($('input:radio[name=vehi]').is(':checked')){
        
        var vehiculoActual = $('input:radio[name=vehi]:checked').val();
        
        if(moto.tipo == vehiculoActual){
            var tipoVehiculo = moto.tipo; 
            var maxVehiculo = moto.pasajeros;
            var imgVehiculo = moto.img;
            
        } else if (auto.tipo == vehiculoActual){
            var tipoVehiculo = auto.tipo; 
            var maxVehiculo = auto.pasajeros;
            var imgVehiculo = auto.img;
            
        } else if (van.tipo == vehiculoActual){
            var tipoVehiculo = van.tipo; 
            var maxVehiculo = van.pasajeros;
            var imgVehiculo = van.img;
            
        } else if (camion.tipo == vehiculoActual){
            var tipoVehiculo = camion.tipo; 
            var maxVehiculo = camion.pasajeros;
            var imgVehiculo = camion.img;
        } 
        
        validar_Pasajeros(maxVehiculo,tipoVehiculo,imgVehiculo);
        
    } else {
        
        if( $('input:radio[name=vehi]').prop('checked', false) && $('#pas').val('') ){
            
            swal("Debes seleccionar un tipo de vehiculo!", "Inténtalo de nuevo!", "error");   
            
        } else if ( $('input:radio[name=vehi]:checked') && $('#pas').val('')) {
            
            swal("Debes colocar un cantidad de pasajeros!", "Inténtalo de nuevo!", "error");  
            
        } else if ($('input:radio[name=vehi]').prop('checked', false) && ($('#pas').val(0) || $('#pas').val(''))) {
            
            swal("Debes seleccionar vehiculo y cantidad de pasjeros!", "Intentalo de nuevo!", "error");  
        }
               
        
    }
}

function validar_Pasajeros(max,tipo,img){
    
    var pasajeros = $('#pas');
    var costo_moto = $('.motocicleta').text();
    var costo_auto = $('.auto').text();
    var costo_van = $('.minivan').text();
    var costo_camion = $('.camion').text();
        
    console.log(pasajeros.val());
    
    if( pasajeros.val() >  max) {
        
        swal("Se excede el número de pasajeros según tipo de vehículo", "Inténtalo de nuevo!", "error");
        
    } else {
        
        if( tipo == 'motocicleta') {
            
            var precio = $("#precio1").text();
			precio = precio.toString();
			var total = precio / pasajeros.val();
            
        } else if ( tipo == 'auto') {
            
            var precio = $("#precio2").text();
			precio = precio.toString();
			var total = precio / pasajeros.val();
            
        } else if ( tipo == 'minivan') {
            
            var precio = $("#precio3").text();
			precio = precio.toString();
			var total = precio / pasajeros.val();
            
        } else if ( tipo == 'camion') {
            
            var precio = $("#precio4").text();
			precio = precio.toString();
			var total = precio / pasajeros.val();
        }
        
        swal({   title: "$"+total.toFixed(),   text: "Costo por persona", imageUrl: img });
        
    }
}
    

/*----------------MAPA-------------*/
var map;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    disableDefaultUI: true,
    center: {lat: -33.447487, lng: -70.673676}
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