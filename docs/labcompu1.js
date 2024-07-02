let map;
let sidebarOpened = false;
let markers = [];
let tipoFiltroActual = 'Todo';
let dificultadFiltroActual = 'Todas';
let currentInfoWindow = null;

function initMap() {
    // Inicializa el mapa con coordenadas y zoom específicos
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.4159118742952, lng: -64.18354716360302 },
        zoom: 8
    });

    // Agrega los marcadores iniciales
    addMarker(-31.39488696218396, -64.78142261288407, 'Los Gigantes', 'Trekking', 'Medio');
    addMarker(-31.983767756656356, -65.05089123024524, 'Barranca de los Loros',  'Todo', 'Fácil');
    addMarker(-31.61034635258693, -64.71301037710637, 'Quebrada del Condorito', 'Trekking', 'Fácil');
    addMarker(-31.900698479488604, -64.92631018758956, 'Cerro La Ventana', 'Trekking', 'Difícil');
    addMarker(-31.956203544673688, -64.9433081765019, 'Champaquí', 'Trekking', 'Difícil');
    addMarker(-32.22307606731555, -64.74533972889947, 'Monte Barranco', 'Motocross', 'Medio');
    addMarker(-32.033007314074695, -64.97060225185818, 'Puesto Don Carlos Ferreyra', 'Todo', 'Difícil');
    addMarker(-32.40623921216752, -64.89714148934935, 'Salto del Tigre', 'Bicicleta', 'Medio');
    addMarker(-32.93249434789363, -66.05759463586779, 'Grutas de Intihuasi', 'Bicicleta', 'Difícil');

    // Calcula las distancias entre todos los marcadores
    calculateAllDistances();

    // Calcula y muestra la distancia total del recorrido específico
    let totalDistance = calculateRouteDistance();
    console.log(`Distancia total del recorrido desde Los Gigantes hasta Grutas de Intihuasi: ${totalDistance.toFixed(2)} km`);

    // Filtra los marcadores según los valores iniciales
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
}
// Abre o cierra el menú lateral y ajusta la posición del botón de menú
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

//crea los marcadores en el mapa
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

    // Inicializa la información del marcador sin las distancias
    var infowindowContent = `<div><h3>${nombre}</h3>`;
    infowindowContent += `<p>Tipo: ${tipo}</p>`;
    infowindowContent += `<p>Dificultad: ${dificultad}</p>`;
    infowindowContent += `<p>Distancia desde el centro de Córdoba: ${distance.toFixed(2)} km</p>`;
    if (imagenURL) {
        infowindowContent += `<img src="${imagenURL}" alt="${nombre}">`;
    }
    infowindowContent += `<div id="distances-${nombre.replace(/\s/g, '-')}"></div>`;
    infowindowContent += `</div>`;

    var infowindow = new google.maps.InfoWindow({
        content: infowindowContent
    });

    // Muestra el cuadro de información al hacer clic en el marcador
    marker.addListener("click", function () {
        // Cierra la ventana de información actual si hay una abierta
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
        infowindow.open(map, marker);
        showDistances(marker, infowindow);
        currentInfoWindow = infowindow; // Establece la infowindow actual como la que se acaba de abrir
    });

    // Cierra la ventana de información cuando el mouse deja el marcador
    marker.addListener("mouseout", function () {
        infowindow.close();
    });
}

// Calcula la distancia en kilómetros entre dos puntos
function calculateDistance(point1, point2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000);
}

//calcula la distancia entre los marcadores
function calculateAllDistances() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].distances = [];
        for (let j = 0; j < markers.length; j++) {
            if (i !== j) {
                let distance = calculateDistance(markers[i].getPosition(), markers[j].getPosition());
                markers[i].distances.push({
                    name: markers[j].getTitle(),
                    distance: distance
                });
            }
        }
    }
}

