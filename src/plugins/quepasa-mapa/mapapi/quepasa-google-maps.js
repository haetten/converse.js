
module.exports = {

	criaMapa : function(){
		return new google.maps.Map(document.getElementById("mapa"), {
	                zoom: 14,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
		});
	},
	
	newMarker : function(map, lat, lng, icone, mensagem){
	    var marker = new google.maps.Marker({
	        position: { lat: lat, lng: lng },
	        map: map
	    });
	    marker.setIcon(icone);
	
	    var infowindow = new google.maps.InfoWindow({
	        content: mensagem
	    });
	    marker.infowindow = infowindow;
	
	    return marker;
	},
	
	adicionarAcoesMarcadorClique : function(map, markers, marker){
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
	
	        });
	
	},
	
	adicionarAcoesMarcadorHover : function(map, marker){
	        google.maps.event.addListener(marker, 'mouseover', function() {
	            marker.infowindow.open(map,marker);
	
	        });
	
	        google.maps.event.addListener(marker, 'mouseout', function() {
	            if(!marker.clicked){
	                marker.infowindow.close(map,marker);
	            }
	
	        });
	}
}