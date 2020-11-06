function initMap() {
    map = new ol.Map({
        target: 'map',
        layers: [],
        view: new ol.View({
            center: ol.proj.fromLonLat([5.309017, 51.716379]),
            zoom: 10
        })
    });
 
}