var map;
var markers = [];



function criarMarcadorGoogle(lat, lng, icone, mensagem){
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
}

function adicionarAcoesMarcadorClique(marker){
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

}

function adicionarAcoesMarcadorHover(marker){
        google.maps.event.addListener(marker, 'mouseover', function() {
            marker.infowindow.open(map,marker);

        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            if(!marker.clicked){
                marker.infowindow.close(map,marker);
            }

        });
}

function criaMarcador(lat, lng, icone, mensagem){
    if (typeof map !== 'undefined'){
        
        var marker = criarMarcadorGoogle(parseFloat(lat), parseFloat(lng), icone, mensagem);

        adicionarAcoesMarcadorClique(marker);
        adicionarAcoesMarcadorHover(marker);


        markers.push(marker);
        return marker;
    }

}

function criarMarcadores(){ 
    criaMarcador(0, 0, 'http://www.robotwoods.com/dev/misc/bluecircle.png', "Você está aqui!");

    var salas = document.getElementsByClassName('marcadores');

    for (let sala of salas) {
        criaMarcador(sala.dataset.roomLat, sala.dataset.roomLng, null,
            "<b>" + sala.dataset.roomName + "</b><br />\
            <a href='#' \
            onclick=\"document.getElementById('link-"+sala.dataset.roomJid+"').click()\" \
            >Entrar na sala</a>");

    }

}

function centralizaPosicaoAtual(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            markers[0].setPosition(pos);
            map.setCenter(pos);
        },
        () => {
        }
    );
}

function criaMapa(){
    throw new Error("Method 'say()' must be implemented.");
}


module.exports = {
        initMap : function() {
            console.log('inicializando mapa');

            map = criaMapa();
                
            criarMarcadores();

            centralizaPosicaoAtual();   

            document.getElementById('controlbox').style.display='none';

        }


}
