var fromProjection = new OpenLayers.Projection("EPSG:4326");
var toProjection = new OpenLayers.Projection("EPSG:900913");


module.exports = {

	setCenter : function(map, pos){
		map.setCenter(new OpenLayers.LonLat(pos.lon, pos.lat).transform(fromProjection, toProjection), 14);
	},
	
	criaMapa : function(){		
		var map = new OpenLayers.Map("mapa");
		map.addLayer(new OpenLayers.Layer.OSM());

		return map;
	},
	
	newMarker : function(map, lat, lng, icone, mensagem){
		/*
		var marker = L.marker(L.latLng(lat, lng)).addTo(map);
		
		if(icone!=null)
			marker.setIcon(L.icon({iconUrl: icone, iconSize: [14, 14]}));

		marker.bindPopup(mensagem);
	    marker.infowindow = marker.getPopup();
		*/
		
		var marker = new OpenLayers.Marker(new OpenLayers.LonLat(lng, lat).transform(fromProjection, toProjection));
		
	    return marker;
	},
	
	adicionarAcoesMarcadorClique : function(map, markers, marker){
		/*
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
*/
	
	},
	
	adicionarAcoesMarcadorHover : function(map, marker){/*
		marker.on('mouseover', function() {
			marker.infowindow.openPopup();
		});
		
		marker.on('mouseout', function() {
            if(!marker.clicked){
				marker.infowindow.closePopup();
            }
		});
		*/
	}
}