//var mapAPI = require("./mapapi/quepasa-google-maps");
var mapAPI = require("./mapapi/quepasa-osm-leaflet");
//var mapAPI = require("./mapapi/quepasa-osm-openlayers");

export class MapAPI {
    static initMap() {
        console.log('Inicializando Mapa...');
		
		var map = mapAPI.criaMapa();
		    
        centralizaPosicaoAtual(map);  
	    gerarTodosMarcadores(map); 


        document.getElementById('controlbox').style.display='none';

    }
}

var markers = [];

function criaMarcador(map, lat, lng, icone, mensagem){
    if (typeof map !== 'undefined'){
        var marker = mapAPI.newMarker(map, parseFloat(lat), parseFloat(lng), icone, mensagem);

        mapAPI.adicionarAcoesMarcadorClique(map, markers, marker);
        mapAPI.adicionarAcoesMarcadorHover(map, marker);

        markers.push(marker);
        return marker;
    }

}

function gerarTodosMarcadores(map){ 
	try{
	    var salas = document.getElementsByClassName('marcadores');
	
	    for (let sala of salas) {
	        criaMarcador(map, sala.dataset.roomLat, sala.dataset.roomLng, null,
	            "<b>" + sala.dataset.roomName + "</b><br />\
	            <a href='#' \
	            onclick=\"document.getElementById('link-"+sala.dataset.roomJid+"').click()\" \
	            >Entrar na sala</a>");
	
	    }
	}
	catch(e){
		console.log("Erro ao gerar marcadores: " + e);
	}

}

function centralizaPosicaoAtual(map){
	try{
	    navigator.geolocation.getCurrentPosition(
	        (position) => {
	            const pos = {
	                lat: position.coords.latitude,
	                lng: position.coords.longitude,
	            };
	
	   	 		const center = criaMarcador(map, pos.lat, pos.lng, 'http://www.robotwoods.com/dev/misc/bluecircle.png', "Você está aqui!");
				//center.setPosition(pos);
				mapAPI.setCenter(map, pos);
	        },
	        () => {
				console.log("Erro ao centralizar posição atual no mapa. Falha ao obter posição atual.");
	        }
	    );
	}
	catch(e){
		console.log("Erro ao centralizar posição atual no mapa: " + e);
	}
}


