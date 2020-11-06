function buildLayerSwitcher() {
    // ohalen van alle lagen uit de map
    var mapLayers = map.getLayers().getArray();

    // Voor elke laag uit de map
    $.each(mapLayers, function(i, layer) {
        // console.log(layer);
        // Als de laag een basemap is
        if (layer.values_.type == 'basemap') {
            // opbouwen LI-item met radiobutton
            let liTekst = '<li><input type="radio" id="' + layer.ol_uid + '" name="basemaps" value="' + layer.ol_uid + '"';
            // Zorgen dat radio-button van zichtbare laag is aangevinkt
            if (layer.values_.visible) {
                liTekst += " checked>";
            } else {
                liTekst += ">";
            }
            // Zorg ervoor dat je ook op de tekst kunt klikken
            liTekst += '<label for="' + layer.ol_uid + '">' + layer.values_.title + '</label></li>';
            // Voeg de LI toe aan de UL
            $('#basemaplayers').append(liTekst);
        } else if (layer.values_.type == 'overlay') { // als de laag een overlay laag is
            // opbouwen LI-item met een checkbox
            let liTekst = '<li><input type="checkbox" id="' + layer.ol_uid + '" name="' + layer.ol_uid + '" value="' + layer.ol_uid + '" class="overlayswitch"';
            // Zorgen dat checkbox van zichtbare laag is aangevinkt
            if (layer.values_.visible) {
                liTekst += " checked>";
            } else {
                liTekst += ">";
            }
            // Zorg ervoor dat je ook op de tekst kunt klikken
            liTekst += '<label for="' + layer.ol_uid + '">' + layer.values_.title + '</label></li>';
            // Voeg de LI toe aan de UL
            $('#overlaylayers').append(liTekst);
        }
    });

    // Zorgen dat veranderen radio buttons basemaps worden afgehandeld
    $('input[type=radio][name=basemaps]').on('change', function() {
        // bewaar de waarde van de geselecteerde radiobutton
        let ol_uid = this.value;

        // loop alle lagen langs
        map.getLayers().forEach(function(layer) {
            // als het ol_uid van de laag gelijk is aan de ol_uid van de radio button
            // maak dan de laag zichtbaar
            if (layer.ol_uid == ol_uid) {
                layer.setVisible(true);
                // maak alle andere basemaps niet zichtbaar
            } else if (layer.values_.type == 'basemap') {
                layer.setVisible(false);
            }
        });
    });

    // Zorgen dat veranderen checkbox overlay laag worden afgehandeld
    $('input[type=checkbox][class=overlayswitch]').on('change', function() {
        // bewaar de waarde van de geselecteerde checkbox
        let ol_uid = this.value;

        // loop alle lagen langs
        map.getLayers().forEach(function(layer) {
            // als het ol_uid van de laag gelijk is aan de ol_uid van de checkbox
            if (layer.ol_uid == ol_uid) {
                // als de laag zichtbaar is maak hem dan niet zichtbaar
                if (layer.getVisible()) {
                    layer.setVisible(false);
                    // anders maak hem wel zichtbaar    
                } else {
                    layer.setVisible(true);
                }
            }
        });
    });
}

function closeSidebar() {
    $("aside").animate({ width: "30px" }, 500, function() {
        $("#openbutton").show();
        $("#closebutton").hide();
    });
    $("#sidebarcontent").hide();
    if ($("body").width() > 600) {
        let contentWidth = $("body").width() - 30;
        $("section").animate({ width: contentWidth }, 500, function() {
            map.updateSize();
        });
    }
}

function openSidebar() {
    if ($("body").width() > 600) {
        let contentWidth = $("body").width() - 300;
        $("section").animate({ width: contentWidth }, 500, function() {
            map.updateSize();
        });
    }

    $("aside").animate({ width: "300px" }, 500, function() {
        $("#openbutton").hide();
        $("#closebutton").show();
        $("#sidebarcontent").show();
    });


}