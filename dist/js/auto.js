function Auto(){
	this.litrosGastados = function(distancia){
        var consumo = 12; 
        var bencina = 673;
		// retorna la cantidad de litros que gasta en una distancia
        return (distancia/consumo)*bencina;
	};
    this.pasajeros = 5;
    this.tipo = 'auto';
    this.img = 'src/img/auto.jpg';
}
