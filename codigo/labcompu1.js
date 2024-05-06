let map;
let sidebarOpened = false;
let markers = [];

function initMap() {
    // Inicializa el mapa con coordenadas y zoom específicos
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.4159118742952, lng: -64.18354716360302 },
        zoom: 11
    });

    // Agrega los marcadores iniciales

    addMarker(-31.39488696218396, -64.78142261288407, 'Los Gigantes', ['trekking'], 'media');
    addMarker(-31.983767756656356, -65.05089123024524, 'Barranca de los Loros', ['motocross', 'bicicleta'], 'facil');
    addMarker(-31.61034635258693, -64.71301037710637, 'Quebrada del Condorito', ['trekking'], 'facil');
    addMarker(-31.900698479488604, -64.92631018758956, 'Cerro La Ventana', ['trekking'], 'dificil');
    addMarker(-31.956203544673688, -64.9433081765019, 'Champaquí', ['trekking'], 'dificil');
    addMarker(-32.22307606731555, -64.74533972889947, 'Monte Barranco', ['motocross'], 'media');
    addMarker(-32.033007314074695, -64.97060225185818, 'Puesto Don Carlos Ferreyra', ['trekking', 'motocross', 'bicicleta'], 'dificil');
    addMarker(-32.40623921216752, -64.89714148934935, 'Salto del Tigre', ['bicicleta'], 'medio');
    addMarker(-32.93249434789363, -66.05759463586779, 'Grutas de Intihuasi', ['bicicleta'], 'dificil');
}


function toggleSidebar() {
    // Abre o cierra el menú lateral y ajusta la posición del botón de menú
    var sidebar = document.getElementById("sidebar");
    var menuToggle = document.getElementById("menu-toggle");

    if (!sidebarOpened) {
        sidebar.style.left = "0px";
        menuToggle.style.left = "250px"; // Desplaza el botón del menú
    } else {
        sidebar.style.left = "-250px";
        menuToggle.style.left = "0px"; // Restablece la posición del botón del menú
    }

    sidebarOpened = !sidebarOpened;
}


    function addMarker(lat, lng, tipo, info) {
        // Agrega el marcador correspondiente al tipo especificado
        var marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            title: tipo,
            tipo: tipo // Añade una propiedad tipo al marcador
        });
        markers.push(marker);
    // Agrega información al marcador
    var infowindow = new google.maps.InfoWindow({
        content: info
    });

    // Muestra el cuadro de información al hacer clic en el marcador
    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });

    // Cierra la ventana de información cuando el mouse deja el marcador
    marker.addListener("mouseout", function () {
        infowindow.close();
    });
}


function filterMarkers(tipo) {
    // Oculta todos los marcadores
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    // Filtra y muestra solo los marcadores del tipo especificado
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].tipo === tipo) {
            markers[i].setMap(map);
        }
    }
}

function resetMarkers() {
    // Muestra todos los marcadores
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

