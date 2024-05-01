let map;
let sidebarOpened = false;
let markers = [];

function initMap() {
    // Inicializa el mapa con coordenadas y zoom específicos
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.48516360071856, lng: -64.26014092088036 },
        zoom: 12
    });

    // Agrega los marcadores iniciales
    addMarker(-31.48516360071856, -64.26014092088036, 'bicicleta', 'pablo');
    addMarker(-31.499022868424873, -64.26014092088036, 'motocross', 'fer');
    addMarker(-31.472090288661857, -64.24215648409528, 'trekking', 'Información del marcador 3');
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