// Calcula la distancia acumulada entre los marcadores
function calculateRouteDistance() {
    const routeOrder = [
        'Los Gigantes',
        'Quebrada del Condorito',
        'Cerro La Ventana',
        'Champaquí',
        'Barranca de los Loros',
        'Puesto Don Carlos Ferreyra',
        'Monte Barranco',
        'Salto del Tigre',
        'Grutas de Intihuasi'
    ];

    let totalDistance = 0;
    let accumulatedDistances = {};

    for (let i = 0; i < routeOrder.length; i++) {
        if (i > 0) {
            let marker1 = markers.find(marker => marker.getTitle() === routeOrder[i - 1]);
            let marker2 = markers.find(marker => marker.getTitle() === routeOrder[i]);
            if (marker1 && marker2) {
                let distance = calculateDistance(marker1.getPosition(), marker2.getPosition());
                totalDistance += distance;
            }
        }
        accumulatedDistances[routeOrder[i]] = totalDistance;
    }

    // Almacena las distancias acumuladas en los marcadores
    markers.forEach(marker => {
        if (accumulatedDistances[marker.getTitle()] !== undefined) {
            marker.totalDistance = accumulatedDistances[marker.getTitle()];
        }
    });

    return totalDistance;
}

// Muestra las distancias a otros marcadores en la ventana de información
function showDistances(marker, infowindow) {
    let distancesDiv = infowindow.getContent().match(/id="distances-[^"]+"/)[0].replace('id="', '').replace('"', '');
    let distancesContent = '<h4>Distancias a otros marcadores:</h4><ul>';
    marker.distances.forEach(dist => {
        distancesContent += `<li>${dist.name}: ${dist.distance.toFixed(2)} km</li>`;
    });
    distancesContent += `</ul><p><strong>Distancia total acumulada: ${marker.totalDistance.toFixed(2)} km</strong></p>`;
    document.getElementById(distancesDiv).innerHTML = distancesContent;
}

// Itera sobre todos los marcadores
function filterMarkers(tipoFiltro, dificultadFiltro) {

    for (let i = 0; i < markers.length; i++) {
        // Comprueba si el marcador coincide con el tipo y la dificultad seleccionados
        if ((tipoFiltro === 'Todo' || markers[i].tipo.includes(tipoFiltro)) && (dificultadFiltro === 'Todas' || markers[i].dificultad === dificultadFiltro)) {
            // Muestra el marcador si coincide con los filtros
            markers[i].setVisible(true);
        } else {
            // Oculta el marcador si no coincide con los filtros
            markers[i].setVisible(false);
        }
    }
}

// Filtra los marcadores según la distancia desde el centro del mapa
function filterMarkersByDistance(maxDistance) {
    var center = map.getCenter();
    markers.forEach(marker => {
        var markerPosition = marker.getPosition();
        var distance = calculateDistance(center, markerPosition);
        if (distance <= maxDistance) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    });
}

// Añade eventos a los enlaces del menú lateral
document.getElementById("Trekking-link").addEventListener("click", function() {
    tipoFiltroActual = 'Trekking';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});
document.getElementById("Motocross-link").addEventListener("click", function() {
    tipoFiltroActual = 'Motocross';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});
document.getElementById("Bicicleta-link").addEventListener("click", function() {
    tipoFiltroActual = 'Bicicleta';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});
document.getElementById("Todo-link").addEventListener("click", function() {
    tipoFiltroActual = 'Todo';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

document.getElementById("Fácil-link").addEventListener("click", function() {
    dificultadFiltroActual = 'Fácil';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});
document.getElementById("Medio-link").addEventListener("click", function() {
    dificultadFiltroActual = 'Medio';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});
document.getElementById("Difícil-link").addEventListener("click", function() {
    dificultadFiltroActual = 'Difícil';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});
document.getElementById("Todas-link").addEventListener("click", function() {
    dificultadFiltroActual = 'Todas';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});

// Añade un evento al botón de filtro de distancia
document.getElementById('distance-filter-btn').addEventListener('click', function() {
    var maxDistance = document.getElementById('distance-input').value;
    if (maxDistance) {
        filterMarkersByDistance(parseFloat(maxDistance));
    }
});

// Evento para el botón de "Mostrar Todos"
document.getElementById("reset-btn").addEventListener("click", function() {
    tipoFiltroActual = 'Todo';
    dificultadFiltroActual = 'Todas';
    filterMarkers(tipoFiltroActual, dificultadFiltroActual);
});