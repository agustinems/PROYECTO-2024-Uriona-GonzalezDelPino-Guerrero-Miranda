let map;
let sidebarOpened = false;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat:-31.48516360071856 , lng:-64.26014092088036  },
        zoom: 12
    });

    // Agrega los marcadores iniciales
    addMarker(-31.48516360071856, -64.26014092088036, 'marcador1');
    addMarker(-31.499022868424873, -64.26014092088036 , 'marcador2');
    addMarker(-31.472090288661857, -64.24215648409528, 'marcador3');
}

function toggleSidebar() {
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

function addMarker(lat, lng, tipo) {
    // Agrega el marcador correspondiente al tipo especificado
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: tipo
    });
    markers.push(marker);
}

function filterMarkers(tipo) {
    // Oculta todos los marcadores
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    // Filtra y muestra solo el marcador correspondiente al tipo especificado
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].getTitle() === tipo) {
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
