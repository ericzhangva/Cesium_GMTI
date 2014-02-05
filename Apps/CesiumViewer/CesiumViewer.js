/*global define*/
define([
    'Core/defined',
    'DynamicScene/CzmlDataSource',
    'DynamicScene/GeoJsonDataSource',
    'Scene/PerformanceDisplay',
    'Widgets/checkForChromeFrame',
    'Widgets/Viewer/Viewer',
    'Widgets/Viewer/viewerDragDropMixin',
    'Widgets/Viewer/viewerDynamicObjectMixin',
    'domReady!'
], function (defined, CzmlDataSource, GeoJsonDataSource, PerformanceDisplay, checkForChromeFrame, Viewer, viewerDragDropMixin, viewerDynamicObjectMixin) {
    "use strict";
    /*global console*/

    /*
     * 'debug'  : true/false,   // Full WebGL error reporting at substantial performance cost.
     * 'lookAt' : CZML id,      // The CZML ID of the object to track at startup.
     * 'source' : 'file.czml',  // The relative URL of the CZML file to load at startup.
     * 'stats'  : true,         // Enable the FPS performance display.
     * 'theme'  : 'lighter',    // Use the dark-text-on-light-background theme.
     */
    var endUserOptions = {};
    var queryString = window.location.search.substring(1);
    if (queryString !== '') {
        var params = queryString.split('&');
        for (var i = 0, len = params.length; i < len; ++i) {
            var param = params[i];
            var keyValuePair = param.split('=');
            if (keyValuePair.length > 1) {
                endUserOptions[keyValuePair[0]] = decodeURIComponent(keyValuePair[1].replace(/\+/g, ' '));
            }
        }
    }

    var loadingIndicator = document.getElementById('loadingIndicator');

    checkForChromeFrame('cesiumContainer').then(function (prompting) {
        if (!prompting) {
            startup();
        } else {
            loadingIndicator.style.display = 'none';
        }
    }).otherwise(function (e) {
            loadingIndicator.style.display = 'none';
            console.error(e);
            if (document.getElementsByClassName('cesium-widget-errorPanel').length < 1) {
                window.alert(e);
            }
        });

    function endsWith(str, suffix) {
        var strLength = str.length;
        var suffixLength = suffix.length;
        return (suffixLength < strLength) && (str.indexOf(suffix, strLength - suffixLength) !== -1);
    }

    function startup() {

        //get imageryProvider from GMTIViewerSettings frame
        var imageryProvider = window.parent.frames['GMTIViewerSettings'].getImageryProvider();

        log(imageryProvider)
        if (imageryProvider == null) {
            var viewer = new Cesium.Viewer('cesiumContainer');
        } else {
            var viewer = new Cesium.Viewer('cesiumContainer', {
                baseLayerPicker: false,
                sceneModePicker: false,
                imageryProvider: new Cesium.TileMapServiceImageryProvider({
                    url: imageryProvider,
                    tilingScheme: new Cesium.GeographicTilingScheme()
                })
            });
        }

        viewer.extend(viewerDragDropMixin);
        viewer.extend(viewerDynamicObjectMixin);

        var showLoadError = function (name, error) {
            var title = 'An error occurred while loading the file: ' + name;
            viewer.cesiumWidget.showErrorPanel(title, error);
            console.error(error);
        };

        viewer.dropError.addEventListener(function (viewerArg, name, error) {
            showLoadError(name, error);
        });

        var scene = viewer.scene;
        var context = scene.getContext();
        if (endUserOptions.debug) {
            context.setValidateShaderProgram(true);
            context.setValidateFramebuffer(true);
            context.setLogShaderCompilation(true);
            context.setThrowOnWebGLError(true);
        }

        if (defined(endUserOptions.source)) {
            var source;
            var sourceUrl = endUserOptions.source.toUpperCase();
            if (endsWith(sourceUrl, '.GEOJSON') || //
                endsWith(sourceUrl, '.JSON') || //
                endsWith(sourceUrl, '.TOPOJSON')) {
                source = new GeoJsonDataSource();
            } else if (endsWith(sourceUrl, '.CZML')) {
                source = new CzmlDataSource();
            } else {
                loadingIndicator.style.display = 'none';

                showLoadError(endUserOptions.source, 'Unknown format.');
            }

            if (defined(source)) {
                source.loadUrl(endUserOptions.source).then(function () {
                    viewer.dataSources.add(source);

                    if (defined(endUserOptions.lookAt)) {
                        var dynamicObject = source.getDynamicObjectCollection().getById(endUserOptions.lookAt);
                        if (defined(dynamicObject)) {
                            viewer.trackedObject = dynamicObject;
                        } else {
                            var error = 'No object with id "' + endUserOptions.lookAt + '" exists in the provided source.';
                            showLoadError(endUserOptions.source, error);
                        }
                    }
                },function (error) {
                    showLoadError(endUserOptions.source, error);
                }).always(function () {
                        loadingIndicator.style.display = 'none';
                    });
            }
        } else {
            loadingIndicator.style.display = 'none';
        }

        if (endUserOptions.stats) {
            scene.getPrimitives().add(new PerformanceDisplay());
        }

        var theme = endUserOptions.theme;
        if (defined(theme)) {
            if (endUserOptions.theme === 'lighter') {
                document.body.classList.add('cesium-lighter');
                viewer.animation.applyThemeChanges();
            } else {
                var error = 'Unknown theme: ' + theme;
                viewer.cesiumWidget.showErrorPanel(error);
                console.error(error);
            }
        }


        //*********** Hook up with GMTI Emulator ************
        GMTIEmulatorStart(viewer);
    }


    function GMTIEmulatorStart(viewer) {

        function MountEverest() {
            var eye, target, up;

            if (scene.mode === Cesium.SceneMode.SCENE3D) {
                eye = new Cesium.Cartesian3(294572.0645397696, 5637826.573008351, 2978624.6868285);
                target = Cesium.Cartesian3.add(eye, new Cesium.Cartesian3(0.9028130862217908, -0.42449297750082904, -0.06880583840911567));
                up = new Cesium.Cartesian3(0.40668971896562117, 0.790807045510862, 0.45741413322152297);
                scene.getCamera().controller.lookAt(eye, target, up);
            } else if (scene.mode === Cesium.SceneMode.COLUMBUS_VIEW) {
                eye = new Cesium.Cartesian3(9684590.891310014, 3114799.076252769, 9849.375792522824);
                target = Cesium.Cartesian3.add(eye, new Cesium.Cartesian3(-0.8929328433855669, -0.00005779973945286486, -0.45018988645076763));
                up = new Cesium.Cartesian3(-0.4501898855076042, -0.0000291369789812141, 0.8929328452557279);
                scene.getCamera().controller.lookAt(eye, target, up);
            } else {
                scene.getCamera().controller.viewExtent(new Cesium.Extent(1.516102969, 0.48744464, 1.518102969, 0.48944464));
            }
        };


        var scene = viewer.scene;
        var centralBody = scene.getPrimitives().getCentralBody();
        centralBody.depthTestAgainstTerrain = true;

        var cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
            url: 'http://cesiumjs.org/smallterrain',
            credit: 'Terrain data courtesy Analytical Graphics, Inc.'
        });

        var ellipsoidProvider = new Cesium.EllipsoidTerrainProvider();

        var vrTheWorldProvider = new Cesium.VRTheWorldTerrainProvider({
            url: 'http://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/',
            credit: 'Terrain data courtesy VT MÄK'
        });

        var terrainProviders = [
            { name: 'CesiumTerrainProvider', provider: cesiumTerrainProvider },
            { name: 'EllipsoidTerrainProvider', provider: ellipsoidProvider },
            { name: 'VRTheWorldTerrainProvider', provider: vrTheWorldProvider }
        ];

        centralBody.terrainProvider = cesiumTerrainProvider;


        //       MountEverest();

        cesiumViewer = viewer;
        require(['../Apps/Emulator/gmti', '../Build/Cesium/Cesium'], function () {
            var emulator = new Emulator(viewer);
        });
    }

});

var cesiumViewer;