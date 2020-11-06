<!DOCTYPE html>
<html>

<head>
    <title>Engineer site</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Koppeling naar de CSS van OpenLayers -->
    <link href="vendor/ol/ol.css" rel="stylesheet" />
    <!-- Koppeling naar eigen CSS -->
    <link href="css/menno.css" rel="stylesheet" />
</head>

<body onresize="openSidebar()">
    <main>
        <header>
            <h1>Proefpracticum</h1>
        </header>
        <section>
            <!-- kaart -->
            <div id="map"></div>

        </section>
        <aside>
            <div id="sidebarcontent">
                <h3>Selecteer lagen</h3>
                <h4>Achtergrondlagen</h4>
                <ul id="basemaplayers" class="jy-nobullets">

                </ul>
                <h4>Data lagen</h4>
                <ul id="overlaylayers" class="jy-nobullets">

                </ul>
            </div>
        </aside>
        <footer>
            <h6>&copy; Menno van der Spank</h6>
        </footer>


    </main>




    <!-- Koppeling naar jQuery JavaScript-->
    <script src="vendor/jquery/jquery-3.5.1.js"></script>
    <!-- Koppeling naar JavaScript van OpenLayers -->
    <script src="vendor/ol/ol.js"></script>
    <!-- Koppelingen naar eigen JavaScript code -->
    <script src="js/globals.js"></script>
    <script src="data/data.js"></script>
    <script src="js/map.js"></script>
    <script src="js/layers.js"></script>
    <script src="js/screenfunctions.js"></script>
    <script src="js/main.js"></script>
</body>

</html>