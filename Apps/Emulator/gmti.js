/**
 * Created by eric.zhang on 1/22/14.
 */



var viewer = null;
var scene = null;
var ellipsoid = null;
var lines = null;

var west = Cesium.Math.toRadians(-77.510262);
var south = Cesium.Math.toRadians(38.891693);
var east = Cesium.Math.toRadians(-77.307227);
var north = Cesium.Math.toRadians(39.085962);


var target_lat = 38.947787;          // IAD
var target_lng = -77.427864;
var target_alt = 1500;
var heading = 0;
var speed = 200;                    // (m/s)
var radius = 10000;                 // in meters
var cameraLookDownAngle = 15;       //The degree of angle between the horizontal and the line between eye and target
// used to calculate eye location once the target position and camera height are given

var terrainSamplePositions;
var billboards;
var primitiveArray = [];

var movingTarget = null;

//************ GMTI variables
var entitiesToBillboardMap = {};
var entityBillboards = new Cesium.BillboardCollection();


function log(s) {
    console.log(s);
}

function cartographicToCartesian(lat, lng, alt) {

    return ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(lng, lat, alt));
}

function Emulator(v) {
    viewer = v;
    scene = viewer.scene;
    ellipsoid = viewer.centralBody.getEllipsoid();
    initCamera(viewer);

    initBillboards();
    addBillboardOnGround(target_lat, target_lng, '../../images/entities/googlemap_marker_yellow.png', 0.3, Cesium.VerticalOrigin.BOTTOM);


    //billboardTest(viewer.scene, ellipsoid);
    addBillboard(new Cesium.Cartographic.fromDegrees(target_lng, target_lat, target_alt), '../../images/entities/target_1.png', 1.0, Cesium.VerticalOrigin.CENTER);

    if (movingTarget != null) {
        movingTarget.removeAll()
    }

    var targetPos = new Cesium.Cartographic.fromDegrees(target_lng, target_lat, Number(target_alt) + 500);
    movingTarget = addBillboard(targetPos, '../../images/entities/googlemap_marker_red.png', 0.3, Cesium.VerticalOrigin.BOTTOM);

    //stop the animation timer
    if (timer != null) {
        clearInterval(timer);
    }

    if (targetTimer != null) {
        clearInterval(targetTimer);
    }

    setTimeout(function () {
        //       test();
        setCameraController(viewer);
        startMovingTarget();
    }, 10000)

}


function initBillboards() {

    if (typeof billboards === 'undefined') {
        billboards = new Cesium.BillboardCollection();

        Cesium.when(Cesium.loadImage('../../images/entities/triangle_1.png'), function (image) {
            var textureAtlas = scene.getContext().createTextureAtlas({images: [image]});
            billboards.setTextureAtlas(textureAtlas);
        });
    } else {
        billboards.removeAll();
    }

    removeAllPrimitives();
    //scene.getPrimitives().add(entityBillboards);
}

//***************************** Timer for moving target *****************
var targetTimer = null;
var newLng = null;
var s = 1;
var maxSteps = 200;
var stepCount = 0;
function startMovingTarget() {

    newLng = null;
    s = 1;
    stepCount = 0;
    var newAlt = Number(target_alt) + 500;

    targetTimer = setInterval(function () {
        if (movingTarget != undefined && movingTarget != null) {
            stepCount++;
            if (stepCount == maxSteps) {
                stepCount = 0;
                s = -s;
            }
            if (newLng == null) {
                newLng = Number(target_lng);
            }
            newLng += 0.00005 * s;
            var b = movingTarget.get(0);
            if (b != undefined) {
                var p = cartographicToCartesian(Number(target_lat), Number(newLng), newAlt); //b.getPosition();
                b.setPosition(p);
            }
        }
    }, 30)
}


//***************************** Timer for moving camera - FPV *************
var timer = null;
var videoFrameRate = 25;
var videoFrameInterval = 1000 / videoFrameRate;

function setCameraController(viewer) {

    var controller = viewer.scene.getCamera().controller;
    var sign = 1;
    var c = 0;

    log("Speed  : " + speed)
    log("radius : " + radius)
    moveDistance = speed / videoFrameRate
    timePerCircle = (2 * Math.PI * radius) / speed;
    log("timePerCircle : " + timePerCircle);
    degreePerInterval = (2 * Math.PI) / (timePerCircle * videoFrameRate)
    log("degreePerInterval : " + degreePerInterval);

    timer = setInterval(function () {
        //Move camera forward
        controller.moveForward(moveDistance);

        c += degreePerInterval;
        if (c >= Math.PI * 2) {
            sign = -sign;
            c = 0
        }
        //Turn camera direction
        controller.lookRight(sign * degreePerInterval);

    }, videoFrameInterval)

}


