
module.exports = {

	setCenter : function(map, pos){
		map.setView(pos, 14);
	},
	

	criaMapa : function(){		
		var map = L.map(document.getElementById("mapa"));
		
		// Add OSM tile layer to the Leaflet map.
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
			
		return map;
	},
	
	newMarker : function(map, lat, lng, icone, mensagem){	
		var marker = L.marker(L.latLng(lat, lng)).addTo(map);

	    return marker;
	},
	
	adicionarAcoesMarcadorClique : function(map, markers, marker){
		/*
	        google.maps.event.addListener(marker, 'click', function() {
	            for (let m of markers) {
	                m.infowindow.close(map,marker);
	            }
	
	            marker.clicked = true;
	            marker.infowindow.open(map,marker);
	
	        });
	
	        google.maps.event.addListener(map, 'click', function() {
	            marker.infowindow.close(map,marker);
	            marker.clicked = false;
	
	        });*/
	
	},
	
	adicionarAcoesMarcadorHover : function(map, marker){
		/*
	        google.maps.event.addListener(marker, 'mouseover', function() {
	            marker.infowindow.open(map,marker);
	
	        });
	
	        google.maps.event.addListener(marker, 'mouseout', function() {
	            if(!marker.clicked){
	                marker.infowindow.close(map,marker);
	            }
	
	        });
*/
	}
}