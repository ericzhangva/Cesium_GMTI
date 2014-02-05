/**
 * Created by eric.zhang on 1/10/14.
 */

//classes

//****************  Math ******************************
function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

Vector.prototype = {
    negative: function () {
        return new Vector(-this.x, -this.y, -this.z);
    },
    add: function (v) {
        if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        else return new Vector(this.x + v, this.y + v, this.z + v);
    },
    subtract: function (v) {
        if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        else return new Vector(this.x - v, this.y - v, this.z - v);
    },
    multiply: function (v) {
        if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
        else return new Vector(this.x * v, this.y * v, this.z * v);
    },
    divide: function (v) {
        if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
        else return new Vector(this.x / v, this.y / v, this.z / v);
    },
    equals: function (v) {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    },
    dot: function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    cross: function (v) {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    },
    length: function () {
        return Math.sqrt(this.dot(this));
    },
    unit: function () {
        return this.divide(this.length());
    },
    min: function () {
        return Math.min(Math.min(this.x, this.y), this.z);
    },
    max: function () {
        return Math.max(Math.max(this.x, this.y), this.z);
    },
    toAngles: function () {
        return {
            theta: Math.atan2(this.z, this.x),
            phi: Math.asin(this.y / this.length())
        };
    },
    toArray: function (n) {
        return [this.x, this.y, this.z].slice(0, n || 3);
    },
    clone: function () {
        return new Vector(this.x, this.y, this.z);
    },
    init: function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
};