function initCamera(viewer) {

    earthRadius = 6371000;


    target = cartographicToCartesian(target_lat, target_lng, target_alt);

    ground_distance = target_alt / Math.tan(cameraLookDownAngle / 180.0 * Math.PI);
    //we move the eye to south for this mount of distance
    //since it is very small to the radius of earth. we simple use atan(delta) ~= delta
    delta_lat = ground_distance / earthRadius * 180 / Math.PI;

    eye = cartographicToCartesian(target_lat - delta_lat, target_lng, target_alt);
    up = eye;
    var camera = viewer.scene.getCamera()
    camera.controller.lookAt(eye, target, up);
    camera.controller.rotate(target, heading / 180 * Math.PI);
}


function removeAllPrimitives() {
    for (var i = 0; i < primitiveArray.length; i++) {
        primitiveArray[i].removeAll();
    }
    entityBillboards.removeAll();
}

function addBillboardOnGround(lat, lng, imageUrl, imageScale, verticalOrigin) {

    terrainSamplePositions = [];    // an array is required when query the elevation using terrain provider

    //1) create a position object without alt -- it will be fill in using terrain elevation
    var position = new Cesium.Cartographic.fromDegrees(lng, lat);
    terrainSamplePositions.push(position);

    //using terrain to obtain elevations at the sample positions
    var centralBody = scene.getPrimitives().getCentralBody();
    // When successfully retrieved elevations. the elevations are filled into alt elements in
    // each position in terrainSamplePositions array
    Cesium.when(Cesium.sampleTerrain(centralBody.terrainProvider, 11, terrainSamplePositions), function () {
            for (var i = 0; i < terrainSamplePositions.length; ++i) {
                var position = terrainSamplePositions[i];
                addBillboard(position, imageUrl, imageScale, verticalOrigin);
                addLabel(position, position.height.toFixed(2), 0.6, Cesium.HorizontalOrigin.CENTER, new Cesium.Cartesian2(0, 30), new Cesium.Color(1, 0, 0));
            }
        }
    );

}


function addLabel(position, text, scale, horizontalOrigin, offset, color) {

    var labels = new Cesium.LabelCollection();

    labels.add({
        position: ellipsoid.cartographicToCartesian(position),
        text: text,
        horizontalOrigin: horizontalOrigin,
        scale: scale,
        pixelOffset: offset,
        fillColor: color,
        outlineColor: Cesium.Color.WHITE
    });
    scene.getPrimitives().add(labels);
    primitiveArray.push(labels);

    return labels;
}

function addBillboard(position, imageUrl, imageScale, verticalOrigin) {

    var bbs = new Cesium.BillboardCollection();
    var image = new Image();
    image.src = imageUrl;

    image.onload = function () {
        var textureAtlas = scene.getContext().createTextureAtlas({
            image: image
        });
        bbs.setTextureAtlas(textureAtlas);
        bbs.add({
            position: ellipsoid.cartographicToCartesian(position),
            verticalOrigin: verticalOrigin,
            scale: imageScale,
            imageIndex: 0
        });
        scene.getPrimitives().add(bbs);
    };
    primitiveArray.push(bbs)
    return bbs;
}


function billboardTest(scene, ellipsoid) {

    var image = new Image();
    image.onload = function () {
        var billboards = new Cesium.BillboardCollection();
        var textureAtlas = scene.getContext().createTextureAtlas({
            image: image
        });
        billboards.setTextureAtlas(textureAtlas);

        billboards.add({
            position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(target_lng, target_lat, target_alt)),
            imageIndex: 0
        });
        scene.getPrimitives().add(billboards);
    };
    image.src = '../../images/entities/target_1.png';
}


