function Camion(){
	this.litrosGastados = function(distancia){
		var consumo = 6; 
        var bencina = 673;
		// retorna la cantidad de litros que gasta en una distancia
        return (distancia/consumo)*bencina;
	}
}