Vector.negative = function (a, b) {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
};
Vector.add = function (a, b, c) {
    if (b instanceof Vector) {
        c.x = a.x + b.x;
        c.y = a.y + b.y;
        c.z = a.z + b.z;
    }
    else {
        c.x = a.x + b;
        c.y = a.y + b;
        c.z = a.z + b;
    }
    return c;
};
Vector.subtract = function (a, b, c) {
    if (b instanceof Vector) {
        c.x = a.x - b.x;
        c.y = a.y - b.y;
        c.z = a.z - b.z;
    }
    else {
        c.x = a.x - b;
        c.y = a.y - b;
        c.z = a.z - b;
    }
    return c;
};
Vector.multiply = function (a, b, c) {
    if (b instanceof Vector) {
        c.x = a.x * b.x;
        c.y = a.y * b.y;
        c.z = a.z * b.z;
    }
    else {
        c.x = a.x * b;
        c.y = a.y * b;
        c.z = a.z * b;
    }
    return c;
};
Vector.divide = function (a, b, c) {
    if (b instanceof Vector) {
        c.x = a.x / b.x;
        c.y = a.y / b.y;
        c.z = a.z / b.z;
    }
    else {
        c.x = a.x / b;
        c.y = a.y / b;
        c.z = a.z / b;
    }
    return c;
};
Vector.cross = function (a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
};
Vector.unit = function (a, b) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
};
Vector.fromAngles = function (theta, phi) {
    return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
Vector.randomDirection = function () {
    return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vector.min = function (a, b) {
    return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
Vector.max = function (a, b) {
    return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
Vector.lerp = function (a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a);
};
Vector.fromArray = function (a) {
    return new Vector(a[0], a[1], a[2]);
};


//***************** end of Math ********************

/*
 Some constants
 */
function CONST() {
    this.EARTH_RADIUS = 6371000;
}

/*
 Location class for capture a GEO location point
 dump() is for showing the current GEO values of location point
 */
function Location(lat, lng, alt) {
    this.lat = lat;
    this.lng = lng;
    this.alt = alt;
    this.dump = function () {
        return "lat : " + lat + "    lng : " + lng + "   alt : " + alt;
    }
}

/*
 SensorRectWindow class define a rectangle window by defining four corner locations of the window
 dump() is for showing the current GEO point of the window
 */
function SensorRectWindow() {
    this.northEast = new Location();
    this.southEast = new Location();
    this.northWest = new Location();
    this.southWest = new Location();
    this.dump = function () {
        var str = ""
        str += " NorthEast -- " + this.northEast.dump() + "\n"
        str += " SouthEast -- " + this.southEast.dump() + "\n"
        str += " NorthWest -- " + this.northWest.dump() + "\n"
        str += " SouthWest -- " + this.southWest.dump() + "\n"
        return str;
    }
}


//Calculate heading based on velocity vector
function speedToHeading(speed) {

    log("speedVector.x : " + speed.x)
    log("speedVector.y : " + speed.y)
    log("speedVector.z : " + speed.z)

    if (speed.x == undefined) {
        return 0        // no velocity on lng
    }

    return 90 - 180 * Math.atan(speedVector.y / speedVector.x) / Math.PI
}

function Velocity() {

    this.heading = function () {
        return  speedToHeading(this)
    };
    this.speed = function () {
        return this.length();
    }


    this.dump = function () {
        var str = "Sensor Velocity : "
        str += "  sx : " + this.speedVector.x + "    sy : " + this.speedVector.y + "   sz : " + this.speedVector.z;
        str += "     heading : " + this.heading() + "\n";
        return str;
    }
}
//inherits Vector
Velocity.prototype = new Vector();

function speedToHeading(s) {
    return  180 * Math.atan2(s.x, s.y) / Math.PI
}

/*
 Target entity class
 */
function Target() {
    this.location = new Location();                   //sensor geo location point
}

function log(s) {
    console.log(s)
}

/*
 Gmti class -- defines a GMTI sensor
 */
function Gmti() {

    Entity.call(this);        //create indivaual Enity instance through prototype

    // of sensor and geo north
    this.sensorRectWindow = new SensorRectWindow();     //sensor sensing window

    //Google map graphic related
    this.mapWindow = null;
    this.lines = [];

    this.clearMapWindow = function () {
        if (this.mapWindow != null) {
            this.mapWindow.setMap(null);
        }

        for (var i = 0; i < this.lines.length; i++) {
            this.lines[i].setMap(null);
        }

        if (this.marker != null) {
            this.marker.setMap(null);
        }

        this.mapWindow = null;
        this.lines = [];
        this.marker = null;
    };

    var window_upper_left = null;
    var window_low_right = null;
    var lastLocation = null;



    function deg_to_dms(deg) {
        var d = Math.floor(deg);
        var minfloat = (deg - d) * 60;
        var m = Math.floor(minfloat);
        var secfloat = (minfloat - m) * 60;
        var s = Math.round(secfloat);
        // After rounding, the seconds might become 60. These two
        // if-tests are not necessary if no rounding is done.
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            d++;
            m = 0;
        }
        return ("" + d + "'" + m + '"' + s);
    }

    this.drawWindow = function (map, marker) {

        var theLatlng, heading, markerIconheadingUrl, imgIcon;
        var heading = this.heading()
        var heading = Math.round(heading / this.markerRotationRange) * this.markerRotationRange;

        if (map == null) {
            log("Google Map object is null.");
            return;
        }

        //draw rect window
        var area_upper_left = new google.maps.LatLng(this.sensorRectWindow.northWest.lat, this.sensorRectWindow.northWest.lng);
        var area_low_right = new google.maps.LatLng(this.sensorRectWindow.southEast.lat, this.sensorRectWindow.southEast.lng);

        //determine if we need to redraw th window
        if (window_upper_left == null
            || window_low_right == null
            || area_upper_left.lat() != window_upper_left.lat()
            || area_upper_left.lng() != window_upper_left.lng()
            || area_low_right.lat() != window_low_right.lat()
            || area_low_right.lat() != window_low_right.lat()) {
            //drawRectWindow(map, area_upper_left, area_low_right, color, fillOpacity, editable, draggable) {
            if (this.mapWindow != null) {
                this.mapWindow.setMap(null);
            }
            this.mapWindow = drawRectWindow(map, area_upper_left, area_low_right, "#0000FF", 0.2, false, false);

            //record current winddow
            window_upper_left = area_upper_left;
            window_low_right = area_low_right;
        }

        //draw lines between sensor location and the corners of the window
        for (var i = 0; i < this.lines.length; i++) {
            this.lines[i].setMap(null);
        }
        this.lines = [];     //clear previous lines references

        var color = "#B0B0B0"
        var ln1 = drawLineBetweenLocations(this.location, this.sensorRectWindow.northEast, color);
        var ln2 = drawLineBetweenLocations(this.location, this.sensorRectWindow.northWest, color);
        var ln3 = drawLineBetweenLocations(this.location, this.sensorRectWindow.southEast, color);
        var ln4 = drawLineBetweenLocations(this.location, this.sensorRectWindow.southWest, color);

        this.lines.push(ln1);
        this.lines.push(ln2);
        this.lines.push(ln3);
        this.lines.push(ln4);

        this.drawMarker(map, marker);
    };
}

function Entity() {

    WebInfo.call(this);

    this.id = "";
    this.name = "";
    this.type = "";
    this.currentTime = (new Date()).getTime();
    this.location = new Location();                     //sensor geo location point
    this.velocity = new Velocity();                           // velocity vector on lat/lng/alt - x/y/z
    this.marker = null;
    this.heading = function () {
        return this.velocity.heading();
    };
    this.speed = function () {
        return this.velocity.speed();
    };


    // 1) When newLocation is provided - update the location to newLocation and recalculate the velocity
    // 2) When newLocation is omitted - update the location based on calculation from the velocity
    this.updateLocation = function (newLocation) {

        var constant = new CONST();
        var now, timeDiff, deltaX, deltaY, deltaZ;

        now = (new Date()).getTime();
        timeDiff = (now - this.currentTime) / 1000.0;

        if (newLocation == undefined) {   // when no new location is provided then, use velocity to figure the updated location
            deltaX = this.velocity.x * timeDiff;
            deltaY = this.velocity.y * timeDiff;
            deltaZ = this.velocity.z * timeDiff;
            this.location.lat += Math.atan2(deltaY, constant.EARTH_RADIUS) * 180 / Math.PI;
            this.location.lng += Math.atan2(deltaX, constant.EARTH_RADIUS) * 180 / Math.PI;
            this.location.alt += deltaZ;
            this.currentTime = now;
        } else {                          //use new location update velocity
            deltaY = Math.tan((newLocation.lat - this.location.lat) * Math.PI / 180.0) * constant.EARTH_RADIUS;
            deltaX = Math.tan((newLocation.lng - this.location.lng) * Math.PI / 180.0) * constant.EARTH_RADIUS;
            this.velocity.x = deltaX / timeDiff;
            this.velocity.y = deltaY / timeDiff;
            this.velocity.z = (newLocation.alt - this.location.alt) / timeDiff;
            this.location = newLocation;
            this.currentTime = now;
        }
    }

    this.setLocation = function (newLocation) {
        this.location = newLocation;
        this.currentTime = (new Date()).getTime();
    }



    function markerDescription(e) {
        var disc = e.name + "  [type : " + e.type + " id : " + e.id + "]"
            + "\nspeed : " + e.speed().toFixed(2) + " (m/s)"
//            + "\nheading : " +  deg_to_dms(e.heading())
//            + "\nlat/lng : (" + deg_to_dms(e.location.lat) + ", " + deg_to_dms(e.location.lng) + ")";
            + "\nheading : " + e.heading().toFixed(2) + " (degrees)"
            + "\nlat/lng : (" + e.location.lat.toFixed(2) + ", " + e.location.lng.toFixed(2) + ")";
        return disc;
    }



    this.drawMarker = function(map, marker){

        var now = new Date().getMilliseconds();
        var timeDiff = now - this.currentTime;

        var m = this.marker;
        //update target marker
        if (marker != undefined) {
            this.marker = marker;
        } else {
            theLatlng = new google.maps.LatLng(this.location.lat, this.location.lng);
            heading = this.heading()
            heading = Math.round(heading / this.markerRotationRange) * this.markerRotationRange;
            if (heading < 0) {
                heading += 360;
            }

            markerIconheadingUrl = this.markerUrl + heading + ".png";
            imgIcon = {
                url: markerIconheadingUrl,
                anchor: {x: this.markerSize / 2, y: this.markerSize / 2},
                size: {width: this.markerSize, height: this.markerSize}
            }


            var themarker = new google.maps.Marker({
                position: theLatlng,
                map: map,
                title: markerDescription(this),
                icon: imgIcon
            });
            this.marker = themarker;


        }

        if (m != null) {
            setTimeout(function () {
                m.setMap(null)
            }, 1);
        }
    }

    this.clearMarker = function () {

        if (this.marker != null) {
            this.marker.setMap(null);
        }

        this.marker = null;
    };

}

function WebInfo() {

    this.WebInfoInit = function(){
        //do nothing
    }

    this.markerUrl = "images";
    this.markerRotationRange = 1;   //only rotate this degree. round heading to this window
    this.markerSize = 50;
}

Entity.prototype = new WebInfo();
Gmti.prototype = new Entity();





