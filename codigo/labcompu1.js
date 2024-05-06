let map;
let sidebarOpened = false;
let markers = [];
let tipoFiltroActual = 'todo';
let dificultadFiltroActual = 'todas';

function initMap() {
    // Inicializa el mapa con coordenadas y zoom específicos
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.4159118742952, lng: -64.18354716360302 },
        zoom: 8
    });

    // Agrega los marcadores iniciales
    addMarker(-31.39488696218396, -64.78142261288407, 'Los Gigantes', 'trekking', 'medio', '');
    addMarker(-31.983767756656356, -65.05089123024524, 'Barranca de los Loros', ['motocross', 'bicicleta'], 'facil');
    addMarker(-31.61034635258693, -64.71301037710637, 'Quebrada del Condorito', 'trekking', 'facil');
    addMarker(-31.900698479488604, -64.92631018758956, 'Cerro La Ventana', 'trekking', 'dificil');
    addMarker(-31.956203544673688, -64.9433081765019, 'Champaquí', 'trekking', 'dificil');
    addMarker(-32.22307606731555, -64.74533972889947, 'Monte Barranco', 'motocross', 'medio');
    addMarker(-32.033007314074695, -64.97060225185818, 'Puesto Don Carlos Ferreyra', 'todo', 'dificil');
    addMarker(-32.40623921216752, -64.89714148934935, 'Salto del Tigre', 'Bicicleta', 'medio');
    addMarker(-32.93249434789363, -66.05759463586779, 'Grutas de Intihuasi', 'Bicicleta', 'dificil');

    // Filtra los marcadores según los valores iniciales
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
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

function addMarker(lat, lng, nombre, tipo, dificultad, imagenURL) {
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: nombre,
        tipo: tipo, // Agrega la propiedad 'tipo' al marcador
        dificultad: dificultad, // Agrega la propiedad 'dificultad' al marcador
        imagenURL: imagenURL // Agrega la propiedad 'imagenURL' al marcador
    });

    // Calcula la distancia entre el centro del mapa y las coordenadas del marcador
    var center = map.getCenter();
    var markerCoords = new google.maps.LatLng(lat, lng);
    var distance = calculateDistance(center, markerCoords);

    // Agrega el marcador al array de marcadores
    markers.push(marker);

    // Agrega información al marcador
    var infowindowContent = '<div><h3>' + nombre + '</h3>';
    infowindowContent += '<p>Tipo: ' + tipo + '</p>';
    infowindowContent += '<p>Dificultad: ' + dificultad + '</p>';
    infowindowContent += '<p>Distancia desde el centro: ' + distance.toFixed(2) + ' km</p>';
    if (imagenURL) {
        infowindowContent += '<img src="' + imagenURL + '" alt="' + nombre + '">';
    }
    infowindowContent += '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: infowindowContent
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


function calculateDistance(point1, point2) {
    // Calcula la distancia en kilómetros entre dos puntos
    return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000);
}


function filterMarkers(tipoFiltro, dificultadFiltro) {
    // Itera sobre todos los marcadores
    for (let i = 0; i < markers.length; i++) {
        // Comprueba si el marcador coincide con el tipo y la dificultad seleccionados
        if ((tipoFiltro === 'todo' || markers[i].tipo.includes(tipoFiltro)) && (dificultadFiltro === 'todas' || markers[i].dificultad === dificultadFiltro)) {
            // Muestra el marcador si coincide con los filtros
            markers[i].setVisible(true);
        } else {
            // Oculta el marcador si no coincide con los filtros
            markers[i].setVisible(false);
        }
    }
}

// Obtiene los elementos del menú lateral
var trekkingLink = document.getElementById('trekking-link');
var motocrossLink = document.getElementById('motocross-link');
var bicicletaLink = document.getElementById('bicicleta-link');
var todoLink = document.getElementById('todo-link');

// Obtiene los elementos del menú de dificultad
var facilLink = document.getElementById('facil-link');
var medioLink = document.getElementById('medio-link');
var dificilLink = document.getElementById('dificil-link');
var todasLink = document.getElementById('todas-link');

// Agrega eventos de clic a los elementos del menú de tipo de actividad
trekkingLink.addEventListener('click', function() {
    tipoFiltroActual = 'trekking';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

motocrossLink.addEventListener('click', function() {
    tipoFiltroActual = 'motocross';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

bicicletaLink.addEventListener('click', function() {
    tipoFiltroActual = 'bicicleta';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

todoLink.addEventListener('click', function() {
    tipoFiltroActual = 'todo';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

// Agrega eventos de clic a los elementos del menú de dificultad
facilLink.addEventListener('click', function() {
    dificultadFiltroActual = 'facil';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

medioLink.addEventListener('click', function() {
    dificultadFiltroActual = 'medio';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

dificilLink.addEventListener('click', function() {
    dificultadFiltroActual = 'dificil';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

todasLink.addEventListener('click', function() {
    dificultadFiltroActual = 'todas';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

// Agrega eventos de clic al botón "Mostrar Todos"
document.getElementById('reset-btn').addEventListener('click', function() {
    tipoFiltroActual = 'todo';
    dificultadFiltroActual = 'todas';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});