function initLayers() {
    /*
        Functie om alle lagen aan de kaart aan te maken
    */

    //  Achtergrondlaag met ESRI satelliet 
    var ESRIsatteliet = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: ['Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community']
        }),
        title: 'ESRI Satelliet',
        type: 'basemap'
    });
    map.addLayer(ESRIsatteliet);
    ESRIsatteliet.setVisible(false);

    //  OpenStreetMap achtergrond
    var OSMlayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        title: 'Open Streetmap',
        type: 'basemap'
    });
    map.addLayer(OSMlayer);


    // laag met provinciegrenzen
    var provinciegrenzensource = new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/practicum/wms?service=WMS',
        params: {
            'layers': 'provincies_grenzen'
        }
    });

    var provinciegrenzenlayer = new ol.layer.Image({
        source: provinciegrenzensource,
        title: 'Provinciegrenzen',
        type: 'overlay'
    });
    map.addLayer(provinciegrenzenlayer);


    // laag met meteostations
    var meteostationsource = new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/practicum/wms?service=WMS',
        params: {
            'layers': 'meteostation'
        }
    });

    var meteostationlayer = new ol.layer.Image({
        source: meteostationsource,
        title: 'Meteostations',
        type: 'overlay'
    });
    map.addLayer(meteostationlayer);

}