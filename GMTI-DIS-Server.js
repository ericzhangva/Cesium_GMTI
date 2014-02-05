(function () {

    var connect = require('connect');
    var ws = require("nodejs-websocket")
    var dgram = require('dgram')
    var fs = require('fs');
    var vm = require('vm');
    var includeInThisContext = function (path) {
        var code = fs.readFileSync(path);
        vm.runInThisContext(code, path);
    }.bind(this);

    var dir = "js/GMTI"
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        includeInThisContext(name)
    }

    //************* js file for DIS
    dir = "js/dis"
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        includeInThisContext(name)
    }

    dir = "js/disSupporting"
    files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        includeInThisContext(name)
    }

    // **************  Generic http server **************

    /*
     connect.logger() // default
     connect.logger('short')
     connect.logger('tiny')
     connect.logger({ immediate: true, format: 'dev' })
     connect.logger(':method :url - :referrer')
     connect.logger(':req[content-type] -> :res[content-type]')
     connect.logger(function(tokens, req, res){ return 'some format string' })
     */


    connect.createServer()
        .use(connect.logger('dev'))
        .use(connect.static(__dirname))
        .listen(8088);

    // ************** End of Generic http server **************


    function log(s) {
        console.log(s);
    }

    function broadcast(server, msg) {
        var c = 0
        server.connections.forEach(function (conn) {
            c++;
//            log("broadcasting to #" + c + " :  " + conn.socket.remoteAddress + "   msg : " + msg);
//            log("broadcasting to #" + c + " :  " + conn.socket.remoteAddress );
            conn.sendText(msg)
        })
    }


    var server = ws.createServer(function (conn) {

        log("\r\nNew connection from : " + conn.socket.remoteAddress);
        log("# of connections (new connection) : " + server.connections.length)


        conn.on("close", function (code, reason) {
            console.log("\r\nConnection closed")
            log("# of connections (after close) : " + server.connections.length)
        })

        conn.on("text", function (str) {
            console.log("Received " + str)
            conn.sendText(str.toUpperCase() + "!!!")
        })

        conn.on("error", function (e) {
            log(e)
        })

    }).listen(8082)

    //*******************  Define GMTIs ****************************

    var gmtis = [];
    var startLocationLat = 39.131923;
    var startLocationLng = -77.599185;

    var sensorwindowLoopIndex = 0;

    function setSensorWindow(ind) {
        var gmti_ind = null;
        if (gmti_ind == undefined) {
            gmti_ind = sensorwindowLoopIndex;
            sensorwindowLoopIndex++;
            if (sensorwindowLoopIndex >= gmtis.length) {
                sensorwindowLoopIndex = 0;
            }
        } else {
            gmti_ind = ind;
        }

        var gmti = gmtis[gmti_ind];
        if (gmti != null) {
            var sensor_win = new SensorRectWindow();
            var factor = 0.09;
            var lat_factor = (Math.random() - 0.5) * factor;
            var lng_factor = (Math.random() - 0.5) * factor;
            sensor_win.northEast = new Location(39.123167 + lat_factor, -77.537470 + lng_factor, 0);
            sensor_win.northWest = new Location(39.123167 + lat_factor, -77.555494 + lng_factor, 0);
            sensor_win.southEast = new Location(39.110381 + lat_factor, -77.537470 + lng_factor, 0);
            sensor_win.southWest = new Location(39.110381 + lat_factor, -77.555494 + lng_factor, 0);

            gmti.sensorRectWindow = sensor_win;
        }
    }

    //update sensor windows
    setInterval(function () {
        for (var i = 0; i < gmtis.length; i++) {
            setTimeout(function () {
                setSensorWindow();
            }, Math.round(5000 * Math.random()));
        }
        ;

    }, 5000);


    //*********************** Define other entities ***********************

    var entities = [];
    var entityStartLocationLat = 39.231923;
    var entityStartLocationLng = -77.299185;


    //***********************  DIS UDP Server *********************************************

    var entityType = new Object();
    entityType.GMTI = 100;
    entityType.VEHICLE = 101;
    entityType.VESSEL = 102;

    var lastUpdates = {};


    var s = dgram.createSocket('udp4');
    s.bind(62040, function () {
        s.addMembership('239.1.2.3');
    });

    s.on("message", function (data) {       // receives udp data package. Then convert it to DIS Entity Object

        var buffer = new ArrayBuffer(data.length);
        for (var i = 0; i < data.length; i++) {
            buffer[i] = data[i]
        }
        var esudp = new dis.EntityStatePdu();
        esudp.initFromBinaryDIS(new dis.InputStream(buffer));
//        log("site : " + esudp.entityID.site)
//        log("application : " + esudp.entityID.application)
//        log("entity : " + esudp.entityID.entity)

        //use application to separate different type of entities
        var type = esudp.entityID.application;
        var id = esudp.entityID.entity;
        var uid = esudp.entityID.site + "_" + esudp.entityID.application + "_" + esudp.entityID.entity;

        var now = (new Date()).getTime();

        if (lastUpdates[uid] == undefined) {
            if (type == entityType.GMTI) {
                log("new GMTI : " + id)
                lastUpdates[uid] = now;

                var gmti = new Gmti();
                gmti.id = uid;
                gmti.type = "GMTI";
                gmti.name = "GMTI Sensor"
                gmti.location = new Location(startLocationLat, startLocationLng, 0);
                gmti.markerUrl = "../images/entities/airplane_icon_";
                gmti.markerRotationRange = 5;
                gmti.markerSize = 50;

                //test sensor window
                var s = new Velocity()
                s.x = 500 * (Math.random() - 0.5);
                s.y = 500 * (Math.random() - 0.5);
                s.z = 0;
                gmti.velocity = s;

                var sensor_win = new SensorRectWindow();
                sensor_win.northEast = new Location(39.123167, -77.537470, 0);
                sensor_win.northWest = new Location(39.123167, -77.555494, 0);
                sensor_win.southEast = new Location(39.110381, -77.537470, 0);
                sensor_win.southWest = new Location(39.110381, -77.555494, 0);
                gmti.sensorRectWindow = sensor_win;


                gmtis.push(gmti);


            }

            if (type == entityType.VEHICLE) {
                log("new car : " + id)
                lastUpdates[uid] = now;

                var entity = new Entity();
                entity.id = uid;
                entity.type = "CAR";
                entity.name = "Car"
                entity.location = new Location(entityStartLocationLat, entityStartLocationLng, 0);
                entity.markerUrl = "../images/entities/car_green_";
                entity.markerRotationRange = 5;
                entity.markerSize = 50;

                //test sensor window
                var s = new Velocity()
                s.x = 500 * (Math.random() - 0.5);
                s.y = 500 * (Math.random() - 0.5);
                s.z = 0;
                entity.velocity = s;

                entities.push(entity);

                updateEntityByDIS(entity, esudp);
            }
        } else {
            lastUpdates[uid] = now;
            var entity = null;
            for (var i = 0; i < entities.length; i++) {
                var e = entities[i];
                if (e.id == uid) {
                    entity = e;
                }
            }
            for (var i = 0; i < gmtis.length; i++) {
                var e = gmtis[i];
                if (e.id == uid) {
                    entity = e;
                }
            }

            if (entity != null) {
                updateEntityByDIS(entity, esudp);
                broadcast(server, JSON.stringify(entity));
            }
        }
    })

    var conv = new dis.CoordinateConversion();

    function updateEntityByDIS(entity, esudp) {
        var lat_lng_lat = conv.convertDisToLatLongInDegrees(esudp.entityLocation);
        var newLocation = new Location();
        newLocation.lat = lat_lng_lat.latitude;
        newLocation.lng = lat_lng_lat.longitude;
        newLocation.alt = lat_lng_lat.altitude;
        entity.updateLocation(newLocation);
        log("Update on " + entity.id + "   [ " + newLocation.lat.toFixed(3) + ", " + newLocation.lng.toFixed(3) + ", " + newLocation.alt.toFixed(3) + " ]" )
    }


    //----------  Remove the entities after a period of time if there are no updates
    var entityUpdateExpiration = 5000;
    setInterval(function () {
        var now = new Date().getTime();
        var hit = true;
        while (hit) {
            hit = false;

            for (var i = 0; i < gmtis.length; i++) {
                var e = gmtis[i];
                var lastUpdate = lastUpdates[e.id];
                if (now - lastUpdate > entityUpdateExpiration) {
                    gmtis.splice(i, 1);
                    lastUpdates[e.id] = undefined;
                    log("Removed GMTI : " + e.id + "   Remaining GMTIs : " + gmtis.length);
                    hit = true;
                    break;
                }
            }

            for (var i = 0; i < entities.length; i++) {
                var e = entities[i];
                var lastUpdate = lastUpdates[e.id];
                if (now - lastUpdate > entityUpdateExpiration) {
                    entities.splice(i, 1);
                    lastUpdates[e.id] = undefined;
                    log("Removed entity : " + e.id + "   Remaining Entities : " + entities.length);
                    hit = true;
                    break;
                }
            }
        }
    }, 1000)


}());
