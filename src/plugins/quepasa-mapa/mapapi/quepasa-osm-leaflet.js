
module.exports = {

	setCenter : function(map, pos){
		map.setView(pos, 14);
	},
	
	criaMapa : function(){		
		var map = L.map(document.getElementById("mapa"), {attributionControl:false});
		
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				//attribution: 'QuePasa' //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
			
		return map;
	},
	
	newMarker : function(map, lat, lng, icone, mensagem){
		var marker = L.marker(L.latLng(lat, lng)).addTo(map);
		
		if(icone!=null){
			marker.setIcon(L.icon({iconUrl: icone, iconSize: [14, 14]}));
		}
		else{
			marker.setIcon(new L.Icon({
			  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
			  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			  iconSize: [25, 41],
			  iconAnchor: [12, 41],
			  popupAnchor: [1, -34],
			  shadowSize: [41, 41]
			}));
		}

		marker.bindPopup(mensagem);
	    marker.infowindow = marker.getPopup();		
	    return marker;
	},
	
	adicionarAcoesMarcadorClique : function(map, markers, marker){
		marker.on('click', function(e) {
            for (let m of markers) {
                m.infowindow.closePopup(map,marker);
            }

            marker.clicked = true;
            marker.infowindow.openPopup(map,marker);
		});
		
		map.on('click', function(e) {
            marker.infowindow.closePopup(map,marker);
            marker.clicked = false;
		});

	
	},
	
	adicionarAcoesMarcadorHover : function(map, marker){
		marker.on('mouseover', function() {
			marker.infowindow.openPopup();
		});
		
		marker.on('mouseout', function() {
            if(!marker.clicked){
				marker.infowindow.closePopup();
            }
		});
		
	}
}