//******************* GMTI Emulations *****************************
function updateEntity(entity) {

    var lat = entity.location.lat;
    var lng = entity.location.lng;
    var alt = entity.location.alt;


    var entity_billboard = entitiesToBillboardMap[entity.id];
    var GMTIImageUrl = '../../images/entities/googlemap_marker_red.png';
    var CARImageUrl = '../../images/entities/googlemap_marker_red.png';

    if (entity_billboard == undefined) {

        if (entity.type == "GMTI") {
            var p = new Cesium.Cartographic.fromDegrees(Number(lng), Number(lat), Number(alt));
            entity_billboard = addBillboard(p, GMTIImageUrl, 0.5, Cesium.VerticalOrigin.BOTTOM);
            entitiesToBillboardMap[entity.id] = entity_billboard;
        }

        if (entity.type == "CAR") {  //Ground entity needs elevation

            terrainSamplePositions = [];    // an array is required when query the elevation using terrain provider

            //1) create a position object without alt -- it will be fill in using terrain elevation
            var position = new Cesium.Cartographic.fromDegrees(Number(lng), Number(lat));
            terrainSamplePositions.push(position);

            //using terrain to obtain elevations at the sample positions
            var centralBody = scene.getPrimitives().getCentralBody();
            // When successfully retrieved elevations. the elevations are filled into alt elements in
            // each position in terrainSamplePositions array

            Cesium.when(Cesium.sampleTerrain(centralBody.terrainProvider, 11, terrainSamplePositions), function () {
                    for (var i = 0; i < terrainSamplePositions.length; ++i) {
                        var p = terrainSamplePositions[i];
                        entity_billboard = addBillboard(p, CARImageUrl, 0.5, Cesium.VerticalOrigin.BOTTOM);
                        entitiesToBillboardMap[entity.id] = entity_billboard;
                    }
                }
            );
         }

    } else {
        var b = entity_billboard.get(0);
        if (b != undefined) {
            if (entity.type == "GMTI") {
                var p = cartographicToCartesian(Number(lat), Number(lng), Number(alt)); //b.getPosition();
                b.setPosition(p);
            }

            if (entity.type == "CAR") {

                terrainSamplePositions = [];    // an array is required when query the elevation using terrain provider

                //1) create a position object without alt -- it will be fill in using terrain elevation
                var position = new Cesium.Cartographic.fromDegrees(Number(lng), Number(lat));
                terrainSamplePositions.push(position);

                //using terrain to obtain elevations at the sample positions
                var centralBody = scene.getPrimitives().getCentralBody();
                // When successfully retrieved elevations. the elevations are filled into alt elements in
                // each position in terrainSamplePositions array

                Cesium.when(Cesium.sampleTerrain(centralBody.terrainProvider, 11, terrainSamplePositions), function () {
                        for (var i = 0; i < terrainSamplePositions.length; ++i) {
                            var p = terrainSamplePositions[i];
                            //log(p.height)
                            var pp = cartographicToCartesian(p.latitude*180/Math.PI, p.longitude*180/Math.PI, p.height);
                            b.setPosition(pp);
                        }
                    }
                );

            }
        }
    }
}

function removeEntity(entity) {
    var billboard = entitiesToBillboardMap[entity.id];
    if (billboard != undefined) {
        billboard.removeAll();
        entitiesToBillboardMap[entity.id] = undefined;
    }
}


function test() {


    var primitives = scene.getPrimitives();
//    var startLocationLat = 38.961360;
//    var startLocationLng = -77.449536;

    var startLocationLat = 38.997787            // IAD
    var startLocationLng = -77.427864

    function formLines() {

        var polylines = new Cesium.PolylineCollection();

        // A simple polyline with two points.
        var polyline = polylines.add();
        polyline.setPositions(ellipsoid.cartographicArrayToCartesianArray([
            Cesium.Cartographic.fromDegrees(startLocationLng, startLocationLat),
            Cesium.Cartographic.fromDegrees(startLocationLng + 0.05, startLocationLat)
        ]));


        var colorMaterial = Cesium.Material.fromType('Color');
        colorMaterial.uniforms.color = new Cesium.Color(1.0, 1.0, 1.0, 1.0);


        var outlineMaterial = Cesium.Material.fromType(Cesium.Material.PolylineOutlineType);
        outlineMaterial.uniforms.outlineWidth = 5.0;


        var glowMaterial = Cesium.Material.fromType(Cesium.Material.PolylineGlowType);
        glowMaterial.uniforms.innerWidth = 3.0;
        glowMaterial.uniforms.color = new Cesium.Color(1.0, 1.0, 1.0, 1.0);

        polyline.setMaterial(glowMaterial);
//    polyline.setMaterial(outlineMaterial);
//    polyline.setMaterial(colorMaterial);
        polyline.setWidth(10.0);


        //primitives.add(polylines);

        return   polylines;
    }


    function formPolygon() {


        var polygon = new Cesium.Polygon({
            positions: ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(startLocationLng, startLocationLat),
                Cesium.Cartographic.fromDegrees(startLocationLng + w, startLocationLat),
                Cesium.Cartographic.fromDegrees(startLocationLng + w, startLocationLat + h),
                Cesium.Cartographic.fromDegrees(startLocationLng, startLocationLat + h)])
        });

        polygon.material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1.0);


        return polygon;

    }

    setInterval(function () {
        lines = formLines();
        polygons = formPolygon();

        primitives.add(polygons);
        primitives.add(lines);


        setTimeout(function () {
            primitives.remove(lines);
            primitives.remove(polygons);
        }, 2500);
    }, 5000)

}
