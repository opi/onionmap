// Create map
var map = L.map('map').setView([27, 18], 2);

// Add background map layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by<a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL.',
    minZoom: 1,
    maxZoom: 10
}).addTo(map);

// Control scale
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false,
    updateWhenIdle: true
}).addTo(map);

// Set map on loading state
map.getContainer().classList.add('loading');

// Some config
L.Icon.Default.imagePath = 'dist/css/images';

// Get relay list from onionoo
// Real url is https://onionoo.torproject.org/details?fields=nickname,fingerprint,latitude,longitude,consensus_weight_fraction,guard_probability,middle_probability,exit_probability,dir_address,country,country_name,as_number,as_name
var jsonPath = "https://onionoo.torproject.org/details?fields=nickname,fingerprint,latitude,longitude,consensus_weight_fraction,guard_probability,middle_probability,exit_probability,dir_address,country,country_name,as_number,as_name";
// var jsonPath = 'onionoo.json';
fetchJSONFile(jsonPath, function(data) {

    // Remove loading state
   map.getContainer().classList.remove('loading');

    // Update information panel
    // document.getElementById('bridge-count').innerHTML = data.bridges.length;
    document.getElementById('relay-count').innerHTML = data.relays.length;

    // New feature group
    relaysMarkers = L.featureGroup();

    // Loop through relays
    data.relays.forEach(function(relay, idx){
        // // debug
        // if (idx < 5) console.log(relay);

        if (relay.latitude && relay.longitude) {
            var marker = L.marker([relay.latitude, relay.longitude])
                                        .bindPopup(
                                            "<h3>"+relay.nickname+"</h3>"+
                                            "<p><a href='https://atlas.torproject.org/#details/"+relay.fingerprint+"'>"+relay.fingerprint+"</a></p>"+
                                            "<p>" +
                                            "Country: "+relay.country_name+" ("+relay.country+")<br />"+
                                            "AS Number: "+relay.as_number+"<br />"+
                                            "AS Name: "+relay.as_name+"<br />"+
                                            "Consensus weight fraction: "+relay.consensus_weight_fraction+"<br />"+
                                            "Guard probability: "+relay.guard_probability+"<br />"+
                                            "Middle probability: "+relay.middle_probability+"<br />"+
                                            "Exit probability: "+relay.exit_probability+"<br />" +
                                            "</p>"
                                        );
            // Add relay to feature group
            relaysMarkers.addLayer(marker);
        }
    });


    // Marker cluster group
    var relaysCluster = new L.MarkerClusterGroup({
        showCoverageOnHover: true,
        polygonOptions: {
            stroke: false,
            opacity: 0.2,
            fillColor: '#885CA4',
            fillOpacity: 0.1
        },
        maxClusterRadius: 60,
    });

    // Add relay markers to cluster
    relaysCluster.addLayer(relaysMarkers);

    // Add cluster to map
    map.addLayer(relaysCluster);
});


/** Utility **/
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}
